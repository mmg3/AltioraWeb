"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function ClientsListPage() {
    const router = useRouter();
    const [clients, setClients] = useState([]);

  const getClients = async () => {
    const data = await fetch("https://localhost:7239/Client", {
      method: "GET",
    });
    const result = await data.json();
    setClients(result.entity);
  };

  const editClient = async (id) => {
    router.push(`/clients/${id}`);
  }

  const newClient = async () => {
    router.push(`/clients/create`);
  }

  const deleteClient = async (id) => {
    const data = await fetch(`https://localhost:7239/Client/${id}`, {
        method: "DELETE",
    });
    getClients();
  }

  const viewOrders = async (id) => {
    router.push(`/orders/${id}`);
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div>
      <h3>List de clientes</h3>
      <hr />
      <br />
      <button onClick={(e) => newClient()}>Nuevo cliente</button>
      <br />
      <ul>
        {clients.map((client, index) => (
          <li className="no-bullet" key={index}>
            <span>
              <button onClick={() => editClient(client.Id)}>Edit</button> <button onClick={() => deleteClient(client.Id)}>Delete</button> {client.Orders.length !== 0 && <button  onClick={() => viewOrders(client.Id)}>Órdenes</button>}  {client.FirstName}{" "}
              {client.LastName}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
