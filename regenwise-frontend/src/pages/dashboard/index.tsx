import styles from './index.module.scss';
import { Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Account from '@src/components/dashboard/Account';
import Purchases from '@src/components/dashboard/Purchases';
import Stats from '@src/components/dashboard/Stats';
import Projects from '@src/components/dashboard/Projects';

function Dashboard() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const tabComponents = [
    {
      eventKey: 'nftList',
      title: 'MY NFT LIST',
      component: <Purchases />,
      display: true,
    },
    {
      eventKey: 'stats',
      title: 'Stats',
      component: <Stats />,
      display: true,
    },
    {
      eventKey: 'editor',
      title: 'Projects',
      component: <Projects />,
      display: true,
    },
    {
      eventKey: 'account',
      title: 'Account',
      component: currentUser ? <Account user={currentUser[0]} /> : <></>,
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
                  title={item.title}
                  key={item.eventKey}
                >
                  <div className="p-4">{item.component}</div>
                </Tab>
              );
            })}
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;

