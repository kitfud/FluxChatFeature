import React, { Component } from 'react'

class Timer extends Component {
    constructor(props) {
        super(props);
        
     
        this.state = {
            minutes: this.props.minutes,
            seconds: this.props.seconds,
         
        };
      }
    
 
    componentDidMount() {
        this.myInterval = setInterval(() => {
       
            if (this.state.seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (this.state.seconds === 0) {
                if (this.state.minutes === 0) {
                    clearInterval(this.myInterval)
                    this.props.toggleTimer(this.props.id)
                
                } 
              
                else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
         
  
    }

componentWillUnmount() {
  clearInterval(this.myInterval)     
    }

    render() {

  
    
        const { minutes, seconds } = this.state

        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? <h1>Voting Complete.</h1>
                    : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}

export default Timer;