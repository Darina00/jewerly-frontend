import React from 'react';
import { Query, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { MdFavoriteBorder } from "react-icons/md";
import './pageBasket.css';
import loader from '../../media/loader/rings.svg';
const ADD_ORDER = gql`
mutation add($arr: [ID], $ID: ID, $prices: [Float]) {
    AddOrder(goods: $arr, _idUsr: $ID, prices: $prices) {
      _id
      totalSum
      owner {
          login
      }
    }
  }
`;

export default function PageBasket(props) {
    const [_idOwner] = React.useState(`${localStorage.IDuser}`);
    let arrGoods = JSON.parse(localStorage.getItem('ArrayGoods'));
    let arrPrices = JSON.parse(localStorage.getItem('ArrayPrices'));
    const [AddOrder, {data}] = useMutation(ADD_ORDER, {
        variables: {arr: arrGoods, ID: _idOwner, prices: arrPrices}
    });

    if(data) {
        return (
            <>
                <Header />
                <main className='wrapper-order'>
                    <h1>Спасибо, {data.AddOrder.owner.login}, что доверяете нам!</h1>
                    <p>Номер Вашего заказа №{data.AddOrder._id}</p>
                    <p>Сумма заказа: <b>{data.AddOrder.totalSum}</b> грн</p>
                    <p>В ближайшее время с Вами свяжется наш консультант</p>
                    
                </main>
                <Footer />   
            </>
        )
    }

    return (
        <>
            <Query 
                query={gql`
                    query find($arrGoods: [ID]) {
                        FindArrayGoods(_id: $arrGoods) {
                            _id
                            name
                            image {
                                url
                            }
                            size
                            price    
                        }
                    }
                `} 
                variables={{arrGoods}}
            >
                {
                    ({loading, data}) => {
                        if(loading) {
                            return <div id='wrapper-loader'><img src={loader} alt="img" /></div>
                        }
                        if(data) {
                            return (
                                <>
                                    <Header />
                                    <main className='wrapper-basket'>
                                        <h1>Текущий заказ</h1>
                                        <table border="1">
                                            {data.FindArrayGoods.map(item => {
                                                return (
                                                    <tr key={item._id}>
                                                        <td><MdFavoriteBorder size='60'/></td>
                                                        <td><img src={item.image[0].url} alt="img" /></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.price} грн</td>
                                                    </tr>
                                                )
                                            })}    
                                        </table>   
                                        <h4 id='clear' onClick={() => {arrGoods.length = 0; arrPrices.length = 0; localStorage.setItem('ArrayGoods', JSON.stringify(arrGoods)); localStorage.setItem('ArrayPrices', JSON.stringify(arrPrices)); window.location.reload()}}>Очистить корзину</h4>  
                                        <button id='ordered' onClick={ () => {AddOrder(); arrGoods.length = 0; arrPrices.length = 0; localStorage.setItem('ArrayGoods', JSON.stringify(arrGoods)); localStorage.setItem('ArrayPrices', JSON.stringify(arrPrices))} }>Заказать</button>
                                    </main> 
                                    <Footer />
                                </>
                            )
                        }
                    }
                }
            </Query>
        </>
    )
} 