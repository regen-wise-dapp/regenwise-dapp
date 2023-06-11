import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { years, categories, tags } from '@/constants/filterItems';
import { OrderDirection } from '@/constants/misc';

const SortingSection = dynamic(() => import('./SortingSection'));
const FilterList = dynamic(() => import('./FilterList'));

export interface AdvanceFilter {
  years: number[];
  subconcepts: string[];
  tags: string[];
  categories: string[];
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
  const [tagsFilter, setTagsFilter] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);

  const handleFilter = () => {
    const filterObject = {
      years: yearsFilter,
      tags: tagsFilter,
      categories: categoriesFilter,
    }
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
              filterItems={categories}
              header="Categories"
              onHandleFilterItemsArray={(filterItems) =>
                setCategoriesFilter(filterItems)
              }
            />
            <FilterList
              filterItems={tags}
              header="Tags"
              onHandleFilterItemsArray={(filterItems) =>
                setTagsFilter(filterItems)
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
