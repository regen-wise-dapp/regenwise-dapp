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
  try {
    const project: Project = await fetcherWithNoCache(
      `https://dappregenwise.netlify.app/api/projects/${id}`
    );
    return { props: { project } };
  } catch (error) {
    return { props: { project: null } };
  }
};

interface Props {
  project: Project;
}

export default function ProjectPage({ project }: Props) {
  return (
    <div className={`${styles.main_container}`}>
      <ProjectDetails project={project} />
    </div>
  );
}
