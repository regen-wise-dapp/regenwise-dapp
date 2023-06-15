import SectionHeader from '@src/components/shared/SectionHeader';
import { Concept } from '@src/models/concept';
import styles from './index.module.scss';

interface Props {
  concept: Concept;
}

export default function ConceptItem({ concept }: Props) {
  return (
    <div className={styles.concept_item}>
      <SectionHeader title={concept.name}></SectionHeader>
      <p className="text-center">{concept.explanation}</p>
      <p className="text-center">
        <span className="font-extrabold">Published By: </span>
        <span className="capitalize">{`${concept?.adder}`}</span>
      </p>
    </div>
  );
}
