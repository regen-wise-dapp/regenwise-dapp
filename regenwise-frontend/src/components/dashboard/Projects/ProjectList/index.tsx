import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import DashboardHeader from '../../shared/DashboardHeader';
import { fetcher } from '@src/utils/fetcher';
import { Project } from '@src/models/project';
import ProjectItem from './ProjectItem';
import PaginationBar from '@src/components/shared/PaginationBar';

export default function ProjectList() {
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const projects = await fetcher('');
      setData(projects);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No project data</p>;
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.wrapper}`}>
        <DashboardHeader header="MY PROJECTS" />
        <div className={`${styles.list}`}>
          {data
            .slice((page - 1) * itemPerPage, page * itemPerPage)
            .map((item: Project) => {
              return <ProjectItem key={item.id} projectItem={item} />;
            })}
        </div>
        <div className="flex justify-center my-4">
          <PaginationBar
            numberOfItems={data.length}
            itemsInPage={itemPerPage}
            onHandlePage={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

