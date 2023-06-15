'use client';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import ConceptItem from '@src/components/concepts/ConceptItem';
import ConceptsNavBar from '@src/components/concepts/ConceptsNavBar';
import SearchBar from '@src/components/shared/SearchBar';
import { Concept } from '@src/models/concept';
import { fetcherWithNoCache } from '@src/utils/fetcher';

interface Props {
  concepts: Concept[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const concepts = await fetcherWithNoCache(
      `https://testnet.polybase.xyz/v0/collections/regenwise-regen-db%2FRegenConcept/records`
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
          <ConceptItem concept={selectedConcept} />
        </section>
      </div>
    </div>
  );
}
