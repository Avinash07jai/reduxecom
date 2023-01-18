import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import CardsData from '../component/CardsData';
import {ADD} from '../Redux/actions/action'

const Cards = () => {
    const [data, setDate] = useState(CardsData);

    const dispatch = useDispatch();

    const send = (e) => {
        // console.log(e)
        dispatch(ADD(e));
    }
    // console.log(data)
    return (
        <div className='container mt-3'>
            <h2 className='text-center'> Add to Cart </h2>
            <div className='row d-flex justify-content-center'>
                {
                    data.map((element, id) => {
                        return (
                            <>
                                <Card style={{ width: '18rem' }} className='mx-3 mt-3'>
                                    <Card.Img variant="top" src={element.image} className='m-auto mt-3' style={{width:200, height:200}} />
                                    <Card.Body>
                                        <Card.Title>{element.mname} </Card.Title>
                                        <Card.Text>
                                            Price: {element.price} <FaRupeeSign />
                                        </Card.Text>
                                        <div className='button-div d-flex justify-content-center'>
                                        <Button variant="primary" onClick={() => send(element)} className='col-lg-12'>Add to Cart</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cards;
