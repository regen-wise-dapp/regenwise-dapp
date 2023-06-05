import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';

const SectionHeader = dynamic(() => import('../../shared/SectionHeader'));

export default function ContentArea() {
  const router = useRouter();
  return (
    <div className="flex flex-col max-w-[600px] w-full items-center justify-center">
      <SectionHeader
        title="About This Platform"
        subtitle="For those eager to learn and make a meaningful contribution, this platform provides a diverse range of resources to delve into the concept of regeneration."
      />
      <p className="text-center">
        {`Human actions have caused significant harm to the environment and its inhabitants, but now it is crucial for us to contribute 
        to the process of regeneration. "Regen" is a term used to describe the restoration and responsible management of environmental 
        systems. Our regen web platform aims to facilitate this contribution by offering various services and resources to users. The 
        platform's NFT markets serve as the primary feature, connecting it to the world of Web 3. Users can earn, buy, and sell valuable
        NFTs from our platform's collections by earning points and entering the market. Additionally, we offer a unique learning 
        experience through interactive games that educate users about regen practices in fields like agriculture and energy. 
        The platform's knowledge base provides a wealth of information on regen practices and related topics, and users are encouraged 
        to contribute by writing and reading articles and more.`}
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

