import React from 'react';

import DemoSection from './DemoSection';
import SocialSection from './SocialSection';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';

export default function LandingPage(): JSX.Element {
  return (
    <div className="h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className=" mx-auto p-5 -mt-24 bg-neutral-100 dark:bg-neutral-900">
        <div className="pt-20 max-w-7xl mx-auto">
          <HeroSection />
        </div>
        <div className="mt-20">
          <FeatureSection />
        </div>
        <div className="mt-20">
          <DemoSection />
        </div>
        <div className="mt-20 mb-20">
          <SocialSection />
        </div>
      </div>
    </div>
  );
}
