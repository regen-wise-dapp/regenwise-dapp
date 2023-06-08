'use client';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import FilterBar, { AdvanceFilter } from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import ConceptList from '@/components/concepts/ConceptList';
import { OrderDirection } from '@/constants/misc';
import { Concept } from '@/models/concept';
import { GetServerSideProps } from 'next';
import { fetcherWithNoCache } from '@/utils/fetcher';

interface Props {
  concepts: Concept[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const concepts = await fetcherWithNoCache(``);
    return { props: { concepts } };
  } catch (error) {
    return { props: { concepts: [] } };
  }
};

export default function Concepts({ concepts }: Props) {
  const [search, setSearch] = useState('');
  const [advanceFilters, setAdvanceFilters] = useState<AdvanceFilter>({
    years: [],
    tags: [],
    categories: [],
  } as AdvanceFilter);
  const [order, setOrder] = useState({
    orderDirection: '' as OrderDirection,
    orderType: '',
  });

  const handleSearch = debounce((search: string) => {
    setSearch(search);
  }, 300);

  return (
    <div className={styles.main_container}>
      <section className={styles.search_bar_container}>
        <SearchBar onHandleSearch={handleSearch} />
      </section>
      <div className={styles.content_container}>
        <section className={styles.filter_bar_container}>
          <FilterBar
            onHandleOrderSelection={setOrder}
            onHandleAllFilterItemsArray={(filters: AdvanceFilter) =>
              setAdvanceFilters(filters)
            }
          />
        </section>
        <section className={styles.list_container}>
          <ConceptList
            concepts={concepts ?? []}
            order={order}
            filter={search}
            advanceFilters={advanceFilters}
          />
        </section>
      </div>
    </div>
  );
}
