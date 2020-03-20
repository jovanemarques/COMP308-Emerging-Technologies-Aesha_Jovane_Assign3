
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2> Express - React with CRUD Operations</h2>
            <p>React front-end calls Express REST API to add, 
            list, update, or delete a student ,list all the courses taken by a student, list all students, list all courses, and list all students that are taking a given course.</p>
        </div>
    );

}

export default withRouter(Home);