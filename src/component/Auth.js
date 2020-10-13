import React from "react";
import axios from "axios";
import '../App.css';
import Home from "./Home";


class AuthUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            login:false,
            isLoginView:true,
            token: "",
            name: "",
        }

    }
    
    handleUsernameChange=(e)=>{
        this.setState({username:e.target.value})
    }
    handlePasswordChange=(e)=>{
        this.setState({password:e.target.value})
    }

    setLoginView = () => {
        this.setState({isLoginView:false});
    }

    setLoginViewRev = () => {
        this.setState({isLoginView:true});
    }

    handleLogin=()=>{
      const user={
          username:this.state.username,
          password:this.state.password
      }
      axios.post("http://127.0.0.1:8000/login/", user).then(res=>{
            this.setState({login:true})
            this.setState({token:res.data.token})
            this.setState({user:res.data.user})
            console.log('SUCCESS');
          console.log(res.data.token);
      }).catch(err=>{
        console.log(err);
    })

    }

    handleRegister=()=>{
        const user={
            username:this.state.username,
            password:this.state.password,
        }
        axios.post("http://127.0.0.1:8000/users/",user,{
          headers: {
              'Content-Type': 'application/json'
          }}).then(res=>{
            this.handleLogin();
            console.log(res);
        }).catch(err=>{
          console.log(err)
      })
      }

     

    render(){
       if(!this.state.login){
        return(
        <div className="App">
        <header className="App-header">
        {this.state.isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
        </header>
        <div className="login-container">

        <label htmlFor="username">UserName</label> <br />
        <input id="username" type="text" placeholder="User Name" value={this.state.username} onChange={this.handleUsernameChange} /><br />
        <label htmlFor="password">Password</label><br />
        <input id="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} /><br />
        {this.state.isLoginView ? <button onClick={ this.handleLogin } >Login</button> : <button onClick={ this.handleRegister } >Register</button>}

        { this.state.isLoginView ? <p onClick={this.setLoginView}>You don't have an account? <span>Register here!</span></p> : <p onClick={this.setLoginViewRev}>You already have an account? <span>Login here!</span></p> }
        </div>
        </div>
        )
    }else
    {
        return (
            <Home token={ this.state.token } username={this.state.user} />
          )
    }


       }  
}
export default AuthUser;