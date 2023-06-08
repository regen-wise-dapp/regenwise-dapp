import dynamic from 'next/dynamic';
import styles from './index.module.scss';
import { useState } from 'react';
import { AdvanceFilter } from '@/components/FilterBar';
import PaginationBar from '@/components/shared/PaginationBar';
import { OrderDirection, Ascending } from '@/constants/misc';
import { Project } from '@/models/project';
import ProjectItem from '../ProjectItem';



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
    .filter((project) => {
      // Filter by title
      return project.title.toLowerCase().includes(filter.toLowerCase());
    })
    .filter((project) => {
      const projectYear = new Date(project.date).getFullYear().toString();
      const projectCategories = project.categories.map((cat) =>
        cat.toLowerCase()
      );
      const projectTags = project.tags.map((tag) => tag.toLowerCase());

      const matchYear =
        advanceFilters.years?.length === 0
          ? true
          : advanceFilters.years?.includes(Number(projectYear));
      const matchCategory =
        advanceFilters.categories?.length === 0
          ? true
          : advanceFilters.categories?.some((cat) =>
              projectCategories.includes(cat.toLowerCase())
            );
      const matchTags =
        advanceFilters.tags?.length === 0
          ? true
          : advanceFilters.tags?.some((tag) =>
              projectTags.includes(tag.toLowerCase())
            );

      return matchYear && matchCategory && matchTags;
    })
    .sort((a: Project, b: Project) => {
      if (order.orderType === '' || !order.orderDirection) {
        return b.views - a.views;
      } else {
        let aValue, bValue;

        if (order.orderType === 'Date') {
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
        } else if (order.orderType === 'Name') {
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
        } else if (order.orderType === 'Popularity') {
          aValue = a.views;
          bValue = b.views;
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

