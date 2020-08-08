import React, {Component} from 'react'
import {Card,CardBody,CardHeader,CardText} from 'reactstrap'

class About extends Component {
    render(){
        return(
      
<div className='container'>
<div className='row'>
    <Card>
        <CardHeader>About:</CardHeader>
        <CardBody>
            <CardText>
                This app is for the testing and development of features. Certain tabs 
                are also tutorials built out into web views which use input fields and buttons to teach higher order functions in an interactive way. 
            </CardText>
        </CardBody>
    </Card>
</div>
</div>


        )
    }
}

export default About;