import EditableTimer from './EditableTimer';
import ToggleableTimerForm from './ToggleableTimerForm';
export default function EditableTimerList(props){
    return(
        <div className="container">
            <ToggleableTimerForm functions={props.functions} createTimer={props.createTimer} isOpen={props.isOpen}/>
            {props.timers.map((timer,index)=>
                <EditableTimer key={index} timer={timer} id={'timer_'+timer.id} functions={props.functions}/>
            )}
            
        </div>
    );
}