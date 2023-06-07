'use client';
import { menuItems } from '@/constants/menuItems';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => setMenuOpen(false);

  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <Navbar
      variant="dark"
      sticky={matches ? undefined : 'top'}
      expand={matches}
      className="bg-[color:#212529] md:bg-transparent"
    >
      <Container fluid className="flex">
        {!matches ? (
          <Navbar.Brand href="/">
            <Image
              src="/logo.svg"
              width={150}
              height={40}
              alt="logo"
              style={{ backgroundColor: 'transparent' }}
            ></Image>
          </Navbar.Brand>
        ) : (
          <></>
        )}
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
          <Offcanvas.Header closeButton style={{ backgroundColor: '#ffc9eb' }}>
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
          <Offcanvas.Body className='bg-[color:#ffe8f6] md:bg-transparent'>
            <Nav className="flex flex-1 justify-center">
              <div
                className="flex flex-col md:flex-row"
                style={{ maxWidth: '800px', width: '100%' }}
              >
                {matches ? (
                  <Navbar.Brand href="/">
                    <Image
                      src="/logo.svg"
                      width={150}
                      height={40}
                      alt="logo"
                    ></Image>
                  </Navbar.Brand>
                ) : (
                  <></>
                )}
                <div className="flex flex-1 flex-col md:flex-row justify-end items-center">
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
                </div>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
