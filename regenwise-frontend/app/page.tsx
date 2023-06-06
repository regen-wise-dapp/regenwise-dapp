'use client';
import ProjectFeatures from './components/ProjectFeatures';
import HomePageBanner from './components/HomePageBanner';
import NFTMarketPlace from './components/NFTMarketPlace';
import ProjectScope from './components/ProjectScope';

export default function Home() {
  return (
    <main>
      {/* <HomePageBanner /> */}
      <ProjectFeatures />
      <ProjectScope />
      <NFTMarketPlace />
    </main>
  );
}