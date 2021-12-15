import CreateTimer from './create_timer';
export default function ToggleableTimerForm(props){
    function toggleStatus(){
        props.functions[0].changeOpenStatus();
    }
    return(
        props.isOpen?<CreateTimer {...props} CreateTimer={props.CreateTimer} changeOpenStatus={props.changeOpenStatus}/>:
        <div className="row">
            <div className="col-sm-4">
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <button type="button" className="btn btn-secondary add-btn" onClick={toggleStatus}><span className="fa fa-plus"></span></button>
                    </div>
                </div>
                
            </div>
            <div className="col-sm-3"></div>
        </div>
    );
}