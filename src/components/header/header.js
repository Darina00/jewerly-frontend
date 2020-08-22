import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import '../../animation/animation';
import logo from '../../media/logo.png';
import photo from '../../media/shop.jpg';
import { FiUser } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { FaShoppingBasket } from 'react-icons/fa';
import { GrLogin } from "react-icons/gr";
import { GrLogout } from 'react-icons/gr';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import './header.css';

export default class Header extends React.Component {
    render() {
     return (
            <>
                <header data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
                    <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" >
                        <ReactBootStrap.Navbar.Brand id="logo" href="/">
                            <img alt='Картинка' src={logo} />
                        </ReactBootStrap.Navbar.Brand>
                        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                            <ReactBootStrap.Nav className="mr-auto">
                                <ReactBootStrap.Nav.Link href="/" className='item-header'>
                                    <span className='item-header'>Главная</span>
                                </ReactBootStrap.Nav.Link>
                                <ReactBootStrap.NavDropdown title={<span className='item-header'>Каталог</span>} id="collasible-nav-dropdown">
                                    <div className='menu-down'>
                                        <div>
                                            <Query query={gql`
                                            query {
                                                FindAllCategories {
                                                    name
                                                    text
                                                }
                                            }
                                            `}>
                                                {
                                                    ({loading, data}) => {
                                                        if(loading) return 'Loading';
                                                        if(data) {
                                                            const {FindAllCategories} = data;
                                                            return (
                                                                <>
                                                                    {FindAllCategories.map(item => (
                                                                        <>
                                                                        <ReactBootStrap.NavDropdown.Item href={`/shop/${item.text}`} className='active-link'><span className="item-dropdown">{item.name}</span></ReactBootStrap.NavDropdown.Item>
                                                                        <ReactBootStrap.NavDropdown.Divider />
                                                                        </>
                                                                    ))} 
                                                                </>
                                                            )
                                                        }
                                                    }
                                                }
                                            </Query>
                                        </div>
                                        <div>
                                            <ReactBootStrap.NavDropdown.Divider />
                                            <ReactBootStrap.NavDropdown.Item href="/shop">
                                                <div className="item-dropdown" id="sale-item">
                                                    <h5>Твоё украшение уже ждёт тебя</h5>
                                                    <img alt='Картинка' src={photo} id='sale-photo' />
                                                    <p>Перейти к каталогу<span><BsArrowRight /></span></p>
                                                </div>
                                            </ReactBootStrap.NavDropdown.Item>
                                            <ReactBootStrap.NavDropdown.Divider />
                                        </div>
                                    </div>
                                </ReactBootStrap.NavDropdown>

                                <ReactBootStrap.Nav.Link href="/about-us"><span className='item-header'>Про нас</span></ReactBootStrap.Nav.Link>
                            </ReactBootStrap.Nav>
                            <ReactBootStrap.Nav>
                                {localStorage.AuthToken ? 
                                <>
                                <ReactBootStrap.Nav.Link href={`/account/basket`}><span className="glyphicon glyphicon-user item-header"><FaShoppingBasket size="40px" /></span></ReactBootStrap.Nav.Link>
                                <ReactBootStrap.Nav.Link href={`/account/`}><span className="glyphicon glyphicon-user item-header"><FiUser size="40px" /></span></ReactBootStrap.Nav.Link>
                                <button id='logOut' onClick={() => {localStorage.clear(); document.location.reload()}}><span className="glyphicon glyphicon-user item-header"><GrLogout size="40px"/></span></button>                           
                                </>                                
                                :
                                <ReactBootStrap.Nav.Link href="/login"><span className="glyphicon glyphicon-user item-header"><GrLogin size="40px" /></span></ReactBootStrap.Nav.Link>}
                            </ReactBootStrap.Nav>
                        </ReactBootStrap.Navbar.Collapse>
                    </ReactBootStrap.Navbar>
                </header>
            </>
        );
    }
}