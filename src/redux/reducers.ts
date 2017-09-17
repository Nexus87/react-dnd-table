import { combineReducers, Reducer } from "redux";
import { PropertyType } from "../shared/types";
import { Action } from "./actions";

export type Store = {
    columns: PropertyType[],
    dates: DateStore
}

export type DateStore = {
    startDate: Date,
    endDate: Date
}

const columns = (store: PropertyType[] = [], action: Action): PropertyType[] => {
    switch (action.type) {
        case "TOGGLE_COLUMN":
            return action.show ? [...store, action.column] : store.filter(x => x != action.column);
        case "MOVE_COLUMN":
            const { column, newIndex } = action;
            const newArray = store.filter(x => x !== column);
            newArray.splice(newIndex, 0, column);
            return newArray;
        case "SET_START_DATE":
        default:
            return store;
    }
}

const dates = (store: DateStore = {startDate: null, endDate: null}, action: Action): DateStore => {
    switch (action.type) {
        case "SET_START_DATE":
            return { ...store, startDate: action.date };
        case "SET_END_DATE":
            return { ...store, endDate: action.date };
        default:
            return store;
    }
}
export const reducer: Reducer<Store> = combineReducers({
    columns,
    dates
})