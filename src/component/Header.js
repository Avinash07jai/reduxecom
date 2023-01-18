import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCartArrowDown, FaShoppingCart, FaTrashAlt, FaWindowClose } from "react-icons/fa";
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE } from '../Redux/actions/action';

const Header = () => {
    const [price, setPrice] = useState(0);
    // console.log(price)

    const getData = useSelector((state) => state.cartreducer.carts);
    console.log(getData)

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DELETE(id))
    }

    const total = () => {
        let price = 0;
        getData.map((ele, k) => {
            price = ele.price * ele.qnty +  price
        });
        setPrice(price);
    };

    useEffect(() => {
        total();
    },[total])

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                     <Nav >
                    <NavLink to="/" className='text-decoration-none text-light mx-5'>Foods</NavLink>
                        <NavLink to="/" className='text-decoration-none text-light'>Home</NavLink>
                    </Nav>

                    <Badge badgeContent={getData.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <FaShoppingCart className='cart-icon' />
                    </Badge>
                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        getData.length ?
                            <div className='card-detail' style={{ width: '20rem', padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData.map((e) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                    <img src={e.image} style={{ width: '5rem', height: '5rem' }} />
                                                                </NavLink>
                                                            </td>
                                                            <td>
                                                                <p>{e.mname} </p>
                                                                <p>Price :{e.price} </p>
                                                                <p> Quantity : {e.qnty} </p>
                                                                <p style={{ color: 'red' }} onClick={() => dlt(e.id)}>
                                                                    <FaTrashAlt className='small-tras' />
                                                                </p>
                                                            </td>
                                                            <td style={{ color: 'red' }} onClick={() => dlt(e.id)} >
                                                                    <FaTrashAlt className='big-tras' />
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'>Total : {price} </p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className='card-detail d-flex justify-content-center align-items-center' style={{ width: '15rem', padding: 1, position: 'relative' }}>
                                <FaWindowClose style={{ position: "absolute", top: 1, right: 5, fontSize: 23 }} onClick={handleClose} />
                                <p><FaCartArrowDown size={25} style={{ color: 'red', marginRight: 10 }} /> Your Cart is Empty</p>
                            </div>
                    }

                </Menu>
            </Navbar>
        </>
    )
}

export default Header;
