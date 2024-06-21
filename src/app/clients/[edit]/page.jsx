"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'

export default function ClientEditPage() {
  const router = useRouter();
  const { edit } = useParams();

  if (edit !== undefined) {
    const [client, setClient] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identification, setIdentification] = useState("");
    const [email, setEmail] = useState("");

    const getClientById = async () => {
      const data = await fetch(`https://localhost:7239/Client/${edit}`, {
        method: "GET",
      });
      const result = await data.json();
      setClient(result.entity);

      setFirstName(client.FirstName);
      setLastName(client.LastName);
      setIdentification(client.Identification);
      setEmail(client.Email);
    };

    const saveClientById = async () => {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id: client.Id,
          FirstName: firstName || client.FirstName,
          LastName: lastName || client.LastName,
          Identification: identification || client.Identification,
          Email: email || client.Email,
          IsDeleted: false,
        }),
      };
      
      const data = await fetch(`https://localhost:7239/Client`, requestOptions);
      
      if(data !== undefined){
        router.replace('/clients');
      }
    };

    const cancelEditClient = () => {
      router.replace('/clients');
    }

    useEffect(() => {
      getClientById();
    }, []);

    return (
      <div>
        <h3>Editar cliente</h3>
        <hr />
        <label>Id:</label>
        <input type="text"
        className="align-right"
        disabled
        defaultValue={client.Id}></input>
        <br />

        <label>Nombre:</label>
        <input
          type="text"
          className="align-left"
          defaultValue={client.FirstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br />

        <label>Apelido:</label>
        <input
          type="text"
          className="align-left"
          defaultValue={client.LastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <br />

        <label>Identificación:</label>
        <input
          type="text"
          className="align-left"
          defaultValue={client.Identification}
          onChange={(e) => setIdentification(e.target.value)}
        ></input>
        <br />

        <label>Email:</label>
        <input
          type="text"
          className="align-left"
          defaultValue={client.Email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <button onClick={(e) => saveClientById()}>Guardar</button>
        <br />
        <button onClick={(e) => cancelEditClient()}>Cancelar</button>
      </div>
    );
  } else {
    return (
      <div>
        <h3>parámetros erroneos</h3>
      </div>
    );
  }
}
