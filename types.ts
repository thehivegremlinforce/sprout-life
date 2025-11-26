
export enum UnitSystem {
  METRIC = 'Metric',
  IMPERIAL = 'Imperial',
}

export enum SoilType {
  CLAY = 'Clay',
  SAND = 'Sand',
  LOAMY = 'Loamy',
  SILT = 'Silt',
  VEGGIE_MIX = 'Veggie Mix',
  PREMIUM_POTTING_MIX = 'Premium Potting Mix',
  POTTING_MIX = 'Potting Mix',
  ORCHID_MIX = 'Orchids Mix',
  PEAT = 'Peat',
  CHALKY = 'Chalky',
}

export enum Orientation {
  NORTH = 'North',
  SOUTH = 'South',
  EAST = 'East',
  WEST = 'West',
}

export interface SprinklerConfig {
  id: number;
  enabled: boolean;
  flowRate: number; // L/min or gal/min
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
}

export interface WateringCanConfig {
  enabled: boolean;
  capacity: number; // L or Gal
  frequency: number; // times
  period: 'day' | 'week';
}

export interface UserInput {
  postcode: string;
  bedOrientation: Orientation;
  currentDate: string;
  targetDateType: 'planting' | 'harvest';
  targetDate: string;
  soilType: SoilType;
  crop: string;
  units: UnitSystem;
  sprinklers: SprinklerConfig[];
  wateringCan: WateringCanConfig;
  sunlightHours: number;
}

// AI Response Schema Types
export interface PlanOverview {
  description: string;
  difficulty: string; // "Easy", "Medium", "Hard"
  bestSeason: string;
}

export interface PlantingGuide {
  window: string;
  indoorStart: boolean;
  germinationTemp: string;
  germinationDays: string;
  harvestRange: string;
  notes: string;
}

export interface SunCheck {
  required: string;
  orientationSuitability: string;
  fixes: string[];
}

export interface WaterPlan {
  rainfallTrends: string;
  dailyRequirement: string;
  soilAdjustments: string;
  sprinklerAnalysis: string[];
  manualWateringNeeded: boolean;
  warning: string;
  monthlyWaterNeeds: { month: string; amount: number }[]; // For visualization
}

export interface SoilGuide {
  prepInstructions: string;
  amendments: string[];
  fertilizerTimeline: { stage: string; action: string }[];
}

export interface CompanionMap {
  good: string[];
  bad: string[];
  benefits: string;
}

export interface Spacing {
  seedDepth: string;
  plantSpacing: string;
  rowSpacing: string;
  thinning: string;
}

export interface PestForecast {
  likelyPests: string[];
  signs: string[];
  prevention: string;
}

export interface YieldTips {
  hardening: string;
  pruning: string;
  commonMistakes: string;
}

export interface GardenPlanResponse {
  cropName: string;
  locationName: string; // Inferred suburb/city
  hemisphere: string;
  overview: PlanOverview;
  planting: PlantingGuide;
  sun: SunCheck;
  water: WaterPlan;
  soil: SoilGuide;
  companions: CompanionMap;
  spacing: Spacing;
  pests: PestForecast;
  yield: YieldTips;
  motivationalMessage: string;
}
