import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Form, Modal } from 'react-bootstrap';
import { User } from '@src/models/user';
import DashboardHeader from '../../shared/DashboardHeader';

interface Props {
  publicId: string;
  onRegisterUser: (val: User) => void;
}

export default function AccountRegister({ publicId, onRegisterUser }: Props) {
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

  const saveAccountDetails = () => {
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
