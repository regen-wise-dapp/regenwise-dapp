'use client';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import FilterBar, { AdvanceFilter } from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import { OrderDirection } from '@/constants/misc';
import { Concept } from '@/models/concept';
import { GetServerSideProps } from 'next';
import { fetcherWithNoCache } from '@/utils/fetcher';
import ConceptsNavBar from '@/components/concepts/ConceptsNavBar';
import ConceptItem from '@/components/concepts/ConceptItem';

interface Props {
  concepts: Concept[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const concepts = await fetcherWithNoCache(
      `https://testnet.polybase.xyz/v0/collections/regenwise-db%2FRegenConcept/records`
    );
    const preparedData = concepts.data.map((item: any) => item.data);
    return { props: { concepts: preparedData } };
  } catch (error) {
    return { props: { concepts: [] } };
  }
};

export default function Concepts({ concepts }: Props) {
  const [selectedConcept, setSelectedConcept] = useState({} as Concept);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    if (concepts) {
      setSelectedConcept(concepts[0]);
    }
  }, []);

  const handleSearch = (event: any) => {
    setSearchTerm(event);
  };

  return (
    <div className={styles.main_container}>
      <section className={styles.search_bar_container}>
        <SearchBar onHandleSearch={handleSearch} />
      </section>
      <div className={styles.content_container}>
        <section className={styles.filter_bar_container}>
          <ConceptsNavBar
            concepts={concepts ?? []}
            searchTerm={searchTerm} 
            onHandleSelectConcept={(event) => setSelectedConcept(event)}
          />
        </section>
        <section className={styles.list_container}>
          <ConceptItem concept={selectedConcept}/>
        </section>
      </div>
    </div>
  );
}
