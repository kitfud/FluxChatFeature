import React, {Component} from 'react'
import {CardHeader, Card, Button, Modal, ModalHeader, ModalBody, Label, Row, Col, CardBody, CardText } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Timer from './TimerComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



function RenderComments({comments,deleteComment, upComment,downComment}){  
  
    if(comments != null){
       
     const rencomment = comments.map((info) => 
     <Card style = {cardStyle}  key={info._id}>
    <CardBody>
        <div className="container">
<div className="row">
    <div className="col-12 col-md-4">
        <Card>
           
        <CardHeader>
        Up: {info.thumbsUp}
        {info.startTimer? <span style={buttonStyle} onClick={()=>{upComment(info)}} className="fa fa-thumbs-up fa-4x"></span>: null}
        
        </CardHeader>
    <CardHeader>
    Down:{info.thumbsDown}
    {info.startTimer?  <span style={buttonStyle} onClick={()=>{downComment(info)}} className="fa fa-thumbs-down fa-4x"></span>: null}
   
    </CardHeader>
        </Card>
   
   
    </div>
    <div className="col-12 col-md-7">
    
              
                <ol>
     <p style = {textStyle}>{info.comment}</p>
  
     <p>-- {info.author.firstname}<span> </span>

     {new Intl.DateTimeFormat('en-US', 
     { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(info.updatedAt.toDate())))}
      

      <span style={buttonStyle} className="fa fa-trash-o" onClick={() =>{if(window.confirm('are you sure you want to delete this comment?')) deleteComment(info) }}></span>
     

     </p>
     </ol> 
               
     
   
    </div>


     
</div>
        </div>
 
    </CardBody>

     </Card>
   
);
      
        return(
        <div  >
              {rencomment} 
        </div> 
        )
    }
    else{
        return <div></div>;
    }
    }


class Chat extends Component {

    constructor(props){
        super(props);  
        //necessary for page relaoad and persisting login
  
        
        this.state = {
            isModalOpen: false,
            comments: this.props.comments,
            timerActive: localStorage.getItem('timerActive') != null ? localStorage.getItem('timerActive'):false,
            minutes:localStorage.getItem('minutes')>0 ? localStorage.getItem('minutes'):0,
            seconds:localStorage.getItem('seconds')>0 ? localStorage.getItem('seconds'):0,
          };

        this.toggleModal = this.toggleModal.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.renderTimer = this.renderTimer.bind(this);
        this.endVoting = this.endVoting.bind(this);
            }

    
renderTimer(comments,toggleTimer, timerActive, minutes,seconds){

    if(comments !=null && timerActive ===false){
        const rentimer = comments.map((data)=>
        data.startTimer ? <Timer key={data._id} toggleTimer={toggleTimer} id={data} minutes={minutes} seconds={seconds}/>: null
        
        )
      
        return(
           
            <div>
       {rentimer}
            </div>
         
        )
    }
       
        else{
            return <div></div>;    
        }
    
    }

    componentDidMount(){
       
            this.myInterval = setInterval(() => {
       
                if (this.state.seconds > 0) {
    
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
    
                
                 
                }
                if (this.state.seconds === 0 && this.state.timerActive) {
    
                    if (this.state.minutes === 0) {
                        this.props.toggleTimer()
                        
                        clearInterval(this.myInterval)
                        localStorage.clear();
                    
                    } 
                  
                    else {
                        this.setState(({ minutes }) => ({
                            minutes: minutes - 1,
                            seconds: 59
                        }))
                        //localStorage.setItem('minutes',minutes)
                    }
                } 
            }, 1000)
        
       
    }
    componentWillUnmount() {
        clearInterval(this.myInterval)
                  
              
          }
    componentDidUpdate(){
        localStorage.setItem('minutes',this.state.minutes)
        localStorage.setItem('seconds',this.state.seconds)  
      
        if(this.state.seconds===0 && this.state.minutes===0){
            console.log("THIS IS THE TIMER"+ this.state.timerActive)

            if(this.state.timerActive===true){
              console.log("Turning off voting")
              this.props.toggleTimer()
            }
                
                    
            }

          
     
           
        }
     
    

    checkLogin(){
        if(!this.props.authenticate.isAuthenticated){
            alert("login first to submit a comment")
        }
        else{
            this.toggleModal();
        }   
     }

     toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen,
         
        });
      }

      endVoting(){
          this.setState({
              minutes:0,
              seconds:0
          })
      }

      handlePost(values) {
       
        this.props.postComment(values.comment, this.props.user)
        
        this.setState({
            seconds:50,
            timerActive:true
        })
        localStorage.setItem('timerActive',this.state.timerActive)
        this.toggleModal()
        
        
        
       
       
        } 

render(){
const { minutes, seconds } = this.state

    return(
<React.Fragment>
<div className ="container">

<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
<ModalBody>


<LocalForm onSubmit={(values) => this.handlePost(values)}>

<div className="container">

             <Row className="form-group">
                              
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment:</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Col md={{size:10, offset: 0}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                            </div>
                            </LocalForm>
</ModalBody>
</Modal>

<div className ="row">

<div className="col-6">

{this.props.user} <br/>

<Button outline onClick={this.checkLogin} color="primary">Submit Comment</Button>
<div>
                { minutes === 0 && seconds === 0
                    ? <Card>
                        <CardHeader>Voting Complete.</CardHeader>
                    </Card>
                    : 
                    <Card>
                        <CardHeader>
                        Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </CardHeader>
                        <CardBody> <Button onClick={this.endVoting}>End Voting</Button></CardBody>
                    </Card>
                   
                    
                  
                }
            </div>

</div>

<div className = "col-6">
<div>Votes:</div>
<RenderComments comments = {this.props.comments} deleteComment = {this.props.deleteComment} auth={this.props.auth} upComment = {this.props.upComment} downComment={this.props.downComment} toggleTimer={this.props.toggleTimer}/>

</div>


</div>
</div>
        </React.Fragment>

    )
}
}


const buttonStyle ={
    marginLeft: "10px",
    color:"red",
    background: "white"
}

const textStyle = {
    color: "green"
}

const cardStyle = {
    marginBottom: "10px"
}

export default Chat;