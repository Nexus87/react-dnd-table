import "./style.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { data, header, columns } from "./shared/dummyData"
import { createStore } from "redux";
import { reducer } from "./redux/reducers";
import { Main } from "./main";
import { Provider } from "react-redux";


const store = createStore(reducer, {columns}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
    (
        <Provider store={store}>
            <Main allColumns={columns} data={data} header={header} />
        </Provider>
    ),
    document.getElementById("root"))