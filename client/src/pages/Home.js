import Jobs from "../components/jobs";
import NavBar from "../components/navBar";
import Profile from "../components/profile";
import Filter from "../components/filter";
import Footer from "../components/footer.js";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
const override = {
  display: "block",
  margin: "0 auto",

};
const Home = () => {
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1600)
    },[])
    return ( 
        <div>
            <NavBar/>
            {
            loading?
            <><br />
            <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><HashLoader cssOverride={override} color='#3B71CA' loading={loading} size={60} aria-label="Loading Spinner" data-testid="loader" /><br /><br /><br /><br /><br /><br /><br /></> 
                :
                
            <>
            <div className="computer d-flex justify-content-around p-5">
                        <Profile />
                        <Jobs />
                        <Filter />
                    </div></>
            
        }
        <Footer />
        
            
            

        </div>
     );
}
 
export default Home;