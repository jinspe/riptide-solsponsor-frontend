import React from 'react';

import { TwitterIcon, DiscordIcon } from 'style/Assets/SocialIcons';

const socialFeatures = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/solsponsor',
    icon: TwitterIcon,
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/SYF93dFfE9',
    icon: DiscordIcon,
  },
];

export default function SocialSection(): JSX.Element {
  return (
    <div>
      <div className=" max-w-max mx-auto">
        <h2
          className="text-center text-3xl leading-8 font-extrabold tracking-tight 
        text-primary sm:text-4xl">
          Contact
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-secondary">
          Contact us on other social medias if you would like to use this
          platform, get the latest news or join the development effort. Thank
          you!
        </p>
      </div>
      <div className=" mt-8">
        <div className=" flex justify-center items-center gap-14">
          {socialFeatures.map((item) => (
            <a
              key={item.name}
              className="text-neutral-link transform rounded-full 
              button-action
              p-4
              ease-in-out duration-500
              hover:scale-125"
              href={item.href}
              rel="noreferrer"
              target="_blank">
              <span className="sr-only">{item.name}</span>
              <div className="h-10 w-10">{item.icon}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
