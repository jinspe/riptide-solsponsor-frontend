import React from 'react';

import DiscordLogo from 'style/Assets/SocialLogos/discord.png';
import TwitterLogo from 'style/Assets/SocialLogos/twitter.png';
import GithubLogo from 'style/Assets/SocialLogos/github.png';
import FacebookLogo from 'style/Assets/SocialLogos/facebook.png';
import LinkedInLogo from 'style/Assets/SocialLogos/linkedin.png';
import InstagramLogo from 'style/Assets/SocialLogos/instagram.png';

export default function SocialSettings(): JSX.Element {
  const socialConnect = [
    { name: 'Discord', logo: DiscordLogo },
    { name: 'Twitter', logo: TwitterLogo },
    { name: 'Github', logo: GithubLogo },
    { name: 'Facebook', logo: FacebookLogo },
    { name: 'Linkedin', logo: LinkedInLogo },
    { name: 'Instagram', logo: InstagramLogo },
  ];
  return (
    <div className="space-y-6 mt-5">
      <div className=" max-w-3xl mx-auto">
        <div className=" space-y-6 ">
          <div
            className="bg-neutral-100 dark:bg-neutral-800 max-w-2xl mx-auto 
          shadow-sm
         border border-neutral-300 dark:border-neutral-600 
        px-4 py-5 rounded-lg sm:p-6">
            <div className="mx-auto max-w-md">
              {/* Title */}
              <div className="">
                <h3
                  className="text-lg text-center 
                font-medium leading-6 bc-text-color">
                  Link and verify your other social media
                </h3>
                <p
                  className="mt-1 text-sm  text-center 
                text-neutral-500">
                  Verify your social media accounts and <br /> let your
                  supporters know that it is really you.
                </p>
              </div>
              <div
                className="max-w-xs mx-auto space-y-3 divide-y 
              divide-neutral-500 mt-5">
                {socialConnect.map((social) => (
                  <div key={social.name}>
                    <p
                      className="text-center mt-2 text-black
                     dark:text-neutral-100 font-semibold">
                      {' '}
                      Coming Soon!
                    </p>
                    <div
                      className=" items-center grid grid-cols-3 px-2 pt-1 pn-3
                    opacity-30">
                      <div className="col-span-2 flex items-center">
                        <img
                          src={social.logo}
                          alt="youtubeLogo"
                          className="rounded-full  h-10"
                        />
                        <p
                          className="ml-5 font-bold text-black 
                  dark:text-neutral-100 w-24">
                          {social.name}
                        </p>
                      </div>
                      <div className="col-span-1 flex  justify-end">
                        <button
                          type="button"
                          className=" button-action h-7 text-sm "
                          disabled>
                          <p className="text-sm mx-auto">Connect</p>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
