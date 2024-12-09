import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../login/login.css'

const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [c_pwd, setC_pwd] = useState('')
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState('')

    const submithandle = () => {
        if (c_pwd === pwd) {
            const data = { username: email, password: pwd }

            axios.post("http://127.0.0.1:8001/user/create/", data)
                .then(response => {
                    console.log(response.data)
                    setC_pwd('')
                    setEmail('')
                    setPwd('')
                    navigate('/')
                })
                .catch(error => console.log(error))
        } else {
            setError("Passwords do not match")
        }
    }

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            

                    <div className="logg" style={{ maxWidth: "400px", width: "100%" }}>

                        <h3 className="text-center mb-4">Sign Up</h3>
                        <form>
                            <div className="mb-3">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={pwd}
                                    onChange={event => setPwd(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    value={c_pwd}
                                    onChange={event => setC_pwd(event.target.value)}
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={submithandle}
                            >
                                Sign Up
                            </button>
                        </form>
                        <div className="mt-3 text-center">
                            <NavLink to="/" className="text-decoration-none">
                                Already have an account? <u>Login</u>
                            </NavLink>

                        </div>
                    </div>
                </div>
       
    )
}

export default Signup
