"use client";
import React, { useEffect, useState } from "react";

export default function ClientEdit({ children, ...pageProps }) {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
      const data = await fetch("https://localhost:7239/Client", {
        method: 'GET',
      }); 
      const result = await data.json()
      setClients(result.entity)
  }

  useEffect(()=>{
    //getClients()
  },[])

  return (
    <div>
        <h3>Editar cliente</h3>
        {
            console.log(pageProps)
        }
    </div>
  );
}
