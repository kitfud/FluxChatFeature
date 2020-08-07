import React, {Component} from 'react'
import { Card, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderComments({comments,deleteComment}){  
  
    if(comments != null){
     const rencomment = comments.map((info) => 
     <Card style = {cardStyle}  key={info._id}>
    
     <ol>
     <p style = {textStyle}>{info.comment}</p>
     <p>-- {info.author.firstname}<span> </span>
     {new Intl.DateTimeFormat('en-US', 
     { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(info.updatedAt.toDate())))}
      
    
      <span style={buttonStyle} className="fa fa-trash-o" onClick={() =>{if(window.confirm('are you sure you want to delete this comment?')) deleteComment(info) }}></span>
     

     </p>
     </ol> 
     
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
     
        this.state = {
            isModalOpen: false
          };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
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
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleLogin(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(values.comment, values.author);
        this.toggleModal();
        } 

render(){
    return(
<React.Fragment>
<div className ="container">

<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
<ModalBody>


<LocalForm onSubmit={(values) => this.handleLogin(values)}>

<div className="container">

             <Row className="form-group">
                                <Label htmlFor="firstname" md={12}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
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
<div>User:</div>
{this.props.user}

<Button outline onClick={this.checkLogin} color="primary">Submit Comment</Button>
</div>

<div className = "col-6">
<div>Comments:</div>
<RenderComments comments = {this.props.comments} deleteComment = {this.props.deleteComment} auth={this.props.auth}/>

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