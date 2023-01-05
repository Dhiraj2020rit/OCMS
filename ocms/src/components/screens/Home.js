import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import axios from 'axios'
const Home = () =>{
	const [data,setData] = useState([])
	const {state,dispatch} = useContext(UserContext)
	useEffect(()=>{
		fetch('http://localhost:5000/allpost',{
			headers:{
				"Authorization":"Bearer "+localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
		.then(result=>{
			console.log(result)
			setData(result.posts)
		}).catch(err=>console.log(err))
	},[])

	const handRaise = (id) =>{
		fetch('http://localhost:5000/hands',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization":"Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				postId:id
			})
		}).then(res=>res.json())
		.then(result=>{
			//console.log(result)
			const newData = data.map(item=>{
				if(item._id==result._id){
					return result
				}else{
					return item
				}
			})
			setData(newData)
		}).catch(err=>console.log(err))
	}
	const handDown = (id) =>{
		fetch('http://localhost:5000/unhands',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization":"Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				postId:id
			})
		}).then(res=>res.json())
		.then(result=>{
			//console.log(result)
			const newData = data.map(item=>{
				if(item._id==result._id){
					return result
				}else{
					return item
				}
			})
			setData(newData)
		}).catch(err=>console.log(err))
	}

	const makeComment =(text,postId)=>{
		fetch('http://localhost:5000/comment',{
			method:"put",
			headers:{
				"Content-Type":"application/json",
				"Authorization":"Bearer "+localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				postId,
				text
			})
		}).then(res=>res.json())
		.then(result=>{
			console.log(result)
			const newData = data.map(item=>{
				if(item._id==result._id){
					return result
				}else{
					return item
				}
			})
			setData(newData)
		}).catch(err=>console.log(err))
	}

	const deletePost = (postid)=>{
		fetch(`http://localhost:5000/deletepost/${postid}`,{
			method:"delete",
			headers:{
				"Authorization":"Bearer "+localStorage.getItem("jwt")
			}
		}).then(res=>res.json())
		.then(result=>{
			console.log(result)
			const newData = data.filter(item=>{
				return item._id !== result._id
			})
			setData(newData)
		})
	}
	const viewStatus=(Status)=>{
		if(Status === 0){
			return "Pending..."
		}
		return "Rectified..."
	}
	return(
		<div className="home">
			{
				data.map(item=>{
					return(
						<div className="card home-card" key={item._id}>
							
							<div className="card-image">
								<img src={item.photo}/>
							</div>
							<div className="card-content">
							<p><b>Status: {viewStatus(item.Status)}</b></p>
								<i className="material-icons" style={{color:"red",cursor:"pointer"}}></i>
								{item.hands.includes(state._id)
									? <i className="material-icons" style={{cursor:"pointer"}} onClick={()=>{handDown(item._id)}}>thumb_down</i>
									:
									<i className="material-icons" style={{cursor:"pointer"}} onClick={()=>{handRaise(item._id)}}>thumb_up</i>
								}
								<h6>{item.hands.length} Hand raises</h6>
								<h6>{item.title}</h6>
								<p>{item.body}</p>
								{
									item.comments.map(record=>{
										return(
											<h6 key={record._id}><span style={{fontWeight:"500"}}>{/*record.postedBy.name*/}</span>{record.text}</h6>
										)
									})
								}
								
						
								<form onSubmit={(e)=>{
									e.preventDefault()
									makeComment(e.target[0].value,item._id)
								}}>
									<input type="text" placeholder="add a comment here" />
								</form>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}

export default Home
