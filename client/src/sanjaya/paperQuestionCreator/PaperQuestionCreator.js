
import React, { Component } from 'react';
import { Form, Button } from 'bootstrap-4-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import swal from "sweetalert";


import FinalPaper from './FinalPaper';




class PaperQuestionCreator extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      questions: [{
        question: 'q1',
        answers: ['a1s', 'a2s', 'a3s', 'a4s'],
        answer: 'a2',
        userAnswer: ''
      }, {
        question: 'q2',
        answers: ['a1s', 'a2s', 'a3s', 'a4s'],
        answer: 'a1',
        userAnswer: ''
      }, {
        question: 'q3',
        answers: ['a1s', 'a2s', 'a3s', 'a4s'],
        answer: 'a4',
        userAnswer: ''
      }],
      nQuestion: '',
      nAnswer1: '',
      nAnswer2: '',
      nAnswer3: '',
      nAnswer4: '',
      nAnswer5: '',
      answer: ''
    }
  }

  handleChange=(e)=> {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setAnswer = (index, answer) => {
    let questions = this.state.questions;
    questions[index].userAnswer = answer;

    this.setState({ questions: questions });
  }

  removeQuestion = (index) => {
    let questionId=this.state.questions[index]._id;
    axios({
      method: 'delete',
      url: `/api/paperQuestion/delete/${questionId}`,

      
  }).then(() => {
    
    this.setState((state => state.questions.splice(index, 1)));
    //swal("Successfull","You are Succesfully added Paper Name:"+res.data.paper.examDisplyName , "success");
      
  }).catch(err => {
      this.setState({
          loading: false
      })
      swal("Sorry..!", "Unknown server error occurred", "error");
      console.log(err);

  })

    
    
  }

  addQuestion = (e) => {
    e.preventDefault();
    //nQuestion:'',nAnswer1:'',nAnswer2:'',answer:''
    let nQuestions = this.state.nQuestion;
    let nAnswer1 = this.state.nAnswer1;
    let nAnswer2 = this.state.nAnswer2;
    let nAnswer3 = this.state.nAnswer3;
    let nAnswer4 = this.state.nAnswer4;
    let nAnswer5 = this.state.nAnswer5;
    let nAnswer = [];
    let answer = this.state.answer;

    for (let i = 1; i < 6; i++) {
      if (eval('nAnswer' + i) == '' && i == answer.substring(1, 2)) {
        alert('invalid answer');
        return 0;
      } else if (eval('nAnswer' + i) != '') {
        nAnswer.push(eval('nAnswer' + i));
      }


    }
    console.log('q', nQuestions, 'na', nAnswer, 'a', answer, answer.substring(1, 2));
    const { match: { params } } = this.props;
    let obj = {paperId:params.paperId, question: nQuestions, answers: nAnswer, answer: answer, userAnswer: '' };
    
    axios({
      method: 'post',
      url: `/api/paperQuestion/add/${params.paperId}`,
      data:obj
      
  }).then(res => {
    this.setState((state) => state.questions.unshift(res.data.question));
    //swal("Successfull","You are Succesfully added Paper Name:"+res.data.paper.examDisplyName , "success");
      
  }).catch(err => {
      this.setState({
          loading: false
      })
      swal("Sorry..!", "Unknown server error occurred", "error");
      console.log(err);

  })
    console.log('obj', obj);
    this.setState({nQuestion:''});
    this.setState({nAnswer1: ''});
    this.setState({nAnswer2: ''});
    this.setState({nAnswer3: ''});
    this.setState({nAnswer4: ''});
    this.setState({nAnswer5: ''});
    //this.setState({answer: ''});
     



  }

  click = (e) => {
    console.log('state', this.state)
  }

  render() {

    return <div>
      <Form onSubmit={this.addQuestion}>
        <Container>
          <table style={{width:'100%'}}>
<tbody>
  <tr><td>
          <Row>

            <Col >   <Form.Group>
              <label htmlFor="question">Question</label>
              <Form.Textarea id="question" rows="3" value={this.state.nQuestion} name="nQuestion" onChange={this.handleChange}></Form.Textarea>
            </Form.Group>  </Col>


          </Row>
          </td>      
          </tr>
          <tr>
            <td>
          <Row>
            <Col >

              <Form.Group onChange={this.handleChange} >
                <Form.Check>
                  <Form.Radio id="inlineRadio1" name="answer" value="a1" />
                  <Form.CheckLabel htmlFor="inlineRadio1"><Form.Input type="text" id="examDisplyName1" value={this.state.nAnswer1} name="nAnswer1" placeholder="Disply Name" /></Form.CheckLabel>
                </Form.Check>
                <Form.Check >
                  <Form.Radio id="inlineRadio2" name="answer" value="a2" />
                  <Form.CheckLabel htmlFor="inlineRadio2"><Form.Input type="text" id="examDisplyName2" value={this.state.nAnswer2} name="nAnswer2" placeholder="Disply Name" /></Form.CheckLabel>
                </Form.Check>
                <Form.Check >
                  <Form.Radio id="inlineRadio3" name="answer" value="a3" />
                  <Form.CheckLabel htmlFor="inlineRadio2"><Form.Input type="text" id="examDisplyName3" value={this.state.nAnswer3} name="nAnswer3" placeholder="Disply Name" /></Form.CheckLabel>
                </Form.Check>
                <Form.Check >
                  <Form.Radio id="inlineRadio4" name="answer" value="a4" />
                  <Form.CheckLabel htmlFor="inlineRadio2"><Form.Input type="text" id="examDisplyName4" value={this.state.nAnswer4} name="nAnswer4" placeholder="Disply Name" /></Form.CheckLabel>
                </Form.Check>
                <Form.Check >
                  <Form.Radio id="inlineRadio5" name="answer" value="a5" />
                  <Form.CheckLabel htmlFor="inlineRadio2"><Form.Input type="text" id="examDisplyName5" value={this.state.nAnswer5} name="nAnswer5" placeholder="Disply Name" /></Form.CheckLabel>
                </Form.Check>

              </Form.Group>

            </Col>

          </Row>
          </td>
          </tr>
 </tbody>       

</table>
        </Container>



<div align="center" style={{width:'100%'}}>
        <Button primary type="submit" >Add</Button>
        </div>
      </Form>

      <div>

      </div>

      <div style={{width:'100%'}}>
        
       
        <FinalPaper questions={this.state.questions} removeQuestion={this.removeQuestion} />
       
     
      </div>


    </div>



      ;
  }
}

export default PaperQuestionCreator; 