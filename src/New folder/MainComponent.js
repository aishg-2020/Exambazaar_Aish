import React, { Component } from 'react';
import  { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col, ListGroupItem } from 'reactstrap';



function RenderDropDownItem({stream,onClick})
{
  return (
    <DropdownItem id={stream._id} onClick={()=>onClick(stream._id)}>{stream.name}</DropdownItem>
  );
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
				
                <ListGroupItem>{e.name}</ListGroupItem>
               
         
      );
  })
console.log(examArray);
  return filteredexams;
};





export { RenderExams, StreamMenu};
