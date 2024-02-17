import {
  Navbar,
  NavbarBrand, NavbarContent, NavbarItem,
} from "@nextui-org/react"; 
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAccount } from "wagmi";
import { ZkHire_logo } from "./zkHireLogo";
import { ToastContainer } from "react-toastify";

function MNavbar() {
  const { isConnected } = useAccount();
  return (
    <>      
      <Navbar>
        <NavbarBrand>
          <NavLink to="/"><ZkHire_logo /></NavLink>
        </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4">
          <NavbarItem isActive={window.location.pathname == "/auth/" ? true : false}>
            <NavLink to="/auth/">Sign In</NavLink>
          </NavbarItem>
          <NavbarItem isActive={window.location.pathname == "/jobs/apply/" ? true : false}>
            <NavLink to="/jobs/apply/">Jobs</NavLink>
          </NavbarItem>
          <NavbarItem isActive={window.location.pathname == "/jobs/post/" ? true : false}>
            <NavLink to="/jobs/post/">Hire</NavLink>
          </NavbarItem>
          </NavbarContent>
      </Navbar>
      <div className="grid grid-cols-1 text-center">
        <div className="mx-auto">
          {isConnected ? <ConnectButton /> : null}
        </div>
      </div>
      <div className="text-center">
        <div className="columns-1">
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark" />
        </div>
      </div>
    </>
  );
}

export default MNavbar;