import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {NavLink, useNavigate } from 'react-router-dom'
import '../login/login.css'

const Login = ({ setview }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const [error, setError] = useState('')

    const submitdata = event => {

        event.preventDefault()
        console.log(username, password)

        const user_data = {

            username: username,
            password: password
        }

        axios.post('http://127.0.0.1:8001/user/validate/', user_data)
            .then(response => {

                console.log(response.data)

                localStorage.setItem("Bearer", response.data.access_token)
                localStorage.setItem("vaild_user", true)
                localStorage.setItem("refresh_token", response.data.refresh_token)

                if (response.data.status === false) setError(response.data.message)
                else {

                    navigate('/laptop')
                    setview(true)

                }

            })
            .catch(error => console.log(error))
    }

    useEffect(() => {

        const fetchToken = async () => {

            const refresh_token = localStorage.getItem("refresh_token")

            console.log("logging")

            axios.post('http://127.0.0.1:8001/user/token/', { refresh_token: refresh_token })
                .then(response => {

                    localStorage.getItem('Bearer', response.data.access_token)

                })
                .catch(error => console.log(error))

        }

        fetchToken()
        setInterval(fetchToken, 30000)

    }, [])


    return (

        <div className='back' style={{paddingLeft:"20rem"}}>



        <div className='logg'>

            <h3 className='text-center' style={{color:""}}>Login</h3>

            <form action="">

                <label  style={{color:""}}>Username :</label>
                <input type="text" className='form-control inp' placeholder='enter your email' value={username} onChange={event => setUsername(event.target.value)} />

                <label style={{color:""}}>Password : </label>  <br />
                <input type="password" className='form-control inp' placeholder='password' value={password} onChange={event => setPassword(event.target.value)} /> <br />

                <p style={{ color:"red" }}>{error}</p>

                <button type='button' className='btn logbut' onClick={submitdata}>Login</button>
                <br /> <br />
                <NavLink className={"nav-link signup"} to={'/signup/'} target='_self'><u>Don't have an account ? sign Up</u></NavLink>


            </form>

        </div>
    </div>

     
    )
}

export default Login