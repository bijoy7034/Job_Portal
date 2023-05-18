import { Avatar, AvatarBadge, Button, Image, Input, useDisclosure } from '@chakra-ui/react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import pic from '../assets/Resume.png'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';

const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  const [user, setUser] = useState()

  useEffect(()=>{
      const fetchData = async()=>{
      const res = await fetch('api/users/user')
      const data = await res.clone().json()
      setUser(data)
      console.log(JSON.stringify(user))
  }
  fetchData()

  },[])

    return ( <div>
         <MDBCard  className='profile'>
      
      {user && user.map(item =>(
        <>
        <MDBCardBody>
        <div className='wrapper3'>
            <MDBCardTitle className='text-primary'><b>{item.name}</b></MDBCardTitle>
            <Avatar name={item.name} src='https://bit.ly/broken-link'><AvatarBadge boxSize='1.25em' bg='green.500' /></Avatar>
        </div>
        <MDBCardText className='text-secondary'>
         {item.description}
        </MDBCardText>
      </MDBCardBody>
      <MDBListGroup flush>
        <MDBListGroupItem>{item.email}</MDBListGroupItem>
        <MDBListGroupItem>{item.phone}</MDBListGroupItem>
        <MDBListGroupItem>Alappuzha</MDBListGroupItem>
      </MDBListGroup>
      <MDBCardBody>
        <MDBCardLink href='#' onClick={onOpen} className='text-primary fw-bold'>Edit</MDBCardLink>
        <MDBCardLink href='#' className='text-primary fw-bold'>Setting</MDBCardLink>
      </MDBCardBody>



<Drawer
  size='sm'
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Your Account</DrawerHeader>

          <DrawerBody>
            <Avatar name={item.name} src='https://bit.ly/broken-link'><AvatarBadge boxSize='1.25em' bg='green.500' /></Avatar>

          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color='white' bg='#3B71CA'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>


        </>
      ))}
    </MDBCard>
    <Image
    boxSize='250px'
    objectFit='cover'
    src={pic}
    alt='Dan Abramov'
  />
  
  
  
    </div> );
}
 
export default Profile;