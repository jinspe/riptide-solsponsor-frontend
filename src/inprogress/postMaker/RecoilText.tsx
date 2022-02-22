import { atom } from 'recoil';

export const textCk = atom<string>({
  key: 'userPublicKey',
  default: '',
});
