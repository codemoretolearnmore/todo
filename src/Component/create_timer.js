export default function CreateTimer(props){
    function toggleForm(evt){
        props.functions[0].changeOpenStatus();
    }
    function create(evt){
        var title=document.getElementById('title').value;
        var project=document.getElementById('project').value;
        props.functions[0].createTimer(title,project)
    }
    return(
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body" id={props.id}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" placeholder="Enter Title" id="title" name="title" defaultValue=''/>
                        </div>
                        <div className="form-group">
                            <label>Project Name</label>
                            <input type="text" className="form-control" placeholder="Enter Project Name" name="project" id="project" defaultValue=''/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={create}>Create</button>
                            <button className="btn btn-secondary" onClick={toggleForm}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-4"></div>
        </div>
    );
}