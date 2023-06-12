import { User } from '@/models/user';
import dynamic from 'next/dynamic';

const AccountDetails = dynamic(() => import('./AccountDetails'));
const AccountType = dynamic(() => import('./AccountType'));

interface Props {
  user: User;
}

export default function Account({ user }: Props) {
  const changeUserDetails = (val: User) => {};

  return (
    <div>
      {user ? (
        <div>
          <AccountDetails user={user} onChangeUserDetails={changeUserDetails} />
          <AccountType user={user} />
        </div>
      ) : (
        <div>No user found...</div>
      )}
    </div>
  );
}
