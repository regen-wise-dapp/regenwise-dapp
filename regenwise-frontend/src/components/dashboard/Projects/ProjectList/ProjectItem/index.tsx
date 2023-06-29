import Image from 'next/image';
import styles from './index.module.scss';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Project } from '@src/models/project';

interface Props {
  projectItem: Project;
  setEditedProject: (projectItem: Project) => void;
  onDeleteItem: (projectItem: any) => void;
}

export default function ProjectItem({
  projectItem,
  onDeleteItem,
  setEditedProject,
}: Props) {
  return (
    <div className={`${styles.list_item_container}`}>
      <div className={`${styles.image_container}`}>
        <Image src="/quests/quest-1z.png" fill alt={projectItem?.name} />
      </div>
      <div className={`${styles.content}`}>
        <h3>{projectItem.name}</h3>
        <div className={styles.description}>
          <p>{projectItem.description}</p>
        </div>
        <div className={styles.concepts}>
          {projectItem.concepts.map((item, index, array) => {
            return (
              <span key={item} className="capitalize">{`${item}${
                index !== array.length - 1 ? ', ' : ''
              } `}</span>
            );
          })}
        </div>
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => onDeleteItem(projectItem)}
            style={{
              borderRadius: '20px',
              width: '130px',
              padding: '0.4em 2em',
            }}
            variant="danger"
          >
            DELETE
          </Button>
          <Button
            // onClick={() => setEditedProject(projectItem)}
            onClick={() => setEditedProject(projectItem)}
            style={{
              borderRadius: '20px',
              width: '130px',
              padding: '0.4em 2em',
            }}
            variant="success"
          >
            EDIT
          </Button>
        </div>
      </div>
    </div>
  );
}
