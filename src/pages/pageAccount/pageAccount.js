import React from 'react';
import { Query} from 'react-apollo';
import gql from 'graphql-tag';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './pageAccount.css';
import loader from '../../media/loader/rings.svg';

export default class PageAccount extends React.Component {

    FIND_USER = gql`
        query fndUsr {
            FindUser(_id: "${localStorage.IDuser}") {
                login
                _id
                telephone
                order {
                    _id
                    status
                    totalSum
                    good {
                        name
                        image {
                            url
                        }
                        price
                    }
                }
            }
        }
    `;
    render() {
        return (
            <Query query={this.FIND_USER} fetchPolicy='network-only'>
                {
                    ({loading, data}) => {
                        if(data) {
                            let currentIDuser = data.FindUser._id;
                            let currentLoginUser = data.FindUser.login;
                            let currentTelefoneUser = data.FindUser.telephone;
                            let orders = data.FindUser.order;
                            return (
                                    <>
                                        <Header />
                                        <main className='wrapper-account'>
                                            <h1>Личный кабинет</h1>
                                            <br/>
                                            <br/>
                                            <label for='id'>ID пользователя</label>
                                            <input placeholder={currentIDuser} readOnly id='id' />
                                            <br/>
                                            <label for='log'>Логин пользователя</label>
                                            <input placeholder={currentLoginUser} readOnly id='log' />
                                            <br/>
                                            <label for='tel'>Телефон пользователя</label>
                                            <input placeholder={currentTelefoneUser} readOnly id='tel' />
                                            <br/>
                                            <h1>Заказы</h1>
                                            <table border="1" width="90%" className='table-orders'>
                                                <tr>
                                                    <td><b>Номер заказа</b></td>
                                                    <td><b>Товары</b></td>                                                       
                                                    <td><b>Сумма</b></td>
                                                    <td><b>Статус</b></td>
                                                </tr>
                                                    
                                                {orders.map(elem => (
                                                    <tr>
                                                        <td>{elem._id}</td>
                                                        <td>
                                                            {elem.good.map(el => (
                                                                <>
                                                                    <img src={el.image[0].url} alt="img"/>
                                                                    <h6>{el.name}</h6>
                                                                </>
                                                            ))}             
                                                        </td>    
                                                        <td>{elem.totalSum} грн</td>
                                                        <td>{elem.status}</td>
                                                    </tr>    
                                                ))}      
                                            </table> 
                                        </main>
                                        <Footer />   
                                    </>
                                )
                        }
                        if(loading) {
                            return <div id='wrapper-loader'><img src={loader} alt="img" /></div>
                        }
                    }
                }
            </Query>    
        )
    }         
}