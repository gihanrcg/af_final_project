

import FormControl from '@material-ui/core/FormControl';
import React, { Component } from 'react';
import { Form, Button } from 'bootstrap-4-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { textAlign } from '@material-ui/system';




class PaperCreator extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {};
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
        console.log('state',this.state)
    }
  
    render() {
      
      return <div>
          
          <Form>
        
       

   
        <Container >
        <table style={{width:'100%'}} >
  <Row >
  <Col sm={12} lg={4} md={12}>     <Form.Group>
          <label htmlFor="Field">Field</label>
          <Form.Select id="field">
            <option>IT</option>
            <option>BM</option>
            <option>ENG</option>
           
          </Form.Select>
        </Form.Group></Col>


    <Col sm={12} lg={4} md={6}>     <Form.Group>
          <label htmlFor="Year">Year</label>
          <Form.Select id="year">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
           
          </Form.Select>
        </Form.Group></Col>
    <Col sm={12} lg={4} md={6}>     <Form.Group>
          <label htmlFor="semester">Semester</label>
          <Form.Select id="semester">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
        </Form.Group></Col>

        

  </Row>


    <Row>
    <Col>     <Form.Group>
          <label htmlFor="module">Module</label>
          <Form.Select id="module">
            <option>SE</option>
           
          </Form.Select>
        </Form.Group></Col>
  </Row>

   <Row>
    <Col>    <Form.Group>
          <label htmlFor="examDisplyName">Exam Disply name</label>
          <Form.Input type="text" id="examDisplyName" placeholder="Disply Name" />
         
        </Form.Group></Col>
  </Row>

   <Row>
    <Col>    <Form.Group>
          <label htmlFor="enrollkey">Enroll Key</label>
          <Form.Input type="text" id="enrollkey" placeholder="Enroll Key" />
         
        </Form.Group></Col>
  </Row>

 <Row>
    <Col lg={6} md={12}>    <Form.Group>
          <label htmlFor="enrollkey">Start Date</label>
          <Form.Input type="date" id="startDate" placeholder="Start Date" />
         
        </Form.Group></Col>

        <Col lg={3} md={6}><Form.Group >
          <label htmlFor="startTime">Start Time</label>
          <Form.Input type="time" id="startTime" placeholder="Start Time" />
         
        </Form.Group></Col>
        <Col lg={3} md={6}><Form.Group>
          <label htmlFor="endTime">End Time</label>
          <Form.Input type="time" id="endTime" placeholder="End Time" />
         
        </Form.Group></Col>

     
         
  </Row>
  <Row >
  <Col lg={3} md={6}  alignSelf="center"><Form.Group  >
          <label htmlFor="timeDuration">Time Duration</label>
          <Form.Input type="time" id="endTime" placeholder="End Time" />
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
