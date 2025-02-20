import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

const Login = () => {
  return (
    <>
    <NavBar></NavBar>
    <div className='container'>

      <div className="row mt-3 h-100">
        <h1 className="col-6 offset-3">LogIn on Recipe Maker</h1>
        <br></br><br></br>
          <div className="col-6 offset-3">
            <form action="/login" method="post" className="needs-validation">
              <div className="mb-3">
                <label for="username" className="form-label">Username</label>
                <input type="text" name="username" id="username" className="form-control" required></input>
                <div className="invalid-feedback">Username should be valid</div>
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" name="password" id="password" className="form-control" required></input>
                <div className="invalid-feedback">Password should be valid</div>
              </div>
              <button className="btn btn-success">LogIn</button>
            </form>
          </div>
        </div>
    </div>
        <Footer></Footer>
        </>
        )
}

        export default Login
