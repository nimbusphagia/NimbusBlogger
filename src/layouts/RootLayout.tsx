import { Outlet, NavLink } from "react-router-dom"

export default function RootLayout() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>
      <Outlet />
      <footer>
        <p>Nimbusphagia</p>
      </footer>
    </>
  )
}
