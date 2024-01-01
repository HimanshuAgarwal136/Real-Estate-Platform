// import axios from "axios";
// import Listing from "../models/listing.model.js";
// import { errorHandler } from "../utils/error.js";

// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// export const createListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.create(req.body);
//     return res.status(201).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) return next(errorHandler(404, "Listing not found"));

//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(403, "You can only delete your own listings"));
//   }

//   try {
//     await Listing.findByIdAndDelete(req.params.id);
//     res.status(200).json("Listing has been deleted!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) return next(errorHandler(404, "Listing not found"));

//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(403, "You can only update your own listings"));
//   }

//   try {
//     const updatedListing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) return next(errorHandler(404, "Listing not found!"));
//     res.status(200).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getListings = async (req, res, next) => {
//   try {
//     const { searchTerm } = req.query;

//     if (!searchTerm) {
//       return res.status(400).json({ message: "Missing search prompt" });
//     }

//     // Directly pass searchTerm as description to RapidAPI
//     const queryParams = new URLSearchParams();
//     queryParams.append("description", searchTerm);

//     const rapidApiResponse = await axios.get(
//       `https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?${queryParams.toString()}`,
//       {
//         headers: {
//           "X-RapidAPI-Key": RAPIDAPI_KEY,
//           "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com"
//         }
//       }
//     );

//     const listings = rapidApiResponse.data?.properties || [];
//     return res.status(200).json({ properties: listings });

//   } catch (error) {
//     console.error("Search error:", error?.response?.data || error.message);
//     return res.status(500).json({
//       message: "Search failed",
//       error: error?.response?.data || error.message
//     });
//   }
// };













// Ateempt 2


// import axios from "axios";
// import Listing from "../models/listing.model.js";
// import { errorHandler } from "../utils/error.js";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// export const createListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.create(req.body);
//     return res.status(201).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) return next(errorHandler(404, "Listing not found"));

//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(403, "You can only delete your own listings"));
//   }

//   try {
//     await Listing.findByIdAndDelete(req.params.id);
//     res.status(200).json("Listing has been deleted!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) return next(errorHandler(404, "Listing not found"));

//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(403, "You can only update your own listings"));
//   }

//   try {
//     const updatedListing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) return next(errorHandler(404, "Listing not found!"));
//     res.status(200).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };


// export const getListings = async (req, res, next) => {
//   try {
//     const { searchTerm } = req.query;

//     if (!searchTerm) {
//       return res.status(400).json({ message: "Missing search prompt" });
//     }

//     // 1. Gemini prompt for structured filters
//     const geminiPrompt = `
// You are an expert real estate assistant. Extract relevant search parameters from the following natural language search prompt: "${searchTerm}".

// Return ONLY a valid JSON object using these keys (include them only if relevant):

// {
//   location: "city name or zip code (required)",
//   status_type: "ForSale | ForRent | RecentlySold",
//   home_type: "Houses, Apartments, Condos, Multi-family, Townhomes, Manufactured, LotsLand",
//   sort: "Homes_for_You, Price_High_Low, Price_Low_High, Newest, Bedrooms, Bathrooms, Square_Feet, Lot_Size",
//   minPrice: number,
//   maxPrice: number,
//   rentMinPrice: number,
//   rentMaxPrice: number,
//   bedsMin: number,
//   bedsMax: number,
//   bathsMin: number,
//   bathsMax: number,
//   sqftMin: number,
//   sqftMax: number,
//   buildYearMin: number,
//   buildYearMax: number,
//   lotSizeMin: string,
//   lotSizeMax: string,
//   keywords: string,
//   isWaterfront: true,
//   hasPool: true,
//   isCityView: true,
//   isMountainView: true,
//   isWaterView: true,
//   isParkView: true,
//   schools: "elementary, middle, high, public, private, charter",
//   schoolsRating: "1–10",
//   hasGarage: true,
//   parkingSpots: number,
//   isBasementFinished: 1,
//   isBasementUnfinished: 1,
//   isPendingUnderContract: 1,
//   isComingSoon: 1,
//   saleByAgent: false,
//   saleByOwner: true,
//   isNewConstruction: true
// }`;

