'use client';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import ConceptItem from '@src/components/concepts/ConceptItem';
import ConceptsNavBar from '@src/components/concepts/ConceptsNavBar';
import SearchBar from '@src/components/shared/SearchBar';
import { Concept } from '@src/models/concept';
import { fetcherWithNoCache } from '@src/utils/fetcher';

interface Props {
  concepts: Concept[];
  selectedTab: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query } = context;
    const concepts = await fetcherWithNoCache(
      `https://regenwise.xyz/api/concepts`
    );
    return { props: { concepts: concepts, selectedTab: query.tab || '' } };
  } catch (error) {
    return { props: { concepts: [], selectedTab: '' } };
  }
};

export default function Concepts({ concepts, selectedTab }: Props) {
  const [selectedConcept, setSelectedConcept] = useState({} as Concept);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (concepts) {
      const concept = concepts.find((concept) => concept.id === selectedTab);
      setSelectedConcept(concept || concepts[0]);
    }
  }, [concepts, selectedTab]);

  const handleSearch = (event: any) => {
    setSearchTerm(event);
  };

  return (
    <div className={styles.main_container}>
      <section className={styles.search_bar_container}>
        <SearchBar
          onHandleSearch={handleSearch}
          headerText="REGEN CONCEPTS"
          bannerImage="/concepts/banner.jpg"
          animativeHeader
          searchBarText="Search concepts"
        />
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
          {selectedConcept && <ConceptItem concept={selectedConcept} />}
        </section>
      </div>
    </div>
  );
}
