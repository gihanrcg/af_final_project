import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const radio=function(){

}

export default function RadioButtonGroup(props) {
  const [value, setValue] = React.useState();
  const answers=props.answers;
  const setAnswer=props.setAnswer;

  function handleChange(event) {
    setValue(event.target.value);
    setAnswer(props.index,event.target.value);
   
  }

  return (
<div>
   
      <RadioGroup aria-label="position" name={'q'+(props.index+1).toString()}value={value} onChange={handleChange} row>
      {answers.map((answer,key)=><table width='100%'><tbody><tr><td><FormControlLabel
          value={'a'+(key+1).toString()}
          control={<Radio color="primary" />}
          label={answer}
          labelPlacement="end"
        /></td></tr> </tbody></table>)}
        
      </RadioGroup>
    
    
   </div> 
  );
}