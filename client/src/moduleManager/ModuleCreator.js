

import FormControl from '@material-ui/core/FormControl';
import React, { Component } from 'react';
import { Form, Button } from 'bootstrap-4-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { textAlign } from '@material-ui/system';
import axios from 'axios';
import swal from "sweetalert";


class ModuleCreator extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {moduleId:'IT',field:'',year:1,semester:1,moduleName:'',enrollKey:''}

    }
  
    handleChange(e) {
     
      this.setState({[e.target.id]: e.target.value});
    }

  

    click=(e)=>{
      e.preventDefault();

      axios({
        method: 'post',
        url: '/api/module/add',
        data:this.state
        
    }).then(res => {
      swal("Successfull","You are Succesfully added module ID:"+res.data.module.moduleId , "success");
        
    }).catch(err => {
        this.setState({
            loading: false
        })
        swal("Sorry..!", "Unknown server error occurred", "error");
        console.log(err);

    })
        console.log('state',this.state);
    }
  
    render() {
      
      return <div>
          
          <Form onSubmit={this.click}>
        
       

   
        <Container >
        <table style={{width:'100%'}} >
  <Row >
  <Col sm={12} lg={4} md={12}>     <Form.Group>
          <label htmlFor="Field">Field</label>
          <Form.Select onChange={this.handleChange} id="field">
            <option>IT</option>
            <option>BM</option>
            <option>ENG</option>
           
          </Form.Select>
        </Form.Group></Col>


    <Col sm={12} lg={4} md={6}>     <Form.Group>
          <label htmlFor="Year">Year</label>
          <Form.Select onChange={this.handleChange} id="year">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
           
          </Form.Select>
        </Form.Group></Col>
    <Col sm={12} lg={4} md={6}>     <Form.Group>
          <label htmlFor="semester">Semester</label>
          <Form.Select onChange={this.handleChange} id="semester">
            <option>1</option>
            <option>2</option>
       
          </Form.Select>
        </Form.Group></Col>

        

  </Row>


 

   <Row>
    <Col>    <Form.Group>
          <label htmlFor="ModuleName">Module Name</label>
          <Form.Input type="text" id="moduleName" onChange={this.handleChange} placeholder="application Framework" />
         
        </Form.Group></Col>
  </Row>

   <Row>
    <Col>    <Form.Group>
          <label htmlFor="ModuleId">Module ID</label>
          <Form.Input type="text" id="moduleId" onChange={this.handleChange} placeholder="IT3400"/>
         
        </Form.Group></Col>
  </Row>

   <Row>
    <Col>    <Form.Group>
          <label htmlFor="enrollkey">Enroll Key</label>
          <Form.Input type="text" id="enrollkey" onChange={this.handleChange} placeholder="Enroll Key" />
         
        </Form.Group></Col>
  </Row>


  
  </table>
</Container>



        <div align='center'>
        <Button primary   >Submit</Button>
        </div>
      </Form>
          </div>;
    }
  }

  export default ModuleCreator; 