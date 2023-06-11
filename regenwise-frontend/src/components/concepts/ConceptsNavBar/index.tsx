import React from 'react';
import styles from './index.module.scss';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

interface Props {
  concepts: any;
}

export default function ConceptsNavBar({ concepts }: Props) {
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.header}`}>
        <h3 className="font-extrabold">List of Concepts</h3>
      </div>
      <div className={`${styles.list}`}>
        <ListGroup>
          {concepts.map((item: any) => {
            return <ListGroupItem className="my-1">{item.name}</ListGroupItem>;
          })}
        </ListGroup>
      </div>
    </div>
  );
}
