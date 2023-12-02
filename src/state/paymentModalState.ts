// src/state/cart.ts
import { atom } from 'recoil';
import { ProductDetails } from './product'; // ProductDetails 타입 임포트

export const paymentModalState = atom({ // 타입 지정
  key: 'paymentModalState',
  default: false, // 초기 상태는 빈 배열
});
