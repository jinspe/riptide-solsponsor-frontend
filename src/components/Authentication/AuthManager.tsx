import React, { ReactNode, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { doc, getDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { PublicKey } from '@solana/web3.js';
import SignMessage from 'services/Solana/Functions/SignMessage';

import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import SignoutWithWallet from 'services/Firebase/Authentication/SignoutWithWallet';
import { Imembership } from 'types/types';

import {
  FirebaseAuth,
  Firestore,
  FirebaseFunctions,
} from 'services/Firebase/FirebaseConfig';
import {
  userPublicKeyAtom,
  userDisplayNameAtom,
  userProfileImageAtom,
  userIsCreatorAtom,
  userMembershipsAtom,
} from 'services/Utils/Recoil/userInfo';

import {
  creatorUserNameAtom,
  creatorBioAtom,
  creatorDisplayNameAtom,
  creatorProfileImageAtom,
  creatorCoverImageAtom,
  creatorTierImageAtom,
  creatorTierPriceAtom,
  creatorTierTitleAtom,
  creatorTierDescriptionAtom,
} from 'services/Utils/Recoil/creatorInfo';

import { loginStepAtom, loadingAppAtom } from 'services/Utils/Recoil/appState';

interface IwalletPropForSignin {
  uid: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

export interface ImessageToSign {
  uid: string;
  message: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

export default function AuthManager({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { publicKey, signMessage, disconnect, connected } = useWallet();
  const [userPublicKey, setUserPublickey] = useRecoilState(userPublicKeyAtom);
  const [, setDisplayName] = useRecoilState(userDisplayNameAtom);
  const [, setProfileImage] = useRecoilState(userProfileImageAtom);
  const [, setUserIsCreator] = useRecoilState(userIsCreatorAtom);
  const [, setUserMemberships] = useRecoilState(userMembershipsAtom);

  const [, setCreatorUserNameRecoil] = useRecoilState(creatorUserNameAtom);
  const [, setCreatorBioRecoil] = useRecoilState(creatorBioAtom);
  const [, setCreatorDisplayNameRecoil] = useRecoilState(
    creatorDisplayNameAtom
  );
  const [, setCreatorProfileImageRecoil] = useRecoilState(
    creatorProfileImageAtom
  );
  const [, setCreatorCoverImageRecoil] = useRecoilState(creatorCoverImageAtom);

  const [, setCreatorTierImageRecoil] = useRecoilState(creatorTierImageAtom);
  const [, setCreatorTierPriceRecoil] = useRecoilState(creatorTierPriceAtom);
  const [, setCreatorTierTitleRecoil] = useRecoilState(creatorTierTitleAtom);
  const [, setCreatorTierDescriptionRecoil] = useRecoilState(
    creatorTierDescriptionAtom
  );

  const [, setLoginStep] = useRecoilState(loginStepAtom);
  const [, setLoadingApp] = useRecoilState(loadingAppAtom);

  async function SignMessageForServer(
    messageToSign: ImessageToSign
  ): Promise<void> {
    const userSignin = httpsCallable(
      FirebaseFunctions,
      'authentication-userSignin'
    );
    setLoginStep('sign');
    const signatures = await SignMessage(messageToSign);
    setLoginStep('verify');
    const result: any = await userSignin(signatures);
    if (result.data.customToken !== undefined) {
      await signInWithCustomToken(FirebaseAuth, result.data.customToken);
      setLoginStep('authed');
      toast.success('You are signed in');
    } else {
      // should never happen
      throw new Error(`Failed to request customToken`);
    }
  }

  async function SigninWithWalletProcess(walletProp: IwalletPropForSignin) {
    const userCheckin = httpsCallable(
      FirebaseFunctions,
      'authentication-userCheckIn'
    );
    const result: any = await userCheckin({ uid: walletProp.uid });
    if (result.data.message !== undefined) {
      await SignMessageForServer({
        uid: walletProp.uid,
        message: result.data.message,
        publicKey: walletProp.publicKey,
        signMessage: walletProp.signMessage,
      });
    } else {
      throw new Error('Failed to retrieve CustomToken');
    }
  }

  async function SigninWithWallet(
    walletProp: IwalletPropForSignin
  ): Promise<void> {
    const user = FirebaseAuth.currentUser;
    if (user) {
      if (user.uid !== walletProp.uid) {
        await FirebaseAuth.signOut();
        await SigninWithWalletProcess(walletProp);
      }
    } else {
      await SigninWithWalletProcess(walletProp);
    }
  }

  async function trySigninWithWallet() {
    if (connected && publicKey) {
      try {
        setLoginStep('receiving');
        await SigninWithWallet({
          uid: publicKey.toString(),
          publicKey,
          signMessage,
        });
      } catch (error: any) {
        setLoginStep('not');
        toast.error(`Couldn't Signin: ${error?.message}`);
        if (disconnect) await disconnect();
      }
    }
  }

  useEffect(() => {
    trySigninWithWallet();
  }, [connected]);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (user) {
        if (user.uid !== userPublicKey) {
          try {
            const userRef = doc(Firestore, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
              setDisplayName(userDoc.data().displayName);
              setProfileImage(userDoc.data().profileImage);
              const userTokens =
                await FirebaseAuth.currentUser?.getIdTokenResult();
              const claims = userTokens?.claims;
              const memberships: Imembership[] = [];
              if (claims !== undefined) {
                Object.keys(claims).forEach((key) => {
                  if (key.length === 44) {
                    memberships.push({
                      cId: key,
                      expiration: String(claims[key]),
                    });
                  }
                });
              }
              setUserMemberships(memberships);
              setUserIsCreator(userDoc.data().isCreator);
              if (userDoc.data().isCreator) {
                const creatorRef = doc(Firestore, 'creators', user.uid);
                const creatorDoc = await getDoc(creatorRef);
                if (creatorDoc.exists()) {
                  setCreatorUserNameRecoil(creatorDoc.data().userName);
                  setCreatorBioRecoil(creatorDoc.data().bio);
                  setCreatorDisplayNameRecoil(creatorDoc.data().displayName);
                  setCreatorProfileImageRecoil(creatorDoc.data().profileImage);
                  setCreatorCoverImageRecoil(creatorDoc.data().coverImage);

                  setCreatorTierImageRecoil(creatorDoc.data().tierImage);
                  setCreatorTierPriceRecoil(creatorDoc.data().tierPrice);
                  setCreatorTierTitleRecoil(creatorDoc.data().tierTitle);
                  setCreatorTierDescriptionRecoil(
                    creatorDoc.data().tierDescription
                  );
                }
              }
            } else {
              throw new Error('User information not found');
            }
            setUserPublickey(user.uid);
          } catch (error: any) {
            toast.error(error?.message);
            try {
              await SignoutWithWallet({ disconnect, connected });
            } catch (errorSignout: any) {
              toast.error(errorSignout?.message);
            }
          }
        }
      } else {
        setUserPublickey(undefined);
        setDisplayName(undefined);
        setProfileImage(undefined);
        setUserIsCreator(false);
      }
      setLoadingApp(false);
    });
  }, []);

  return <div>{children}</div>;
}
