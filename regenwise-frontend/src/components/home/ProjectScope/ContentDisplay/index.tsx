import styles from './index.module.scss';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { scopeItems } from '@/constants/scopeItems';

interface Props {
  index: number;
}

export default function ContentDisplay({ index }: Props) {
  const router = useRouter();
  return (
    <div className={styles.main_container}>
      {scopeItems.map((item, itemIndex) => {
        return (
          <div
            style={{
              display: index === itemIndex ? 'flex' : 'none',
              backgroundColor: item.backgroundColor,
            }}
            key={item.title}
            className={styles.wrapper}
          >
            <div className={styles.first_content}>
              <Image
                src={item?.image}
                width={400}
                height={400}
                alt={item.title}
              />
            </div>
            <div className={styles.second_content}>
              <h3 className="font-bold">{item.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
              <div className="flex justify-center">
                <Button
                  style={{ borderRadius: '20px', padding: '0.4em 2em', marginTop: "1em" }}
                  variant="danger"
                  onClick={() => router.push(`/knowledge`)}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
