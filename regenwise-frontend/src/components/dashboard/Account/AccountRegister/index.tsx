import styles from './index.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { Button, Form, Modal } from 'react-bootstrap';
import { User } from '@src/models/user';
import DashboardHeader from '../../shared/DashboardHeader';
import { Polybase } from '@polybase/client/dist';
import { Auth } from '@polybase/auth';
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/index';
import { fetchUserInfo } from '@slices/userSlice';

///////////////////// Polybase Code 0 Beginning ///////////////////////

const db = new Polybase({
  defaultNamespace: 'regenwise-regen-db',
});

const auth = typeof window !== 'undefined' ? new Auth() : null;

async function getPublicKeyH() {
  const msg = 'Login Process';
  const sig = await auth?.ethPersonalSign(msg);
  const publicKeyH = ethPersonalSignRecoverPublicKey(sig as any, msg);
  return '0x' + publicKeyH.slice(4);
}

///////////////////// Polybase Code 0 End ///////////////////////

export default function AccountRegister() {
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<any>({} as any);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [open, setOpen] = useState(false);
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

  const validateForm = () => {
    const newErrors = {} as any;

    // Validate the required fields
    if (!formValues.name) {
      newErrors.name = 'Name is required';
    }
    if (!formValues.surname) {
      newErrors.surname = 'Surname is required';
    }
    if (!formValues.userName) {
      newErrors.username = 'Username is required';
    }
    if (!formValues.email) {
      newErrors.email = 'Contact email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveAccount = ()=>{

    const isValid = validateForm();
    if (isValid) {
      saveAccountDetails().then(()=>{
        setModalTitle('SUCCESS!');
        setModalMessage('Your account info was saved successfully!');
        setOpen(true);
      })
    }
  }

  ///////////////////// Polybase Code 1 Beginning ///////////////////////

  async function saveAccountDetails() {
    const res = await auth?.signIn();

    // if publickey was received
    let publicKeyH = (res as any).publicKey;
    let pKey = (window as any).ethereum.selectedAddress;
    if (!publicKeyH) {
      publicKeyH = await getPublicKeyH();
    }

    if (auth) {
      db.signer(async (data: string) => {
        return {
          h: 'eth-personal-sign',
          sig: await auth?.ethPersonalSign(data),
        };
      });
    }

    // Add user if not exists
    try {
      const userData = (await db.collection('user').record(pKey).get()).data;
      if (!userData) {
        await db
          .collection('user')
          .create([
            pKey,
            publicKeyH,
            formValues.name,
            formValues.surname,
            formValues.email,
            formValues.userName,
            formValues.date,
            [],
            [],
            '',
            'standard',
          ]);
        dispatch(fetchUserInfo((window as any).ethereum.selectedAddress));
      }
    } catch (e) {
      console.log(e);
    }
  }

  ///////////////////// Polybase Code 2 End ///////////////////////

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
              <Form.Label className="font-extrabold">Name*</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.name ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your name"
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="surname">
              <Form.Label className="font-extrabold">Surname*</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.surname ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your surname"
                isInvalid={!!errors.surname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.surname}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="font-extrabold">Email*</Form.Label>
              <Form.Control
                type="email"
                value={formValues?.email ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your email"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userName">
              <Form.Label className="font-extrabold">Username*</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.userName ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your username"
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="publicId">
              <Form.Label className="font-extrabold">Public Id</Form.Label>
              <Form.Control
                type="text"
                value={(window as any).ethereum.selectedAddress}
                onChange={handleFormInput}
                disabled
              />
            </Form.Group>
            <div className="flex justify-center gap-2">
              <Button
                style={{
                  borderRadius: '20px',
                  width: '130px',
                  padding: '',
                }}
                variant="success"
                onClick={saveAccount}
              >
                REGISTER
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        show={open}
        handleClose={handleClose}
        message={modalMessage}
        title={modalTitle}
      ></CustomModal>
    </div>
  );
}

interface CustomModalInterface {
  show: boolean;
  handleClose: () => void;
  message: string;
  title: string;
}

const CustomModal = ({
  show,
  handleClose,
  title,
  message,
}: CustomModalInterface) => {

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};