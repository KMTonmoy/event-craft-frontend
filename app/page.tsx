'use client';
import React, { useState, useEffect } from 'react';

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
import Loading from './loading';

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <main className="space-y-5 bg-white">
      {/* Hero Banner */}
      <section>
        <Banner />
      </section>

      {/* Stats Counter */}
      <section>
        <div >
          <StatsCounter />
        </div>
      </section>

      {/* Featured Events */}
      <section>
        <div >
          <FeaturedEvents />
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <div >
          <UpcomingEvents />
        </div>
      </section>

      {/* How It Works */}
      <section>
        <div >
          <HowItWorks />
        </div>
      </section>

      {/* User Testimonials */}
      <section>
        <div >
          <UserTestimonials />
        </div>
      </section>

      {/* Platform Features */}
      <section>
        <div >
          <PlatformFeatures />
        </div>
      </section>

      {/* Trusted By Section */}
      <section>
        <div >
          <TrustedBy />
        </div>
      </section>

      {/* Event Categories */}
      <section>
        <div >
          <EventCategories />
        </div>
      </section>

      {/* Call To Action */}
      <section>
        <div >
          <CallToAction />
        </div>
      </section>
    </main>
  );
};

export default Page;
