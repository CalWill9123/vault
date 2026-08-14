import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const {user,logout} = useAuth()
  return (
    <nav className="flex items-center gap-6 border-b border-gray-800 bg-gray-950 px-6 py-4">
      <Link to="/" className="text-xl font-bold text-white [-webkit-text-stroke:0.5px_theme(colors.green.500)]">
        Vault
      </Link>

      {user ? (
        <>
          <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white">
            Dashboard
          </Link>
          <button
            onClick={logout}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white">
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
