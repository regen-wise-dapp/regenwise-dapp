import { User } from '@src/models/user';
import dynamic from 'next/dynamic';
import AccountRegister from './AccountRegister';

const AccountDetails = dynamic(() => import('./AccountDetails'));

interface Props {
  user: User;
}

export default function Account({ user }: Props): JSX.Element {
  return (
    <div>
      {user.id ? (
        <div>
          <AccountDetails user={user} />
        </div>
      ) : (
        <AccountRegister />
      )}
    </div>
  );
}
