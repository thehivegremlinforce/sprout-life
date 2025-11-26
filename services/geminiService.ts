import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInput, GardenPlanResponse, UnitSystem } from "../types";

const gardenPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    cropName: { 
      type: Type.STRING, 
      description: "The name of the crop(s). If multiple crops are requested, combine them (e.g. 'Tomatoes & Basil')." 
    },
    locationName: {
      type: Type.STRING,
      description: "The inferred city, suburb, or region name derived from the postcode."
    },
    hemisphere: { 
      type: Type.STRING, 
      description: "The hemisphere direction ONLY, e.g. 'Southern' or 'Northern'. Do not include the word 'Hemisphere'." 
    },
    overview: {
      type: Type.OBJECT,
      properties: {
        description: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        bestSeason: { type: Type.STRING },
      },
      required: ["description", "difficulty", "bestSeason"]
    },
    planting: {
      type: Type.OBJECT,
      properties: {
        window: { type: Type.STRING },
        indoorStart: { type: Type.BOOLEAN },
        germinationTemp: { type: Type.STRING },
        germinationDays: { type: Type.STRING },
        harvestRange: { type: Type.STRING },
        notes: { type: Type.STRING },
      },
      required: ["window", "indoorStart", "germinationTemp", "harvestRange"]
    },
    sun: {
      type: Type.OBJECT,
      properties: {
        required: { type: Type.STRING },
        orientationSuitability: { type: Type.STRING },
        fixes: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["required", "orientationSuitability", "fixes"]
    },
    water: {
      type: Type.OBJECT,
      properties: {
        rainfallTrends: { type: Type.STRING },
        dailyRequirement: { type: Type.STRING, description: "e.g., '2.5 Litres' or '0.6 Gallons'" },
        soilAdjustments: { type: Type.STRING },
        sprinklerAnalysis: { type: Type.ARRAY, items: { type: Type.STRING } },
        manualWateringNeeded: { type: Type.BOOLEAN },
        warning: { type: Type.STRING },
        monthlyWaterNeeds: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              month: { type: Type.STRING },
              amount: { type: Type.NUMBER, description: "Relative unit (0-100) for chart" }
            }
          }
        }
      },
      required: ["rainfallTrends", "dailyRequirement", "sprinklerAnalysis", "monthlyWaterNeeds"]
    },
    soil: {
      type: Type.OBJECT,
      properties: {
        prepInstructions: { type: Type.STRING },
        amendments: { type: Type.ARRAY, items: { type: Type.STRING } },
        fertilizerTimeline: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stage: { type: Type.STRING },
              action: { type: Type.STRING }
            }
          }
        }
      },
      required: ["prepInstructions", "amendments", "fertilizerTimeline"]
    },
    companions: {
      type: Type.OBJECT,
      properties: {
        good: { type: Type.ARRAY, items: { type: Type.STRING } },
        bad: { type: Type.ARRAY, items: { type: Type.STRING } },
        benefits: { type: Type.STRING },
      },
      required: ["good", "bad", "benefits"]
    },
    spacing: {
      type: Type.OBJECT,
      properties: {
        seedDepth: { type: Type.STRING },
        plantSpacing: { type: Type.STRING },
        rowSpacing: { type: Type.STRING },
        thinning: { type: Type.STRING },
      },
      required: ["seedDepth", "plantSpacing", "rowSpacing"]
    },
    pests: {
      type: Type.OBJECT,
      properties: {
        likelyPests: { type: Type.ARRAY, items: { type: Type.STRING } },
        signs: { type: Type.ARRAY, items: { type: Type.STRING } },
        prevention: { type: Type.STRING },
      },
      required: ["likelyPests", "signs", "prevention"]
    },
    yield: {
      type: Type.OBJECT,
      properties: {
        hardening: { type: Type.STRING },
        pruning: { type: Type.STRING },
        commonMistakes: { type: Type.STRING },
      },
      required: ["hardening", "pruning", "commonMistakes"]
    },
    motivationalMessage: {
      type: Type.STRING,
      description: "A short, encouraging message to inspire the gardener."
    }
  },
  required: ["cropName", "locationName", "hemisphere", "overview", "planting", "sun", "water", "soil", "companions", "spacing", "pests", "yield", "motivationalMessage"]
};

export const generatePlan = async (input: UserInput): Promise<GardenPlanResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const dateFormatInstruction = input.units === UnitSystem.METRIC 
    ? "DD/MM/YYYY" 
    : "MM/DD/YYYY";

  const prompt = `
    You are SproutLife, an expert horticulture and garden planning assistant.
    Generate a detailed garden plan based on the following user inputs.
    
    User Inputs:
    - Postcode/Location Context: ${input.postcode} (Use this to infer hemisphere, season, climate, pests, and sun path. Also infer the likely Suburb or City name. ACCURACY WARNING: Ensure the suburb matches the postcode precisely. e.g. 3429 is Sunbury, not Gisborne. If exact suburb is uncertain, use the broader Region or State.)
    - Garden Bed Orientation: ${input.bedOrientation}
    - Sunlight Exposure: ${input.sunlightHours} hours per day
    - Current Date: ${input.currentDate}
    - Goal: ${input.targetDateType} date of ${input.targetDate}
    - Soil Type: ${input.soilType}
    - Crops Request: "${input.crop}"
    - Unit System: ${input.units}
    - Sprinkler Setup: ${JSON.stringify(input.sprinklers)}
    - Manual Watering Setup: ${input.wateringCan.enabled 
        ? `Has a ${input.wateringCan.capacity} ${input.units === 'Metric' ? 'Litre' : 'Gallon'} watering can. Plans to use it ${input.wateringCan.frequency} times per ${input.wateringCan.period}.` 
        : "No manual watering can info provided."}

    CRITICAL INSTRUCTION FOR MULTIPLE CROPS:
    The user may have entered multiple crops (e.g., "Apples, Garlic" or "Tomatoes and Basil").
    If multiple crops are detected, you MUST:
    1. Set the 'cropName' field to include ALL names (e.g., "Apples & Garlic").
    2. In EVERY textual field (planting windows, spacing, care instructions, pests), you MUST provide details for EACH crop.
       Use a format like:
       "Apples: Winter planting is best...
        Garlic: Plant in late Autumn..."
    3. Do NOT generate a plan for just the first crop. The user wants a combined reference guide.

    GENERAL INSTRUCTIONS:
    1. Infer the hemisphere and season based on the postcode and date. Return ONLY "Southern" or "Northern" for the hemisphere field.
    2. Infer the location name (Suburb/City) from the postcode. Be precise.
    3. DATE FORMAT: Display ALL dates in the response using the format ${dateFormatInstruction}.
    4. Calculate specific watering needs. Calculate sprinkler duration from start/end times. Determine if the setup is sufficient, excessive, or needs manual supplementation.
    5. Incorporate the Manual Watering info (if enabled) into the Water Plan analysis.
    6. Adjust advice based on Soil Type (e.g., clay holds water, sandy drains fast, veggie mix is balanced).
    7. Provide specific spacing in ${input.units}.
    8. Return strict JSON matching the schema provided.
    9. Tone: Friendly, encouraging, practical.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: gardenPlanSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GardenPlanResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};