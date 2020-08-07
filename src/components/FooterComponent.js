import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
render(){
    return(
  
  <div className = "footer">
            <div className ="container">
                <div className = "row justify-content-center">
                    <div className = "col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className = "list-unstyled">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/chat">Chat</Link></li>
                        </ul>
                    </div>
                    <div className = "col-7 col-sm-5">
                        <h5>Project details:</h5>
                        <span>Development work on creating a new type of chat feature</span>
                    </div>

                </div>
                <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2020 Kit Fuderich</p>
                </div>
            </div>
            </div>
        </div>
      
      
    )
}
}

export default Footer