import React from 'react'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEllipsisVertical} from "@fortawesome/free-solid-svg-icons"
import './table.css'
import { BASE_URL } from '../../services/helper';
import {NavLink} from 'react-router-dom'
import { statusChangefn } from '../../services/Apis';
 
function Tables({userData, deleteUser, userGet}) {

  const handleChange=  async(id, status)=>{
    const response = await statusChangefn(id, status);
    if(response.status == 200){
      userGet();
      console.alert("Status Updated")
    }else{
      console.alert("something went wrong")
    }
  }

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userData.length >0 ? userData.map((element, index)=>{
                      return (
                        <>
                        <tr>
                          <td>{index+1}</td>
                          <td>{element.fname+ " " + element.lname}</td>
                          <td>{element.email}</td>
                          <td>{element.gender=="Male" ? "M":"F"}</td>
                          <td className='d-flex align-items-center'>
                            <Dropdown className='text-center'>
                              <Dropdown.Toggle className='dropdown_btn'  id="dropdown-basic">
                                <Badge bg={element.status=="Active" ? "primart" : "danger"}>
                                  {element.status}
                                </Badge>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" onClick={()=>handleChange(element._id, "Active")} >Active</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={()=>handleChange(element._id, "Inctive")} >Inactive</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td className='text-center'>
                            <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" height={'30px'}/>
                          </td>
                          <td>
                            <Dropdown className='text-center'>
                              <Dropdown.Toggle split variant="light" className='action' id="dropdown-basic">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                  <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">View</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                <NavLink to={`/edit/${element._id}`} className="text-decoration-none">Edit</NavLink>
                                </Dropdown.Item>
                                <div onClick={()=>deleteUser(element._id)}>

                                <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                        
                        </>

                      )
                    }) : <div className="no_data text-center">No data found</div>
                  }
                  
                </tbody>
                    

              </Table>

            </Card>
          </div>
        </Row>
      </div>
      
    </>
  )
}

export default Tables
