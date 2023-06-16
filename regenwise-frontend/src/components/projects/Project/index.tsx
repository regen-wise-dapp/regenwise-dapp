import setSlugify from '@src/utils/setSlugify';
import styles from './index.module.scss';
import ProjectBanner from './ProjectBanner';
import ProjectContent from './ProjectContent';
import ProjectInfo from './ProjectInfo';
import ProjectLeftSidebar from './ProjectLeftSidebar';
import { ProjectProp } from '@src/models/project';
import ProjectOwner from './ProjectOwner';
import ProjectConceptsIcons from './ProjectConceptsIcons';

interface Props {
  project: ProjectProp;
}

export default function Project({ project }: Props) {
  return (
    <div className={styles.main_container}>
      <div className={styles.left_sidebar}>
        <div className={styles.left_sidebar_wrapper}>
          <ProjectLeftSidebar></ProjectLeftSidebar>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.banner_section}>
          <ProjectBanner
            image={'/projects/project.jpg'}
            title={project.name ?? ''}
          ></ProjectBanner>
          <ProjectInfo project={project}></ProjectInfo>
        </div>

        <div className={styles.content_section}>
          <div className={styles.left_content_section}>
            <ProjectContent project={project}></ProjectContent>
          </div>
          <div className={styles.right_content_section}>
            <ProjectOwner project={project}></ProjectOwner>
            <ProjectConceptsIcons project={project}></ProjectConceptsIcons>
          </div>
        </div>
      </div>
    </div>
  );
}

