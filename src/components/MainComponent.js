import React, { Component } from 'react';
import  { useState } from 'react';
import { ButtonGroup, Button ,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import RenderQuestion from './QuestionComponent';

function RenderDropDownItem({stream,onClick})
{
  return (
    <DropdownItem id={stream._id} onClick={()=>onClick(stream._id)}>{stream.name}</DropdownItem>
  );
}

function RenderMouseOver(event)
{
  event.target.style.color = "orange";
  console.log('RENDERED MOUSEOVER');
  
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}


const StreamMenu = (props) =>{

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);


  const menu = props.streams.map((stream)=>{
    return(
      
      
        <RenderDropDownItem stream = {stream} onClick = {props.onClick}/>
      
    
    );
  });

  return (
    
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Streams
      </DropdownToggle>
      <DropdownMenu>
      {menu}
        </DropdownMenu>  
            
      </Dropdown>  
    
);

}



const RenderExams = (props) =>
  {
    const examArray = props.exams.reduce((examArray,exam) => {
      if(exam.stream===props.selectedStream)
      examArray.push(exam);
      return examArray;
    },[]);


    const filteredexams = examArray.map(e => {
      
      return (
				
                <ListGroupItem unselectable = "on" id = {e._id} onClick={()=>RenderQuestion(e._id)}>{e.name}</ListGroupItem>
               
         
      );

               

  });

  

  return filteredexams;
};





export { RenderExams, StreamMenu};
