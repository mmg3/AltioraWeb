"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import "./page.css";

export default function OrderPage() {
  const router = useRouter();
  const { order } = useParams();
  const [orders, setOrders] = useState([]);
  const [client, setClient] = useState([]);
  const [details, setDetails] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  const [orderSelected, setOrderSelected] = useState([]);

  if (order !== undefined) {
    const getOrders = async () => {
      const data = await fetch(`https://localhost:7239/Order/${order}`, {
        method: "GET",
      });
      const result = await data.json();
      setOrders(result.entity);
    };

    const getClient = async () => {
      const data = await fetch(`https://localhost:7239/Client/${order}`, {
        method: "GET",
      });
      const result = await data.json();
      setClient(result.entity);
    };

    const getDetail = async () => {
      const data = await fetch(`https://localhost:7239/OrderDetail/${order}`, {
        method: "GET",
      });
      const result = await data.json();
      setDetails(result.entity);
      
      const totalOrder = result.entity.reduce((accum,item) => accum + (item.UnitPrice * item.Quantity), 0);
      setTotalOrder(totalOrder);
    };

    useEffect(() => {
      getOrders();
      getClient();
    }, []);


    const showModal = async (id) => {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";

      const selected = orders.find(x => x.Id === id);
      setOrderSelected(selected);

      getDetail();
    }

    const closeModal = async () => {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }

    const returnClientsList = () => {
      router.replace('/clients');
    }

    return (
      <div>
        <h3>Cliente: {client.FirstName} {client.LastName}</h3><br /><br />
        <h3>List de órdenes de compra</h3>
        <hr />
        <br />
        <ul>
          {orders.map((order, index) => (
            <li className="no-bullet" key={index}>
              <span>
                <button onClick={() => showModal(order.Id)}>Ver</button>  {order.Code}
              </span>
            </li>
          ))}
        </ul>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => closeModal()}>&times;</span>
            <table>
              <tbody>
                <tr>
                  <td>Código:</td>
                  <td>{orderSelected.Code}</td>
                </tr>
                <tr>
                  <td>Cliente:</td>
                  <td>{client.FirstName} {client.LastName}</td>
                </tr>
                <tr>
                  <td>Fecha:</td>
                  <td>{orderSelected.Date}</td>
                </tr>
              </tbody>
            </table>
            <table className="tableWidht">
              <tbody>
                <tr>
                  <td className="align-center">#</td>
                  <td>Artículo</td>
                  <td>P. Unitario</td>
                  <td>Cantidad</td>
                  <td>Total</td>
                </tr>
                {details.map((detail, index) => (
                  <tr key={detail.Id}>
                    <td className="align-center">{index+1}</td>
                    <td>{detail.Article.Name}</td>
                    <td className="align-right">{detail.UnitPrice}</td>
                    <td className="align-right">{detail.Quantity}</td>
                    <td className="align-right">{detail.UnitPrice * detail.Quantity}</td>
                  </tr>
                ))}
                
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="align-right">Total</td>
                  <td className="align-right">{totalOrder}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={() => returnClientsList()}>Regresar al listado</button>
      </div>
    );
  }else{
    return (
      <div>
        <h3>parámetros erroneos</h3>
      </div>
    );
  }
}
