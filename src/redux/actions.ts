import { PropertyType } from "../shared/types";

export type Action = {
    type: "TOGGLE_COLUMN",
    show: boolean,
    column: PropertyType
}|{
    type: "MOVE_COLUMN",
    newIndex: number,
    column: PropertyType
}

export const toggleColumn =(show: boolean, column: PropertyType) : Action =>({
    type: "TOGGLE_COLUMN",
    show,
    column
})

export const moveCOlumn = (newIndex: number, column: PropertyType): Action => ({
    type: "MOVE_COLUMN",
    newIndex,
    column
})