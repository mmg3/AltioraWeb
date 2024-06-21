"use client";
import React, { useEffect, useState } from "react";

interface ClientProps {
  params: {
    edit: string;
  };
}

export default function ClientEditPage(props: ClientProps) {
  const { edit } = props.params;
  console.log(edit);
  if (edit !== undefined) {
    const [{ Id, FirstName, LastName, Identification, Email }, setClient] =
      useState([]);

    const [id, setId] = useState("");
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

      setId(Id);
      setFirstName(FirstName);
      setLastName(LastName);
      setIdentification(Identification);
      setEmail(Email);
    };

    const saveClientById = async () => {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id: id,
          FirstName: firstName,
          LastName: lastName,
          Identification: identification,
          Email: email,
          IsDeleted: false,
        }),
      };

      //const data = await fetch(`https://localhost:7239/Client`, requestOptions);
      console.log(requestOptions);
    };

    useEffect(() => {
      getClientById();
    }, []);

    return (
      <div>
        <h3>Editar cliente</h3>
        <hr />
        <label>Id:</label>
        <input type="text" className="align-right" disabled value={id}></input>
        <br />

        <label>Nombre:</label>
        <input
          type="text"
          className="align-right"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br />

        <label>Apelido:</label>
        <input
          type="text"
          className="align-right"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <br />

        <label>Identificación:</label>
        <input
          type="text"
          className="align-right"
          defaultValue={identification}
          onChange={(e) => setIdentification(e.target.value)}
        ></input>
        <br />

        <label>Email:</label>
        <input
          type="text"
          className="align-right"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <button onClick={(e) => saveClientById()}>Guardar</button>
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
