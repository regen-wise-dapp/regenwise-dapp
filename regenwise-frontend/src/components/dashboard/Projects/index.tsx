import { Button } from 'react-bootstrap';
import ProjectList from './ProjectList';
import styles from './index.module.scss';
import { useState } from 'react';
import ProjectEditor from './ProjectEditor';
import { Project } from '@src/models/project';

interface Props{
  projects: Project[];
}

export default function Projects({projects}: Props) {
  const [activeButton, setActiveButton] = useState([true, false]);

  const openEditor = () => {
    setActiveButton([false, true]);
  };
  const openProjectList = () => {
    setActiveButton([true, false]);
  };

  return (
    <div className={`${styles.main_container}`}>
      {/* <div className="flex justify-center items-center gap-4 my-2">
        <Button
          onClick={openProjectList}
          active={activeButton[0]}
          style={{
            borderRadius: '30px',
            width: '200px',
            padding: '1em 2em',
          }}
          variant="dark"
        >
          MY PROJECTS
        </Button>
        <Button
          active={activeButton[1]}
          onClick={openEditor}
          style={{
            borderRadius: '30px',
            width: '200px',
            padding: '1em 2em',
          }}
          variant="dark"
        >
          NEW PROJECT
        </Button>
      </div>
      {activeButton[0] === true && <ProjectList projects={projects}/>}
      {activeButton[1] === true && <ProjectEditor editMode={false}/>} */}
    </div>
  );
}
