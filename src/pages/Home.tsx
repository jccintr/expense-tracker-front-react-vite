import { useState,useEffect } from "react";

export const Home = () => {
    const [data,setData] = useState(null);

    useEffect(()=>{
        const hoje = new Date(Date.now());
        setData(hoje);
    },[]);


  return (
    <div>Home</div>
  )
}
