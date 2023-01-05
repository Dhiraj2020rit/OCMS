import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
const Profile = () =>{
	const [mypics,setPics] = useState([])
	const {state,dispatch} = useContext(UserContext)
	const [image,setImage] = useState("");
	const [url,setUrl] = useState("");
	useEffect(()=>{
		fetch('http://localhost:5000/mypost',{
			headers:{
				"Authorization":"Bearer "+localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
		.then(result=>{
			setPics(result.mypost)
		})
	},[])

	useEffect(()=>{
		if(image){
			const data = new FormData()
			data.append("file",image)
			data.append("upload_preset","ocms22")
			data.append("cloud_name","dbhhztybd")
			fetch("https://api.cloudinary.com/v1_1/dbhhztybd/image/upload",{
				method:"post",
				body:data
			}).then(res=>res.json()).then(data => {
				setUrl(data.url)
				console.log(data)
				localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
				dispatch({type:"UPDATEPIC",payload:data.url})
			})
			.catch(err=>console.log(err))
		}
	},[image])

	const updatePhoto = (file)=>{
		setImage(file)
	}

	return(
		<div style={{maxWidth:"550px",margin:"0 auto"}}>
			<div style={{margin:"18px 0px",borderBottom:"1px solid grey"}}>
				<div style={{display:"flex",justifyContent:"space-around"}}>
				<div>
					<img style = {{width:"160px",height:"160px",borderRadius:"80px"}} src={state?state.pic:"loading"}/>

				</div>
				<div>
					<h4>{state?state.name:"loading..."}</h4>
					<div style={{display:"flex",justifyContent:"space-between",width:"110%"}}>
						<h6>{mypics.length} Complaints posted</h6>
						
					</div>
				</div>
				</div>
				
				<div className="file-field input-field" style={{margin:"10px"}}>
      				<div className="btn #64b5f6 blue darken-1">
    	    				<span>Update Pic</span>
			       			<input type="file" onChange={(e)=>updatePhoto(e.target.files[0])}/>
    				</div>
   					<div className="file-path-wrapper">
       					<input className="file-path validate" type="text" />
   					</div>
    				</div>
				</div>
			<div className="gallery">

				{
					mypics.map(item=>{
						return(
							<img key={item._id} className="item" src={item.photo} alt={item.title}/>
						)
					})
				}
			</div>
		</div>
	)
}

export default Profile
