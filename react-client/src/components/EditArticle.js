import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditArticle(props) {
  console.log('edituser props:',props.match.params)
  const [article, setArticle] = useState({ _id: '', title: '', 
  content: '' });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3001/courses/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setArticle(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateArticle = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { course_code: article.course_code, course_name: article.course_name,
      section: article.section,
      semester:article.semester};
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setArticle({...article, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={updateArticle}>
        <Form.Group>
                <Form.Label> Course Code</Form.Label>
                <Form.Control type="text" name="course_code" id="course_code" placeholder="Enter Course Code" value={article.course_code} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Course Name</Form.Label>
                <Form.Control as="text" name="course_name" id="course_name" placeholder="Enter Course Name" value={article.course_name} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Section</Form.Label>
                <Form.Control as="text" name="section" id="section" placeholder="Enter Course Section" value={article.section} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Semester</Form.Label>
                <Form.Control as="text" name="semester" id="semester" placeholder="Enter Semester" value={article.semester} onChange={onChange} />
              </Form.Group>
          
          
        
          <Button variant="primary" type="submit">
            Update Course
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditArticle);
