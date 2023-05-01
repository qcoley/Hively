import { atom } from "recoil";
import { Budget } from "../types/Budget";

export const budgetAtom = atom({
  key: "budgetAtom",
  default: {} as Budget,
});
