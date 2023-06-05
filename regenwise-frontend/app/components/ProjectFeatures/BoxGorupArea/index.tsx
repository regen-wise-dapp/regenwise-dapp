import { features } from '@/constants/features';
import Image from 'next/image';
import styles from './BoxGroup.module.scss';
export default function BoxGorupArea() {
  return (
    <div className={styles.main_container}>
      {features.map((item) => {
        return (
          <div
            key={item.title}
            className={`${styles.item} p-4 text-black`}
            style={{ backgroundColor: item.backgroundColor }}
          >
            <Image
              width={48}
              height={48}
              src={item.icon}
              alt={item.title}
              className="mb-2"
            />
            <p className="font-extrabold text-xl">{item.title}</p>
            <p className="text-sm">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}
