import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import loader from '.././../media/loader/rings.svg';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './pageOneGood.css';

let arrayGoods = JSON.parse(localStorage.getItem('ArrayGoods'));
let arrayPrice = JSON.parse(localStorage.getItem('ArrayPrices'));

export default class PageOneGood extends React.Component {

    FIND_GOOD = gql`
                query fndGood {
                    FindGood(_id: "${this.props.match.params.idGood}") {
                        _id
                        name
                        price
                        metal
                        insertion
                        campaign
                        theme
                        country
                        image {
                            url
                        }
                        category {
                            name
                        }
                    }
                }
            `;

    render() {
        return (
            <Query query={this.FIND_GOOD} fetchPolicy='network-only'>
                {
                    ( {loading, data} ) => {
                        if (loading) return <div id='wrapper-loader'><img src={loader} id='loader' alt="img" /></div>;
                        if (data) {
                            return (
                            <>
                            <Header />
                            <main id='main-shop'>
                                <div id='main-bg'  data-aos="fade-down" data-aos-duration="1000">
                                    <div>
                                        <h1>{data.FindGood.name}</h1>
                                    </div>
                                </div>
                                <div id='wrapper-oneGood'>
                                    <div>
                                        {data.FindGood.image.map(item => (
                                            <img src={item.url} key={item._id} alt="img" />
                                        ))}    
                                    </div>
                                    
                                    <div>
                                        <h1>{data.FindGood.name}</h1>   
                                        <hr/>
                                        <br/>
                                        <h5>Артикул: {data.FindGood._id}</h5> 
                                        <br/>
                                        <h1>{data.FindGood.price} грн</h1>
                                        <br/>
                                        <h4>Метал: {data.FindGood.metal}</h4>
                                        <br/>
                                        <h4>Вставка: {data.FindGood.insertion}</h4>
                                        <br/>
                                        <h4>Кампания: {data.FindGood.campaign}</h4>
                                        <br/>
                                        <h4>Тема: {data.FindGood.theme}</h4>
                                        <br/>
                                        <h4>Страна: {data.FindGood.country}</h4>
                                      
                                        {localStorage.AuthToken ? <button id='buy-button' onClick={() => {document.getElementById('buy-button').innerText = 'Добавлено'; arrayGoods.push(data.FindGood._id); localStorage.setItem('ArrayGoods', JSON.stringify(arrayGoods)); arrayPrice.push(data.FindGood.price); localStorage.setItem('ArrayPrices', JSON.stringify(arrayPrice))}} >Добавить в корзину</button> : null}
                                    </div>
                                </div>
                            </main>
                            <Footer />
                            </>
                        );
                        }   
                    }
                }
            </Query>
        )
    }
}