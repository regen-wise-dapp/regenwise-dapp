import React, { useState } from 'react';
import styles from './index.module.scss';
import { ProjectProp } from '@src/models/project';
import Image from 'next/image';
import Link from 'next/link';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
  project: ProjectProp;
}

const getImage = (id: string) => {
  switch (id) {
    case 'regenerative-education':
      return '/quests/quest-1.png';

    case 'regeneration':
      return '/quests/quest-1.png';

    case 'regenerative-energy':
      return '/quests/quest-2.png';

    case 'regenerative-buildings':
      return '/quests/quest-3.png';

    case 'regenerative-agriculture-and-forestry':
      return '/quests/quest-4.png';

    case 'regenerative-fisheries':
      return '/quests/quest-5.png';

    case 'regenerative-landscaping':
      return '/quests/quest-3.png';

    case 'regenerative-waste-management':
      return '/quests/quest-6.png';

    case 'regenerative-water-management':
      return '/quests/quest-5.png';
  }
};

export default function ProjectConceptsIcons({ project }: Props) {
  const [tooltipText, setTooltipText] = useState('');

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );

  const handleMouseEnter = (text: string) => {
    setTooltipText(text);
  };

  const handleMouseLeave = () => {
    setTooltipText('');
  };

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.header_container}`}>
        <h3 className="font-extrabold m-0">Related Concepts</h3>
      </div>
      <div className={`${styles.content_container}`}>
        {project.conceptsObjects?.length > 0 ? (
          project.conceptsObjects.map((item: any) => {
            return (
              <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                <Link
                  href={`/concepts`}
                  className={`${styles.image_container}`}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={`${getImage(item.id) ?? ''}`}
                    fill
                    alt={item.name}
                  ></Image>
                </Link>
              </OverlayTrigger>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