//     const geminiResponse = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             parts: [{ text: geminiPrompt }]
//           }
//         ]
//       }
//     );

//     const raw = geminiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//     const parsedFilters = JSON.parse(raw || '{}');

//     if (!parsedFilters.location) {
//       return res.status(400).json({ message: "Gemini did not return a valid location" });
//     }

//     const queryParams = new URLSearchParams();
//     queryParams.append("location", parsedFilters.location);

//     const allowedParams = [
//       "status_type", "home_type", "sort", "minPrice", "maxPrice",
//       "rentMinPrice", "rentMaxPrice", "bathsMin", "bathsMax",
//       "bedsMin", "bedsMax", "sqftMin", "sqftMax", "buildYearMin",
//       "buildYearMax", "lotSizeMin", "lotSizeMax", "keywords",
//       "isWaterfront", "hasPool", "isCityView", "isMountainView",
//       "isWaterView", "isParkView", "schools", "schoolsRating",
//       "hasGarage", "parkingSpots", "isBasementFinished", "isBasementUnfinished",
//       "isPendingUnderContract", "isComingSoon", "saleByAgent", "saleByOwner",
//       "isNewConstruction"
//     ];

//     allowedParams.forEach((key) => {
//       if (parsedFilters[key] !== undefined && parsedFilters[key] !== "") {
//         queryParams.append(key, parsedFilters[key]);
//       }
//     });

//     // 2. Fetch listings from RapidAPI
//     const rapidApiResponse = await axios.get(
//       `https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?${queryParams.toString()}`,
//       {
//         headers: {
//           "X-RapidAPI-Key": RAPIDAPI_KEY,
//           "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com"
//         }
//       }
//     );

//     const listings = rapidApiResponse.data?.properties || [];
//     return res.status(200).json({ properties: listings });

//   } catch (error) {
//     console.error("Search error:", error?.response?.data || error.message);
//     return res.status(500).json({
//       message: "Search failed",
//       error: error?.response?.data || error.message
//     });
//   }
// };















// 1st attempt

// import Listing from "../models/listing.model.js";
// import { errorHandler } from "../utils/error.js";
// import axios from "axios";

// // Gemini free model endpoint and API key (replace YOUR_API_KEY with actual key)
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// // Function to query Gemini and extract structured search filters
// const extractSearchParamsFromPrompt = async (prompt) => {
//   const instruction = `
// You are an assistant that extracts structured real estate search filters from natural language input.

// Given a prompt like:
// "I want a 3BHK house near a good school with a pool and garden."

// Return a JSON object with keys:
// {
//   "status_type": "sale" | "rent",
//   "home_type": "apartment" | "house" | "villa" | etc,
//   "sort": "price" | "createdAt",
//   "minPrice": number,
//   "maxPrice": number,
//   "rentMinPrice": number,
//   "rentMaxPrice": number,
//   "bathsMin": number,
//   "bathsMax": number,
//   "bedsMin": number,
//   "bedsMax": number,
//   "sqftMin": number,
//   "sqftMax": number,
//   "keywords": string[],
//   "isWaterfront": boolean,
//   "hasPool": boolean,
//   "isCityView": boolean,
//   "isMountainView": boolean,
//   "isWaterView": boolean,
//   "isParkView": boolean,
//   "schools": boolean,
//   "hasGarage": boolean,
//   "parkingSpots": number
// }

// Only include values that are clearly mentioned in the prompt.
// `;

//   const requestBody = {
//     contents: [
//       {
//         role: "user",
//         parts: [
//           { text: instruction + "\n\nPrompt: " + prompt },
//         ],
//       },
//     ],
//   };

//   try {
//     const response = await axios.post(GEMINI_ENDPOINT, requestBody, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
//     const jsonMatch = rawText.match(/({[\s\S]*})/);
//     const jsonString = jsonMatch ? jsonMatch[1] : "{}";
//     return JSON.parse(jsonString);
//   } catch (err) {
//     console.error("Gemini extraction failed:", err.message);
//     return {};
//   }
// };

