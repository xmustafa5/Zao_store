

import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Hompg from './../components/Hompg';

const Layout = ({children}) => {
  return (
    <>
    {/* <Navbar/>  */}
    <Hompg/>
    {children}
    <Footer/>
    </>
  )
}

export default Layout