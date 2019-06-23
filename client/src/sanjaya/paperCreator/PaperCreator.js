

import FormControl from '@material-ui/core/FormControl';
import React, { Component } from 'react';
import { Form, Button } from 'bootstrap-4-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import swal from "sweetalert";
import axios from 'axios';
import { textAlign } from '@material-ui/system';




class PaperCreator extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {moduleID:'',examDisplyName:'',enrollkey:'',startDate:'',startTime:'',endTime:'',timeDuration:''};
    }
  
    handleChange(e) {
      this.setState({[e.target.id]: e.target.value});
    }

    setAnswer=(index,answer)=>{
      let questions=this.state.questions;
      questions[index].userAnswer=answer;

      this.setState({questions:questions});
    }

    click=(e)=>{
      e.preventDefault();

      axios({
        method: 'post',
        url: `/api/paper/add/${this.state.moduleID}`,
        data:this.state
        
    }).then(res => {
      swal("Successfull","You are Succesfully added Paper Name:"+res.data.paper.examDisplyName , "success");
        
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
  

 <Row>
    <Col>    <Form.Group>
          <label htmlFor="ModuleID">Module ID</label>
          <Form.Input type="text" id="moduleID" placeholder="IT3080" onChange={this.handleChange}/>
         
        </Form.Group></Col>
  </Row>



   <Row>
    <Col>    <Form.Group>
          <label htmlFor="examDisplyName">Exam Disply name</label>
          <Form.Input type="text" id="examDisplyName" placeholder="Disply Name" onChange={this.handleChange} />
         
        </Form.Group></Col>
  </Row>

   <Row>
    <Col>    <Form.Group>
          <label htmlFor="enrollkey">Enroll Key</label>
          <Form.Input type="text" id="enrollkey" placeholder="Enroll Key" onChange={this.handleChange} />
         
        </Form.Group></Col>
  </Row>

 <Row>
    <Col lg={6} md={12}>    <Form.Group>
          <label htmlFor="date">Start Date</label>
          <Form.Input type="date" id="startDate" placeholder="Start Date" onChange={this.handleChange} />
         
        </Form.Group></Col>

        <Col lg={3} md={6}><Form.Group >
          <label htmlFor="startTime">Start Time</label>
          <Form.Input type="time" id="startTime" onChange={this.handleChange}/>
         
        </Form.Group></Col>
        <Col lg={3} md={6}><Form.Group>
          <label htmlFor="endTime">End Time</label>
          <Form.Input type="time" id="endTime"  onChange={this.handleChange}/>
         
        </Form.Group></Col>

     
         
  </Row>
  <Row >
  <Col lg={3} md={6}  alignSelf="center"><Form.Group  >
          <label htmlFor="timeDuration">Time Duration</label>
          <Form.Input type="number" id="timeDuration" onChange={this.handleChange}/>
          <Form.Text text="muted">You Should enter duration in minute!</Form.Text>
        </Form.Group></Col>
      </Row>

  
  </table>
</Container>



        <div align='center'>
        <Button primary type="submit" >Submit</Button>
        </div>
      </Form>
          </div>;
    }
  }

  export default PaperCreator; 
