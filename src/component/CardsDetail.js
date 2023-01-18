import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import cardsdata from './CardsData';
import { DELETE, ADD, REMOVE } from '../Redux/actions/action';

const CardsDetail = () => {
    const [data, setData] = useState([]);

    const { id } = useParams();
    console.log(id)

    const history = useNavigate();

    const dispatch = useDispatch();

    const getData = useSelector((state) => state.cartreducer.carts);
    // console.log(getData);

    const compare = () => {
        let compareData = getData.filter((e) => {
            return e.id == id
        })
        setData(compareData);
    }

    // Add to cart
    const send = (e) => {
        // console.log(e)
        dispatch(ADD(e));
    }

    const dlt = (id) => {
        dispatch(DELETE(id))
        history('/');
    }

    // Remove one 
    const remove = (item) => {
        dispatch(REMOVE(item))
    }

    useEffect(() => {
        compare();
    }, [id]);

    return (
        <div>
            <div className='container mt-2'>
                <h2 className='text-center mb-5 mt-4'> Items Details Page</h2>
                <section className='container mt-3 '>
                    <div className='itemsdetails d-flex justify-content-evenly'>
                        {
                            data.map((ele) => {
                                return (
                                    <>
                                        <div className='item-img'>
                                            <img src={ele.image} />
                                        </div>

                                        <div className='details'>
                                            <Table>
                                                <tr>
                                                    <td>
                                                        <p><strong>Restaurant</strong> : {ele.mname} </p>
                                                        <p><strong>Price</strong> : {ele.price} </p>
                                                        <p><strong>Dishes</strong> : {ele.address} </p>
                                                        <p><strong>Total</strong> : {ele.price * ele.qnty} </p>
                                                        <div className='mt-3 d-flex justify-content-between align-items-center' style={{ width: 100, background: '#ddd', color: '#111' }} >
                                                            <span style={{ fontSize: 24 }} onClick={ele.qnty <=1 ? () => dlt(ele.id) : () => remove(ele)} >-</span>
                                                            <span style={{ fontSize: 24 }}>{ele.qnty} </span>
                                                            <span style={{ fontSize: 24 }} onClick={() => send(ele)} >+</span>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p><strong>Rating :</strong> <span style={{ background: 'green', color: '#fff', padding: '2px 5px', borderRadius: '5px' }}>{ele.rating} <FaStar style={{ paddingBottom: 5 }} /> </span></p>
                                                        <p><strong>Order Review :</strong> <span style={{ padding: '2px 5px' }}> {ele.reviwes} </span></p>
                                                        <p><strong>Remove :</strong> <span style={{ padding: '2px 5px' }}><FaTrashAlt onClick={() => dlt(ele.id)} size={20} style={{ color: 'red' }} /> </span></p>

                                                    </td>
                                                </tr>
                                            </Table>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </section>
            </div>
        </div>
    )
}

export default CardsDetail;
