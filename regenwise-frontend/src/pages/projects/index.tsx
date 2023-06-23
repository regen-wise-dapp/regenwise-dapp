'use client';
import styles from './index.module.scss';
import { useState } from 'react';
import { debounce } from 'lodash';
import { GetServerSideProps } from 'next';
import FilterBar, { AdvanceFilter } from '@src/components/FilterBar';
import SearchBar from '@src/components/shared/SearchBar';
import ProjectList from '@src/components/projects/ProjectList';
import { OrderDirection } from '@src/constants/misc';
import { Project } from '@src/models/project';
import { fetcherWithNoCache } from '@src/utils/fetcher';

interface Props {
  projects: Project[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const projects = await fetcherWithNoCache(
      `https://dappregenwise.netlify.app/api/projects`
    );
    return { props: { projects } };
  } catch (error) {
    return { props: { projects: [] } };
  }
};
export default function Projects({ projects }: Props) {
  const [search, setSearch] = useState('');
  const [advanceFilters, setAdvanceFilters] = useState<AdvanceFilter>({
    years: [],
    implementers: [],
    concepts: [],
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
        <SearchBar
          animativeHeader
          onHandleSearch={handleSearch}
          headerText="REGEN PROJECTS"
          bannerImage="/projects/banner1.jpg"
          searchBarText="Search projects"
        />
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
          {projects && (
            <ProjectList
              projects={projects}
              order={order}
              filter={search}
              advanceFilters={advanceFilters}
            />
          )}
        </section>
      </div>
    </div>
  );
}
