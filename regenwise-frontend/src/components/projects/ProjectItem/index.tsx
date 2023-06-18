import { Project } from '@src/models/project';
import setSlugify from '@src/utils/setSlugify';
import { AiFillHeart } from 'react-icons/ai';
import styles from './index.module.scss';
import Link from 'next/link';
import { Badge } from 'react-bootstrap';
interface Props {
  project: Project;
}

export default function ProjectItem({ project }: Props) {
  return (
    <div className={styles.project_item}>
      <Link className={styles.link} href={`projects/${project.id}`}>
        <h3 className="cursor-pointer hover:text-orange-900 font-semibold text-lime-900">
          {project.name}
        </h3>
      </Link>

      <p className={`${styles.project_description} text-justify`}>
        {project.description}
      </p>
      <div
        className={`${styles.categories} text-sm font-semibold text-lime-900 mb-1`}
      >
        <span>Concepts: </span>
        {project.conceptsObjects.map((concept, index, array) => {
          return (
            <span key={concept.id} className="capitalize">{`${concept.name}${
              index !== array.length - 1 ? ', ' : ''
            } `}</span>
          );
        })}
      </div>

      <div className="flex flex-row gap-1">
        {/* <Badge pill bg="secondary" style={{ height: '20px', minWidth: '60px' }}>
          <span className="flex flex-row justify-center items-center">
            {`${project.likes} Likes`}
          </span>
        </Badge> */}
        <div className={` text-sm font-semibold text-lime-900 mb-1`}>
          <Badge
            pill
            bg="secondary"
            style={{ height: '20px', minWidth: '60px' }}
          >
            <span>{` ${project.implementers}`}</span>
          </Badge>
        </div>
        <Badge pill bg="secondary" style={{ height: '20px', minWidth: '60px' }}>
          {`${project.date}`}
        </Badge>
      </div>
    </div>
  );
}
