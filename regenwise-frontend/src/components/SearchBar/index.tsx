import { ChangeEventHandler, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Form } from 'react-bootstrap';
import { debounce } from 'lodash';

interface Props {
  onHandleSearch: (val: string) => void;
}

export default function SearchBar({ onHandleSearch }: Props) {
  const [search, setSearch] = useState('');
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    onHandleSearch(search);
  }, [onHandleSearch, search]);

  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <Form.Group
          className="mb-3 w-full font-extrabold text-center"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Search projects with these terms</Form.Label>
          <Form.Control
            style={{ height: '60px', borderRadius: '50px', padding: '0 2em' }}
            type="text"
            value={search}
            placeholder="regenerative agriculture"
            onChange={handleChange}
          />
        </Form.Group>
      </div>
    </div>
  );
}
