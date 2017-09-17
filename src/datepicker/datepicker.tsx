import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Pikaday from "pikaday"
import { Moment } from "moment";

export class Datepicker extends React.Component<{startDate?: Date, endDate?: Date, onDateChange: (date: Date) => void}, {}>{
    picker: Pikaday;
    componentDidMount() {
        const {startDate, endDate, onDateChange} = this.props;
        this.picker = new Pikaday({
            field: ReactDOM.findDOMNode(this.refs.pikaday),
            minDate: startDate,
            maxDate: endDate,
            onSelect: onDateChange,
            format: "DD.MM.YYYY",
        });
    }

    componentDidUpdate(){
        const {startDate, endDate} = this.props;
        this.picker.setMaxDate(endDate);
        this.picker.setMinDate(startDate);
    }
    render(){
        return (<input type="text" ref="pikaday"/>)
    }
}