import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Category = () => {

    const [category_name, setCategory] = useState('')

    const [categorylist, setCategorylist] = useState([])



    const submithandle = (event) => {

        event.preventDefault()

        const data = {
            categoryname: category_name
        }

        axios.post('http://127.0.0.1:8001/category/add', data)

            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
        setCategory('')
    }

    useEffect(() => {


        const headers ={

            'content-Type':'application/json',
            'Authorization':` Bearer ${localStorage.getItem('Bearer')}`

        }

        console.log(headers)

        axios.get('http://127.0.0.1:8001/category/all/',{headers})
            .then(response => {
                console.log(response.data)
                setCategorylist(response.data)
            })
            .catch(error => console.log(error))



    }, [])

    let result = categorylist.map((data, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.categoryname}</td>
                <td>
                    <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => delcat(data)}>X</button>
                </td>

            </tr>
        )
    })

    const delcat = (data) => {

        axios.delete(`http://127.0.0.1:8001/category/${data._id}`)
            .then(response => {
                console.log(response.data)

                const duplicate = [...categorylist]
                duplicate.splice(categorylist.findIndex(cat => cat._id === data._id), 1)
                setCategorylist(duplicate)

            })
            .catch(error => console.log(error))
    }


return (


        <div>
           
            <h2 className='text-center' style={{padding:"20px"}}>Category</h2> <br />

            <div className='container-fluid text-center'>

                <label htmlFor="">category type:</label> &nbsp;

                <input type="text" value={category_name} onChange={event => setCategory(event.target.value)} /> &nbsp;

                <input type="submit" className='btn btn-info' onClick={event => submithandle(event)}  style={{margin:"10px"}}/>
            </div>

             <br />

            <h2 className='text-center'> Category List</h2> <br />

       <div className='container-fluid table-responsive'>
       <table className='table table-bordered table-responsive'  style={{width:'75%',marginLeft:"10%"}} >
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Category</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {result}

                </tbody>
            </table>
       </div>





        </div>

    )
}

export default Category