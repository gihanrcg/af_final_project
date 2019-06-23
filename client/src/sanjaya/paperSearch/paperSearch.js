

import FormControl from '@material-ui/core/FormControl';
import React, { Component } from 'react';
import { Form, Button } from 'bootstrap-4-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { textAlign } from '@material-ui/system';
import axios from 'axios';
import swal from "sweetalert";
import { Link } from 'react-router-dom'




class PaperSearch extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {moduleId:'IT4567',field:'IT',year:1,semester:2,modules:[],moduleName:'',papers:[]};

    }

    componentWillMount(){
      this.change();
    }

    change=()=>{
      axios({
        method: 'post',
        url: '/api/module/findModules',
        data:this.state
        
    }).then(res => {
      this.setState({modules:res.data});
      //swal("Successfull","You are Succesfully added module ID:"+res.data.module.moduleId , "success");
        
    }).catch(err => {
        this.setState({
            loading: false
        })
        swal("Sorry..!", "Unknown server error occurred", "error");
        console.log(err);

    })
    }
  
    handleChange(e) {
     
      this.setState({[e.target.id]: e.target.value});
      this.change();
    }

  

    click=(e)=>{
      e.preventDefault();

      axios({
        method: 'get',
        url: `/api/paper/findByModuleId/${this.state.moduleId}`
        
        
    }).then(res => {
      this.setState({papers:res.data});
      //swal("Successfull","You are Succesfully added module ID:"+res.data.module.moduleId , "success");
        
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
  <Col sm={12} lg={2} md={12}>     <Form.Group>
          <label htmlFor="Field">Field</label>
          <Form.Select onChange={this.handleChange} id="field">
            <option>IT</option>
            <option>BM</option>
            <option>ENG</option>
           
          </Form.Select>
        </Form.Group></Col>


    <Col sm={12} lg={1} md={6}>     <Form.Group>
          <label htmlFor="Year">Year</label>
          <Form.Select onChange={this.handleChange} id="year">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
           
          </Form.Select>
        </Form.Group></Col>
    <Col sm={12} lg={1} md={6}>     <Form.Group>
          <label htmlFor="Semester">Semester</label>
          <Form.Select onChange={this.handleChange} id="semester">
            <option>1</option>
            <option>2</option>
       
          </Form.Select>
        </Form.Group></Col>
        <Col sm={12} lg={6} md={8}>     <Form.Group>
          <label htmlFor="Semester">ModuleID</label>
          <Form.Select onChange={this.handleChange} id="moduleId">
            {this.state.modules.map((m)=><option>{m.moduleId}</option>)}
       
          </Form.Select>
        </Form.Group></Col>
        <Col sm={2} lg={2} md={2}>
        <div >
        <br/>
        <Button primary  >Search</Button>
        </div>
        </Col>

  </Row>


 

   <Row>
   <Col>
   <table>
     <thead><tr>Paper Name<td>link</td></tr></thead>
     <tbody>{this.state.papers.map((paper)=><tr>{paper.examDisplyName}<td>{<Link to={'/Paper/'+paper._id}>Start Exam</Link>}</td></tr>)}</tbody>
     </table>
   </Col>

  </Row>







  
  </table>
</Container>



        
      </Form>
          </div>;
    }
  }

  export default  PaperSearch; 