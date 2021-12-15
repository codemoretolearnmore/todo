export default function TimerForm(props){
    const submitText=props.timer.title!==''?'Update':'Create';
    function toggleForm(evt){
        props.functions[0].toggleEditForm(evt.target.parentNode.parentNode.id.split('_')[1]);
    }
    function saveClick(evt){
        const id=evt.target.parentNode.parentNode.id.split('_')[1];
        const title=document.getElementById('title').value;
        const project=document.getElementById('project').value;
        props.functions[0].updateTimer(id,title,project);
    }
    return(
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body" id={props.id}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" placeholder="Enter Title" id="title" name="title" defaultValue={props.timer.title}/>
                        </div>
                        <div className="form-group">
                            <label>Project Name</label>
                            <input type="text" className="form-control" placeholder="Enter Project Name" name="project" id="project" defaultValue={props.timer.project}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={saveClick}>{submitText}</button>
                            <button className="btn btn-secondary" onClick={toggleForm}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-4"></div>
        </div>
    );
}