import Banner from '@/components/Banner';
import FeaturedEvents from '@/components/FeaturedEvents';
import UpcomingEvents from '@/components/UpcomingEvents';
import HowItWorks from '@/components/HowItWorks';
import StatsCounter from '@/components/StatsCounter';
import TrustedBy from '@/components/TrustedBy';
import PlatformFeatures from '@/components/PlatformFeatures';
import EventCategories from '@/components/EventCategories';
import UserTestimonials from '@/components/UserTestimonials';
import CallToAction from '@/components/CallToAction';
import React from 'react';

const page = () => {
  return (
    <div>
      <Banner />
      <FeaturedEvents />
      <UpcomingEvents />
      <HowItWorks />
      <StatsCounter />
      <TrustedBy />
      <UserTestimonials />
      <PlatformFeatures />
      <EventCategories />
      <CallToAction />
    </div>
  );
};

export default page;
