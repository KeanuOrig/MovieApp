
const initialState = {
    movieName: '',
    review: '',
    newReview: '',
    file: '',
    movieList: []
}
const movieReducer = (state = initialState, action) => {
    /*console.log(action)*/
    switch (action.type) {
        case "MOVIE_NAME":
            return Object.assign({}, state, {movieName: action.payload});
        case "REVIEW":
            return Object.assign({}, state, {review: action.payload});
        case "NEW_REVIEW":
            return {...state, newReview: action.payload};
        case "FILE":
            return {...state, file: action.payload};
        case "MOVIELIST":
            return {...state, movieList: action.payload};
        default:
            return state;
    }
}


export default movieReducer;

