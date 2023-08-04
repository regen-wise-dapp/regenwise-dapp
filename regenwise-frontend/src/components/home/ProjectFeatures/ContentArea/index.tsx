import SectionHeader from '@src/components/shared/SectionHeader';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';


export default function ContentArea() {
  const router = useRouter();
  return (
    <div className="mt-5 flex flex-col max-w-[600px] w-full items-center justify-center" id='main-page--content-element'>
      <SectionHeader
        title="Overcoming Environmental Degradation via Environmental Regeneration"
        subtitle="For those eager to learn and make a meaningful contribution to the regen goal, this platform provides a diverse range of resources to delve into the concepts and practices of regeneration."
      />
      <p className="text-center"  >
        {`Human actions have caused significant environmental degradation and serious harm to the inhabitants, now it is crucial for us to contribute 
        to the process of regeneration. "Regeneration" in our context is a term used to describe the restoration and responsible utilization and management of environmental 
        systems. Our regen (the short form of the word regeneration) web platform aims to facilitate the regen efforts by offering various services and resources to users. The 
        platform's main database collection on regen concepts serves as the primary feature that informs about environmental responsibility and also directs individuals to actively contribute to the regen goal. 
        In addition, the platform's NFT markets are essential features that users may benefit from. The users can earn and trade valuable
        NFTs from regen collections while spending valuable time to learn and contribute to the regen goal. Additionally, we offer a unique learning 
        experience through quests that educate users about regen concepts and practices in various fields.`}
      </p>
      <div className="text-center">
        <Button
          style={{ borderRadius: '20px', padding: '0.4em 2em' }}
          variant="danger"
          onClick={() => router.push(`/concepts`)}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}

