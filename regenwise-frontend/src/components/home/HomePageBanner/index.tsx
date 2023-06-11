'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';
import { Creepster } from 'next/font/google';
import dynamic from 'next/dynamic';
import HomePageLayout from '../../shared/HomePageLayout';

const AnimationModal = dynamic(() => import('./AnimationModal'));

const creepster = Creepster({
  weight: ['400'],
  subsets: ['latin'],
});
export default function Banner() {
  const scrollToSection = () => {
    document.getElementById('main-page--scope-element')?.scrollIntoView(false);
  };


  return (
    <HomePageLayout>
      <div className={`${styles.main_container} flex flex-row relative`}>
        <h1
          className={`${styles.header} ${creepster.className} text-4xl md:text-8xl md:font-size-30px`}
        >
          <p className={`${styles.word1} ${styles.word}`}>REGENWISE IS HERE</p>
          <p className={`${styles.word2} ${styles.word}`}>TO SHARE</p>
          <p className={`${styles.word3} ${styles.word}`}>SOME OF THE MOST IMPORTANT INFO</p>
          <p className={`${styles.word4} ${styles.word}`}>OF THE PLANET EARTH</p>
          {/* <p className={`${styles.word5} ${styles.word}`}>PRESENTED HERE!</p> */}
        </h1>
        <div
          className={`${styles.left_content} flex-1 flex justify-center items-center flex-col`}
        >
          <Image
            src="/banner/carbon_0a.jpg"
            alt="excess carbon emission"
            width={500}
            height={500}
          />
          <h2 className="mt-4 font-extrabold text-center" style={{"zIndex":"12"}}>Degradation</h2>
        </div>

        <div
          className={`${styles.right_content} flex-1 flex justify-center items-center flex-col`}
        >
          <Image
            src="/banner/carbon_1a.jpg"
            alt="excess neutralization"
            width={500}
            height={500}
            onClick={scrollToSection}
          />
          <h2 className="mt-4 font-extrabold text-center" style={{"zIndex":"12"}} >Regeneration</h2>
        </div>
      </div>
    </HomePageLayout>
  );
}
