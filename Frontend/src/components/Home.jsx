import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Recipe from './Recipe'

const Home = () => {
    return (
        <>
        <NavBar></NavBar>
        <div className="container">
            <div className='flex flex-colrow row-cols-lg-3 row cols-md-2 row-cols-sm-1 mt-3 mb-3'>
                <Recipe name={'Hello'}></Recipe>
                <Recipe name={'Hello'}></Recipe>
                <Recipe name={'Hello'}></Recipe>
                <Recipe name={'Hello'}></Recipe>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}

export default Home
