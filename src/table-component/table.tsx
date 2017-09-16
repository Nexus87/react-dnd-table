import * as React from "react";
import { DataType, HeaderType, PropertyType } from "../shared/types";
import {DragSource, DragSourceSpec, DragDropContext, DragSourceMonitor, DragSourceConnector, ConnectDragSource} from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';

const ItemType = {
    Th: "TH"
}

type ConnectProps = {
    connectDragSource: ConnectDragSource,
  }
function collect(connect: DragSourceConnector, monitor: DragSourceMonitor): ConnectProps {
    return {
      connectDragSource: connect.dragSource(),
    }
  }

type ThProps ={ column: PropertyType, header: HeaderType };
const thSource: DragSourceSpec<ThProps> = {
    beginDrag: x => ({
        column: x.column
    })
}


class ThComponent extends React.Component<ThProps & ConnectProps, {}> {
    render() {
        const { column, header, connectDragSource } = this.props;
        return connectDragSource(
            <th>{header[column]}</th>
        )
    }
}

const Th = DragSource(ItemType.Th, thSource, collect)(ThComponent);

class TableHeader extends React.Component<{ columns: PropertyType[], header: HeaderType }, {}> {
    render() {
        const { columns, header } = this.props;
        return (
            <thead>
                <tr>
                    {columns.map(x => <Th key={"head" + x} column={x} header={header} />)}
                </tr>
            </thead>
        )
    }
}

class TableRow extends React.Component<{ record: DataType, columns: PropertyType[] }, {}>{
    render() {
        const { record, columns } = this.props;

        return (
            <tr>
                {columns.map(y => <td key={record.id + y} >{record[y]}</td>)}
            </tr>)
    }
}

export type TableProps = {data: DataType[], columns: PropertyType[], header: HeaderType}
class TableComponent extends React.Component<TableProps, {}>{
    getData = (x: PropertyType, y: HeaderType | DataType) => y[x];

    render() {
        const { data, columns, header } = this.props;
        return (
            <table>
                <TableHeader columns={columns} header={header} />
                <tbody>
                    {data.map(x => <TableRow key={x.id} columns={columns} record={x} />)}
                </tbody>
            </table>)
    }
}

export const Table = DragDropContext(HTML5Backend)(TableComponent)