import { User } from '@src/models/user';
import dynamic from 'next/dynamic';
import AccountRegister from './AccountRegister';

const AccountDetails = dynamic(() => import('./AccountDetails'));
const AccountType = dynamic(() => import('./AccountType'));

interface Props {
  user: User;
}

export default function Account({ user }: Props): JSX.Element {
  const changeUserDetails = (val: User) => {};


  return (
    <div>
      {user.id ? (
        <div>
          <AccountDetails user={user}  />
          <AccountType user={user} />
        </div>
      ) : (
        <AccountRegister  />
      )}
    </div>
  );
}
