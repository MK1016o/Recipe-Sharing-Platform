import React from 'react'

const NavBar = () => {
  return (
    <>
            <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
                <div className="container-fluid bg-body">
                    <a className="navbar-brand" href="/"><i className="fa-regular fa-compass"></i></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link text-center" href="/">Home</a>
                        </div>

                        <div className="navbar-nav ms-auto">
                            <form className="d-flex" role="search" action="/search">
                                <input className="form-control me-2 search-inp" type="search" name="value" placeholder="Search Recipe"></input>
                                    <button className="btn search-btn" type="submit"><i className="fa-solid fa-magnifying-glass"></i>Search</button>
                            </form>
                        </div>

                        <div className="navbar-nav ms-auto text-center">
                            <a className="nav-link" href="/new">Add New Recipe</a>
                            
          <a className="nav-link" href="/logout"><b>Log out</b></a>

                        </div>
                    </div>
                </div>
            </nav>
        </>
  )
}

export default NavBar
