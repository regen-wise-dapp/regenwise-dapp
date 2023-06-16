import React, { useState } from 'react';
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
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import DashboardHeader from '../../shared/DashboardHeader';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

interface Props {
  project: string;
}

export default function ProjectEditor(props: Props) {
  const [tag, setTag] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    shortDescription: '',
    tags: [] as string[],
    categories: [] as string[],
    date: new Date(),
  });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  React.useEffect(() => {
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

  const handleText = () => {
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const finalFormObject = {
      ...formValues,
      content: html,
    };
    //do backend post request in here, use debounce mechanism as well
    setOpen(true);
  };

  const addTag = () => {
    setFormValues((prev) => {
      const currentTags = [...prev.tags] as string[];
      currentTags.push(tag);
      setTag('');
      return { ...prev, tags: currentTags };
    });
  };

  const addCategory = () => {
    setFormValues((prev) => {
      const currentCategories = [...prev.categories] as string[];
      currentCategories.push(category);
      setCategory('');
      return { ...prev, categories: currentCategories };
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
          <Form.Group className="mb-3" controlId="title">
            <Form.Label className="font-extrabold">Title</Form.Label>
            <Form.Control
              type="text"
              value={formValues['title']}
              onChange={handleFormInput}
              placeholder="Enter project title"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="shortDescription">
            <Form.Label className="font-extrabold">
              Short Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formValues['shortDescription']}
              onChange={handleFormInput}
              placeholder="Enters short project description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="tags">
            <Form.Label className="font-extrabold">Tags</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter an project tag"
                aria-label="Enter an project tag"
                aria-describedby="tagsBlock"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={addTag}
              >
                Add Item
              </Button>
            </InputGroup>
            {formValues.tags.length > 0 && (
              <Form.Text id="tagsBlock" muted>
                Your tags are:{' '}
                {formValues.tags.map((item, index, array) => {
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

          <Form.Group className="mb-3" controlId="categories">
            <Form.Label className="font-extrabold">Categories</Form.Label>
            <InputGroup className="mb-3">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select a category</option>
                <option value="Regenerative Agriculture">
                  Regenerative Agriculture
                </option>
                <option value="Regenerative Energy">Regenerative Energy</option>
                <option value="Regenerative Buildings">
                  Regenerative Buildings
                </option>
                <option value="Regenerative Forestery">
                  Regenerative Forestery
                </option>
              </Form.Select>
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={addCategory}
              >
                Add Item
              </Button>
            </InputGroup>
            {formValues.categories.length > 0 && (
              <Form.Text id="categoriesBlock" muted>
                Your categories are:{' '}
                {formValues.categories.map((item, index, array) => {
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
        </div>
        <div className={`${styles.editor}`}>
          <Form.Label className="font-extrabold">Content</Form.Label>
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
            onClick={handleText}
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
