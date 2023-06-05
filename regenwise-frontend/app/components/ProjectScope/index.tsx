'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const SectionHeader = dynamic(() => import('../shared/SectionHeader'));
const HomePageLayout = dynamic(() => import('../shared/HomePageLayout'));
const Navigation = dynamic(() => import('./Navigation'));
const ContentDisplay = dynamic(() => import('./ContentDisplay'));


export default function ProjectScope() {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <HomePageLayout>
      <SectionHeader
        title="Regenerative Practices"
        subtitle="To contribute to the efforts of making our world a healthier place to live, there are some concepts that we should embrace"
      />
      <div className='flex flex-col gap-5' id='main-page--scope-element'>
        <Navigation onChangeItem={(index) => setSelectedItem(index)} />
        <ContentDisplay index={selectedItem} />
      </div>
    </HomePageLayout>
  );
}
