import styles from './index.module.scss';
import { useState } from 'react';
import ProjectItem from '../ProjectItem';
import { AdvanceFilter } from '@src/components/FilterBar';
import PaginationBar from '@src/components/shared/PaginationBar';
import { OrderDirection, Ascending } from '@src/constants/misc';
import { Project } from '@src/models/project';

interface Props {
  projects: Project[];
  order: {
    orderDirection: OrderDirection;
    orderType: string;
  };
  filter: string;
  advanceFilters: AdvanceFilter;
}

export default function ProjectList({
  order,
  filter,
  advanceFilters,
  projects,
}: Props) {
  const [page, setPage] = useState(1);
  const itemPerPage = 5;

  const sortedProjects = projects
    .filter((project: Project) => {
      // Filter by title
      return project.name.toLowerCase().includes(filter.toLowerCase());
    })
    .filter((project) => {
      const projectYear = new Date(project.date).getFullYear().toString();
      const projectConcepts = project.concepts.map((concept) =>
        concept.toLowerCase()
      );

      const matchYear =
        advanceFilters.years?.length === 0
          ? true
          : advanceFilters.years?.includes(Number(projectYear));
      const matchConcepts =
        advanceFilters.concepts?.length === 0
          ? true
          : advanceFilters.concepts?.some((concept) =>
              projectConcepts.includes(concept.toLowerCase())
            );

      return matchYear && matchConcepts;
    })
    .sort((a: Project, b: Project) => {
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
      <div className={styles.projects_container}>
        {sortedProjects
          .slice((page - 1) * itemPerPage, page * itemPerPage)
          .map((project) => {
            return <ProjectItem key={project.id} project={project} />;
          })}
      </div>
      <div className="flex justify-center">
        <PaginationBar
          numberOfItems={sortedProjects.length}
          itemsInPage={itemPerPage}
          onHandlePage={(page) => setPage(page)}
        />
      </div>
    </div>
  );
}
