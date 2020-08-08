import React, {Component} from 'react'
import { Card, CardImg, CardTitle, CardBody, CardText, CardHeader} from 'reactstrap';
import { CodeBlock} from "react-code-blocks";

function CardItem ({word}) {

const cards = [];
for(var i =0;i<1;i++){
    cards.push(
        <Card key= {i}>
            <CardBody>
            <CardTitle>{word}</CardTitle>    
            </CardBody>
        </Card>  
    )
}
return(
  cards  
)
    
}  
 

class MapExample extends Component {
    constructor(props) {
        super(props);
     
     
        this.state = {
          inputValue:"",
          arrayValues:[],
          cardValues:[]
        };
      }
    
      inputOnChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
      }

      handleSubmit = () => {
  this.setState({
    arrayValues: this.state.arrayValues.concat(this.state.inputValue),
  })       
      }

    handleSubmitCards=()=>{
this.setState({
    cardValues: this.state.arrayValues
})
      }

      resetValues = ()=>{
          this.setState({
              inputValue:"",
              arrayValues:[],
              cardValues:[]
          })
          document.getElementById("textinput").value = "";
      }




render(){

    return(
        <div className="container">
<div className= "row">
<div className ="col-6">
<Card>
<CardBody>
    <CardHeader>The Map Function:</CardHeader>
<CardText>
Instructions: Enter in a value and add it to the array. Click the buttons to map the values into different formats (array vs. card)
</CardText>
<CardHeader>Explanation:</CardHeader>
<CardText>
    <pre>
<code>
    
       this.state = 
         inputValue:"",
         arrayValues:[],
         cardValues:[]
  
</code>
    </pre>
<CardText>
    this.state contains an inputValue string which shows what you are currently typing. When you click the button to map into an array
    this is what results:
</CardText>
<CodeBlock 
theme='dracula'
text='this.state.arrayValues.map((value)=>this.state.arrayValues.indexOf(value)=== this.state.arrayValues.length-1 ? 
<span key={this.state.arrayValues.indexOf(value)}>{value}</span> : <span key={this.state.arrayValues.indexOf(value)}>{value},</span>)'/>

</CardText>

<CardText>
    Notice the use of the turnary object with the usage of "?" below for conditional rendering. The reason for this is because the last element of an 
    array would not need a "," following it. 
</CardText>
<CardHeader>Mapping to a Card Explanation</CardHeader>
<CardText>
For mapping to cards we take the array of items and then map it into a card array. With the higher order map function we get a return value which 
is demonstrated by the output of card objects with individual items mapped within:
<CodeBlock text="{this.state.cardValues.length>0 ? this.state.cardValues.map((value)=>
         
         <Card key={this.state.cardValues.indexOf(value)}>
              <CardBody>
                  {value}
              </CardBody>
          </Card>
         
          ): null}  "/>

</CardText>
<CardText>The turnary object "?" is necessary here again because we need to account for what is seen when the client has not pressed the button to map items to 
    cards.
</CardText>
</CardBody>   
</Card>




</div>
<div className ="col-6">

<Card>
 <div className = "container">
         
         <div className ="row">
        <div className="col-12">
          
            <div className="row">
                <Card>

                    <CardBody>
                    <CardHeader>
                    1. Enter in a series of values. For example, a number like "1" or a string, "abc" the click the button: 
                    </CardHeader>
                    </CardBody>
                </Card>    
            <input id="textinput" type ="text" defaultValue={""} onChange={this.inputOnChange} />
 
            <button onClick= {this.handleSubmit}>
               2.Add in multiple values. When you are satisfied, click to map items into an array format:
            </button>
            </div>

            <div className = "row">
          [                         
{this.state.arrayValues.map((value)=>
this.state.arrayValues.indexOf(value)=== this.state.arrayValues.length-1 ?
<span key={this.state.arrayValues.indexOf(value)}>{value}</span> : <span key={this.state.arrayValues.indexOf(value)}>{value},</span>
)}            
          ]
          </div>

          <div className="row">
          <button onClick= {this.handleSubmitCards}>
                3. Click to map items into a card format:
            </button>
          {this.state.cardValues.length>0 ? this.state.cardValues.map((value)=>
         
         <Card key={this.state.cardValues.indexOf(value)}>
              <CardBody>
                  {value}
              </CardBody>
          </Card>
         
          ): null}   
          </div>
        
              
             
        
          
             </div>


             <div className = "row">


<div className="col-12">
            
<button onClick= {this.resetValues}>
                RESET EXAMPLE
            </button>
</div>
            
 
            
             </div>
          
           
         </div>

     </div>
        </Card>
</div>

</div>






        </div>
        
      
       
    )
}
}

export default MapExample;