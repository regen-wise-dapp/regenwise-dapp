import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { EditorProps } from 'react-draft-wysiwyg';
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import DashboardHeader from '../../shared/DashboardHeader';
import { mainConcepts } from '@src/constants/concepts';
import { Project } from '@src/models/project';
import { Auth } from '@polybase/auth';
import { Polybase } from '@polybase/client';
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth';
import setSlugify from '@src/utils/setSlugify';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useRouter } from 'next/router';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

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

interface Props {
  project?: Project;
  editMode: boolean;
  onCloseEditMode?: () => void;
}

const emptyFormValues = {
  name: '',
  city: '',
  country: '',
  state: '',
  status: '',
  address: '',
  ghgPuller: '',
  link: '',
  contactEmail: '',
  implementers: [] as string[],
  concepts: [] as string[],
  date: '2023',
};

export default function ProjectEditor({
  project,
  editMode,
  onCloseEditMode,
}: Props) {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [implementer, setImplementer] = useState<string>('');
  const [concept, setConcept] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<any>({} as any);
  const [formValues, setFormValues] = useState(emptyFormValues);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const router = useRouter();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const validateForm = () => {
    const newErrors = {} as any;

    // Validate the required fields
    if (!formValues.name) {
      newErrors.name = 'Name is required';
    }
    if (!formValues.city) {
      newErrors.city = 'City is required';
    }
    if (!formValues.link) {
      newErrors.link = 'Project link is required';
    }
    if (!formValues.country) {
      newErrors.country = 'Country is required';
    }
    if (!formValues.address) {
      newErrors.address = 'Address is required';
    }
    if (!formValues.status) {
      newErrors.status = 'Status is required';
    }
    if (!formValues.contactEmail) {
      newErrors.contactEmail = 'Contact email is required';
    }
    if (!formValues.ghgPuller) {
      newErrors.ghgPuller = 'GreenHouse gas is required';
    }
    if (!formValues.contactEmail) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.contactEmail)
    ) {
      newErrors.contactEmail = 'Invalid email format';
    }
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (editMode === false) {
      setFormValues(emptyFormValues);
      let detailedInformationEditor = null;
      const blocksFromHTML = convertFromHTML('');
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      detailedInformationEditor = EditorState.createWithContent(content);
      setEditorState(detailedInformationEditor);
    }
  }, [editMode]);

  useEffect(() => {
    let detailedInformationEditor = null;
    if (project) {
      const blocksFromHTML = convertFromHTML(
        `<div>${project.description}</div>`
      );
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      detailedInformationEditor = EditorState.createWithContent(content);
      console.log('project', project);
      setEditorState(detailedInformationEditor);
      setFormValues({
        name: project.name,
        city: project.city,
        country: project.country,
        state: project.state,
        status: project.status,
        address: project.address,
        ghgPuller: project.ghgPuller,
        link: project.link,
        contactEmail: project.contactEmail,
        implementers: project.implementers,
        concepts: project.concepts,
        date: project.date as any,
      });
    }
  }, [project]);

  const addImplementer = () => {
    setFormValues((prev) => {
      const currentImplementers = [...prev.implementers] as string[];
      currentImplementers.push(implementer);
      setImplementer('');
      return { ...prev, implementers: currentImplementers };
    });
  };

  const addConcept = () => {
    setFormValues((prev) => {
      const currentConcepts = [...prev.concepts] as string[];
      currentConcepts.push(concept);
      setConcept('');
      return { ...prev, concepts: currentConcepts };
    });
  };

  const handleFormInput = (e: any) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
    if (editMode) {
      (onCloseEditMode as any)();
    }
  };

  const saveProject = () => {
    const isValid = validateForm();
    if (isValid) {
      let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const finalFormObject = {
        ...formValues,
        description: html,
      };

      saveProjectDetails(finalFormObject).then(async () => {
        let projects = structuredClone((currentUser as any).projects);
        let slugProject = setSlugify(finalFormObject.name);
        projects.push(slugProject);
        await db
          .collection('user')
          .record((currentUser as any).id)
          .call('setProjects', [structuredClone(projects)])
          .then(() => {
            setModalTitle('SUCCESS!');
            setModalMessage('Your project was saved successfully!');
            setOpen(true);
            setFormValues(emptyFormValues);
            let detailedInformationEditor = null;
            const blocksFromHTML = convertFromHTML('');
            const content = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            detailedInformationEditor = EditorState.createWithContent(content);
            setEditorState(detailedInformationEditor);
            window.location.reload();
          });
      });
    }
  };

  ///////////////////// Polybase Code 1 Beginning ///////////////////////

  async function saveProjectDetails(finalFormObject: any) {
    const res = await auth?.signIn();

    // if publickey was received
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

    // Add project if not exists
    try {
      const userData = (await db.collection('RegenProject').record(pKey).get())
        .data;
      if (!userData) {
        await db
          .collection('RegenProject')
          .create([
            setSlugify(formValues.name),
            '',
            finalFormObject.name,
            finalFormObject.description as any,
            finalFormObject.status,
            'pending',
            finalFormObject.implementers,
            finalFormObject.concepts,
            finalFormObject.contactEmail,
            finalFormObject.date,
            finalFormObject.address,
            finalFormObject.link,
            finalFormObject.ghgPuller,
            finalFormObject.city,
            finalFormObject.state,
            finalFormObject.country,
          ]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  ///////////////////// Polybase Code 2 End //////////////////////

  const editProject = () => {
    const isValid = validateForm();
    console.log('final:', formValues);

    if (isValid) {
      let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const finalFormObject = {
        ...formValues,
        description: html,
        implementers: [...formValues.implementers],
        concepts: [...formValues.concepts],
      };
      editProjectDetails(finalFormObject).then(() => {
        setModalTitle('SUCCESS!');
        setModalMessage('Your project was updated!');
        setOpen(true);
        setFormValues(emptyFormValues);
        let detailedInformationEditor = null;
        const blocksFromHTML = convertFromHTML('');
        const content = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        detailedInformationEditor = EditorState.createWithContent(content);
        setEditorState(detailedInformationEditor);
        window.location.reload();
      });
    }
  };

  async function editProjectDetails(finalFormObject: any) {
    const res = await auth?.signIn();

    // if publickey was received
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
    console.log('publicKeyH:', publicKeyH);
    console.log('pKey:', pKey);
    console.log(finalFormObject);
    // Update project info
    
    try {
      if (project) {
      await db
        .collection('RegenProject')
        .record(project.id)
        .call('updateProject', [
          finalFormObject.name ?? '',
          finalFormObject.implementers ?? [],
          finalFormObject.contactEmail ?? '',
          finalFormObject.country ?? '',
          finalFormObject.state ?? '',
          finalFormObject.city ?? '',
          finalFormObject.address ?? '',
          finalFormObject.concepts ?? [],
          (finalFormObject.description as any) ?? '',
          finalFormObject.ghgPuller ?? '',
          finalFormObject.link ?? '',
          finalFormObject.status ?? '',
        ]).then(() => {});}
        
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.wrapper}`}>
        <DashboardHeader header={editMode ? 'EDIT PROJECT' : 'NEW PROJECT'} />
        <div className={`${styles.project_information}`}>
          <Row>
            <Col xs={12} sm={6}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="font-extrabold">Name*</Form.Label>
                <Form.Control
                  type="text"
                  value={formValues['name']}
                  onChange={handleFormInput}
                  placeholder="Enter project name"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label className="font-extrabold">Address*</Form.Label>
                <Form.Control
                  type="text"
                  value={formValues['address']}
                  onChange={handleFormInput}
                  placeholder="Enters short project address"
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="city">
                <Form.Label className="font-extrabold">City*</Form.Label>
                <Form.Control
                  type="text"
                  value={formValues['city']}
                  onChange={handleFormInput}
                  placeholder="Enter project city"
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="country">
                <Form.Label className="font-extrabold">Country*</Form.Label>
                <Form.Control
                  type="text"
                  value={formValues['country']}
                  onChange={handleFormInput}
                  placeholder="Enter project country"
                  isInvalid={!!errors.country}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="state">
                <Form.Label className="font-extrabold">State</Form.Label>
                <Form.Control
                  type="text"
                  value={formValues['state']}
                  onChange={handleFormInput}
                  placeholder="Enter state"
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="concepts">
                <Form.Label className="font-extrabold">Concepts</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) =>
                      setConcept(e.target.value && e.target.value)
                    }
                  >
                    <option>Select a concept</option>
                    {mainConcepts.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={addConcept}
                  >
                    Add Item
                  </Button>
                </InputGroup>
                {formValues.concepts?.length > 0 && (
                  <Form.Text id="conceptsBlock" muted>
                    Your concepts are:{' '}
                    {formValues.concepts.map((item, index, array) => {
                      return (
                        <span key={item}>
                          {item}
                          {index === array.length - 1 ? '' : ', '}
                        </span>
                      );
                    })}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col xs={12} sm={6}>
              <Form.Group className="mb-3" controlId="contactEmail">
                <Form.Label className="font-extrabold">
                  Contact Email*
                </Form.Label>
                <Form.Control
                  type="email"
                  value={formValues['contactEmail']}
                  onChange={handleFormInput}
                  placeholder="Enter a contact email"
                  isInvalid={!!errors.contactEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactEmail}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="link">
                <Form.Label className="font-extrabold">
                  Project Link*
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formValues['link']}
                  onChange={handleFormInput}
                  placeholder="Enter project link"
                  isInvalid={!!errors.link}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.link}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="status">
                <Form.Label className="font-extrabold">
                  Project Status*
                </Form.Label>
                <Form.Select
                  value={formValues['status']}
                  aria-label="Default select example"
                  onChange={(e) => handleFormInput(e)}
                  isInvalid={!!errors.status}
                >
                  <option>Select an option*</option>
                  <option value="planned">Planned</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cetified">Certified</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="ghgPuller">
                <Form.Label className="font-extrabold">
                  Greenhouse Gas Puller*
                </Form.Label>
                <Form.Select
                  value={formValues['ghgPuller']}
                  aria-label="Default select Greenhouse Gas"
                  onChange={(e) => handleFormInput(e)}
                  isInvalid={!!errors.ghgPuller}
                >
                  <option>Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="might-be">Might Be</option>
                  <option value="unknown">Unknown</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.ghgPuller}
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group className="mb-3" controlId="implementers">
                <Form.Label className="font-extrabold">Implementers</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter a project implementer"
                    aria-label="Enter a project implementer"
                    aria-describedby="implementersBlock"
                    value={implementer}
                    onChange={(e) => setImplementer(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={addImplementer}
                  >
                    Add Item
                  </Button>
                </InputGroup>
                {formValues.implementers?.length > 0 && (
                  <Form.Text id="implementerBlock" muted>
                    Your implementers are:{' '}
                    {formValues.implementers?.map((item, index, array) => {
                      return (
                        <span key={item}>
                          {item}
                          {index === array.length - 1 ? '' : ', '}
                        </span>
                      );
                    })}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className={`${styles.editor}`}>
          <Form.Label className="font-extrabold">Description</Form.Label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName={`${styles.wrapper_class}`}
            editorClassName={`${styles.editor_class}`}
            toolbarClassName={`${styles.toolbarc_lass}`}
          />
        </div>
        {editMode ? (
          <div className="flex justify-center my-2 gap-2">
            <Button
              style={{
                borderRadius: '20px',
                width: '130px',
                padding: '0.4em 2em',
              }}
              variant="success"
              onClick={editProject}
            >
              UPDATE
            </Button>

            <Button
              style={{
                borderRadius: '20px',
                width: '130px',
                padding: '0.4em 2em',
              }}
              variant="success"
              onClick={onCloseEditMode}
            >
              CANCEL
            </Button>
          </div>
        ) : (
          <div className="flex justify-center my-2">
            <Button
              style={{
                borderRadius: '20px',
                width: '130px',
                padding: '0.4em 2em',
              }}
              variant="success"
              onClick={saveProject}
            >
              SAVE
            </Button>
          </div>
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
