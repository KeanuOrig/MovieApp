import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import movieReducer from "./redux/reducer";

const store = createStore(movieReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


/*store.subscribe( () => {
	console.log("store changed", store.getState())
})

store.dispatch({
       type: 'MOVIE_NAME',
       payload: "asdasds"
    })
*/
ReactDOM.render(
	<Provider store={store}>
		<App /> 
	</Provider>
, document.getElementById('root'));
