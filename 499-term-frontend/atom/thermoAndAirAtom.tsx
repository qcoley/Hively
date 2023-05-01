import { atom } from "recoil";
import { Thermostat } from "../types/Thermostat";
import { AirQuality } from "../types/AirQuality";

export const thermostatAtom = atom({
  key: "thermostatAtom",
  default: {
    current_temp: 72,
    target_temp: 72,
  } as Thermostat,
});

export const airQualityAtom = atom({
  key: "airQualityAtom",
  default: {} as AirQuality,
});