// // GET /listings route with Gemini search integration
// export const getListings = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const searchPrompt = req.query.prompt || req.query.searchTerm || "";

//     let filters = {};

//     if (searchPrompt) {
//       filters = await extractSearchParamsFromPrompt(searchPrompt);
//     }

//     const query = {};

//     if (filters.status_type) {
//       query.type = filters.status_type;
//     }

//     if (filters.minPrice || filters.maxPrice) {
//       query.regularPrice = {};
//       if (filters.minPrice) query.regularPrice.$gte = filters.minPrice;
//       if (filters.maxPrice) query.regularPrice.$lte = filters.maxPrice;
//     }

//     if (filters.bedsMin || filters.bedsMax) {
//       query.bedrooms = {};
//       if (filters.bedsMin) query.bedrooms.$gte = filters.bedsMin;
//       if (filters.bedsMax) query.bedrooms.$lte = filters.bedsMax;
//     }

//     if (filters.bathsMin || filters.bathsMax) {
//       query.bathrooms = {};
//       if (filters.bathsMin) query.bathrooms.$gte = filters.bathsMin;
//       if (filters.bathsMax) query.bathrooms.$lte = filters.bathsMax;
//     }

//     if (filters.sqftMin || filters.sqftMax) {
//       query.area = {};
//       if (filters.sqftMin) query.area.$gte = filters.sqftMin;
//       if (filters.sqftMax) query.area.$lte = filters.sqftMax;
//     }

//     if (filters.hasPool !== undefined) query.pool = filters.hasPool;
//     if (filters.schools !== undefined) query.nearbySchools = filters.schools;
//     if (filters.hasGarage !== undefined) query.garage = filters.hasGarage;
//     if (filters.parkingSpots) query.parking = { $gte: filters.parkingSpots };

//     if (filters.keywords?.length) {
//       query.description = {
//         $regex: filters.keywords.join("|"),
//         $options: "i",
//       };
//     }

//     const sortField = filters.sort || "createdAt";
//     const sortOrder = filters.order || "desc";

//     const listings = await Listing.find(query)
//       .sort({ [sortField]: sortOrder })
//       .skip(startIndex)
//       .limit(limit);

//     res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };

// // Other CRUD handlers unchanged below
// export const createListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.create(req.body);
//     return res.status(201).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) return next(errorHandler(404, "Listing not found"));

//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(403, "You can only delete your own listings"));
//   }

//   try {
//     await Listing.findByIdAndDelete(req.params.id);
//     res.status(200).json("Listing has been deleted!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) return next(errorHandler(404, "Listing not found"));

//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(403, "You can only update your own listings"));
//   }

//   try {
//     const updatedListing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) return next(errorHandler(404, "Listing not found!"));

//     res.status(200).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };



















// OG Code

import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found"));

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(403, "You can only delete your own listings"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found"));

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(403, "You can only update your own listings"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found!"));

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// export const getListings = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 9;

//     const startIndex = parseInt(req.query.startIndex) || 0;

//     let offer = req.query.offer;

//     if (offer === undefined || offer === "false") {
//       offer = { $in: [false, true] };
//     }

//     let furnished = req.query.furnished;

//     if (furnished === undefined || furnished === "false") {
//       furnished = { $in: [false, true] };
//     }

//     let parking = req.query.parking;

//     if (parking === undefined || parking === "false") {
//       parking = { $in: [false, true] };
//     }

//     let type = req.query.type;

//     if (type === undefined || type === "all") {
//       type = { $in: ["sale", "rent"] };
//     }

//     const searchTerm = req.query.searchTerm || "";

//     const sort = req.query.sort || "createdAt";

//     const order = req.query.order || "desc";

//     const listings = await Listing.find({
//       description: { $regex: searchTerm, $options: "i" },
//       offer,
//       furnished,
//       type,
//       parking,
//     })
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     return res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const searchFilters =
      searchTerm.trim() !== ""
        ? {
            $and: searchTerm
              .split(" ")
              .map((word) => ({ description: { $regex: word, $options: "i" } })),
          }
        : {};

    const listings = await Listing.find({
      ...searchFilters,
      offer,
      furnished,
      type,
      parking, 
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
