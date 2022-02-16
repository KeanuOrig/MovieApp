import './App.css';
import {useEffect} from "react";
import {Form, Row, Col} from 'react-bootstrap';
import Axios from 'axios';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import {useSelector, useDispatch, connect} from 'react-redux';
import {movieName, review, newReview, file} from './redux/actions'
import page from './pages/home';

function App(props) {

  const newReview = useSelector(state => state.newReview)
  const movieList = useSelector(state => state.movieList)
  const dispatch = useDispatch();

  useEffect(() =>{
     
    Axios.get("http://localhost:4000/api/get").then((response) =>{
      dispatch(
        {
          type: 'MOVIELIST', 
          payload: response.data
        })
    })
  },[])

/*  const submitReview = () =>{
    console.log(file)
    Axios.post("http://localhost:4000/api/insert", 
      {
        movieName: movieName,
        movieReview: review,
        image: file
      }).then(alert("Submitted"))
  }*/

  const updateReview = (id) =>{
    Axios.put(`http://localhost:4000/api/update/`,{
      id: id,
      movieReview: newReview
    }).then(alert("Updated"))
  }

  const deleteReview = (id) =>{
    Axios.delete(`http://localhost:4000/api/delete/${id}`).then(alert("Deleted"))
  }

  return <Row className="justify-content-center mb-5">
          <Col xs={12} md={5}>
            <Form className="form p-3 mb-3" action="http://localhost:4000/api/insert" encType="multipart/form-data" method="post">
              <h1 className ="text-center">MOVIE REVIEWS</h1>
              <Form.Label>Movie Name:</Form.Label>
              <input 
                type="text" className="form-control m-2" name="movieName"
                onChange={props.movieName} 
                />
              <Form.Label>Review:</Form.Label>
              <textarea
                className="form-control m-2" name="movieReview"
                rows="10"
                onChange={props.review}
                ></textarea>
              <input type="file" onChange={props.file} className="form-control-file m-2" name="image"/>
              <div className="text-center mt-3">
                <input type="submit" value="Submit" className="btn btn-success"/>
              </div>
            </Form>
          </Col>
          <Col xs={12} md={7}>
            {movieList.map((value) =>{
              return (
                <div key={value.id} className="card m-3">
                  <img alt="movie" src={`http://localhost:4000/images/${value.image}`}/>
                
                  <div className="card-body mb-3">
                    <h5 className="card-title">{value.movieName}</h5>
                    <p className="card-text">{value.movieReview}</p>
                  </div>

                <Form.Group className="m-3" controlId="Review">
                  <Form.Label>Update Review:</Form.Label>
                  <textarea
                    rows="1"
                    onChange={props.newReview}
                    ></textarea>
                </Form.Group>

                  <button onClick ={() => updateReview(value.id)} type="button" className="btn btn-info mx-5 mb-3">UPDATE</button>
                  <button onClick ={() => deleteReview(value.id)} type="button" className="btn btn-danger mx-5 mb-3">DELETE</button>
                </div>
              )
            })}

          </Col>
        </Row>
}

const mapStateToProps = (state) => {
  return{ 
    movieName: state.movieName,
    review: state.movieName,
    newReview: state.newReview,
    file: state.file
  }
}

const mapDistpatchToProps = (dispatch) => {
  return {
    movieName: (e) => {dispatch(movieName(e))},
    review: (e) => {dispatch(review(e))},
    newReview: (e) => {dispatch(newReview(e))},
    file: (e) => {dispatch(file(e))}
  }
}

export default connect(mapStateToProps, mapDistpatchToProps)(App);