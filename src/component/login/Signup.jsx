import React,{useEffect,useState}from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../login/login.css'

const Signup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [c_pwd, setC_pwd] = useState('')
    const [pwd, setPwd] = useState('')
    const[error,setError] = useState('')

    const submithandle = () => {

        if (c_pwd === pwd) {

            const data = {

                username: email,
                password: pwd,
           

            }

            axios.post("http://127.0.0.1:8001/user/create/", data)
                .then(response => {
                    console.log(response.data)
                    setC_pwd('')
                    setEmail('')
                    setPwd('')
                    navigate('/')
                })
                .catch(error => console.log(error))
        }

        else {

            setError("Enter correct password")

        }
    }





  return (


    <div className='back' style={{ paddingLeft: "20rem" }}>


            <div className='logg' >
                <h3 className='text-center'>Sign Up</h3>

                <form action="">
            
                    <label htmlFor="">Email :</label>
                    <input type="email" className='form-control inp' placeholder='enter your email' value={email} onChange={event => setEmail(event.target.value)} />

                    <label htmlFor=""> Password : </label>  <br />
                    <input type="password" className='form-control inp' placeholder='password' value={pwd} onChange={event => setPwd(event.target.value)} />

                    <label htmlFor=""> confirm Password : </label>  <br />
                    <input type="password" className='form-control inp' placeholder='password' value={c_pwd} onChange={event => setC_pwd(event.target.value)} />
                    <p style={{ color: "red" }}>{error}</p>
                    <br />

                    <button type='button' className='btn logbut' onClick={submithandle}>Sign Up</button>
                    <br /> <br />
                    <NavLink className={"nav-link signup"} to={'/'} target='_self'><u>Already have an account? Login</u></NavLink>


                </form>
            </div>
        </div>

   
  )
}

export default Signup