import { Concept } from '@/models/concept';
import setSlugify from '../../../utils/setSlugify';
import styles from './index.module.scss';
import SectionHeader from '@/components/shared/SectionHeader';

interface Props {
  concept: Concept;
}

export default function ConceptItem({ concept }: Props) {
  return (
    <div className={styles.concept_item}>
      <SectionHeader title={concept.name} darkTheme></SectionHeader>
      <p className="text-center">{concept.explanation}</p>
      <p className="text-center">
        <span className="font-extrabold">Publisehd By: </span>
        <span className="capitalize">{`${concept?.adder}`}</span>
      </p>
    </div>
  );
}
