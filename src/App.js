import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {RenderExams, StreamMenu} from './components/MainComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';



class App extends Component {
  async fetchData(sid)
  {
    var api_key = '9166408289';
    var api_secret = '5ee9a6dbe2eb165d3e5e8174';
    const url = `https://www.exambazaar.com/api/coding-round/routes/exam-info/${api_key}`;
    const response  = await fetch(url);
    const rdata = await response.json();
    console.log('here comes the data.........');
    const streams = rdata.data.streams;
    
    const exams = rdata.data.exams;
    console.log(streams);
    console.log(exams);
    const ids = streams.map((st)=> st._id);
    //const sid = "58ac22a33cfd4f32bccf8a80";

    /*
    const examArray = exams.reduce((examArray,exam) => {
      if(exam.stream===id)
      examArray.push(exam);
      return examArray;
    },[]);
    */

    //const ext = exams.filter
    this.setState({streams:streams});
    this.setState({exams:exams});



    
    console.log(this.state.streams);
    console.log(this.state.exams);


 /*   const quesurl = 'https://www.exambazaar.com/api/coding-round/routes/random-question';
    axios.post(quesurl, {"api_key": "9166408289", "api_secret": "5ee9a6dbe2eb165d3e5e8174", "examId":"58ac2c317e852a2c401a8c3a"})
    .then((response) => {
      const question = response.data.data.question;
      console.log(question);
    }, (error) => {
      console.log(error);
    });
   */
    

  }
  componentDidMount()
  {
      this.fetchData("58ac22a33cfd4f32bccf8a80");
      
  }

  
  

//end
//for exambazaar 

constructor(props){
  super(props);
      this.state={streams:[],
      exams:[],
      selectedStream: ''
  }
  }
  
  onStreamSelect(sid){

    this.setState({selectedStream:sid});
    console.log(this.state.selectedStream);
  }

  render(){
  return (
    <div>
        <Header/>
        <div id= "maindiv" class="container">
          <StreamMenu streams ={this.state.streams} onClick={(sid)=> this.onStreamSelect(sid)} />
        
             
              <RenderExams exams = {this.state.exams} selectedStream={this.state.selectedStream}/>
        </div>      
        <Footer/>
    </div>
  );
  };
};

export default App;
