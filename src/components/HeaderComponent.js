import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody,Navbar,NavbarBrand,Jumbotron,Nav,NavbarToggler,Collapse,NavItem, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        //this.toggleNav = this.toggleNav.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.state={
            isNavOpen:false,
            isModalOpen:false
        }
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleGoogleLogin(event) {
        this.toggleModal();
        this.props.googleLogin();
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    toggleNav=()=>{
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    render(){
        return(
            <React.Fragment>
                <Navbar light >
                    <div className ="container">
                        <NavbarToggler onClick= {this.toggleNav}/>
                        <NavbarBrand  href="/">
                            <em> Flux Template: Chat Feature </em>
                        </NavbarBrand>
                        <Collapse isOpen = {this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className = "nav-link" to='/home'><span className="fa fa-home fa-la"></span>Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className = "nav-link" to='/about'><span className="fa fa-list fa-la"></span>About</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className = "nav-link" to='/chat'><span className="fa fa-comment-o fa-la"></span>Chat</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>

                        <Nav className="ml-auto" navbar>

                   

<NavItem>
{ this.props.auth.user ===null ?
                                        <Button onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                            
                                        <div className="navbar-text mr-3">{this.props.auth.user.displayName ?this.props.auth.user.displayName: this.props.auth.user.email}</div>
                                        <Button onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }
           
</NavItem>

</Nav>
<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <div> General Users login here via Google:</div>    
                    <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
                        
                    </ModalBody>
                </Modal>
                        
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className = "container">
                        <div className = "row row-header">
                            <div className= "col-12 col-sm-6">
                               Flux/Chat Feature
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        )
    }
}

export default Header;