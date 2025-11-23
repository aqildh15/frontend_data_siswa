import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Peserta from "./components/pages/Peserta"
import EditPeserta from "./components/pages/EditPeserta"

export default function App() {

  return (
    <React.StrictMode> {/* untuk memastikan file di dalamnya itu tersedia, hanya digunakan saat development */}
      <BrowserRouter>
      <div>
      {/* Navbar memberikan detail url */}
      <Navbar />
      {/* Menangkap URL dan menyesuaikan 
      ke halaman body */}

      <Routes>
        <Route path = "/" element = {<Peserta />} />
        <Route path = "edit/:id" element = {<EditPeserta />} />
      </Routes>
      </div>
      </BrowserRouter>
    </React.StrictMode>
    
  )
}