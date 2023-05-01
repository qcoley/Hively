import { atom } from "recoil";
import { Event } from "../types/Event";

export const eventsAtom = atom({
  key: "eventsAtom",
  default: [] as Event[],
});
