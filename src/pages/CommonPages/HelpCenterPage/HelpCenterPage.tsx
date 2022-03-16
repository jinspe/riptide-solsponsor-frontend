import React from 'react';

import DemoSection from 'pages/HomePages/LandingPage/DemoSection';
import SocialSection from 'pages/HomePages/LandingPage/SocialSection';
import FeatureSection from 'pages/HomePages/LandingPage/FeatureSection';

export default function HelpCenterPage(): JSX.Element {
  return (
    <div className="h-screen border border-transparent bg-neutral-100 dark:bg-neutral-900">
      <div className=" mx-auto p-5 -mt-24 bg-neutral-100 dark:bg-neutral-900">
        <div className="mt-28">
          <DemoSection />
        </div>
        <div className="mt-32 mb-20">
          <SocialSection />
        </div>
        <div className="mt-32 mb-20">
          <FeatureSection />
        </div>
      </div>
    </div>
  );
}
