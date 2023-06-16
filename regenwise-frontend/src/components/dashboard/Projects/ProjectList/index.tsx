import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import DashboardHeader from '../../shared/DashboardHeader';
import { fetcher } from '@src/utils/fetcher';
import { Project } from '@src/models/project';
import ProjectItem from './ProjectItem';
import PaginationBar from '@src/components/shared/PaginationBar';

interface Props{
  projects: Project[]
}

export default function ProjectList({projects}: Props) {
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemPerPage = 5;


  if (isLoading) return <p>Loading...</p>;
  if (!projects) return <p>No project data</p>;
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.wrapper}`}>
        <DashboardHeader header="MY PROJECTS" />
        <div className={`${styles.list}`}>
          {projects
            .slice((page - 1) * itemPerPage, page * itemPerPage)
            .map((item: Project) => {
              return <ProjectItem key={item.id} projectItem={item} />;
            })}
        </div>
        <div className="flex justify-center my-4">
          <PaginationBar
            numberOfItems={projects.length}
            itemsInPage={itemPerPage}
            onHandlePage={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

