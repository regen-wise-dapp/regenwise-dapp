import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { years, implementers, concepts } from '@src/constants/filterItems';
import { OrderDirection } from '@src/constants/misc';

const SortingSection = dynamic(() => import('./SortingSection'));
const FilterList = dynamic(() => import('./FilterList'));

export interface AdvanceFilter {
  years: number[];
  implementers: string[];
  concepts: string[];
}

interface Props {
  onHandleAllFilterItemsArray: any;
  onHandleOrderSelection: (order: {
    orderDirection: OrderDirection;
    orderType: string;
  }) => void;
}

export default function FilterBar({
  onHandleOrderSelection,
  onHandleAllFilterItemsArray,
}: Props) {
  const [yearsFilter, setYearsFilter] = useState([]);
  const [ceonceptsFilter, setConceptsFilter] = useState([]);
  const [implementersFilter, setImplementersFilter] = useState([]);

  const handleFilter = () => {
    const filterObject = {
      years: yearsFilter,
      concepts: ceonceptsFilter,
      implementers: implementersFilter,
    };
    onHandleAllFilterItemsArray(filterObject);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <section className={styles.sorting_section}>
          <p className="font-extrabold text-lg mb-0 border-b-2 border-gray-400">
            Sort Your Search
          </p>
          <SortingSection onHandleOrderSelection={onHandleOrderSelection} />
        </section>

        <section className={styles.filter_section}>
          <p className="font-extrabold text-lg mb-0 border-b-2 border-gray-400">
            Refine Your Search
          </p>
          <div className={styles.filter_section_content}>
            <FilterList
              filterItems={years}
              header="Years"
              onHandleFilterItemsArray={(filterItems) =>
                setYearsFilter(filterItems)
              }
            />
            <FilterList
              filterItems={implementers}
              header="Implementers"
              onHandleFilterItemsArray={(filterItems) =>
                setImplementersFilter(filterItems)
              }
            />
            <FilterList
              filterItems={concepts}
              header="Concepts"
              onHandleFilterItemsArray={(filterItems) =>
                setConceptsFilter(filterItems)
              }
            />
            <Button variant="dark" onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
