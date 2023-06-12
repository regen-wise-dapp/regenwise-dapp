import HomePageBanner from '@src/components/home/HomePageBanner';
import NFTMarketPlace from '@src/components/home/NFTMarketPlace';
import ProjectFeatures from '@src/components/home/ProjectFeatures';
import ProjectScope from '@src/components/home/ProjectScope';

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

