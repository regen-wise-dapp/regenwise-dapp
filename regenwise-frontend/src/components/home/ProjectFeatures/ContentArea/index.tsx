import SectionHeader from '@/components/shared/SectionHeader';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';


export default function ContentArea() {
  const router = useRouter();
  return (
    <div className="mt-5 flex flex-col max-w-[600px] w-full items-center justify-center" id='main-page--content-element'>
      <SectionHeader
        title="About This Platform"
        subtitle="For those eager to learn and make a meaningful contribution, this platform provides a diverse range of resources to delve into the concept and effort of regeneration."
      />
      <h2 className="text-center">Overcoming Degradation via Regeneration</h2>
      <p className="text-center"  >
        {`Human actions have caused significant environmental degradation and serious harm to the inhabitants, now it is crucial for us to contribute 
        to the process of regeneration. "Regeneration" in our context is a term used to describe the restoration and responsible management of environmental 
        systems. Our regen (the short form of the word regeneration) web platform aims to facilitate this contribution by offering various services and resources to users. The 
        platform's two main database collections on regen concepts and regen projects serve as the primary features, connecting it to the world of data analytics and trustworthy web 3 database technologies. 
        The platform's NFT markets is another essential feature that users may benefit from. The users can earn, buy, and sell valuable
        NFTs from our platform's collections while spending valuable time to learn and contribute to the regen goal. Additionally, we offer a unique learning 
        experience through games that educate users about regen concepts and practices in fields like agriculture and energy.`}
      </p>
      <div className="text-center">
        <Button
          style={{ borderRadius: '20px', padding: '0.4em 2em' }}
          variant="danger"
          onClick={() => router.push(`/about`)}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}

