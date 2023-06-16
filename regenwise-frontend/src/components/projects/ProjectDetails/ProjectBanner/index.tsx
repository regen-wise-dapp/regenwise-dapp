import Image from 'next/image';
import styles from './index.module.scss';

interface Props {
  image: string;
  title: string;
}

export default function ProjectBanner({ image, title }: Props) {
  return (
    <div className={styles.main_container}>
      <Image src={image} alt={title} fill></Image>
    </div>
  );
}
