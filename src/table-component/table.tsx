import * as React from "react";
import { DataType, HeaderType, PropertyType } from "../shared/types";
import { DragSource, DragSourceSpec, DragDropContext, DragSourceMonitor, DragSourceConnector, ConnectDragSource, DropTargetSpec, DropTargetConnector, DropTargetMonitor, ConnectDropTarget, DropTarget } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
import { TableHeader } from "./table-header";

class TableRow extends React.Component<{ record: DataType, columns: PropertyType[] }, {}>{
    render() {
        const { record, columns } = this.props;

        return (
            <tr>
                {columns.map(y => <td key={record.id + y} >{record[y]}</td>)}
            </tr>)
    }
}

export type TableProps = {data: DataType[], columns: PropertyType[], header: HeaderType, onDrop: (source: PropertyType, target: PropertyType) => void}
class TableComponent extends React.Component<TableProps, {}>{
    getData = (x: PropertyType, y: HeaderType | DataType) => y[x];

    render() {
        const { data, columns, header, onDrop } = this.props;
        return (
            <table>
                <TableHeader columns={columns} header={header} onDrop={onDrop} />
                <tbody>
                    {data.map(x => <TableRow key={x.id} columns={columns} record={x} />)}
                </tbody>
            </table>)
    }
}

export const Table = DragDropContext(HTML5Backend)(TableComponent)