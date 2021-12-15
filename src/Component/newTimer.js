import React from 'react';
export default class newTimer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            timer:{
                id:props.id,
                title:props.timer.title,
                project:props.timer.project,
                time_elapsed:props.timer.time_elapsed,
                running_since:props.timer.running_since,
                isRunning:props.timer.isRunning,
            },
            running_time:'',
            functions:props.functions
        }
        this.toggleForm=this.toggleForm.bind(this);
        this.deleteTimer=this.deleteTimer.bind(this);
        this.handleStart=this.handleStart.bind(this);
    }
    componentDidMount(){
        const value=this.state.functions[0].millisecondsToHuman(parseInt(this.state.timer.time_elapsed));
        this.setState({running_time:value});
        console.log(this.state);
        this.forceUpdateInterval=setInterval(()=>{this.forceUpdate()},50);
    }
    componentWillUnmount(){
        clearInterval(this.forceUpdateInterval);
    }
    toggleForm(evt){
        var id=evt.target.parentNode.parentNode.id.split('_')[1];
        this.state.functions[0].toggleEditForm(id);
    }
    deleteTimer(evt){
        this.state.functions[0].deleteTimer(evt.target.parentNode.parentNode.id.split('_')[1]);
    }
    handleStart(evt){
        this.state.functions[0].handleStart(evt.target.parentNode.id.split('_')[1],evt.target.innerHTML);
        this.setState({running_since:Date.now()});
    }
    render(){
        const btnText=this.state.timer.isRunning==="1"?'Stop':'Start';
        const name=this.state.timer.isRunning==="1"?'btn btn-danger':'btn btn-success';
        const value=this.state.functions[0].millisecondsToHuman(parseInt(this.state.timer.time_elapsed));
        return(
            <div className="row timer">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body" id={this.state.timer.id}>
                            <h5 className="card-title">{this.state.timer.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{this.state.timer.project}</h6>
                            <p className="card-text text-center">{value}</p>
                            <p className="card-link text-right"><span className="fa fa-edit" onClick={this.toggleForm}></span><span className="fa fa-trash" onClick={this.deleteTimer}></span></p>
                            <button className={name} id="start" onClick={this.handleStart}>{btnText}</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        );
    }
}