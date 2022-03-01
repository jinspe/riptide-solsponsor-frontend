import { FirebaseAuth } from '../FirebaseConfig';

interface IsignoutWithWallet {
  disconnect: () => Promise<void>;
  connected: boolean;
}

export default async function SignoutWithWallet({
  disconnect,
  connected,
}: IsignoutWithWallet): Promise<void> {
  if (connected) {
    if (!disconnect) throw new Error('Wallet does not support disconnect!');

    await disconnect();
  }
  await FirebaseAuth.signOut();
}
