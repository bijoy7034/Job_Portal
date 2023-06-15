import { Button, Select } from '@chakra-ui/react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'

const Filter = () => {	
    return ( 
        <div>
            <MDBCard className='filter'>
      <MDBCardBody>
        <MDBCardTitle className='text-primary h5'><b>Filter</b></MDBCardTitle>
        <MDBCardText className='mt-3'>
            <span  className='text-secondary'><b>Nature Of Work</b></span> <br/>
         <MDBCheckbox className='mt-2' name='flexCheck' value='' id='flexCheckDefault' label='In-Office' />
         <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Work From Home' />
         <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Flexible' />
         <br/>
          <span className='text-secondary mb-2'><b>Salary</b></span>
          <RangeSlider marginTop='3' aria-label={['min', 'max']} defaultValue={[10, 60]}>
  <RangeSliderTrack>
    <RangeSliderFilledTrack />
  </RangeSliderTrack>
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
<br/><br/>
          <span className='text-secondary mb-2'><b>Location</b></span>
          <Select marginTop='3' size='sm' placeholder='Select Location'>
  <option value='option1'>Banglore</option>
  <option value='option2'>Kochi</option>
  <option value='option3'>Chennai</option>
  <option value='option3'>Trivandrum</option>
  <option value='option3'>Kozhikode</option>
  <option value='option3'>Coimbatore</option>
</Select>
        </MDBCardText>
        <Button bg='#3B71CA' color='white' size='sm'>Apply</Button>
      </MDBCardBody>
    </MDBCard>
        </div>
     );
}
 
export default Filter;
