import TimerForm from "./TimerForm";
import Timer from './Timer';
export default function EditableTimer(props){
    return(
        props.timer.edit_form_open===1?<TimerForm {...props}/>:<Timer {...props}/>
        
    );
}