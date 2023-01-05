import React,{useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from '../App'
const NavBar = () =>{
	const {state,dispatch} = useContext(UserContext)
	const history=useNavigate()
	const renderList=()=>{
		if(state){
			return[
				<li><Link to="/profile">Profile</Link></li>,
        		<li><Link to="/createpost">Post Complaints</Link></li>,
        		<li>
        		<button className="btn #c62828 red darken-1" onClick={()=>{
        			localStorage.clear()
        			dispatch({type:"CLEAR"})
        			history('/signin')
        		}}>
        		Logout
        		</button>
        		</li>
			]
		}else{
			return[
				<li><Link to="/signin">Login</Link></li>,
        		<li><Link to="/signup">SignUp</Link></li>
			]
		}
	}
	return(
		<nav>
    		<div className="nav-wrapper white">
      			<Link to={state?"/":"/signin"} className="brand-logo left"><span style={{color:"white",background:"black"}}>OOAD</span><span style={{background:"white"}}> OCMS</span></Link>
      			<ul id="nav-mobile" className="right">
        			{renderList()}
      			</ul>
    		</div>
  		</nav>

	)
}

export default NavBar