import {useEffect}  from 'react'


export default function Logout() {
  localStorage.removeItem("user")
  window.location.href="/"
}
