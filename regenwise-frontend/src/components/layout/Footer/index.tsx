function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center bg-[#212529]" style={{ borderTop: "1px solid dimgrey" }}>
      <p className="m-0 py-3 text-white">&copy; {new Date().getFullYear()} RegenWise - keenregen@gmail.com  </p>
    </footer>
  );
}

export default Footer;
