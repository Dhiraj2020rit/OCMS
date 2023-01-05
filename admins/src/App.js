import React,{useEffect,createContext,useReducer,useContext} from 'react'
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter,Routes,Route,Switch,useNavigate} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import {reducer,initialState} from './reducers/userReducer'
import RestrictPage from './components/screens/RestrictPage'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    
    console.log(typeof(user),user)
    if(user){
      dispatch({type:"USER",payload:user})
      
    }else{
      history('/signin')
    }
  },[])
  return(
    <Routes>
      <Route path="/" element ={<Home/>}></Route>
      <Route path="/signin" element ={<Signin/>}></Route>
      <Route path="/signup" element ={<Signup/>}></Route>
      <Route exact path="/profile" element ={<Profile/>}></Route>
      <Route path="/createpost" element ={<CreatePost/>}></Route>
      <Route path="/profile/:userid" element ={<UserProfile/>}></Route>
      <Route path="/restricted" element={<RestrictPage />}></Route>
    </Routes>
    
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  console.log(state)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar/>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
