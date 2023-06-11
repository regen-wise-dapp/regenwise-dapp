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
    <HomePageLayout style={{ padding: '2em 5em' }}>
      <div className={`${styles.main_container}`}>
        <h1
          className={`${styles.header} ${creepster.className} text-4xl md:text-8xl md:font-size-30px`}
        >
          <p className={`${styles.word1} ${styles.word}`}>REGENWISE IS HERE</p>
          <p className={`${styles.word2} ${styles.word}`}>TO SHARE</p>
          <p className={`${styles.word3} ${styles.word}`}>SOME OF THE</p>
          <p className={`${styles.word4} ${styles.word}`}>
            MOST IMPORTANT INFO
          </p>
          <p className={`${styles.word5} ${styles.word}`}>
            OF THE PLANET EARTH
          </p>
        </h1>
        <div className={`${styles.content_container}`}>
          <div
            className={`${styles.left_content} flex-1 flex justify-center items-center flex-col`}
          >
            <div
              className={`${styles.image_container}`}
              onClick={openSkullPage}
            >
              <Image
                src="/banner/carbon_0a.jpg"
                alt="excess carbon emission"
                width={500}
                height={500}
              />
              <div className={`${styles.title_container}`}>
                <h2
                  className="font-extrabold text-center"
                  style={{ zIndex: '12' }}
                >
                  Degradation
                </h2>
              </div>
            </div>
          </div>
          <div
            className={`${styles.right_content} flex-1 flex justify-center items-center flex-col`}
          >
            <div
              className={`${styles.image_container}`}
              onClick={scrollToSection}
            >
              <Image
                src="/banner/carbon_1a.jpg"
                alt="excess neutralization"
                width={500}
                height={500}
              />
              <div className={`${styles.title_container}`}>
                <h2
                  className="font-extrabold text-center"
                  style={{ zIndex: '12' }}
                >
                  Regeneration
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimationModal isOpen={isOpen} onClose={handleClose} />
    </HomePageLayout>
  );
}
