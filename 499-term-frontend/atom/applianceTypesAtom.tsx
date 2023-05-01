import { atom } from "recoil";

export const applianceTypesAtom = atom({
  key: "applianceTypesAtom",
  default: {
    1: {
      id: 1,
      title: "light",
      wattage: 1,
      gallons: 0,
    },
    2: {
      id: 2,
      title: "tv",
      wattage: 10.6,
      gallons: 0,
    },
    3: {
      id: 3,
      title: "fan",
      wattage: 0.5,
      gallons: 0,
    },
    4: {
      id: 4,
      title: "stove",
      wattage: 58.33,
      gallons: 0,
    },
    5: {
      id: 5,
      title: "oven",
      wattage: 66.66,
      gallons: 0,
    },
    6: {
      id: 6,
      title: "microwave",
      wattage: 18.33,
      gallons: 0,
    },
    7: {
      id: 7,
      title: "refrigerator",
      wattage: 2.5,
      gallons: 0,
    },
    8: {
      id: 8,
      title: "water heater",
      wattage: 75,
      gallons: 0,
    },
    9: {
      id: 9,
      title: "hvac",
      wattage: 58.33,
      gallons: 0,
    },
    10: {
      id: 10,
      title: "tap",
      wattage: 0,
      gallons: 1.25,
    },
    11: {
      id: 11,
      title: "shower",
      wattage: 0,
      gallons: 1.25,
    },
    12: {
      id: 12,
      title: "bath",
      wattage: 0,
      gallons: 1.5,
    },
    13: {
      id: 13,
      title: "washer",
      wattage: 16.66,
      gallons: 0.66,
    },
    14: {
      id: 14,
      title: "dryer",
      wattage: 100,
      gallons: 0,
    },
    15: {
      id: 15,
      title: "dishwasher",
      wattage: 40,
      gallons: 0.13,
    },
  },
});
