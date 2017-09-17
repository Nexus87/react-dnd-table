import { PropertyType } from "../shared/types";

export type Action = {
    type: "TOGGLE_COLUMN",
    show: boolean,
    column: PropertyType
}|{
    type: "MOVE_COLUMN",
    newIndex: number,
    column: PropertyType
}|{
    type: "SET_START_DATE",
    date: Date
}|{
    type: "SET_END_DATE",
    date: Date
}

export const toggleColumn =(show: boolean, column: PropertyType) : Action =>({
    type: "TOGGLE_COLUMN",
    show,
    column
})

export const moveColumn = (newIndex: number, column: PropertyType): Action => ({
    type: "MOVE_COLUMN",
    newIndex,
    column
})

export const setStartDate = (date: Date): Action => ({
    type: "SET_START_DATE",
    date
});

export const setEndDate = (date: Date): Action => ({
    type: "SET_END_DATE",
    date
});