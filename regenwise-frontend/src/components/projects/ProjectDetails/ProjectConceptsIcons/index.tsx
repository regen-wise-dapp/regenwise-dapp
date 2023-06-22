import React, { useState } from 'react';
import styles from './index.module.scss';
import { Project } from '@src/models/project';
import Image from 'next/image';
import Link from 'next/link';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
  project: Project;
}

const getImage = (id: string) => {
  switch (id) {
    case 'regenerative-education':
      return '/quests/quest-1z.png';

    case 'regeneration':
      return '/quests/quest-1z.png';

    case 'regenerative-energy':
      return '/quests/quest-2z.png';

    case 'regenerative-buildings':
      return '/quests/quest-3z.png';

    case 'regenerative-agriculture-and-forestry':
      return '/quests/quest-4z.png';

    case 'regenerative-fisheries':
      return '/quests/quest-5z.png';

    case 'regenerative-landscaping':
      return '/quests/quest-3z.png';

    case 'regenerative-waste-management':
      return '/quests/quest-6z.png';

    case 'regenerative-water-management':
      return '/quests/quest-5z.png';
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
            const query = { tab: item.id };
            const href = {
              pathname: '/concepts',
              query,
            };
            return (
              <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                <Link
                  href={href}
                  target="_blank"
                  as={`/concepts?tab=${item.id}`}
                  passHref
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
