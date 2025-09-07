import React, { useEffect, useState } from 'react';
import Backgound from '../component/Backgound';
import Hero from '../component/Hero';
import Product from './Product';
import OurPolicy from '../component/OurPolicy';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" }
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setHeroCount(prev => (prev === heroData.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 500); // fade duration
    }, 4000); // slider interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='overflow-x-hidden relative top-[70px]'>
      {/* Hero Section */}
      <div className='w-[100vw] lg:h-[100vh] md:h-[60vh] sm:h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] relative'>
        <Backgound heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
          fade={fade}
        />
      </div>

      {/* Products Section */}
      <div className='py-[60px] lg:py-[100px] bg-[#0c2025]'>
        <Product />
      </div>

      {/* Policy Section */}
      <div className='py-[40px] lg:py-[80px] bg-[#141414]'>
        <OurPolicy />
      </div>

      {/* Newsletter Section */}
      <div className='py-[40px] lg:py-[80px] bg-[#0c2025]'>
        <NewLetterBox />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
