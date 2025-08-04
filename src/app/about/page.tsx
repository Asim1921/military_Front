// src/app/about/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutHero } from '@/components/about/about-hero';
import { AboutUsSection } from '@/components/about/about-us-section';
import { MissionSection } from '@/components/about/mission-section';
import { VeteransProgramSection } from '@/components/about/veterans-program-section';
import { ValuesSection } from '@/components/about/values-section';
import { TeamSection } from '@/components/about/team-section';

export default function AboutPage() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section');

  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [section]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <AboutHero />
      
      <div id="about" className="scroll-mt-20">
        <AboutUsSection />
      </div>
      
      <div id="mission" className="scroll-mt-20">
        <MissionSection />
      </div>
      
      <div id="veterans" className="scroll-mt-20">
        {/* <VeteransProgramSection /> */}
      </div>
      
      <ValuesSection />
      <TeamSection />
      
      <Footer />
    </div>
  );
}