import Logo from "./Logo";
import Nav from "./Nav";

function Header() {
  return (
    <>
      <header className="bg-black text-white sticky top-0 flex-wrap z-[20] mx-auto flex justify-between items-center p-8">
        <Logo />
        <Nav />
      </header>
    </>
  );
}

export default Header;
