import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Pikaday from "pikaday"
import * as moment from "moment";

export class Datepicker extends React.Component<{startDate?: Date, endDate?: Date, onDateChange: (date: Date) => void}, {}>{
    picker: Pikaday;
    componentDidMount() {
        const {startDate, endDate, onDateChange} = this.props;
        this.picker = new Pikaday({
            field: ReactDOM.findDOMNode(this.refs.pikaday),
            minDate: startDate,
            maxDate: endDate,
            // onSelect: onDateChange,
            format: "DD.MM.YYYY",
        });
    }

    componentDidUpdate(){
        const {startDate, endDate} = this.props;
        this.picker.setMaxDate(endDate);
        this.picker.setMinDate(startDate);
    }

    handleFocusLost = (e: React.FocusEvent<HTMLInputElement>) => {
        const date = moment(e.currentTarget.value, "DD.MM.YYYY")
        if(date.isValid()){
            this.props.onDateChange(date.toDate());
        }else {
            this.props.onDateChange(null);
            e.currentTarget.value = "";
        }
    }
    render(){
        return (<input type="text" ref="pikaday" onBlur={this.handleFocusLost}/>)
    }
}