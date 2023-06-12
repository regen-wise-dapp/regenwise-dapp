import Image from 'next/image';
import styles from './index.module.scss';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Project } from '@src/models/project';

interface Props {
  projectItem: Project;
}

export default function ProjectItem({ projectItem }: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`${styles.list_item_container}`}>
      <div className={`${styles.image_container}`}>
        <Image src="/dashboard/post.png" fill alt={projectItem?.title} />
      </div>
      <div className={`${styles.content}`}>
        <h3>{projectItem.title}</h3>
        <p className="italic">{projectItem.shortDescription}</p>
        <div>
          {projectItem.categories.map((item, index, array) => {
            return (
              <span key={item} className="capitalize">{`${item}${
                index !== array.length - 1 ? ', ' : ''
              } `}</span>
            );
          })}
        </div>
        <div>{new Date(projectItem.date).toDateString()}</div>
        <div className="flex justify-center gap-2">
          <Button
            onClick={() => setOpen(true)}
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
            onClick={() => setOpen(true)}
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
      <Modal show={open} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Not yet ready!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This functionality is not yet ready. We are working on it!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
