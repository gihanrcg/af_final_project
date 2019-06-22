import React from 'react';
import Question from '../paper/Question';
import FormControl from '@material-ui/core/FormControl';

import { Form, Button } from 'bootstrap-4-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const questions=function(state,setAnswer,add,sub){
    
   
   
   return state.map((question,key)=> <li key={key}><Question question={question} key={key} index={key} setAnswer={setAnswer}/></li>);
}



class Paper extends React.Component {
    constructor(props) {
      super(props);
    //  this.handleChange = this.handleChange.bind(this);
      this.state = {questions:[{question:'q1',answers:['a1s','a2s','a3s','a4s'],answer:'a2',userAnswer:''},{question:'q2',answers:['a1s','a2s','a3s','a4s'],answer:'a1',userAnswer:''},{question:'q3',answers:['a1s','a2s','a3s','a4s'],answer:'a4',userAnswer:''}]};
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
  
        <Container  >
          <table width='100%'  class="border border-secondary">
          <tbody>
            <tr>
          <Row>
            <td>
            <Col>
            
          <FormControl component="fieldset">
          <ol>
            {questions(this.state.questions,this.setAnswer)}
            </ol>
            </FormControl>
            </Col>
            </td>
            </Row>
            </tr>
            <tr>
            <Row className="justify-content-md-center">
             <td>
            <Col >
            <div style={{align:'center'}} >
            <button onClick={this.click} className="btn btn-success">Submit</button>
           </div>
            </Col>
            </td>
            </Row>
            </tr>
            </tbody>
            </table>
            </Container>
           
          </div>;
    }
  }

  export default Paper; 