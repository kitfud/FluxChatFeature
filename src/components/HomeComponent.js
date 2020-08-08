import React, {Component} from 'react'
import {Card,CardBody,CardHeader,CardText} from 'reactstrap'
import { Loading } from './LoadingComponent';

function Slides ({slides, isLoading, errMess}){
    if (isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else


    if(slides !=null){

        const slideStory = slides.map((slide)=>
        <div key={slide.id}>{slide.description}</div> )
        return(
            slideStory
            )
    }
    else{
           return <div></div>;
    }
  

        
    }

class Home extends Component {
   
    
    render(){
        return(
            <div className='container'>
<div className='row'>
    <Card>
        <CardHeader>Home:</CardHeader>
        <CardBody>
            <CardText>
            <Slides slides ={this.props.slides.slides} isLoading={this.props.slides.isLoading} errMess={this.props.slides.errMess}/>
            </CardText>
        </CardBody>
    </Card>
</div>
</div>

        )
        }
}

export default Home;