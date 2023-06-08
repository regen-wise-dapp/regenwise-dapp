import { ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  children: ReactNode;
  theme?: 'light' | 'normal' | 'dark';
}

export default function HomePageLayout(props: Props): JSX.Element {
  return (
    <div
      className={`${styles.main_container} ${
        props.theme && styles[props.theme]
      }`}
    >
      <div className={styles.wrapper}>{props.children}</div>
    </div>
  );
}
