import {useEffect} from "react";
import {Form, Row, Col, Spinner} from 'react-bootstrap';
import Axios from 'axios';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import {useSelector, useDispatch, connect} from 'react-redux';
import {movieName, review, newReview, file} from './../redux/actions'

function Home(props) {

  const newReview = useSelector(state => state.newReview)
  const movieList = useSelector(state => state.movieList)
  const dispatch = useDispatch();


  console.log(movieList)
  
  const fetchData = () =>{
    Axios.get("https://mysql-crud-application.herokuapp.com/api/get").then((response) =>{
      console.log(response.data)
      dispatch(
        {
          type: 'MOVIELIST', 
          payload: response.data
        })
    })
  }
  useEffect(() =>{
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    Axios.put(`https://mysql-crud-application.herokuapp.com/api/update/`,{
      id: id,
      movieReview: newReview
    }).then(alert("Updated"))
    fetchData()
  }

  const deleteReview = (id) =>{
    Axios.delete(`https://mysql-crud-application.herokuapp.com/api/delete/${id}`).then(alert("Deleted"))
    fetchData()
  }

  const handleSubmit = (e) => {
    alert("Submitted")
  }
  return <Row className="justify-content-center mb-5">
          <Col xs={12} md={5}>
            <Form className="form p-3 mb-3" action="https://mysql-crud-application.herokuapp.com/api/insert" encType="multipart/form-data" method="post" onSubmit={(e) => handleSubmit(e)}>
              <h1 className ="text-center">MOVIE REVIEWS</h1>
              <Form.Label>Movie Name:</Form.Label>
              <input 
                type="text" className="form-control m-2" name="movieName"
                onChange={props.movieName} required
                />
              <Form.Label>Review:</Form.Label>
              <textarea
                className="form-control m-2" name="movieReview"
                rows="10"
                onChange={props.review} required
                ></textarea>
              <input type="file" onChange={props.file} className="form-control-file m-2" name="image"/>
              <div className="text-center mt-3">
                <input type="submit" className="btn btn-success"/>
              </div>
            </Form>
          </Col>
          {
            (movieList.length === 0) ?
              <Col xs={12} md={7}>
                <Spinner className="loadingSpinner my-5 mx-5" animation="border" variant="primary" />
              </Col>
            :
              <Col xs={12} md={7}>
                {movieList.map((value) =>{
                  return (
                    <div key={value.id} className="card m-3">
                      <img alt="movie" src={`https://mysql-crud-application.herokuapp.com/images/${value.image}`}/>
                    
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
          }
        </Row>
}

const mapStateToProps = (state) => {

  return{ 
    movieName: state.movieName,
    review: state.movieName,
    newReview: state.newReview,
    file: state.file,
    movieList: state.movieList
  }
}

const mapDistpatchToProps = (dispatch) => {
  return {
    movieName: (e) => {dispatch(movieName(e.target.value))},
    review: (e) => {dispatch(review(e.target.value))},
    newReview: (e) => {dispatch(newReview(e.target.value))},
    file: (e) => {dispatch(file(e.target.files[0]))}
  }
}

export default connect(mapStateToProps, mapDistpatchToProps)(Home);