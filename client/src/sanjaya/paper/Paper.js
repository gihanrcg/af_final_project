import React from 'react';
import Question from '../paper/Question';
import FormControl from '@material-ui/core/FormControl';

import { Form, Button } from 'bootstrap-4-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import swal from "sweetalert";

const questions=function(state,setAnswer,add,sub){
    
   
   
   return state.map((question,key)=> <li key={key}><Question question={question} key={key} index={key} setAnswer={setAnswer}/></li>);
}



class Paper extends React.Component {
    constructor(props) {
      super(props);
    //  this.handleChange = this.handleChange.bind(this);
      this.state = {questions:[],user:''};
      this.getUser();
    }
  
    componentWillMount(){
      
      console.log('user',this.state.user);
      const { match: { params } } = this.props;

      axios({
        method: 'get',
        url: `/api/paperQuestion/questions/${params.paperId}`,
      
        
    }).then(res => {
          


      //this.setState((state) => state.questions.unshift(res.data.question));
      //swal("Successfull","You are Succesfully added Paper Name:"+res.data.paper.examDisplyName , "success");
        this.setState({questions:res.data});
    }).catch(err => {
        this.setState({
            loading: false
        })
        swal("Sorry..!", "Unknown server error occurred", "error");
        console.log(err);
  
    })
    }
  

    setAnswer=(index,answer)=>{
      let questions=this.state.questions;
      questions[index].userAnswer=answer;

      this.setState({questions:questions});
    }

    getUser = () => {
      const jwt = localStorage.getItem('af_auth_token');
      if (!jwt) {
          this.setState({
              user: null
          });
          return;
      }

      axios({
          method: 'post',
          url: '/api/auth/getauthuser',
          headers: {
              jwt_token: jwt
          },
          data: {}

      }).then(res => {
          this.setState({
              user: res.data.user,
              isLoggedIn: true
          })

      }).catch(err => {


      })
  }

    click=(e)=>{
      const { match: { params } } = this.props;
      const user=this.state.user.userId;
      console.log('nuser',user);
      axios({
        method: 'post',
        url: `/api/paperQuestion/checkAnswer/${params.paperId}/${user.userId}`,
        data:this.state.questions
      
        
    }).then(res => {
      
      //this.setState((state) => state.questions.unshift(res.data.question));totalCount:totalCount,marksCount:marksCount
      swal("Successfull","You are Succesfully Finished the Paper,Total marks:"+Math.round(res.data.marksCount/res.data.totalCount*100)+"%" , "success");
        


    }).catch(err => {
        this.setState({
            loading: false
        })
        swal("Sorry..!", "Unknown server error occurred", "error");
        console.log(err);
  
    })
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