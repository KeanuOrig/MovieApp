import * as actionTypes from "./types.;"

export const delete_movie = (id) =>{
    return {
        type: actionTypes.delete_movie,
        payload: {
            id: id
        }
    }
}