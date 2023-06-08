import { Concept } from '@/models/concept';
import setSlugify from '../../../utils/setSlugify';
import styles from './index.module.scss';
import Link from 'next/link';

interface Props {
  concept: Concept;
}

export default function ConceptItem({ concept }: Props) {
  return (
    <div className={styles.project_item}>
      <Link
        className={styles.link}
        href={`knowledge/${setSlugify(concept.name)}`}
      >
        <h3 className="cursor-pointer hover:text-orange-900 font-semibold text-lime-900">
          {concept.name}
        </h3>
      </Link>

      <p>{concept.explanation}</p>
      {/* <div className={`${styles.categories} text-sm`}>
        {concept.tags.map((tag, index, array) => {
          return (
            <span key={tag} className="capitalize">{`${tag}${
              index !== array.length - 1 ? ', ' : ''
            } `}</span>
          );
        })}
      </div> */}
      {/* <div className={` text-sm`}>
        {`by ${concept.author} | ${concept.views} Views | ${concept.date}`}
      </div> */}
    </div>
  );
}

