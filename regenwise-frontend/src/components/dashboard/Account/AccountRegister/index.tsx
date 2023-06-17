import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Form, Modal } from 'react-bootstrap';
import { User } from '@src/models/user';
import DashboardHeader from '../../shared/DashboardHeader';
import { Polybase } from '@polybase/client/dist';
import { Auth } from '@polybase/auth'
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth'

///////////////////// Polybase Code 0 Beginning ///////////////////////

const db = new Polybase({
  defaultNamespace: 'regenwise-regen-db',
});

const auth = typeof window !== "undefined" ? new Auth() : null;

async function getPublicKeyH() {
  const msg = 'Login Process'
  const sig = await auth?.ethPersonalSign(msg)
  const publicKeyH = ethPersonalSignRecoverPublicKey((sig as any), msg)
  return '0x' + publicKeyH.slice(4)
}

///////////////////// Polybase Code 0 End ///////////////////////

interface Props {
  publicId: string;
  onRegisterUser: (val: User) => void;
}

export default function AccountRegister({ publicId, onRegisterUser }: Props) {

  ///////////////////// Polybase Code 1 Beginning ///////////////////////

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)

  ///////////////////// Polybase Code 1 End ///////////////////////

  const [formValues, setFormValues] = useState<User>({
    id: '',
    name: '',
    surname: '',
    email: '',
    date: new Date(),
    image: '',
    nftCids: [],
    points: '',
    projects: [],
    projectObjects: [],
    publicKeyH: '',
    role: '',
    userName: '',
  } as User);

  const handleFormInput = (e: any) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  ///////////////////// Polybase Code 2 Beginning ///////////////////////

  async function signIn ( /*valuesToAdd:any*/ )  {
    const res = await auth?.signIn()

    // if publickey was received
    let publicKeyH = (res as any).publicKey
    let pKey = window.ethereum.selectedAddress;
    if (!publicKeyH) {
      publicKeyH = await getPublicKeyH();
    }

    console.log("PublicKeyH is: ", publicKeyH);

    if (auth) {
    db.signer(async (data: string) => {
      return {
        h: 'eth-personal-sign',
        sig: await auth?.ethPersonalSign(data),
      }
    })
  }

        // Add user if not exists
        try {
          const userData = (await db.collection('user').record(pKey).get()).data
          if (userData) {
          console.log('Userrrrrrr', userData)
          }
          else {
          await db.collection('user').create([pKey, publicKeyH /*,valuesToAdd*/])
          }
        } catch (e) {
          console.log(e);
        };
    
        setIsLoggedIn(!!res)
      }

      // useEffect(() => {
      //   auth?.onAuthUpdate((authState) => {
      //     setIsLoggedIn(!!authState)
    
      //     db.signer(async (data: string) => {
      //       return {
      //         h: 'eth-personal-sign',
      //         sig: await auth?.ethPersonalSign(data),
      //       }
      //     })
      //   })
      // })

  ///////////////////// Polybase Code 2 End ///////////////////////

  const saveAccountDetails = async() => {
    /* form values should be added in this order: name, surname, email, userName, date */
    signIn(/*[]*/);
    onRegisterUser(formValues);
  };

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.wrapper}`}>
        <DashboardHeader header="ACCOUNT DETAILS" />
        <div className={`${styles.content}`}>
          <div className={`${styles.image_container}`}>
            <Image
              width={350}
              height={350}
              src={
                formValues?.image
                  ? `/users/${formValues?.image}.png`
                  : `/users/no_user.png`
              }
              alt="user_image"
            />
          </div>
          <div className={`${styles.information_container}`}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="font-extrabold">User Name</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.name ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="surname">
              <Form.Label className="font-extrabold">User Surname</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.surname ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your surname"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="font-extrabold">User email</Form.Label>
              <Form.Control
                type="email"
                value={formValues?.email ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="font-extrabold">Username</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.userName ?? ''}
                onChange={handleFormInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="publicId">
              <Form.Label className="font-extrabold">Public Id</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.id?.toLocaleUpperCase() ?? ''}
                onChange={handleFormInput}
                disabled
              />
            </Form.Group>
            <div className="flex justify-center gap-2">
              <Button
                style={{
                  borderRadius: '20px',
                  width: '130px',
                  padding: '0.4em 2em',
                }}
                variant="success"
                onClick={saveAccountDetails}
              >
                REGISTER
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
