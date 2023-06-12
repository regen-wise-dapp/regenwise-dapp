/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { menuItems } from '@src/constants/menuItems';
import useMediaQuery from '@src/hooks/useMediaQuery';
import { setUser } from '@slices/authenticationSlice';
import { setModalOpen } from '@slices/gameModalSlice';
import { fetchUserInfo } from '@slices/userSlice';
import { AppDispatch } from '@store/index';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => setMenuOpen(false);

  const dispatch = useDispatch<AppDispatch>();
  const matches = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(null);

  async function connectUser() {
    if ((window as any).ethereum) {
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      dispatch(
        setModalOpen([
          'Attention',
          'The request was unsuccessful, is Metamask installed on your browser? If it is, try again. If you think that there is another problem, contact us.',
        ])
      );
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (typeof (window as any).ethereum !== 'undefined') {
        if ((window as any).ethereum.selectedAddress !== null) {
          setSelectedAddress((window as any).ethereum.selectedAddress);
          dispatch(setUser((window as any).ethereum.selectedAddress));
          dispatch(fetchUserInfo((window as any).ethereum.selectedAddress));
        } else if ((window as any).ethereum.selectedAddress === null) {
          setSelectedAddress((window as any).ethereum.selectedAddress);
        }
      }
    }
  }, []);

  //When the connection situation changes, run this
  if (typeof window !== 'undefined') {
    if (typeof (window as any).ethereum !== 'undefined') {
      (window as any).ethereum.on('accountsChanged', () => {
        setSelectedAddress((window as any).ethereum.selectedAddress);
        if ((window as any).ethereum.selectedAddress !== null) {
          dispatch(setUser((window as any).ethereum.selectedAddress));
          dispatch(fetchUserInfo((window as any).ethereum.selectedAddress));
        }
      });
    }
  }

  return (
    <Navbar
      bg="dark"
      variant="dark"
      sticky="top"
      expand={matches}
      style={{ borderBottom: '1px solid dimgrey' }}
    >
      <Container fluid className="flex">
        <Navbar.Brand href="/">
          <Image
            src="/logo.svg"
            width={150}
            height={40}
            alt="logo"
            style={{ backgroundColor: 'transparent' }}
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand`}
          onClick={toggleMenu}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
          show={menuOpen}
          onHide={toggleMenu}
        >
          <Offcanvas.Header
            closeButton
            style={{ backgroundColor: 'MidnightBlue' }}
          >
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
              <Navbar.Brand href="/">
                <Image
                  src="/logo.svg"
                  width={150}
                  height={40}
                  alt="logo"
                ></Image>
              </Navbar.Brand>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="md:bg-[color:#212529]">
            <Nav className="flex flex-1 justify-end items-center">
              {menuItems.map((item) => {
                return (
                  <Link
                    className="px-2 mx-1 no-underline hover:text-gray-300 text-[color:black] md:text-[color:white] w-full md:w-auto 
                    border-gray-700  border-b-2 md:border-b-0 text-3xl md:text-lg py-2 md-py-0"
                    key={item.label}
                    href={`${item.link}`}
                    onClick={handleClose}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {selectedAddress ? (
                <Button
                  variant="success"
                  className="ml-2 w-full md:w-auto mt-[30px] md:mt-[0px]"
                  onClick={() => router.push('/dashboard')}
                >
                  <span className="font-extrabold">Dashboard</span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="ml-2 w-full md:w-auto mt-[30px] md:mt-[0px]"
                  onClick={() => connectUser()}
                >
                  <span className="font-extrabold">Connect Wallet</span>
                </Button>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

