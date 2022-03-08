import React, { createRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';

import { useRecoilState } from 'recoil';
import QRCode from 'react-qr-code';

import MemberCard from 'components/Creators/Membership/MemberCard';
import { defaultTierImage } from 'components/Common/Util/DefaultValues';

export default function CreatorHomePage(): JSX.Element {
  const title =
    'This is my mega super title rtrurur This is my mega super title rtrurur';
  const userName = 'FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ';
  const expiration = 'XX/XX/XXXX';
  const creatorKey = 'FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ';
  const [urrr, setUrr] = useState('');
  const [urrb, setUrb] = useState('');
  const [blobb, setblobb] = useState<Blob | undefined>();

  const onCapture = async () => {
    /*  const cc = await fetch(defaultTierImage);
    console.log(cc); */
    const node = document.getElementById('popo');
    if (node) {
      htmlToImage
        .toPng(node, {
          canvasWidth: 960,
          canvasHeight: 1440,
        })
        .then(async (dataUrl) => {
          const img = new Image();
          // console.log(dataUrl);
          img.src = dataUrl;
          setUrr(dataUrl);
          await fetch(dataUrl).then(async (res) => {
            const cunt = await res.blob();
            setblobb(cunt);

            setUrb(URL.createObjectURL(cunt));
          });
        });
    }
  };
  return (
    <div className="pageFrame">
      <div>
        <div className=" flex">
          <div className=" mx-auto">
            <MemberCard
              title={title}
              image={defaultTierImage}
              userName={userName}
              displayName={userName}
              expiration={expiration}
              creatorKey={creatorKey}
              minterKey={creatorKey}
              idx="popo"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="button-action mt-32"
        onClick={() => onCapture()}>
        saaa
      </button>
      <div className="">
        <img src={urrr} className=" mx-auto " alt="urr" />
      </div>
      <div className="mt-5">
        <img src={urrb} className=" mx-auto " alt="urrb" />
      </div>
    </div>
  );
}
