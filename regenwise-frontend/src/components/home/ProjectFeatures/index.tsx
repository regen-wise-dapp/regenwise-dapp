import dynamic from 'next/dynamic';
import HomePageLayout from '../../shared/HomePageLayout';

const ContentArea = dynamic(() => import('./ContentArea'));
const BoxGorupArea = dynamic(() => import('./BoxGorupArea'));

export default function ProjectFeatures() {
  return (
    <HomePageLayout theme="light">
      <div className="flex flex-col xl:flex-row items-center">
        <ContentArea />
        <BoxGorupArea />
      </div>
    </HomePageLayout>
  );
}
