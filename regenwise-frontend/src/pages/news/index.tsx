'use client';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import ConceptItem from '@src/components/concepts/ConceptItem';
import ConceptsNavBar from '@src/components/concepts/ConceptsNavBar';
import SearchBar from '@src/components/shared/SearchBar';
import { Concept } from '@src/models/concept';
import { fetcherWithNoCache } from '@src/utils/fetcher';

interface Props {
  concepts: Concept[];
}


export default function News({ concepts }: Props) {


  return (
    <div className={styles.main_container}>

      <div className={styles.content_container}>


      </div>
    </div>
  );
}
