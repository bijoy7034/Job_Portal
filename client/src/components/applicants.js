import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Flex,
  Box,
  Heading,
  IconButton,
  Avatar,
  Text
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';


const Applicants = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [applicants, setApp] = useState([])

  useEffect(()=>{
    const fetchApplicant = async()=>{
        const res = await fetch('/api/job/applicants/' + props.el_id)
        const data = await res.clone().json()
        if(res.ok){
            setApp(data)
        }
    }
    fetchApplicant()
  },[])
  
    return (

        <>
        <MDBBtn ref={btnRef} rounded onClick={onOpen} className="m-2" color="secondary" size="sm"><MDBIcon far icon="clipboard" /></MDBBtn>
    <Drawer
    size='sm'
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Applicants</DrawerHeader>

                    <DrawerBody>
                        {applicants && applicants.map((item)=> (
                            <Card marginBottom={3} key={item._id} maxW='sm'>
  <CardBody><Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name={item.name} src='https://bit.ly/broken-link' />

        <Box>
          <Heading  size='sm'>{item.name}</Heading>
          <Text color={'grey'}>{item.email}</Text>
        </Box>
      </Flex>
      <IconButton
        variant='ghost'
        colorScheme='gray'
        aria-label='See menu'
        icon={<InfoOutlineIcon />}
      />
    </Flex></CardBody>
</Card>
                        ))}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer></>
     );
}
 
export default Applicants
