import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const Profile = () =>{
	const [userProfile,setProfile] = useState(null)
	const {state,dispatch} = useContext(UserContext)
	const {userid} = useParams()
	useEffect(()=>{
		fetch(`http://localhost:5000/user/${userid}`,{
			headers:{
				"Authorization":"Bearer "+localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
		.then(result=>{
			//console.log(result)
			//setProfile(result)
		})
	},[])
	return(
		<>
		{userProfile ? 
			<div style={{maxWidth:"550px",margin:"0 auto"}}>
				<div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid grey"}}>
					<div>
						<img style = {{width:"160px",height:"160px",borderRadius:"80px"}} src={userProfile.user.pic}/>
					</div>
					<div>
						<h4>{userProfile.user.name}</h4>
						<h6>{userProfile.user.email}</h6>
						<div style={{display:"flex",justifyContent:"space-between",width:"110%"}}>
							<h6>{userProfile.posts.length} Complaints posted</h6>
							<br/>
							<h6>Admin:{userProfile.user.admin}</h6>
						</div>
					</div>
				</div>
				<div className="gallery">
	
					{
						userProfile.posts.map(item=>{
							return(
								<img key={item._id} className="item" src={item.photo} alt={item.title}/>
							)
						})
					}
				</div>
			</div>


			: 


			<h2>Loading...</h2>}
		
		</>
	)
}

export default Profile
