import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside>
      <div className="sidebarItem">
        <button className="create btn">New Entry</button>
      </div>
      <div className="sidebarItem">
        <NavLink to='/dashboard'>Home</NavLink>
      </div>
      <div className="sidebarItem">
        <NavLink to='/entries'>Entries</NavLink>
      </div>
      <div className="sidebarItem">
        <NavLink to='/profile'>Profile</NavLink>
      </div>
    </aside>
  )
}

