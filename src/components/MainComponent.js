import React, { Component } from 'react';
import  { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col, ListGroupItem } from 'reactstrap';
import axios from 'axios';


function RenderDropDownItem({stream,onClick})
{
  return (
    <DropdownItem id={stream._id} onClick={()=>onClick(stream._id)}>{stream.name}</DropdownItem>
  );
}

function fetchQuestion(id)
{
  let question={};
  const quesurl = 'https://www.exambazaar.com/api/coding-round/routes/random-question';
  axios.post(quesurl, {"api_key": "9166408289", "api_secret": "5ee9a6dbe2eb165d3e5e8174", "examId":id})
  .then((response) => {
    question = response.data.data.question;
    console.log(question);
    
    
  }, (error) => {
    console.log(error);
  });

}


function RenderQuestion(id)
{
  //document.getElementById('maindiv').innerHTML="";
    
  


  const quesurl = 'https://www.exambazaar.com/api/coding-round/routes/random-question';
    axios.post(quesurl, {"api_key": "9166408289", "api_secret": "5ee9a6dbe2eb165d3e5e8174", "examId":id})
    .then((response) => {
      const question = response.data.data.question.questions[0];
      const statement = question.question;
      const options = question.options;


      const answers = options.map(e=>{
        return(
          `<label>
              <input type="radio" name="question${options.indexOf(e.option)}" value="${e.option}">
              ${e.option} 
            </label>
            <br> </br>`);
      });
      const answerST = answers.join('');

      const questdiv = `
                        <br> </br>
                        <div>
                          <div class = "question" id = "question">
                          <div style="font-size: 20px">EQAD. 1</div>
                            <p style="font-size: 18px">${statement}</p>
                            ${answerST}
                          </div>
                        </div>
      `;









      document.getElementById('maindiv').innerHTML=questdiv;






      //console.log(question);
      console.log(statement);
      console.log(options);
    }, (error) => {
      console.log(error);
    });


  
  



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
				
                <ListGroupItem onClick={()=>RenderQuestion(e._id)}>{e.name}</ListGroupItem>
               
         
      );
  })
console.log(examArray);
  return filteredexams;
};





export { RenderExams, StreamMenu};
