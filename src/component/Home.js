import React from "react";
import axios from "axios";
import '../App.css';



class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users: null,
        }
    }
    showUsers=()=>{
        axios.get("http://127.0.0.1:8000/index/",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }}).then(res=>{
                  this.setState({users:res.data.data})
                console.log(res.data);
            }).catch(err=>{
              console.log(err);
          })
    }  

    
    
    render(){
        

        return(
        <div className="App">
        <header className="App-header">
        <h1>Home</h1>
        </header>
        <div className="login-container">
        <h1 className="purple">Login success!</h1>
        <h1 className="purple">Welcome {this.props.username} </h1>
        
        <button onClick={ this.showUsers }>Show Users</button>
        { this.state.users && this.state.users.map( u => {
              return (
                  <div key={u.id} className="user">
                      <h2>{u.username}</h2>
                  </div>
              )
            }) }
        </div>
        </div>
        )
  
       }  
}
export default Home;