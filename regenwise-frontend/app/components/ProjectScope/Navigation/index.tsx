'use client';
import { scopeItems } from '@/constants/scopeItems';
import React, { useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { ScopeItem } from '@/models/scopeItems';

interface Props {
  onChangeItem: (index: number) => void;
}

export default function Navigation(props: Props) {
  const [selected, setSelected] = useState(0);

  const changeSelectedItem = (index: number) => {
    setSelected(index);
    props.onChangeItem(index);
  };

  return (
    <div className={styles.main_container}>
      {scopeItems.map((item: ScopeItem, index: number) => {
        return (
          <div
            key={item.id}
            style={{
              backgroundColor: item.backgroundColor,
              borderBottom: selected === index ? '10px solid orange' : 'none',
              borderTop: selected === index ? '10px solid orange' : 'none',
            }}
            className={`${styles.cockpit_item}`}
            onClick={() => changeSelectedItem(index)}
          >
            <Image width={48} height={48} src={item.icon} alt={item.title} />
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}
