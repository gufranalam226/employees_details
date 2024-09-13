import React, { useState, useEffect, useContext } from 'react'
import "./home.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from 'react-router-dom'
import Tables from '../../components/Table/Tables.jsx'
import Spiner from '../../components/Spinner/Spinner.jsx'
import { addData, upddateData } from '../../components/context/ContextProvider.jsx';
import Alert from 'react-bootstrap/Alert';
import { usergetfn, deletefn, exporttocsvfn } from '../../services/Apis.js';
import { toast } from 'react-toastify';



function Home() {

  const [showspin, setshowspin] = useState(true);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState('new')

  const {useradd, setUseradd} = useContext(addData);
  const [userData, setUserData] = useState([]);
  const {update, setUpdate} = useContext(upddateData);



  const navigate = useNavigate();

  const addUser = ()=>{
    navigate('/register');
  }
  const userGet = async()=>{
    const response = await usergetfn(search, gender, status, sort)
    console.log(response)
    if(response.status === 200){
      setUserData(response.data);
    }else{
      console.log("Error for get user data");
    }
  }

  // user delete functin
  const deleteUser = async(id)=>{
    const reesponse = await deletefn(id);
    if(reesponse.status === 200){
      userGet();
    }
    else{
      toast.error("Error")
    }

  }

  const exportData =async()=>{
    const response = await exporttocsvfn();
    if(response.status === 200){
      window.open(response.data.downloadUrl, 'blank');
    }
    else{
      console.log("Error")
    }
  }

  useEffect(()=>{
    userGet();
    setTimeout(()=>{
      setshowspin(false)
    }, 1200)
  },[search, gender, status, sort])
  return (
    <>
    {
      useradd? <Alert variant="success" onClose={() => setUseradd('')} dismissible>{useradd.fname.toUpperCase()} Successfully added</Alert> :""
    }
    {
      update ? <Alert variant="primary" onClose={() => setUpdate('')} dismissible>{useradd.fname.toUpperCase()} Successfully updated</Alert> :""
    }
      <div className="container">
        <div className="main_div">
          {/* search, add btn */}

          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <Button variant="success">Search</Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="success" onClick={addUser}>+ Add User</Button>
            </div>
          </div>
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <button className='export_btn' onClick={exportData}>Export to CSV</button>
            </div>

            <div className="filter_gender">
              <div className="filter">
                <h3>Filter by Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check type="radio" name='gender' label="All" value={'All'} onChange={(e)=>setGender(e.target.value)} defaultChecked/>
                  <Form.Check type="radio" name='gender' label="Male" value={'Male'} onChange={(e)=>setGender(e.target.value)}/>
                  <Form.Check type="radio" name='gender' label="Female" value={'Female'} onChange={(e)=>setGender(e.target.value)}/>
                </div>
              </div>
            </div>

            <div className="filter_newold">
                <NavDropdown title="Sort by " id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.3" onClick={()=> setSort("new")}>New</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1" onClick={()=> setSort("old")}>Old</NavDropdown.Item>
                </NavDropdown>
            </div>

            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-around flex-wrap">
                  <Form.Check type="radio" name='status' label="All" value={'All'} onChange={(e)=>setStatus(e.target.value)} defaultChecked/>
                  <Form.Check type="radio" name='status' label="Active" value={'Active'} onChange={(e)=>setStatus(e.target.value)} />
                  <Form.Check type="radio" name='status' label="InActive" value={'InActive'} onChange={(e)=>setStatus(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

        </div>
        {
          showspin?<Spiner/> : <Tables userData = {userData} deleteUser= {deleteUser} userGet = {userGet} />
        }
        
      </div> 
    </>
  )
}

export default Home
