
import axios from 'axios';

let questionArray = [];
let index = 0;
let isfirst = true;

function getButtons(id)
{
      const buttonHTML = `
                  <br> </br>
                  <div style="margin-left:45%">
                  <ButtonGroup>
                    <Button id="prevbtn" color="primary">Previous</Button>
                    <Button id="nextbtn" color="secondary">Next</Button>
                  </ButtonGroup>
                  </div>`
                  ;
      const maindiv = document.getElementById('maindiv');
      maindiv.insertAdjacentHTML('afterend',buttonHTML);
      const nextBTN = document.getElementById('nextbtn');
      nextBTN.onclick = function() {NextQuestion(id);};
      const prevBTN = document.getElementById('prevbtn');
      prevBTN.onclick = function() {PrevQuestion();};
      prevBTN.disabled = true;
      console.log(nextBTN);
      console.log(prevBTN);

}
function getAnswers(type,mcqma,options)
{
  let answers=[];
  console.log('answers');
  console.log(type);
  console.log(mcqma);
  if(type=="mcq" && mcqma===false)
  {
        answers = options.map(e=>{
          return(
            `<label>
                <input type="radio" name="question${options.indexOf(e.option)}" value="${e.option}">
                ${e.option} 
              </label>
              <br> </br>`);
        });

        
  }
  else if(type=="mcq") {
    answers = options.map(e=>{
      return(
        `<label>
            <input type="checkbox" name="question${options.indexOf(e.option)}" value="${e.option}">
            ${e.option} 
          </label>
          <br> </br>`);
    });


  }
  else {
    return(`<input type="text" placeholder = "Enter your answer here" "id="answer" name="answer"><br><br>`);
  }

  const answerST = answers.join('');
        return answerST;


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
  
  if(index>0)
  {
    const currQuestion = questionArray[index-1];
    questionArray.pop();
    console.log(currQuestion);
    const subQuestions = currQuestion.questions;
    console.log(subQuestions);
    const context = (currQuestion._hascontext)?currQuestion.context:'';
    const exam = currQuestion.exam;
    const examsection = currQuestion.examsection;
    const contextdiv = `<br><br>
                        
                        <p id="contextp" style="font-size: 21px; margin-left: 100px">
                        <h2>${exam}|${examsection}</h2>
                        ${context}
                        </p>
                        `;
                        
    const img=currQuestion.images;
    


                        
    if(currQuestion._hascontext)
    {
      maindiv.insertAdjacentHTML('beforebegin',contextdiv);
      console.log(maindiv);
      console.log(contextdiv);
      
      QuestionImage(img,'contextp'); 

    }

    subQuestions.forEach(question => {

        const statement = question.question;
        const options = question.options;
        const type = question.type;
        const mcqma = question.mcqma;

          const answerST = getAnswers(type,mcqma,options);

          const startnumber = parseInt(currQuestion._startnumber);
          
          
          const questdiv = `
                             
                                <br> </br>
                                <div>
                                <div style="font-size: 20px">EQAD. ${startnumber+subQuestions.indexOf(question)}   (${exam} ${examsection}) </div>
                                <br> </br>  
                                  <p id = "question${subQuestions.indexOf(question)}" style="font-size: 18px">${statement}</p>
                                  ${answerST}
                                </div>  
                              
                              
            `;
          
         
            const prevBTN = document.getElementById('prevbtn');
            prevBTN.disabled = false;
          
          
            if(subQuestions.indexOf(question)===0)
            {
              maindiv.innerHTML=questdiv;
              QuestionImage(img,`question${subQuestions.indexOf(question)}`);
            }
            else {
              maindiv.insertAdjacentHTML('beforeend',questdiv);
              QuestionImage(img,`question${subQuestions.indexOf(question)}`);
              
            }
    
          isfirst=false;

      });
  
  }
  if(index===1) {

    const prevBTN = document.getElementById('prevbtn');
    prevBTN.disabled = true;
    

  }    
  
}

function QuestionImage(img,DOM_ID)
{
  
  if(img)
        {
             let imgArr = img.map((e)=>{
                  return(`<br><img src=${e} />`);
              });
              let imgST = imgArr.join('');
              console.log(imgST);
              document.getElementById(DOM_ID).insertAdjacentHTML('beforeend',imgArr);
              
        }
}
function RenderQuestion(id)
{
    
    var maindiv = document.getElementById('maindiv');
    maindiv.classList.add('container');
    maindiv.classList.remove('row-content');
    const contextp = document.getElementById('contextp');
    if(contextp)
    {
      contextp.innerHTML="";
    }
  const quesurl = 'https://www.exambazaar.com/api/coding-round/routes/random-question';
    axios.post(quesurl, {"api_key": "9166408289", "api_secret": "5ee9a6dbe2eb165d3e5e8174", "examId":id})
    .then((response) => {
      
      
      const question = response.data.data.question;
      console.log(response);
      
    questionArray.push(question);
    let subQuestions=[];
    try{
       subQuestions = question.questions;
    }
    catch{
      alert('No Question in Database for the selected exam');
      return;
    }
      
      const context = (question._hascontext)?question.context:'';
      const exam = question.exam;
      const examsection = question.examsection?question.examsection:'';
      const contextdiv = `<br><br>
                        <p id="contextp" style="font-size: 21px; margin-left: 100px">
                        ${context}
                        </p>
                        `;
                    
      const img=question.images;
  


                          
      if(question._hascontext)
      {
        maindiv.insertAdjacentHTML('beforebegin',contextdiv);
        console.log(maindiv);
        console.log(contextdiv);
        
        QuestionImage(img,'contextp');

      }
        subQuestions.forEach(question => {

          const statement = question.question;
          const options = question.options;
          const type = question.type;
          const mcqma = question.mcqma;
          const imgSubQ=question.images;
          

          
          const answerST = getAnswers(type,mcqma,options);
            
            
            const startnumber = parseInt(response.data.data.question._startnumber);
           
            const questdiv = `
                             
                                <br> </br>
                                <div>
                                <div style="font-size: 20px">EQAD. ${startnumber+subQuestions.indexOf(question)}   (${exam} ${examsection}) </div>
                                <br> </br>  
                                  <p id = "question${subQuestions.indexOf(question)}" style="font-size: 18px">${statement}</p>
                                  ${answerST}
                                </div>  
                              
                              
            `;
            
            if(isfirst)
            {
                getButtons(id);
            }
            else {
              const prevBTN = document.getElementById('prevbtn');
              prevBTN.disabled = false;
            }
            
            if(subQuestions.indexOf(question)===0)
            {
              maindiv.innerHTML=questdiv;
              QuestionImage(img,`question${subQuestions.indexOf(question)}`);
            }
            else {
              maindiv.insertAdjacentHTML('beforeend',questdiv);
              QuestionImage(img,`question${subQuestions.indexOf(question)}`);
              
            }
            
      
            isfirst = false;

        });
    
        index++;
       
      


      //console.log(question);
      //console.log(statement);
      
      console.log(response.data.data.question);
      console.log(response.data.data.question.questions);
    }, (error) => {
      console.log(error);
    });
}
export default RenderQuestion;