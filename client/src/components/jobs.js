import React, { useEffect, useState } from "react"
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBTypography,
  MDBBadge,
  MDBCardFooter,
} from 'mdb-react-ui-kit'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react'
import { Button, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Jobs = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [loader, setLoader ] = useState(0)
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')
  const { onOpen, isOpen, onClose } = useDisclosure()
    const [jobs, setJobs] = useState([])
    const [modalData, setModalData] = useState([])

    const modalPop= (item)=>{
      setModalData(item)
      onOpen()
    }

    const ApplyJob= async()=>{
      const res = await fetch('/api/job/application/'+ modalData._id, {
        method: 'PATCH'
      })
      if(res.ok){
        toast({
                    title: 'Applied Succesfully',
                    status: 'info',
                    position:'top',
                    duration: 2000,
                    isClosable: true,
        })
        onClose()
        setLoader(loader +1)
        navigate('/home')
      }else{
        toast({
                    title: 'Fail to apply',
                    status: 'error',
                    position:'top',
                    duration: 2000,
                    isClosable: true,
        })
      }
    }

    useEffect(()=>{
        const fetchApi = async()=>{
            const res = await fetch('/api/job/all')
            const data = await res.clone().json()
            setJobs(data)
        }
        fetchApi()
    },[loader])
    return ( 
    <><div>
        <div className="wrapper2">

          {jobs && jobs.map(item => (
            <><div key={item._id} className="jobs">
              <MDBCard className="cards">
                <MDBCardHeader><h5><b className="text-primary">{item.title}</b><MDBBadge className='mx-2' color='secondary' light>
                  {item.location}
                </MDBBadge></h5></MDBCardHeader>
                <MDBCardBody>
                  <MDBTypography className='mb-0'>
                    <p className="text-secondary">{item.description.substring(0, 140)}....</p>
                    <p className="mr-2"><span className="text-primary">Salary:</span> <b>{item.salary}</b></p>
                    <MDBBadge className="mr-2" color='success' light> {item.nature}</MDBBadge>
                    <MDBBadge color='warning' className="m-2" light> {item.time} hrs work</MDBBadge>
                    <br />

                  </MDBTypography>
                </MDBCardBody>
                <MDBCardFooter>
                  <div>
                    <Button marginRight='3' color='white' bg='#3B71CA'>Apply</Button>
                    <Button onClick={()=>{modalPop(item)}}>View</Button>
                  </div>
                </MDBCardFooter>
              </MDBCard>


              
            </div></>

          ))}</div>


<Modal scrollBehavior={scrollBehavior}  size='xl' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{modalData.title}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <p className="text-secondary">{modalData.description}</p>
                    <p className="mr-2"><span className="text-primary fw-bold">Salary:</span> <b>{modalData.salary}</b></p>
                    <p className="mr-2"><span className="text-primary fw-bold">Location :</span> <b>{modalData.location}</b></p>
                    <MDBBadge className="mr-2" color='success' light> {modalData.nature}</MDBBadge>
                    <MDBBadge color='warning' className="m-2" light> {modalData.time} hrs work</MDBBadge>
                    <p className="text-primary fw-bold mt-4">Requirements</p>
                    <ul>
                    {modalData.requirements && modalData.requirements.map((item)=>(
                      <li>{item}</li>
                    ))}</ul>
                    <p className="mr-2"><span className="text-primary fw-bold">Posted On:</span> <b>{modalData.createdAt}</b></p>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={(modalData)=>{ApplyJob(modalData)}}>
                      Apply
                    </Button>
                    <Button variant='ghost' onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>



      </div><>

          
        </></>

    
     );
}
 
export default Jobs;