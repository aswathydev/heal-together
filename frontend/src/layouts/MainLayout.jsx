import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FloatingChatButton from "../components/FloatingChatButton";
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

export default function MainLayout() {

  function ScrollToHash() {
    const { hash } = useLocation()
  
    useEffect(() => {
      if (hash) {
        const el = document.getElementById(hash.replace('#', ''))
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }
      }
    }, [hash])
  
    return null
  }


  return (
    <div className="min-h-svh flex flex-col text-slate-800 dark:text-slate-100">
      <Nav />
      <ScrollToHash />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Outlet />
      </main>
      <FloatingChatButton />
      <footer className="border-t border-slate-200/80 dark:border-slate-700/80 py-0 text-center text-sm text-slate-500">
        {/* Heal Together - Mental Wellness Platform
        <p></p> */}
        <Footer />
      </footer>
    </div>
  )
}




