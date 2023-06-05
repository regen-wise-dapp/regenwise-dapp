'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';
import { Creepster } from 'next/font/google';
import dynamic from 'next/dynamic';

const AnimationModal = dynamic(() => import('./AnimationModal'));
const HomePageLayout = dynamic(() => import('../shared/HomePageLayout'));

const creepster = Creepster({
  weight: ['400'],
  subsets: ['latin'],
});
export default function Banner() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = () => {
    document.getElementById('main-page--scope-element')?.scrollIntoView(false);
  };

  const openSkullPage = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <HomePageLayout>
      <div className={`${styles.main_container} flex flex-row relative`}>
        <h1
          className={`${styles.header} ${creepster.className} text-4xl md:text-8xl`}
        >
          <p className={`${styles.word1} ${styles.word}`}>CHOOSE</p>
          <p className={`${styles.word2} ${styles.word}`}>YOUR </p>
          <p className={`${styles.word3} ${styles.word}`}>WORLD </p>
          <p className={`${styles.word4} ${styles.word}`}>TO </p>
          <p className={`${styles.word5} ${styles.word}`}>LIVE!</p>
        </h1>
        <div
          className={`${styles.left_content} flex-1 flex justify-center items-center flex-col`}
        >
          <Image
            src="/banner/carbon_3.png"
            alt="excess carbon emission"
            width={500}
            height={500}
            onClick={openSkullPage}
          />
          <h2 className="mt-4 font-extrabold text-center">Polluted</h2>
        </div>

        <div
          className={`${styles.right_content} flex-1 flex justify-center items-center flex-col`}
        >
          <Image
            src="/banner/carbon_2.png"
            alt="excess neutralization"
            width={500}
            height={500}
            onClick={scrollToSection}
          />
          <h2 className="mt-4 font-extrabold text-center">Regenerated</h2>
        </div>
      </div>
      <AnimationModal isOpen={isOpen} onClose={handleClose} />
    </HomePageLayout>
  );
}
