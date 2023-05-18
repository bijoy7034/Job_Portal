import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBInputGroup, MDBRow, MDBTextArea } from "mdb-react-ui-kit";
import NavBar from "../components/navBar";
import { AddIcon, RepeatIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  FormControl,
  Button,
  IconButton,
  useToast,
  Select,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
const MyJobs = () => {
     const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()
    const [loader1, setLoad1] = useState(0)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [ req ,setReq] = useState()
  const [ requirements, setArr] = useState([])
  const handleAdd = ()=>{
    requirements.push(req)
    setReq('')
  }
  const handleReset=()=>{
    setArr([])
  }
  const handleClose = ()=>{
    setArr([])
    onClose()
  }

  const [title , setTitle] = useState('')
  const [description, setDesc] = useState('')
  const [salary, setSalary] = useState()
  const [location, setLoc] = useState('')
  const [jobs, setJobs] = useState([])
  const [nature, setNatue] = useState('')
  const [time, setTime] = useState()


  const inputData = {title,description,requirements,location,salary,time,nature}
  const handleJobAdd= async(e)=>{
        e.preventDefault()
        console.log(JSON.stringify(inputData))
        const res = await fetch('/api/job/createjob', {
            method: 'POST',
            body: JSON.stringify(inputData),
            headers :{
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        if(res.ok){
            var i = loader1 +1
            setLoad1(i)
            toast({
                    title: 'Job Created',
                    description: "Job will be visible to all other users",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
        })
        onClose()
        }else{
             toast({
                    title: 'Something went wrong',
                    description: "Job will be visible to all other users",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
        })
        }

    
  }

  useEffect(()=>{
    const fetchJobsById = async()=>{
        const res = await fetch('/api/job/posted')
        const data = await res.clone().json()
        if(res.ok){
            setJobs(data)
            console.log(data)
        }
    }
    fetchJobsById()
  }, [loader1])

    return ( 
        <div>
            <NavBar/>
            <br/>
            <br/>
            <MDBContainer className="mt-5">
                <div className="mt-5 d-flex justify-content-between align-items-center">
                    <h2 className="text-primary">MY JOBS</h2>
                    <MDBBtn onClick={onOpen}>ADD</MDBBtn>
                </div>
                <TableContainer className="mt-3">
                <Table variant='simple'>
                    <TableCaption>Jobs Added BY You</TableCaption>
                    <Thead>
                    <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Posted At</Th>
                    <Th>Operations</Th>
                    </Tr>
                </Thead>
                 <Tbody>
    {jobs && jobs.map(job=> (
       
      <Tr key={job._id}>
        <Td className="text-primary"><b>{job.title}</b></Td>
        <Td className="text-secondary">{job.description.substring(0, 50) }...</Td>
        <Td>{job.createdAt.slice(0, 10)}</Td>
        
        <Td>
            <MDBBtn className="m-2" rounded color="danger" size="sm"><MDBIcon fas icon="trash" /></MDBBtn>
            <MDBBtn rounded className="m-2" color="secondary" size="sm"><MDBIcon far icon="edit" /></MDBBtn>
            <MDBBtn rounded className="m-2" color="primary" size="sm"><MDBIcon far icon="eye" /></MDBBtn>
             <MDBBtn rounded className="m-2" color="secondary" size="sm"><MDBIcon far icon="clipboard" /></MDBBtn>
        </Td>
      </Tr>
    
    ))}
    </Tbody>
  </Table>
</TableContainer>
            </MDBContainer>

<br/><br/><br/>

<Footer/>

        {/* Modal */}

      <Modal
      size='xl'
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Job</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e)=>{handleJobAdd(e)}}>
          <ModalBody pb={6}>
            <FormControl>
              <MDBInput value={title} onChange={(e)=>{setTitle(e.target.value)}} label='Enter Job Title' />
            </FormControl>
            <MDBRow className='mt-4'>
        <MDBCol>
          <MDBInput required value={salary} onChange={(e)=>{setSalary(e.target.value)}} type="number"  id='form3Example1' label='Salary' />
        </MDBCol>
        <MDBCol>
          <MDBInput required value={location} onChange={(e)=>{setLoc(e.target.value)}}  id='form3Example2' label='Location' />
        </MDBCol>
        </MDBRow>
        <MDBCol className='mt-4'>
        <FormControl>
            <MDBInputGroup className='mb-3'>
            <MDBInput value={req} onChange={(e)=>{setReq(e.target.value)}}  id='form3Example1' label='Requirments' />
            <IconButton  onClick={()=>{handleAdd()}} icon={<AddIcon/>}></IconButton>
            <IconButton onClick={()=>{handleReset()}} icon={<RepeatIcon/>}></IconButton>
        </MDBInputGroup>
            </FormControl>
         
        </MDBCol>
        {requirements && requirements.map(item =>(
            <>
            <ul key={item}>
                <li><small>{item}</small></li>
            </ul>
           </>
        ))}

            <FormControl className='mt-4'>
              <MDBTextArea value={description} onChange={(e)=>{setDesc(e.target.value)}} label='Description' />
            </FormControl>
            <MDBRow className='mt-4'>
        <MDBCol>
          <MDBInput required value={time} onChange={(e)=>{setTime(e.target.value)}} type="number"  id='form3Example1' label='Working Hours' />
        </MDBCol>
        <MDBCol>
          <Select required value={nature} onChange={(e)=>{setNatue(e.target.value)}} placeholder='Nature of work'>
  <option value='Work From Home'>Work From Home</option>
  <option value='In-Office'>In-Office</option>
  <option value='Flexible'>Flexible</option>
</Select>
        </MDBCol>
        </MDBRow>

          </ModalBody>
        
          <ModalFooter>
            <MDBBtn  className="m-3">
              Save
            </MDBBtn>
            <Button type="submit" className="mr-3" onClick={()=>{handleClose()}}>Cancel</Button>
          
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
        </div>
     );
}
 
export default MyJobs;
