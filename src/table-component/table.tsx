import * as React from "react";
import { DataType, HeaderType, PropertyType } from "../shared/types";
import { DragSource, DragSourceSpec, DragDropContext, DragSourceMonitor, DragSourceConnector, ConnectDragSource, DropTargetSpec, DropTargetConnector, DropTargetMonitor, ConnectDropTarget, DropTarget } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';

const ItemType = {
    Th: "TH"
}





type ThProps ={ column: PropertyType, header: HeaderType, onDrop: (source: PropertyType, target: PropertyType) => void };

const thSource: DragSourceSpec<ThProps> = {
    beginDrag: x => ({
        column: x.column
    })
}
function collectSource(connect: DragSourceConnector, monitor: DragSourceMonitor): DragProps {
    return {
        connectDragSource: connect.dragSource(),
    }
}

const thTarget: DropTargetSpec<ThProps> = {
    drop: (x, monitor) => {
        x.onDrop((monitor.getItem() as ThProps).column, x.column);
    }
}


function collectDrop(connect: DropTargetConnector, monitor: DropTargetMonitor): DropProps {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
  }

  type DragProps = {
    connectDragSource: ConnectDragSource,
  }

  type DropProps = {
    connectDropTarget: ConnectDropTarget,
    isOver: boolean
  }

class ThComponent extends React.Component<ThProps & DragProps & DropProps, {}> {
    render() {
        const { column, header, connectDragSource, connectDropTarget } = this.props;
        return connectDropTarget(connectDragSource(
            <th>{header[column]}</th>
        ));
    }
}

const ThSource = DragSource(ItemType.Th, thSource, collectSource)(ThComponent);
const Th = DropTarget(ItemType.Th, thTarget, collectDrop)(ThSource);

class TableHeader extends React.Component<{ columns: PropertyType[], header: HeaderType, onDrop: (source: PropertyType, target: PropertyType) => void }, {}> {
    render() {
        const { columns, header, onDrop } = this.props;
        return (
            <thead>
                <tr>
                    {columns.map(x => <Th key={"head" + x} column={x} header={header} onDrop={onDrop} />)}
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