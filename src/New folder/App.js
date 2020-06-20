import React, { Component } from 'react';
import './App.css';
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
    
   /* const Streams = this.state.streams.map(s=>{
      return s.name;
    }
    );*/
    console.log(typeof this.state.streams);
    
   
    

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
        
          <StreamMenu streams ={this.state.streams} onClick={(sid)=> this.onStreamSelect(sid)} />
        
             
              <RenderExams exams = {this.state.exams} selectedStream={this.state.selectedStream}/>
			
    </div>
  );
  };
};

export default App;
