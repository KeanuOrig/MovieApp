
export const movieName = (e) =>{
    return {
        type: 'MOVIE_NAME',
        payload: e
    }
}
export const review = (e) =>{
    return {
        type: 'REVIEW',
        payload: e
    }
}
export const newReview = (e) =>{

    return {
        type: 'NEW_REVIEW',
        payload: e
    }
}
export const file = (e) =>{
 
    return {
        type: 'FILE',
        payload: e
    }
}
export const movieList = (e) =>{
 
    return {
        type: 'MOVIELIST',
        payload: e
    }
}

