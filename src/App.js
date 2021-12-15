import './App.css';
import React from 'react';
import EditableTimerList from './Component/EditableTimerList';
import loader from './Component/loader.gif';
export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      timers:[],
      isOpen:false,
      is_loading:false
    }
    this.changeOpenStatus=this.changeOpenStatus.bind(this);
    this.toggleEditForm=this.toggleEditForm.bind(this);
    this.createTimer=this.createTimer.bind(this);
    this.updateTimer=this.updateTimer.bind(this);
    this.deleteTimer=this.deleteTimer.bind(this);
    this.pad=this.pad.bind(this);
    this.millisecondsToHuman=this.millisecondsToHuman.bind(this);
    this.handleStart=this.handleStart.bind(this);
    this.fetch_data=this.fetch_data.bind(this);
  }
  componentDidMount(){
    this.fetch_data();
    setTimeout(()=>{
      this.state.timers.map((timer)=>{
        if(timer.isRunning==="1"){
          this.handleStart(timer.id,'Start');
        }
       
      })
    },50);
    
  }
  fetch_data(){
    this.setState({is_loading:true});
    fetch('http://localhost/time-logging-app/demo.php', {
        method: 'POST',
        body: JSON.stringify({
          action:'fetch data',
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      }).then(data=>{this.setState({timers:data,is_loading:false});}).catch(function (error) {
        console.warn('Something went wrong.', error);
      });
  }
  changeOpenStatus(){
    this.setState((prevState)=>{
      return {
        isOpen:!prevState.isOpen
      };
    })
  }
  toggleEditForm(id){
    const newTimers=[];
    this.state.timers.map((timer)=>{
      if(timer.id===id){
        newTimers.push(Object.assign({},timer,{
          edit_form_open:timer.edit_form_open===0?1:0
        }));
      }else newTimers.push(timer);
    })
    this.setState({timers:newTimers});
  }
  updateTimer(id,title,project){
    fetch('http://localhost/time-logging-app/demo.php', {
      method: 'POST',
      body: JSON.stringify({
        action:'update',
        id:id,
        title: title,
        project:project
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }).then(data=>{
      this.toggleEditForm();
      const newTimers=this.state.timers.map((timer)=>{
        if(timer.id===id){
          return Object.assign({},timer,{
            title:title,project:project
          });
        }else return timer;
      })
      this.setState({timers:newTimers});
      this.toggleEditForm(id);
    }).catch(function (error) {
      console.warn('Something went wrong.', error);
    });
  }
createTimer(title,project){
  this.setState({is_loading:true});
  var len=this.state.timers.length;
  fetch('http://localhost/time-logging-app/demo.php', {
    method: 'POST',
    body: JSON.stringify({
      action:'create',
      id:len+1,
      title: title,
      project:project
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  }).then(data=>{
    var timers=this.state.timers;
    timers.push({id:len+1,title:title,project:project,time_elapsed:0,edit_form_open:0});
    this.setState({timers:timers,is_loading:false});
    this.changeOpenStatus();
  })
  .catch(function (error) {
    console.warn('Something went wrong.', error);
  });
}
deleteTimer(id){
  this.setState({is_loading:true});
  fetch('http://localhost/time-logging-app/demo.php', {
    method: 'POST',
    body: JSON.stringify({
      action:'delete',
      id:id
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  }).then(data=>{console.log(data);
    const newTimers=[];
    this.state.timers.map((timer)=>{
      if(timer.id===id)
      console.log(timer);
      else newTimers.push(timer);
    })
    this.setState({timers:newTimers,is_loading:false});
  })
  .catch(function (error) {
    console.warn('Something went wrong.', error);
  });
}
pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}
millisecondsToHuman(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    this.pad(hours.toString(), 2),
    this.pad(minutes.toString(), 2),
    this.pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
}
handleStart(id,text){
  if(text==='Start'){
  console.log('Starting');
    fetch('http://localhost/time-logging-app/demo.php', {
      method: 'POST',
      body: JSON.stringify({
        action:'updateStart',
        id:id,
        running_since:Date.now()
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }).then(data=>{console.log(data);
    })
    .catch(function (error) {
      console.warn('Something went wrong.', error);
    });
    this.fetch_data();
    setInterval(()=>this.forceUpdate(),100);
  }else{
    console.log('Stopping');
    fetch('http://localhost/time-logging-app/demo.php', {
      method: 'POST',
      body: JSON.stringify({
        action:'stopStart',
        id:id,
        curr_time:Date.now()
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }).then(data=>{console.log(data);
      
    })
    .catch(function (error) {
      console.warn('Something went wrong.', error);
    });
    window.location.reload();
    this.fetch_data();
    
  }
  
}
  render(){
    const functions=[{millisecondsToHuman:this.millisecondsToHuman,handleStart:this.handleStart,deleteTimer:this.deleteTimer,updateTimer:this.updateTimer,createTimer:this.createTimer,changeOpenStatus:this.changeOpenStatus,toggleEditForm:this.toggleEditForm}]
    return (
      <div>
        <div className="text-center">
          <h1 className="app-heading">Timer App</h1>
          {this.state.text}
        </div>
        <div className="preloader">
          {this.state.is_loading&&<img src={loader} alt="loader"/>}
        </div>
        
        <EditableTimerList functions={functions} updateTimer={this.updateTimer} {...this.state} createTimer={this.createTimer} changeOpenStatus={this.changeOpenStatus} toggleEditForm={this.toggleEditForm}/>
      </div>
    );
  }
}
App.defaultProps={
  text:'This is text'
}

