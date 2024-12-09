import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import '../login/login.css'

const Login = ({ setview }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const submitdata = event => {
        event.preventDefault()
        const user_data = { username, password }

        axios.post('http://127.0.0.1:8001/user/validate/', user_data)
            .then(response => {
                localStorage.setItem("Bearer", response.data.access_token)
                localStorage.setItem("valid_user", true)
                localStorage.setItem("refresh_token", response.data.refresh_token)

                if (response.data.status === false) setError(response.data.message)
                else {
                    navigate('/laptop')
                    localStorage.setItem('nav',true)
                    setview(true)
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        const fetchToken = async () => {
            const refresh_token = localStorage.getItem("refresh_token")
            axios.post('http://127.0.0.1:8001/user/token/', { refresh_token })
                .then(response => {
                    localStorage.setItem('Bearer', response.data.access_token)
                })
                .catch(error => console.log(error))
        }
        fetchToken()
        setInterval(fetchToken, 30000)
    }, [])

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100">

            <div className='logg' style={{ maxWidth: "400px", width: "100%" }}>

                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={submitdata}>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="mt-3 text-center">
                    <NavLink to={'/signup/'} className="text-decoration-none">
                        Don't have an account? <u>Sign Up</u>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Login
