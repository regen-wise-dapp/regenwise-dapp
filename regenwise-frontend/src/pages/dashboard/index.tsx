import styles from './index.module.scss';
import { Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Account from '@src/components/dashboard/Account';
import Purchases from '@src/components/dashboard/Purchases';
import PurchasesTwo from '@src/components/dashboard/PurchasesTwo';
import Stats from '@src/components/dashboard/Stats';
import Projects from '@src/components/dashboard/Projects';
import { User } from '@src/models/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Dashboard() {
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  useEffect(() => {
    if (!(window as any).ethereum.selectedAddress) {
      router.push('/');
    }
  }, [currentUser]);

  const tabComponents = [
    {
      eventKey: 'nftList',
      title: 'MY RW NFTs',
      icon: '/dashboard/nft0.png',
      component: <Purchases />,
      display: !(!currentUser || !(currentUser as User).id),
    },
    {
      eventKey: 'nftListTwo',
      title: 'MY TRE NFTs',
      icon: '/dashboard/nft2.png',
      component: <PurchasesTwo />,
      display: !(!currentUser || !(currentUser as User).id),
    },
/*     {
      eventKey: 'stats',
      title: 'Stats',
      icon: '/dashboard/stats.png',
      component: <Stats />,
      display: !(!currentUser || !(currentUser as User).id),
    }, */
    // {
    //   eventKey: 'editor',
    //   title: 'Projects',
    //   icon: '/dashboard/project.png',
    //   component: currentUser ? (
    //     <Projects projects={(currentUser as User)?.projectsObjects ?? []} />
    //   ) : (
    //     <></>
    //   ),
    //   display: !(!currentUser || !(currentUser as User).id),
    // },
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
          defaultActiveKey="account"
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
