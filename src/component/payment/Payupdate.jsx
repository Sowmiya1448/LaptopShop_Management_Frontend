import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Payupdate = () => {

    const navigate = useNavigate()
    
    const[paid,setPaid] = useState('')
    const [payid, setPayid] = useState('')
    const [bill, setBill] = useState([])
    const [balanceamount, setBalanceamount] = useState('')
    const [pay, setPay] = useState('')
    const [balance, setBalance] = useState('')
    const params = useParams()
    const { id } = params


    useEffect(() => {

        axios.get(`http://127.0.0.1:8001/payment/all`)
            .then(response => {

                console.log(response.data, "bill")

                setBill(response.data)

            })
            .catch(error => console.log(error))

    }, [])

    useEffect(() => {

        for (let payment of bill) {
            if (payment.customer_ref === id) {
                console.log(payment._id, "sowmiya")
                setPayid(payment._id)

            }
        }
    }, [bill])


    useEffect(() => {


        axios.get(`http://127.0.0.1:8001/payment/${payid}`)
            .then(response => {

                console.log(response.data.paid, "balanceamount")
                setPaid(response.data.paid)
                setBalanceamount(response.data.Balance)
            })
            .catch(error => console.log(error))


    }, [payid])

    useEffect(() => {

        setBalance(Number(balanceamount) - Number(pay))

    }, [pay])




    const submitHandle = (event) => {

        event.preventDefault()

        const data = {

            paid:Number(paid)+Number(pay),
            Balance: balance,

        }


        axios.patch(`http://127.0.0.1:8001/payment/${payid}`, data)
            .then(response => {
                console.log(response.data)

                navigate('/payment/')
            })
            .catch(error => console.log(error))

    }


    return (

        <div>
            <h2 className='text-center' style={{ padding: "20px" }}>Payupdate</h2>

            <div className='container-fluid'>
                <button className='btn btn-secondary float-end' onClick={() => navigate('/payment/')}>Back</button>
            </div>
            <br />

            <div className='container-fluid' style={{ width: "30%" }}>
                <label htmlFor="">BalanceAmount : </label>
                <input type="number" className='form-control' value={balanceamount} onChange={event => event.target.value} />

                <label htmlFor="">pay: </label>
                <input type="number" className='form-control' value={pay} onChange={event => setPay(event.target.value)} />

                <label htmlFor="">Balance : </label>
                <input type="number" className='form-control' value={balance} onChange={event => setBalance(event.target.value)} /> <br /> <br />

                <input type="submit" className='btn btn-info form-control' onClick={event => submitHandle(event)} />
            </div>


        </div>

    )
}

export default Payupdate