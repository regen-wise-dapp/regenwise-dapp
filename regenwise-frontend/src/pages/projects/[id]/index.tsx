import React from 'react';
import styles from './index.module.scss';
import { fetcherWithNoCache } from '@src/utils/fetcher';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Project } from '@src/models/project';
import ProjectDetails from '@src/components/projects/ProjectDetails';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  console.log(id);
  try {
    const project: Project = await fetcherWithNoCache(
      `http://localhost:3000/api/projects/${id}`
    );
    console.log('dbg');
    console.log(project);

    return { props: { project } };
  } catch (error) {
    return { props: { project: null } };
  }
};

interface Props {
  project: Project;
}

export default function ProjectPage({ project }: Props) {
  console.log(project);
  return (
    <div className={`${styles.main_container}`}>
      <ProjectDetails project={project} />
    </div>
  );
}
