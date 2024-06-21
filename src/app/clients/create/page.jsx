"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

export default function ClientEditPage() {
  const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identification, setIdentification] = useState("");
    const [email, setEmail] = useState("");

    const saveNewClient = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id: 0,
          FirstName: firstName || "",
          LastName: lastName || "",
          Identification: identification || "",
          Email: email || "",
          IsDeleted: false,
        }),
      };
      
      const data = await fetch(`https://localhost:7239/Client`, requestOptions);
      
      if(data !== undefined){
        router.replace('/clients');
      }
    };

    const cancelNewClient = () => {
      router.replace('/clients');
    }

    return (
      <div>
        <h3>Nuevo cliente</h3>
        <hr />

        <label>Nombre:</label>
        <input
          type="text"
          className="align-left"
          defaultValue=""
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br />

        <label>Apelido:</label>
        <input
          type="text"
          className="align-left"
          defaultValue=""
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <br />

        <label>Identificación:</label>
        <input
          type="text"
          className="align-left"
          defaultValue=""
          onChange={(e) => setIdentification(e.target.value)}
        ></input>
        <br />

        <label>Email:</label>
        <input
          type="text"
          className="align-left"
          defaultValue=""
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <button onClick={(e) => saveNewClient()}>Guardar</button>
        <br />
        <button onClick={(e) => cancelNewClient()}>Cancelar</button>
      </div>
    );
}
