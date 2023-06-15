import React from 'react';
import styles from './index.module.scss';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Concept } from '@src/models/concept';


interface Props {
  concepts: Concept[];
  onHandleSelectConcept: (item: Concept) => void;
  searchTerm?: string;
}

export default function ConceptsNavBar({
  concepts,
  onHandleSelectConcept,
  searchTerm,
}: Props) {
  const handleClick = (item: Concept) => {
    onHandleSelectConcept(item);
  };
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.header}`}>
        <h3 className="font-extrabold">List of Concepts</h3>
      </div>
      <div className={`${styles.list}`}>
        <ListGroup>
          {concepts
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm?.toLowerCase() ?? '')
            )
            .map((item: Concept) => {
              return (
                <ListGroupItem
                  className={`${styles.list_item} my-1`}
                  onClick={() => handleClick(item)}
                >
                  {item.name}
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </div>
    </div>
  );
}
