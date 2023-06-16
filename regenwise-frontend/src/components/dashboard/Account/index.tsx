import { User } from '@src/models/user';
import dynamic from 'next/dynamic';
import AccountRegister from './AccountRegister';

const AccountDetails = dynamic(() => import('./AccountDetails'));
const AccountType = dynamic(() => import('./AccountType'));

interface Props {
  user: User;
}

export default function Account({ user }: Props) {
  const changeUserDetails = (val: User) => {};
  const registerUser = (val: any) => {
    console.log(val);
  };

  return (
    <div>
      {user ? (
        <div>
          <AccountDetails user={user} onChangeUserDetails={changeUserDetails} />
          <AccountType user={user} />
        </div>
      ) : (
        <AccountRegister publicId={''} onRegisterUser={registerUser} />
      )}
    </div>
  );
}
