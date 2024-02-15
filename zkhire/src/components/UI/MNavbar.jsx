import {
  Navbar, NavbarBrand,
  NavbarContent, NavbarItem
} from "@nextui-org/react";
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function MNavbar() {
  return (
    <div>
        <Navbar>
            <NavbarBrand><NavLink to="/" style={{textDecoration:"none", color:"black"}}>zkHire</NavLink></NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4">
            <NavbarItem>
              <NavLink style={{textDecoration:"none"}} to="/auth/">Sign In</NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink style={{textDecoration:"none"}} to="/jobs/apply/">Jobs</NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink style={{textDecoration:"none"}} to="/jobs/post/">Hire</NavLink>
            </NavbarItem>
            </NavbarContent>
        </Navbar>
        <Outlet />  
    </div>
  );
}

export default MNavbar;