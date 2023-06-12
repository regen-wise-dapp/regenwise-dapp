import styles from './index.module.scss';

interface Props {
  header: string;
}

export default function DashboardHeader({ header }: Props) {
  return (
    <div className={`${styles.header}`}>
      <h3>{header}</h3>
    </div>
  );
}
