import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function CreateArticle(props) {
    //
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [article, setArticle] = useState({ _id: '', course_code: '', course_name: '', section: '', semester: '',student_number: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3001/courses"
    //
    const saveArticle = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {course_code: article.course_code, course_name: article.course_name,section: article.section,
          semester:article.semester};
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save article:',result.data)
            props.history.push('/show/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setArticle({...article, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2> Create a course</h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form onSubmit={saveArticle}>
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
                Save Article
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateArticle);
