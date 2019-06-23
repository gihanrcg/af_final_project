import React, {PureComponent} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import swal from "sweetalert";
import {Treebeard} from 'react-treebeard';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};


class ModulesTree extends PureComponent {
    constructor(props){
        super(props);
        this.state = {data};
        this.onToggle=this.onToggle.bind(this);
    }
    
    onToggle(node, toggled){
        console.log('node',node);
        console.log('toggled',toggled);
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) { 
            node.toggled = toggled; 
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
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
        const {data} = this.state;
      return <div>
          <Container>
              <table style={{width:'100%'}}>
                <Row>
                    <Col>

<Treebeard data={data} onToggle={this.onToggle} />



                    </Col>
                    </Row>
                  </table>
              </Container>
         
          </div>;
    }
  }

  export default ModulesTree ; 
