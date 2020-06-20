import React, { Component } from 'react';
import  { useState } from 'react';
import { ButtonGroup, Button ,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col, ListGroupItem } from 'reactstrap';
import axios from 'axios';


function RenderDropDownItem({stream,onClick})
{
  return (
    <DropdownItem id={stream._id} onClick={()=>onClick(stream._id)}>{stream.name}</DropdownItem>
  );
}


let questionArray = [];
let index = 0;
let isfirst = true;


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
function NextQuestion(id)
{
  console.log('Next clicked');
  RenderQuestion(id);
}
function PrevQuestion()
{
  const maindiv = document.getElementById('maindiv');
  const contextp = document.getElementById('contextp');
  if(contextp)
  {
    contextp.innerHTML="";
  }
  maindiv.innerHTML="";
  console.log('Prev clicked');
  console.log(index);
  
  index--;
  
    
    const question = questionArray[index-2];
    console.log(question);
    const questionx = question.questions;
    console.log(questionx);
    const context = (question._hascontext)?question.context:'';
    const exam = question.exam;
    const examsection = question.examsection;
    const contextdiv = `  
                        <p id="contextp" style="font-size: 22px; margin-left: 70px">${context}</p>
                        `;
                        
    if(question._hascontext)
    {
      maindiv.insertAdjacentHTML('beforebegin',contextdiv);
      console.log(maindiv);
      console.log(contextdiv);
    }
      questionx.forEach(question => {

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
                            
                            <div id="context">
                              
                              <div class = "question" id = "question">
                              <div style="font-size: 20px">EQAD. ${questionx.indexOf(question)+1}</div>
                                
                                <p style="font-size: 18px">${statement}</p>
                                ${answerST}
                              </div>
                            </div>
          `;
          
          if(index==0)
          {
            /*const buttonHTML = `
            <div>
            <ButtonGroup>
              <Button id="prevbtn" color="primary">Previous</Button>
              <Button id="nextbtn" color="secondary">Next</Button>
            </ButtonGroup>
            </div>`
            ;
            maindiv.insertAdjacentHTML('afterend',buttonHTML);
            const nextBTN = document.getElementById('nextbtn');
            nextBTN.onclick = function() {NextQuestion(id);};*/
            const prevBTN = document.getElementById('prevbtn');
            prevBTN.disabled = true;
            
            console.log(prevBTN); 
          }
          else {
            const prevBTN = document.getElementById('prevbtn');
            prevBTN.disabled = false;
          }
          
          if(questionx.indexOf(question)===0)
          {
            maindiv.innerHTML=questdiv;
          }
          else {
            maindiv.insertAdjacentHTML('beforeend',questdiv);
            
          }
          
    
          isfirst = false;

      });
  
      
  
}


function RenderQuestion(id)
{
  //document.getElementById('maindiv').innerHTML="";
    
    var maindiv = document.getElementById('maindiv');
    maindiv.innerHTML = "";
    const contextp = document.getElementById('contextp');
  if(contextp)
  {
    contextp.innerHTML="";
  }
  const quesurl = 'https://www.exambazaar.com/api/coding-round/routes/random-question';
    axios.post(quesurl, {"api_key": "9166408289", "api_secret": "5ee9a6dbe2eb165d3e5e8174", "examId":id})
    .then((response) => {
      const question = response.data.data.question;
      
      
    questionArray.push(question);
     
      const questionx = question.questions;
      const context = (question._hascontext)?question.context:'';
      const exam = question.exam;
      const examsection = question.examsection;
      const contextdiv = `
                          <p id="contextp" style="font-size: 22px; margin-left: 70px">${context}</p>
                          `;
                          
      if(question._hascontext)
      {
        maindiv.insertAdjacentHTML('beforebegin',contextdiv);
        console.log(maindiv);
        console.log(contextdiv);
      }
        questionx.forEach(question => {

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
                             
                              <div id="context">
                                <div class = "question" id = "question">
                                <div style="font-size: 20px">EQAD. ${questionx.indexOf(question)+1}</div>
                                  
                                  <p style="font-size: 18px">${statement}</p>
                                  ${answerST}
                                </div>  
                              </div>
                              
            `;
            
            if(isfirst)
            {
              const buttonHTML = `
              <div style="margin-left: 15px">
              <ButtonGroup>
                <Button id="prevbtn" color="primary">Previous</Button>
                <Button id="nextbtn" color="secondary">Next</Button>
              </ButtonGroup>
              </div>`
              ;
              maindiv.insertAdjacentHTML('afterend',buttonHTML);
              const nextBTN = document.getElementById('nextbtn');
              nextBTN.onclick = function() {NextQuestion(id);};
              const prevBTN = document.getElementById('prevbtn');
              prevBTN.onclick = function() {PrevQuestion();};
              prevBTN.disabled = true;
              console.log(nextBTN);
              console.log(prevBTN); 
            }
            else {
              const prevBTN = document.getElementById('prevbtn');
              prevBTN.disabled = false;
            }
            
            if(questionx.indexOf(question)===0)
            {
              maindiv.innerHTML=questdiv;
            }
            else {
              maindiv.insertAdjacentHTML('beforeend',questdiv);
              
            }
            
      
            isfirst = false;

        });
    
        index++;
        
      
 /*     const answers = options.map(e=>{
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
                          <div style="font-size: 25px">EQAD. 1</div>
                            
                            <p style="font-size: 18px">${statement}</p>
                            ${answerST}
                          </div>
                        </div>
      `;


      const buttonHTML = `
      <ButtonGroup>
        <Button color="primary">Previous</Button>
        <Button color="secondary">Next</Button>
      </ButtonGroup>`;




      var maindiv = document.getElementById('maindiv');

      maindiv.innerHTML=questdiv;
      maindiv.insertAdjacentHTML('beforeend',buttonHTML);


      */  


      //console.log(question);
      //console.log(statement);
      
      console.log(response.data.data.question);
      console.log(response.data.data.question.questions);
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

  return filteredexams;
};





export { RenderExams, StreamMenu};
