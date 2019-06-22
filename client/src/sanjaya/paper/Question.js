import React from 'react';
import RadioButtonGroup from './RadioButtonGroup';



class Question extends React.Component {
    constructor(props) {
      super(props);
      //console.log('props',this.props);
      
    }
  
  
  
    render() {
     const {question,answers}=this.props.question;
      return (
       <div>
           
           <b>{question}</b>
           <RadioButtonGroup answers={answers} key={this.props.index} index={this.props.index} setAnswer={this.props.setAnswer}/>
           
           </div>
           
      );
    }
  }



  export default Question; 