 import { useState,useEffect } from "react";
 const useAppwrite =(fn) =>{
    const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() =>{
    const fetchdata = async ()=>{
setisLoading(true);
try {
  const response = await fn();
  
  setdata(response);
} catch (error) {
  Alert.alert('Error',error.message)
} finally{
  setisLoading(false);

}
    }

    fetchdata();
  },[]);

const refetch=() =>fetchdata();

  return {data,isLoading,refetch}
}
export default useAppwrite;