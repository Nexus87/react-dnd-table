import * as React from "react";
import { PropertyType, DataType, HeaderType } from "./shared/types";
import { Table } from "./table-component/table";
import { Store } from "./redux/reducers";
import { Dispatch, bindActionCreators } from "redux";
import { toggleColumn } from "./redux/actions";
import { connect } from "react-redux";

type OwnProps = {
    allColumns: PropertyType[];
    data: DataType[],
    header: HeaderType
}

type ConnectedProps = {
    columns: PropertyType[];
}

type ConnectedDispatcher = {
    toggleColumns(show: boolean, column: PropertyType);
}

class MainComponent extends React.Component<OwnProps & ConnectedProps & ConnectedDispatcher, {}>{
    render() {
        const {allColumns, data, columns, header} = this.props;
        var visibleColumns = allColumns.filter(x => columns.filter(y => y === x)[0]);
        return(
            <Table columns={visibleColumns} data={data} header={header}/>
        )
    }
}

const mapStateToProps = (store: Store): ConnectedProps => ({
    columns: store.columns
})

const mapDispatcherToProps = (dispatch: Dispatch<Store>): ConnectedDispatcher => ({
    toggleColumns: bindActionCreators(toggleColumn, dispatch)
})

export const Main = connect(mapStateToProps, mapDispatcherToProps)(MainComponent);