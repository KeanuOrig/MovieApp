import { combineReducers } from "redux";
import reducer from "./movie/reducer";

const rootReducer = combineReducers({
    type: reducer
});

export default rootReducer;
