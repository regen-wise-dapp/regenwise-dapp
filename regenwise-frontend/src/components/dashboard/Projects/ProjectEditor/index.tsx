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

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

interface Props {
  project: string;
}

export default function ProjectEditor(props: Props) {
  const [implementer, setImplementer] = useState<string>('');
  const [concept, setConcept] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<any>({} as any);
  const [formValues, setFormValues] = useState({
    name: '',
    city: '',
    country: '',
    state: '',
    status: '',
    address: '',
    ghgPuller: '',
    isInstitutional: false,
    link: '',
    contactEmail: '',
    implementers: [] as string[],
    concepts: [] as string[],
    date: new Date(),
  });
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
    if (!formValues.isInstitutional) {
      newErrors.isInstitutional = 'Personal/institutional is required';
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
    let detailedInformationEditor = null;
    if (props.project) {
      const blocksFromHTML = convertFromHTML(props.project);
      const universityInfo = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      detailedInformationEditor = EditorState.createWithContent(universityInfo);
      setEditorState(detailedInformationEditor);
    }
  }, [props.project]);

  const saveProject = () => {
    const isValid = validateForm();
    if (isValid) {
      let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const finalFormObject = {
        ...formValues,
        description: html,
      };
      //do backend post request in here, use debounce mechanism as well
      // setOpen(true);
    }
  };

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
  };

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.wrapper}`}>
        <DashboardHeader header="NEW PROJECT" />
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
                    onChange={(e) => setConcept(e.target.value)}
                  >
                    <option>Select a concept</option>
                    {mainConcepts.map((item) => {
                      return <option value={item.value}>{item.name}</option>;
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
                {formValues.concepts.length > 0 && (
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
                  Contact email*
                </Form.Label>
                <Form.Control
                  type="email"
                  value={formValues['contactEmail']}
                  onChange={handleFormInput}
                  placeholder="Enter project email"
                  isInvalid={!!errors.contactEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactEmail}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="link">
                <Form.Label className="font-extrabold">
                  Project link*
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
                  Greenhouse Gas*
                </Form.Label>
                <Form.Select
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

              <Form.Group className="mb-3" controlId="isInstitutional">
                <Form.Label className="font-extrabold">
                  Personal/Institutional*
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => handleFormInput(e)}
                  isInvalid={!!errors.isInstitutional}
                >
                  <option>Select an option</option>
                  <option value={false as any}>Personal</option>
                  <option value={true as any}>Institutional</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.isInstitutional}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="implementers">
                <Form.Label className="font-extrabold">Implementers</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter an project implementer"
                    aria-label="Enter an project implementer"
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
                {formValues.implementers.length > 0 && (
                  <Form.Text id="implementerBlock" muted>
                    Your implementers are:{' '}
                    {formValues.implementers.map((item, index, array) => {
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
