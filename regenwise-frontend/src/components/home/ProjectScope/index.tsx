'use client';
import HomePageLayout from '@src/components/shared/HomePageLayout';
import SectionHeader from '@src/components/shared/SectionHeader';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Navigation = dynamic(() => import('./Navigation'));
const ContentDisplay = dynamic(() => import('./ContentDisplay'));


export default function ProjectScope() {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <HomePageLayout>
      <SectionHeader
        title="Regenerative Practices"
        subtitle="In order to help achieve a healthier Earth as a place to live, there are certain concepts and practices that we should adopt and support"
      />
      <div className='flex flex-col gap-5' >
      <div id='main-page--scope-element'>
        <Navigation onChangeItem={(index) => setSelectedItem(index)} />
        </div>
        <ContentDisplay index={selectedItem} />
        </div>
    </HomePageLayout>
  );
}
