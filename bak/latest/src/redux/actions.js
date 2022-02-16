
export const movieName = (e) =>{
    return {
        type: 'MOVIE_NAME',
        payload: e.target.value
    }
}
export const review = (e) =>{
    return {
        type: 'REVIEW',
        payload: e.target.value
    }
}
export const newReview = (e) =>{

    return {
        type: 'NEW_REVIEW',
        payload: e.target.value
    }
}
export const file = (e) =>{
 
    return {
        type: 'FILE',
        payload: e.target.files[0]
    }
}

