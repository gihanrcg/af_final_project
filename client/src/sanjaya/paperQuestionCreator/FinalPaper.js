
import Question from '../paper/Question';
import FormControl from '@material-ui/core/FormControl';
import React, { Component } from 'react';
import { Form, Button } from 'bootstrap-4-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';




const questions = (questions, removeQuestion) => {
  let l = questions.length;
  //console.log('inside question',questions);
  return questions.map((question,qkey) => <tr><Row>
    <td  style={{ textAlign: 'left',width:'100%' }}>
    <Col  style={{ textAlign: 'left' }}>
      {l--}.{question.question}{console.log('answer', question.answer)}
      <ol>
        {question.answers.map((answer, key) => {
          console.log('answer', question.answer.substring(1), 'key', key);

          if ((key + 1) == question.answer.substring(1)) {
            return <ListGroup.Item variant="success">{answer}</ListGroup.Item>;
          } else {
            return <ListGroup.Item >{answer}</ListGroup.Item>;
          }

        })}
      </ol>
      <Button onClick={()=>removeQuestion(qkey)} className="btn btn-danger">Delete</Button>
    </Col>
    </td>
  </Row></tr>)
};

class FinalPaper extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.handleChange = this.handleChange.bind(this);
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

    // this.state = {questions:[{question:'q1',answers:['a1s','a2s','a3s','a4s'],answer:'a2',userAnswer:''},{question:'q2',answers:['a1s','a2s','a3s','a4s'],answer:'a1',userAnswer:''},{question:'q3',answers:['a1s','a2s','a3s','a4s'],answer:'a4',userAnswer:''}]};
  }



  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  setAnswer = (index, answer) => {
    let questions = this.state.questions;
    questions[index].userAnswer = answer;

    this.setState({ questions: questions });
  }

  click = (e) => {
    console.log('state', this.state)
  }

  render() {

    return <div>
      <Container>
<table width='100%'>
  <tbody>
        {questions(this.props.questions, this.props.removeQuestion)}
  </tbody>
</table>

      </Container>
    </div>

      ;
  }
}

export default FinalPaper; 