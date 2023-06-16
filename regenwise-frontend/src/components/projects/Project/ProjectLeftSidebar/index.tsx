import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { AiTwotoneHeart } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Image from 'next/image';

AiTwotoneHeart;
export default function ProjectLeftSidebar() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/knowledge');
  };
  const socials = [
    {
      name: 'WhatsApp',
      icon: '/social/006-whatsapp.svg',
      action: (): void => {
        window.open('whatsapp://send?text=' + ``, '_blank');
      },
    },
    {
      name: 'Linkedin',
      icon: '/social/001-linkedin.svg',
      action: (): void => {
        window.open(``, '_blank');
      },
    },
    {
      name: 'facebook',
      icon: '/social/002-facebook.svg',
      action: (): void => {
        const url = ``;
        const fb = window.open(
          'http://www.facebook.com/sharer.php?s=100&p[url]=' +
            encodeURIComponent(url)
        );
        fb?.focus();
      },
    },
    {
      name: 'twitter',
      message: 'takip et',
      icon: '/social/005-twitter.svg',
      action: (): void => {
        window.open(``, '_blank');
      },
    },
  ];
  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <div className={styles.icon_container}>
          <AiOutlineArrowLeft
            onClick={handleClick}
            style={{ width: '28px', height: '28px', color: 'white' }}
          ></AiOutlineArrowLeft>
        </div>
        {/* <div className={styles.icon_container}>
          <AiTwotoneHeart
            style={{
              width: '28px',
              height: '28px',
              color: 'crimson',
            }}
          ></AiTwotoneHeart>
        </div> */}
        {socials.map((doc) => {
          return (
            <div
              className={styles.icon_container}
              key={doc.name}
              onClick={doc.action}
            >
              <Image src={doc.icon} alt={doc.name} fill/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

