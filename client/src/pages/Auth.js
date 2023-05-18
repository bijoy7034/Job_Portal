import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBContainer
} from 'mdb-react-ui-kit';
import { useToast } from '@chakra-ui/react'
import { useState } from "react";
const Login = () => {
    const navigate = useNavigate()
    const handleClick= ()=>{
        navigate('/register')
    }
    const toast = useToast()
    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")
    const inputData = {email, password}

    const handleLogin = async(e)=>{
        e.preventDefault()
       const res1 = await fetch('/api/users/login', {
            method:'POST',
            body:JSON.stringify(inputData),
            headers:{
               'Content-Type': 'application/json'
            }
        })
        if(res1.ok){
           const fetchCookie = async()=>{
            const res = await fetch('/api/users/checkAuth', {
                method:'GET'
            })
            if(res.ok){
                toast({
                    title: 'Login Successful',
                    description: "Welcome back to Career Link.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
        })
            navigate('/home')
            }
        }
        fetchCookie()
    }else{
        toast({
                    title: 'Wrong credentials',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
        })
    }
}

    return ( 
        <div>
        <MDBContainer className="wrapper" >
            <form className="loginBox" onSubmit={(e)=>{handleLogin(e)}}>
                <h2><b className='text-primary'><MDBIcon fab icon="connectdevelop" /> CreerLink</b></h2>
                <MDBInput value={email} required onChange={(e)=>{setEmail(e.target.value)}} className='mb-4' type='email' id='form2Example1' label='Email address' />
                <MDBInput value={password} required onChange={(e)=>{setPassword(e.target.value)}} className='mb-4' type='password' id='form2Example2' label='Password' />

                <MDBRow className='mb-4'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
                    </MDBCol>
                    <MDBCol>
                        <a className="text-primary" href='#!'>Forgot password?</a>
                    </MDBCol>
                </MDBRow>

                <MDBBtn type='submit' className='mb-4' block>Sign in</MDBBtn>

                <div className='text-center'>
                    <p>Not a member? <a href="#" className="text-primary" onClick={()=>{handleClick()}}>Register</a></p>
                    <p>or sign up with:</p>

                    <MDBBtn floating color="secondary" className='mx-1'><MDBIcon fab icon='facebook-f' /></MDBBtn>
                    <MDBBtn floating color="secondary" className='mx-1'><MDBIcon fab icon='google' /></MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'><MDBIcon fab icon='twitter' /></MDBBtn>
                    <MDBBtn floating color="secondary" className='mx-1'><MDBIcon fab icon='github' /></MDBBtn>
                </div>
            </form>
        </MDBContainer>
    </div>
     );
}
 
export default Login;