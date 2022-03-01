import { atom } from 'recoil';

export type TloginStep = 'not' | 'receiving' | 'sign' | 'verify' | 'authed';

export const loginStepAtom = atom<TloginStep>({
  key: 'loginStep',
  default: 'not',
});

export const loadingAppAtom = atom<boolean>({
  key: 'loadingApp',
  default: true,
});
