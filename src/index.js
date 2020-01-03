import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class Quiz extends Component {
    state = {
        questionBank:[],  // 5 questions will be stored when we will call the API
        score: 0,
        responses : 0
    };
    getQuestion = () =>{
         quizService().then(question => {  //calling the quizservice API
             this.setState({   // updating the state variable
                 questionBank:question
             });
         });
   };

    computeAnswer = (answer, correctAnswer) => {
       if (answer === correctAnswer) {
           this.setState ({
               score: this.state.score + 1
           });
       }
       this.setState ({
           responses : this.state.responses < 5 ? this.state.responses + 1 : 5 
       })
    };
    playAgain = () => {
        this.getQuestion();
        this.setState({
          score: 0,
          responses:0
        });
    }
   componentDidMount (){
       this.getQuestion();
   }
   render (){
       return (
           <div className = "container">
               <div className = "title"> Quiz  </div>
               {this.state.questionBank.length > 0 &&  // checking conditions to show the set of questions
               this.state.responses < 5 && 
               this.state.questionBank.map(({question, answers,
               correct, questionId})=> (
                <QuestionBox        
                 question = {question} 
                 options = {answers} 
                 key = {questionId}
                 selected = {answer => this.computeAnswer(answer, correct)}
                />
            )
        )}
        {this.state.responses === 5 ? (<Result score = {this.state.score} playAgain = {this.playAgain}/> ) : null} 
     </div>
    );
  }











}

ReactDOM.render (<Quiz/>, document.getElementById("root"));