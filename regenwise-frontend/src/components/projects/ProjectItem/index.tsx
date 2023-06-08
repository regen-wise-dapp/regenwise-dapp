import { Project } from '@/models/project';
import setSlugify from '../../../utils/setSlugify';
import styles from './index.module.scss';
import Link from 'next/link';
interface Props {
  project: Project;
}

export default function ProjectItem({ project }: Props) {
  return (
    <div className={styles.project_item}>
      <Link
        className={styles.link}
        href={`knowledge/${setSlugify(project.title)}`}
      >
        <h3 className="cursor-pointer hover:text-orange-900 font-semibold text-lime-900">
          {project.title}
        </h3>
      </Link>

      <p>{project.shortDescription}</p>
      <div className={`${styles.categories} text-sm`}>
        {project.tags.map((tag, index, array) => {
          return (
            <span key={tag} className="capitalize">{`${tag}${
              index !== array.length - 1 ? ', ' : ''
            } `}</span>
          );
        })}
      </div>
      <div className={` text-sm`}>
        {`by ${project.author} | ${project.views} Views | ${project.date}`}
      </div>
    </div>
  );
}

