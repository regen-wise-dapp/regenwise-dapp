import styles from './index.module.scss';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { User } from '@src/models/user';
import setSlugify from '@src/utils/setSlugify';

const DashboardHeader = dynamic(() => import('../../shared/DashboardHeader'));
interface Props {
  user: User;
}

export default function AccountType({ user }: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.wrapper}`}>
        <DashboardHeader header="ACCOUNT TYPE" />
        <div className={`${styles.content}`}>
          <div className="w-full">
            <p className="">
              Your current account is{' '}
              <span className="font-extrabold text-orange-700">
                {user.userName?.toUpperCase()}
              </span>{' '}
              account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

