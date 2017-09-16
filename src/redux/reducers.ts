import { combineReducers, Reducer } from "redux";
import { PropertyType } from "../shared/types";
import { Action } from "./actions";

export type Store = {
    columns: PropertyType[]
}

const columns = (store: PropertyType[] = [], action: Action): PropertyType[] => {
    switch (action.type) {
        case "TOGGLE_COLUMN":
            return action.show ? [...store, action.column] : store.filter(x => x != action.column);
        case "MOVE_COLUMN":
            const { column, newIndex } = action;
            const newArray = store.filter(x => x!== column);
            newArray.splice(newIndex, 0, column);
            return newArray;
        default:
            return store;
    }
}

export const reducer: Reducer<Store> = combineReducers({
    columns
})