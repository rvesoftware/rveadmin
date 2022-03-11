import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/ordersActions';
import * as timeago from 'timeago.js'
export default function OrdersScreen() {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(listOrders());
    }, [dispatch]);

    

  return (
    <>
    {loading ? (
      <h2>Cargando ...</h2>
    ) : (
      <div>
        <div className="section__header">
          <button className="btn">Add Order</button>
          <div>
          <button className="btn">{orders.length}</button>
            <select name="" id="">
              <option value="">FILTER</option>
            </select>

            <button className="btn-none">EXPORT</button>
          </div>
        </div>
        
        <div className='aside-list'>

        <input className='input-list' type="text" placeholder='Search a arder' />

        <div className="list-users">
          {orders.map((order) => (
            <div className="item__user">
              <div className="img">
                <img src={order.orderItems[0].image} alt="" />
              </div>
              <div>
                  <p className='max-wid'><h2>{order.shippingAddress.name}</h2> </p>
              <p>{order.isPaid? <p>Paid</p> : <p>Pending</p>}</p>
              </div>
                <span className='time-order'>{timeago.format(order.createdAt)}</span>
            </div>
          ))}
        </div>
        </div>

      </div>
    )}
  </>
  )
}
