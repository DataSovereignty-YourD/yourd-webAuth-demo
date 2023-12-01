import { atom, selector } from "recoil";

export type loginType = {
  state: boolean,
  did:string
  access_token:string;
}

export const loginState = atom<loginType>({
  key: "loginState",
  default: {
    state:true,
    did:'',
    access_token:'',
  },
});

export const loginValue = selector<loginType>({
  key: "loginValue",
  get: ({ get }) => {
    const value = get(loginState);
    return value;
  },
});