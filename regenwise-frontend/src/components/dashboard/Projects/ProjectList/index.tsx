import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import DashboardHeader from '../../shared/DashboardHeader';
import { Project } from '@src/models/project';
import ProjectItem from './ProjectItem';
import PaginationBar from '@src/components/shared/PaginationBar';
import ProjectEditor from '../ProjectEditor';
import { Auth } from '@polybase/auth';
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth';
import { Polybase } from '@polybase/client';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/index';
import { Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

interface Props {
  projects: Project[];
}

///////////////////// Polybase Code 0 Beginning ///////////////////////

const db = new Polybase({
  defaultNamespace: 'regenwise-regen-db',
});

const auth = typeof window !== 'undefined' ? new Auth() : null;

async function getPublicKeyH() {
  const msg = 'Login Process';
  const sig = await auth?.ethPersonalSign(msg);
  const publicKeyH = ethPersonalSignRecoverPublicKey(sig as any, msg);
  return '0x' + publicKeyH.slice(4);
}

///////////////////// Polybase Code 0 End ///////////////////////

export default function ProjectList({ projects }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [toBeEditedProject, setToBeEditedProject] = useState({});
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);
  const itemPerPage = 5;
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [needSignIn, setNeedSignIn] = useState<boolean>(false)
  const router = useRouter();

  useEffect(() => {
    auth?.onAuthUpdate((authState) => {
      if (!authState) setNeedSignIn(true)
    });
  }, [])

  const onEditProject = (project: Project) => {
    setToBeEditedProject(project);
    setIsEditModeOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onHandleDelete = async (event: any) => {
    let res;
    if (needSignIn) {
      res = await auth?.signIn();
    }
    else {
      res = auth?.state;
    }
    let publicKeyH = (res as any).publicKey;
    let pKey = (window as any).ethereum.selectedAddress;
    if (!publicKeyH) {
      publicKeyH = await getPublicKeyH();
    }
    if (auth) {
      db.signer(async (data: string) => {
        return {
          h: 'eth-personal-sign',
          sig: await auth?.ethPersonalSign(data),
        };
      });
    }
    // Delete project
    try {
      await db
        .collection('RegenProject')
        .record(event.id)
        .call('del')
        .then(() => {
          setModalTitle('SUCCESS!');
          setModalMessage(
            'The record was deleted successfully!'
          );
          setOpen(true);
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!projects) return <p>No project data</p>;
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.wrapper}`}>
        {isEditModeOpen ? (
          <>
            <ProjectEditor
              editMode={isEditModeOpen}
              project={toBeEditedProject as Project}
              onCloseEditMode={() => setIsEditModeOpen(false)}
            ></ProjectEditor>
          </>
        ) : (
          <>
            <DashboardHeader header="MY PROJECTS" />
            {projects.length > 0 ? (
              <>
                <div className={`${styles.list}`}>
                  {projects&&
                  projects
                    .slice((page - 1) * itemPerPage, page * itemPerPage)
                    .map((item: Project) => {
                      if (item)
                      return (
                        <ProjectItem
                          key={item.id}
                          projectItem={item}
                          setEditedProject={onEditProject}
                          onDeleteItem={onHandleDelete}
                        />
                      );
                    })}
                </div>
                <div className="flex justify-center my-4">
                  <PaginationBar
                    numberOfItems={projects.length}
                    itemsInPage={itemPerPage}
                    onHandlePage={(page) => setPage(page)}
                  />
                </div>
              </>
            ) : (
              <div>
                <p>You do not have any projects to show yet.</p>
              </div>
            )}
          </>
        )}
      </div>
      <CustomModal
        show={open}
        handleClose={handleClose}
        message={modalMessage}
        title={modalTitle}
      ></CustomModal>
    </div>
  );
}

interface CustomModalInterface {
  show: boolean;
  handleClose: () => void;
  message: string;
  title: string;
}

const CustomModal = ({
  show,
  handleClose,
  title,
  message,
}: CustomModalInterface) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
