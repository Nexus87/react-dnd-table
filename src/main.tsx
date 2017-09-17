import * as React from "react";
import { PropertyType, DataType, HeaderType } from "./shared/types";
import { Table } from "./table-component/table";
import { Store } from "./redux/reducers";
import { Dispatch, bindActionCreators } from "redux";
import { toggleColumn, moveColumn, setEndDate, setStartDate } from "./redux/actions";
import { connect } from "react-redux";
import { Datepicker } from "./datepicker/datepicker";

type OwnProps = {
    allColumns: PropertyType[];
    data: DataType[],
    header: HeaderType
}

type ConnectedProps = {
    columns: PropertyType[];
    startDate: Date;
    endDate: Date;
}

type ConnectedDispatcher = {
    toggleColumns(show: boolean, column: PropertyType);
    moveColumn(newIndex: number, column: PropertyType);
    setStartDate(startDate: Date);
    setEndDate(endDate: Date);
}

class MainComponent extends React.Component<OwnProps & ConnectedProps & ConnectedDispatcher, {}>{
    moveColumn = (source: PropertyType, target: PropertyType) => {
        const newIndex = this.props.columns.indexOf(target);
        this.props.moveColumn(newIndex, source);
    }
    render() {
        const { allColumns, data, columns, header, endDate, startDate } = this.props;
        return (
            <div>
                <div>
                    <Datepicker onDateChange={this.props.setStartDate} endDate={this.props.endDate}/>
                    <Datepicker onDateChange={this.props.setEndDate} startDate={this.props.startDate}/>
                </div>
                <Table columns={columns} data={data} header={header} onDrop={this.moveColumn} />
            </div>
        )
    }
}

const mapStateToProps = (store: Store): ConnectedProps => ({
    columns: store.columns,
    endDate: store.dates.endDate,
    startDate: store.dates.startDate
})

const mapDispatcherToProps = (dispatch: Dispatch<Store>): ConnectedDispatcher => ({
    toggleColumns: bindActionCreators(toggleColumn, dispatch),
    moveColumn: bindActionCreators(moveColumn, dispatch),
    setEndDate: bindActionCreators(setEndDate, dispatch),
    setStartDate: bindActionCreators(setStartDate, dispatch)
})

export const Main = connect(mapStateToProps, mapDispatcherToProps)(MainComponent);