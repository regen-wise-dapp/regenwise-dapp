import { ProjectProp } from '@src/models/project';
import styles from './index.module.scss';

interface Props {
  project: ProjectProp;
}

export default function ProjectContent({ project }: Props) {
  return (
    <div className={styles.main_container}>
      <h1 className="text-center text-2xl md:text-4xl font-extrabold">{project.name}</h1>
      <p className="text-lg">{project.description}</p>
    </div>
  );
}
