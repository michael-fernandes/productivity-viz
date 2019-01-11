import React, { Component } from "react";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:'',
      email: "",
      password: ""
    };

    this.onClick = this.onClick.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }
  
  onClick(event) {
    event.preventDefault();
    
  }

  render() {
      /*fetch("/usercheck/not_a_user", {
        method: 'GET',
        headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
      }).then( res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        dispatch( dispatch(mediaIsLoading(false)) )
        console.log(res);
        return  res.json()
      })
      .then(
        (json) => {
          let jsonParse = JSON.parse(json.data).user_event_videos.media;
        dispatch(recieveMedia("media", jsonParse))
        },(error) => {
          dispatch(mediaHasError(true))
          console.log(error)
      }) 

      fetch("https://localhost:4002/updateFocus", {
        method: 'GET',
        headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*',},
        params: {"focus": "hard", 'userId':'username'}
      }).then( res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        console.log("fetching")
        console.log(res);
        return res.json()
      })
      .then(
        (json) => {
          let jsonParse = JSON.parse(json.data).user_event_videos.media;
          console.log(jsonParse);
        },(error) => {
          console.log(error)
      })  */
      console.log("fetching?")
    return (
      <div className="Login">
       {/* } <div className="wordsToLiveByWrapper">
          <div className="wordsToLiveBy">
            Glimpse sinks you deeper into a experiences. Feel the freedom to live in the moment as you ought'a, while still capturing the good memories you deserve.
          </div>
        </div> */}
        <div className="loginWrapper">
            <h1 className="logoTitleLogin">CLiMP</h1>
            <form action="/action_page.php" className="button">
                <p className="signInTitle"> Sign In</p>
                <div className="formGroup">
                    <label htmlFor="email">ID:</label> <br />
                    <input type="email" className="form-control" id="name" placeholder="Enter your email"></input>
                </div>
                <button type="submit" onClick={this.onClick} className="btnLogin">Submit</button>
            </form>
            <p className="signUpLink">
                Don't have an account? <a href="">Sign-up</a>
            </p>
        </div>

      </div>
    );
  }
}