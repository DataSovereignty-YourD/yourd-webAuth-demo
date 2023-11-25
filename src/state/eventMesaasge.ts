import { atom, selector } from "recoil";

export const eventMeassgeTransactionState = atom({
  key: "eventMeassgeTransactionState",
  default: '',
});

export const eventMeassgeTransactionValue = selector({
  key: "eventMeassgeTransactionValue",
  get: ({ get }) => {
    const value = get(eventMeassgeTransactionState);
    return value;
  },
});