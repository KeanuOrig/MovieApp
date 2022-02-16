import * as actionTypes from "./types";

const initial_state = {
    movieName: ""
    // review: "",
    // movieList: [],
    // newReview: "",
    // file: ""
};
const reducer = (state, action) =>{
    switch(action.type){
        case actionTypes.delete_movie:
            return {}
        default:
        return state;
    }
};
export default reducer
