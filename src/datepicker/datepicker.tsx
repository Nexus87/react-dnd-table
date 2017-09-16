import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Pikaday from "pikaday"

export class Datepicker extends React.Component<{}, {}>{
    componentDidMount(){
        const options: Pikaday.PikadayOptions = {
        }
        const picker = new Pikaday({
            field: ReactDOM.findDOMNode(this.refs.pikaday)
        });
    }
    render(){
        return (<input type="text" ref="pikaday"/>)
    }
}