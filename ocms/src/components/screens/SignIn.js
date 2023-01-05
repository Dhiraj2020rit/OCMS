import React,{useState,useContext}  from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const SignIn = () =>{
	const {state,dispatch} = useContext(UserContext)
	const history = useNavigate()
	const [password,setPassword] = useState("");
	const [email,setEmail] = useState("");
	const PostData = () =>{
		if(! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
			return M.toast({html:"Enter valid email",classes:"#c62828 red darken-1"})
		}
		fetch("http://localhost:5000/signin",{
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				password:password,
				email:email
			})
		}).then(res=>res.json())
		.then(data=>{
			console.log(data)
			if(data.error){
				M.toast({html:data.error,classes:"#c62828 red darken-1"})
			}
			else{
				localStorage.setItem("jwt",data.token)
				localStorage.setItem("user",JSON.stringify(data.user))
				dispatch({type:"USER",payload:data.user})
				M.toast({html:"Signed in successfully",classes:"#43a047 green darken-1"})
				history('/')
			}
		}).catch(err=>console.log(err));
	}
	return(
		<div className="mycard">
			<div className="card auth-card input-field">
        		<h2><span style={{color:"white",background:"black"}}>OOAD</span><span style={{background:"white"}}> OCMS</span></h2>
        		<input type="text" placeholder = "email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        		<input type="password" placeholder = "password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        		<button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>Login</button>
        		<h5><Link to="/signup">Don't have an account?</Link></h5>
        		
      		</div>
		</div>
	)
}

export default SignIn
