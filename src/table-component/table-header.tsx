import { PropertyType, HeaderType } from "../shared/types";
import { DragSourceSpec, DragSourceConnector, DragSourceMonitor, DropTargetSpec, DropTargetConnector, DropTargetMonitor, ConnectDragSource, ConnectDropTarget, DragSource, DropTarget } from "react-dnd";
import * as React from "react";


const ItemType = {
    Th: "TH"
}


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

type ThProps = { column: PropertyType, header: HeaderType, onDrop: (source: PropertyType, target: PropertyType) => void };

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


export type TableHeaderProps = {
    columns: PropertyType[],
    header: HeaderType,
    onDrop: (source: PropertyType, target: PropertyType) => void
};
export class TableHeader extends React.Component<TableHeaderProps, {}> {
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
