import { atom } from "recoil";
import { Aperture } from "../types/Aperture";
import { Appliance } from "../types/Appliance";

export const appliancesAtom = atom({
  key: "appliancesAtom",
  default: [] as Appliance[],
});

export const aperturesAtom = atom({
  key: "apertures",
  default: [] as Aperture[],
});
