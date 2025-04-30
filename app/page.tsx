'use client'
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
import React, { useState, useEffect } from 'react';
import Loading from './loading';
 
const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
     setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

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

export default Page;
