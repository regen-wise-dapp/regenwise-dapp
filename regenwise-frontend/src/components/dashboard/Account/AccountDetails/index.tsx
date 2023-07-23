import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Form, Modal } from 'react-bootstrap';
import { User } from '@src/models/user';
import DashboardHeader from '../../shared/DashboardHeader';
import { Auth } from '@polybase/auth';
import { Polybase } from '@polybase/client';
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth';
import { fetchUserInfo } from '@slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/index';

interface Props {
  user: User;
}

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

export default function AccountDetails({ user }: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<any>({} as any);
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

  useEffect(() => {
    if (user !== undefined) {
      setFormValues(user);
    }
  }, [user]);

  const handleFormInput = (e: any) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const saveAccountDetails = () => {
    const isValid = validateForm();
    if (isValid) {
      updateAccount().then(() => {
        setIsEditable(false);
        setModalTitle('SUCCESS!');
        setModalMessage('Your account info was saved successfully!');
        setIsDeleteModal(false);
        setOpen(true);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    setModalTitle('ATTENTION!');
    setModalMessage(
      'Are you sure to delete your account. This operation is irreversible!'
    );
    setIsDeleteModal(true);
    setOpen(true);
  };

  const onHandleDelete = async () => {
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

    // Delete user
    try {
      await db
        .collection('user')
        .record(pKey)
        .call('del')
        .then(() => {
          dispatch(fetchUserInfo((window as any).ethereum.selectedAddress));
        });
    } catch (e) {
      console.log(e);
    }
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
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email)) {
      newErrors.contactEmail = 'Invalid email format';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  ///////////////////// Polybase Code 2 Beginning ///////////////////////

  async function updateAccount() {
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

    // Update user info
    try {
      await db
        .collection('user')
        .record(pKey)
        .call('updateUser', [
          formValues.name,
          formValues.surname,
          formValues.email,
          formValues.userName ?? '',
        ])
        .then(() => {
          dispatch(fetchUserInfo((window as any).ethereum.selectedAddress));
        });
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
              <Form.Label className="font-extrabold">Name</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.name ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your name"
                readOnly={!isEditable}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="surname">
              <Form.Label className="font-extrabold">Surname</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.surname ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your surname"
                readOnly={!isEditable}
                isInvalid={!!errors.surname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.surname}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="font-extrabold">Email</Form.Label>
              <Form.Control
                type="email"
                value={formValues?.email ?? ''}
                onChange={handleFormInput}
                placeholder="Enter your email"
                readOnly={!isEditable}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userName">
              <Form.Label className="font-extrabold">Username</Form.Label>
              <Form.Control
                type="text"
                value={formValues?.userName ?? ''}
                onChange={handleFormInput}
                readOnly={!isEditable}
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userName}
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
              {!isEditable ? (
                <>
                  <Button
                    style={{
                      borderRadius: '20px',
                      width: '130px',
                      padding: '0.4em 1em',
                    }}
                    variant="success"
                    onClick={() => setIsEditable(true)}
                  >
                    EDIT INFO
                  </Button>
                  <Button
                    style={{
                      borderRadius: '20px',
                      width: '130px',
                      padding: '0.4em 1em',
                    }}
                    variant="danger"
                    onClick={deleteAccount}
                  >
                    DELETE
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    style={{
                      borderRadius: '20px',
                      width: '130px',
                      padding: '0.4em 2em',
                    }}
                    variant="success"
                    onClick={saveAccountDetails}
                  >
                    SAVE
                  </Button>
                  <Button
                    style={{
                      borderRadius: '20px',
                      width: '130px',
                      padding: '0.4em 2em',
                    }}
                    variant="dark"
                    onClick={() => setIsEditable(false)}
                  >
                    CANCEL
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        show={open}
        handleClose={handleClose}
        message={modalMessage}
        title={modalTitle}
        isDeleteModal={isDeleteModal}
        onHandleDelete={onHandleDelete}
      ></CustomModal>
    </div>
  );
}

interface CustomModalInterface {
  show: boolean;
  handleClose: () => void;
  message: string;
  title: string;
  isDeleteModal: boolean;
  onHandleDelete: () => void;
}

const CustomModal = ({
  show,
  handleClose,
  title,
  message,
  isDeleteModal,
  onHandleDelete,
}: CustomModalInterface) => {
  const handleDelete = () => {
    onHandleDelete();
    handleClose();
  };

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
        {isDeleteModal && (
          <Button variant="danger" onClick={handleDelete}>
            DELETE
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
