import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBContainer
} from 'mdb-react-ui-kit'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const Register = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const handleClick= ()=>{
        navigate('/')
    }

    const [name, setFirst] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [description, setDesc] = useState("")
    const [phone, setPhone] = useState()


    const inputData = {email,password,name, description, phone}
    const addUser = async(e)=>{
      e.preventDefault()
        const res = await fetch('/api/users/register', {
            method:'POST',
            body:JSON.stringify(inputData),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(()=>{
          toast({
                    title: 'Account Created',
                    description: "Welcome to Career Link.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
        })
          navigate('/')
        }).catch((err)=>{
          toast({
                    title: 'Account Bot created Created',
                    description: `${err}`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
        })
        })
            
    }

    return ( 
       <div>
        <MDBContainer className="wrapper" >
            <form  className="loginBox" >
                <h2><b>CAREER LINK</b></h2>
                <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput required value={name} onChange={(e)=>{setFirst(e.target.value)}} id='form3Example1' label='First name' />
        </MDBCol>
        <MDBCol>
          <MDBInput required value={phone} onChange={(e)=>{setPhone(e.target.value)}} id='form3Example2' label='Mobile ' />
        </MDBCol>
        </MDBRow>
        <MDBRow className='mb-4'>
        <MDBCol>
           <MDBInput required value={email} onChange={(e)=>{setEmail(e.target.value)}}  type='email' id='form3Example3' label='Email address' />
        </MDBCol>
        <MDBCol>
          <MDBInput required value={password} onChange={(e)=>{setPassword(e.target.value)}}  type='password' id='form3Example4' label='Password' />
        </MDBCol>
      </MDBRow>
      <MDBInput  required value={description} onChange={(e)=>{setDesc(e.target.value)}} className='mb-4' type='text' id='form3Example3' label='Description about your skills' />
    


      <MDBBtn onClick={(e)=>{addUser(e)}}  className='mb-4' block>
        Create Account
      </MDBBtn>

      <div className='text-center'>
        <p>
          Have an account? <a href='#' className='text-primary' onClick={()=>{handleClick()}}>Login</a>
        </p>
        <p>or sign up with:</p>

        <MDBBtn floating color="secondary" className='mx-1'>
          <MDBIcon fab icon='facebook-f' />
        </MDBBtn>

        <MDBBtn floating color="secondary" className='mx-1'>
          <MDBIcon fab icon='google' />
        </MDBBtn>

        <MDBBtn floating color="secondary" className='mx-1'>
          <MDBIcon fab icon='twitter' />
        </MDBBtn>

        <MDBBtn floating color="secondary" className='mx-1'>
          <MDBIcon fab icon='github' />
        </MDBBtn>
      </div>
            </form>
        </MDBContainer>
    </div>
     );
}
 
export default Register
