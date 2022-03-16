import { ImessageToSign } from 'types/types';

interface IsignedMessage {
  uid: string;
  encodedMessage: Uint8Array;
  signature: Uint8Array | undefined;
  publicKeyBytes: Uint8Array | undefined;
}

export default async function SignMessage(
  messageToSign: ImessageToSign
): Promise<IsignedMessage> {
  if (!messageToSign.publicKey) throw new Error('Wallet not connected!');
  if (!messageToSign.signMessage)
    throw new Error('Wallet does not support message signing!');

  const encodedMessage = new TextEncoder().encode(messageToSign.message);
  const signature = await messageToSign.signMessage(encodedMessage);

  return {
    uid: messageToSign.uid,
    encodedMessage,
    signature,
    publicKeyBytes: messageToSign.publicKey.toBytes(),
  };
}
