import React from 'react'
import logo from '../assets/Bookish.png'

const Navbar = () => {
    return (
       <nav className='bg-gray-50 p-4'>
           <div className='container mx-auto flex justify-between items-center'>
               {/* The logo in the left position */}
               <div className='flex items-center'>
                   <img src={logo} alt="Bookish logo" className='h-50 w-50' />
               </div>
           </div>

       </nav>
    )
};

export default Navbar;
