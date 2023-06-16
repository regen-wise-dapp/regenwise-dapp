import styles from './index.module.scss';
import { Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Account from '@src/components/dashboard/Account';
import Purchases from '@src/components/dashboard/Purchases';
import Stats from '@src/components/dashboard/Stats';
import Projects from '@src/components/dashboard/Projects';
import { User } from '@src/models/user';
import Image from 'next/image';

function Dashboard() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const tabComponents = [
    {
      eventKey: 'nftList',
      title: 'MY NFTs',
      icon: '/dashboard/nft.png',
      component: <Purchases />,
      display: true,
    },
    {
      eventKey: 'stats',
      title: 'Stats',
      icon: '/dashboard/stats.png',
      component: <Stats />,
      display: true,
    },
    {
      eventKey: 'editor',
      title: 'Projects',
      icon: '/dashboard/project.png',
      component: currentUser ? (
        <Projects projects={(currentUser as User)?.projectsObjects ?? []} />
      ) : (
        <></>
      ),
      display: true,
    },
    {
      eventKey: 'account',
      title: 'Account',
      icon: '/dashboard/user.png',
      component: currentUser ? <Account user={currentUser} /> : <></>,
      display: true,
    },
  ];
  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <Tabs
          defaultActiveKey="nftList"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          {tabComponents
            .filter((f) => f.display === true)
            .map((item) => {
              return (
                <Tab
                  eventKey={item.eventKey}
                  title={
                    <div className="flex flex-col items-center">
                      <Image
                        className="mb-2"
                        src={item.icon}
                        alt={item.title}
                        width={60}
                        height={60}
                      ></Image>
                      <p className="mb-0 text-sm md:text-base">{item.title}</p>
                    </div>
                  }
                  key={item.eventKey}
                >
                  <div className="p-4 ">{item.component}</div>
                </Tab>
              );
            })}
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
