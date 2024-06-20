"use client";
import React, { useEffect, useState } from "react";

export default function ClientList() {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
      const data = await fetch("https://localhost:7239/Client", {
        method: 'GET',
      }); 
      const result = await data.json()
      setClients(result.entity)
  }

  useEffect(()=>{
    getClients()
  },[])

  return (
    <div>
      <h3>List de clientes</h3>
      <hr />
      <br />
      <ul>
        {
          clients.map((client, index) => (
            <li className="no-bullet" key={index}><span><label>Edit</label> <label>Delete</label> {client.FirstName} {client.LastName}</span></li>
          ))
        }
      </ul>
    </div>
  );
}

