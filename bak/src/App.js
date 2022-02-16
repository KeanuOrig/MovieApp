import './App.css';
import {useState, useEffect} from "react";
import {Form, Row, Col} from 'react-bootstrap';
import Axios from 'axios';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import {useSelector} from 'react-redux';


export default function App() {
/*  const movieName = useSelector(state => state.movieName);
  const review = useSelector(state => state.review);
  const movieList = useSelector(state => state.movieList);
  const newReview = useSelector(state => state.newReview);
  const file = useSelector(state => state.file);*/
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieList, setMovieList] = useState([])
  const [newReview, setNewReview] = useState('')
  const [file, setFile] = useState()

  useEffect(() =>{
    Axios.get("http://localhost:4000/api/get").then((response) =>{
      setMovieList(response.data)
    })
  }, [movieList, newReview])

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
    setNewReview('')
  }

  const deleteReview = (id) =>{
    Axios.delete(`http://localhost:4000/api/delete/${id}`).then(alert("Deleted"))
  }

  return <Row className="justify-content-center mb-5">
          <Col xs={12} md={5}>
            <Form className="form p-3 mb-3" action="http://localhost:4000/api/insert" encType="multipart/form-data" method="post">
              <h1 className ="text-center">MOVIE REVIEWS</h1>
              <Form.Label>Movie Name:</Form.Label>
              <input type="text" onChange={(e) =>{setMovieName(e.target.value)}} className="form-control m-2" name="movieName"/>
              <Form.Label>Review:</Form.Label>
              <textarea
                className="form-control m-2" name="movieReview"
                rows="10"
                onChange={(e) =>{setReview(e.target.value)}}
                ></textarea>
              <input type="file" onChange={(e) =>{setFile(e.target.files[0])}} className="form-control-file m-2" name="image"/>
              <div className="text-center mt-3">
                <input type="submit" value="Submit" className="btn btn-success"/>
              </div>
            </Form>
          </Col>
          <Col xs={12} md={7}>
            {movieList.map((value) =>{
              return (
                <div key={value.id} className="card m-3">
                  <img src={`http://localhost:4000/images/${value.image}`}/>
                
                  <div className="card-body mb-3">
                    <h5 className="card-title">{value.movieName}</h5>
                    <p className="card-text">{value.movieReview}</p>
                  </div>

                <Form.Group className="m-3" controlId="Review">
                  <Form.Label>Update Review:</Form.Label>
                  <textarea
                    rows="1"
                    onChange={(e) =>{setNewReview(e.target.value)}}
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
