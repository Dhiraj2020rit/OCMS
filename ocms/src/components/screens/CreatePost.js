import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
const CreatePost = ()=>{
	const [title,setTitle]=useState("")
	const [body,setBody] = useState("")
	const [image,setImage]=useState("")
	const [url,setUrl]=useState("")
	const history = useNavigate()
	useEffect(()=>{
		if(url){
			fetch("http://localhost:5000/createpost",{
				method:"post",
				headers:{
					"Content-Type":"application/json",
					"Authorization":"Bearer "+localStorage.getItem("jwt")
				},
				body:JSON.stringify({
					title:title,
					body:body,
					pic:url,
	
				})
			}).then(res=>res.json())
			.then(data=>{
				if(data.error){
					M.toast({html:data.error,classes:"#c62828 red darken-1"})
				}
				else{
					M.toast({html:"Complaint Added Succesfully",classes:"#43a047 green darken-1"})
					history('/')
				}
			}).catch(err=>console.log(err));
		}
	},[url])

	const postDetails=()=>{
		const data = new FormData()
		data.append("file",image)
		data.append("upload_preset","ocms22")
		data.append("cloud_name","dbhhztybd")
		fetch("https://api.cloudinary.com/v1_1/dbhhztybd/image/upload",{
			method:"post",
			body:data
		}).then(res=>res.json()).then(data => {
			setUrl(data.url)
		})
		.catch(err=>console.log(err))	
	}

	return(
		<div className="card input-filed" style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
			<input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
			<input type="text" placeholder="complaint" value={body} onChange={(e)=>setBody(e.target.value)}/>
			<div className="file-field input-field">
      			<div className="btn #64b5f6 blue darken-1">
        			<span>Upload Image</span>
        			<input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      			</div>
      			<div className="file-path-wrapper">
        			<input className="file-path validate" type="text" />
      			</div>
    		</div>
			<button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={(e)=>{postDetails()}}>Submit Complaint</button>
		</div>
	)
}

export default CreatePost