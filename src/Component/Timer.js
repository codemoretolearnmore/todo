export default function Timer(props){
    function toggleForm(evt){
        console.log(typeof(props.timer.edit_form_open));
        var id=evt.target.parentNode.parentNode.id.split('_')[1];
        props.functions[0].toggleEditForm(id);
    }
    function deleteTimer(evt){
        props.functions[0].deleteTimer(evt.target.parentNode.parentNode.id.split('_')[1]);
    }
    function handleStart(evt){
        props.functions[0].handleStart(evt.target.parentNode.id.split('_')[1],evt.target.innerHTML);
    }
    const btnText=props.timer.isRunning==="1"?'Stop':'Start';
    const name=props.timer.isRunning==="1"?'btn btn-danger':'btn btn-success';
    var value='Last Running Time '+props.functions[0].millisecondsToHuman(parseInt(Date.now()-props.timer.running_since))+' minutes';
    if(props.timer.isRunning!=="1")
    value='Total runnning Time: '+props.functions[0].millisecondsToHuman(parseInt(props.timer.time_elapsed));
    const editclass=props.timer.isRunning==="1"?'hide':'fa fa-edit';
    const trashclass=props.timer.isRunning==="1"?'hide':'fa fa-trash'

    return(
        <div className="row timer">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body" id={props.id}>
                        <h5 className="card-title">{props.timer.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{props.timer.project}</h6>
                        <p className="card-text text-center">{value}</p>
                        <p className="card-link text-right"><span className={editclass} onClick={toggleForm}></span><span className={trashclass} onClick={deleteTimer}></span></p>
                        <button className={name} id="start" onClick={handleStart}>{btnText}</button>
                    </div>
                </div>
            </div>
            <div className="col-sm-4"></div>
        </div>
        
    );
}