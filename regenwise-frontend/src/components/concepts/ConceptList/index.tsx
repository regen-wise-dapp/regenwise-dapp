import dynamic from 'next/dynamic';
import styles from './index.module.scss';
import { useState } from 'react';
import { AdvanceFilter } from '../../FilterBar';
import PaginationBar from '../../shared/PaginationBar';
import { OrderDirection, Ascending } from '@/constants/misc';
import { Concept } from '@/models/concept';


const ConceptItem = dynamic(() => import('../ConceptItem'));

interface Props {
  concepts: Concept[];
  order: {
    orderDirection: OrderDirection;
    orderType: string;
  };
  filter: string;
  advanceFilters: AdvanceFilter;
}

export default function ConceptList({
  order,
  filter,
  advanceFilters,
  concepts,
}: Props) {
  const [page, setPage] = useState(1);
  const itemPerPage = 5;
  console.log(concepts);
  const sortedConcepts = concepts
    .filter((concept) => {
      // Filter by title
      return concept.name.toLowerCase().includes(filter.toLowerCase());
    })
    .filter((concept) => {
      const year = new Date(concept.date).getFullYear().toString();
      const categories = concept.categories.map((cat) => cat.toLowerCase());
      // const tags = concept.tags.map((tag) => tag.toLowerCase());

      const matchYear =
        advanceFilters.years?.length === 0
          ? true
          : advanceFilters.years?.includes(Number(year));
      const matchCategory =
        advanceFilters.categories?.length === 0
          ? true
          : advanceFilters.categories?.some((cat) =>
              categories.includes(cat.toLowerCase())
            );
      // const matchTags =
      //   advanceFilters.tags?.length === 0
      //     ? true
      //     : advanceFilters.tags?.some((tag) =>
      //         tags.includes(tag.toLowerCase())
      //       );

      return matchYear && matchCategory;
    })
    .sort((a: Concept, b: Concept) => {
      if (order.orderType === '' || !order.orderDirection) {
        return b.likes - a.likes;
      } else {
        let aValue, bValue;

        if (order.orderType === 'Date') {
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
        } else if (order.orderType === 'Name') {
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
        } else if (order.orderType === 'Popularity') {
          aValue = a.likes;
          bValue = b.likes;
        }
        if (aValue !== undefined && bValue !== undefined) {
          if (typeof aValue !== 'number' || typeof bValue !== 'number') {
            aValue = aValue.toString();
            bValue = bValue.toString();
          }

          if (order.orderDirection === Ascending) {
            return aValue < bValue ? -1 : 1;
          } else {
            return aValue > bValue ? -1 : 1;
          }
        } else {
          return 1;
        }
      }
    });

  return (
    <div className={styles.main_container}>
      <div className={styles.concepts_container}>
        {sortedConcepts
          .slice((page - 1) * itemPerPage, page * itemPerPage)
          .map((concept) => {
            console.log(concept);
            return <ConceptItem key={concept.id} concept={concept} />;
          })}
      </div>
      <div className="flex justify-center">
        <PaginationBar
          numberOfItems={sortedConcepts.length}
          itemsInPage={itemPerPage}
          onHandlePage={(page) => setPage(page)}
        />
      </div>
    </div>
  );
}

