import { atom, selector } from "recoil";

export type loginType = {
  state: boolean,
  did:string
}

export const loginState = atom<loginType>({
  key: "loginState",
  default: {
    state:false,
    did:'',
  },
});

export const loginValue = selector<loginType>({
  key: "loginValue",
  get: ({ get }) => {
    const value = get(loginState);
    return value;
  },
});
