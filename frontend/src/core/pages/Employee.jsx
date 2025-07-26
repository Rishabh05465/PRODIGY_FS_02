import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumpster, faMagnifyingGlass, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Modal from '../atoms/modal';

function Employee() {
    const [isOpen, setIsOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [employees, setEmployees] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const navigation = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:8000/employee", { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setEmployees(res.data.data)
            })
            .catch(err => {
                if (err.status == 401) navigation('/login')
            })
    }, [])

    const addEmployee = () => {        
        axios.post("http://localhost:8000/employee", { fullName, email, designation }, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                const emp = [...employees, res.data.data]
                setEmployees(emp)
            })
            .catch(err => console.log(err))
    }
    const logoutHandler = () => {
        sessionStorage.setItem("token", " ")
        sessionStorage.setItem("name", " ")
        navigation("/login")
    }
    const delEmp = (id) => {
        axios.delete("http://localhost:8000/employee", { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }, data: { id } })
            .then(res => {
                const emp = employees.filter(emp => emp.id != res.data.data.id)
                setEmployees(emp)
            })
            .catch(err => console.log(err))
    }
    const updateEmp = () => {
        axios.put("http://localhost:8000/employee", { fullName, email, designation }, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                clear()
                const emp = employees.filter(emp => emp.id != res.data.data.id)
                emp.unshift(res.data.data)
                setEmployees(emp)
            })
            .catch(err => console.log(err))
    }
    const getData = (emp) => {
        setDesignation(emp.designation)
        setEmail(emp.email)
        setFullName(emp.fullName)
        setIsEdit(true)
        setIsOpen(true)
    }
    const clear = () => {
        setEmail("")
        setFullName("")
        setDesignation("")
        setIsEdit(false)
        setIsOpen(false)
    }



    return (
        <>
            <div className='Bg'>
                <div className='Header'>
                    <h3>Welcome {sessionStorage.getItem('name')}</h3>
                    <button onClick={(e) => logoutHandler()}>Logout</button>
                </div>
                <div className='EmpCard'>
                    <div className='main'>
                        <h2>Employees</h2 >
                        <div className='text_box'><FontAwesomeIcon icon={faMagnifyingGlass} /><input type="text" placeholder='Search' /></div>
                    </div>
                    <div className='add'><button onClick={() => setIsOpen(true)}>Add employee</button></div>
                    <table className='userinfo'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Designation</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees?.map((emp, index) => (
                                <tr key={index}>
                                    <td>{emp.fullName} </td>
                                    <td>{emp.email} </td>
                                    <td>{emp.designation} </td>
                                    <td>
                                        <button onClick={() => delEmp(emp.id)}>
                                            <FontAwesomeIcon icon={faTrash} /></button>
                                        <button onClick={() => getData(emp)}><FontAwesomeIcon icon={faPencil} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => clear()}>
                <div className='modal_popup'>
                    <h3>{isEdit ? "Edit employee info" : "Add new record"}</h3>
                    <input type="text" value={fullName} placeholder='name' onChange={(e) => setFullName(e.target.value)} />
                    {!isEdit && <input type="text" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />}
                    <input type="text" value={designation} placeholder='designation' onChange={(e) => setDesignation(e.target.value)} />
                    {isEdit ? <button onClick={() => updateEmp()}>Update</button> : <button onClick={() => addEmployee()}>Save</button>}
                </div>
            </Modal>
        </>
    )
}

export default Employee