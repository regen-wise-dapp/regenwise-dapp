import dynamic from 'next/dynamic';
import HomePageBanner from '../components/home/HomePageBanner';
import ProjectFeatures from '../components/home/ProjectFeatures';
import ProjectScope from '../components/home/ProjectScope';
import NFTMarketPlace from '../components/home/NFTMarketPlace';

export default function Home() {
  return (
    <main>
      <HomePageBanner />
      <ProjectFeatures />
      <ProjectScope />
      <NFTMarketPlace />
    </main>
  );
}

