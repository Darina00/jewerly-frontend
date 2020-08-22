import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import loader from '.././../media/loader/rings.svg';
import '../../animation/animation';
import './pageShop.css';
import { Query} from 'react-apollo';
import gql from 'graphql-tag';

const FIND_ALL_GOODS_AND_CATEGORIES = gql`
query {
    FindAllGoods {
        _id
        name
        image {
            url
        }
        price
        category {
            name
            text
        }
    }
    FindAllCategories {
        name
        text
    }
}
`;

export default class PageShop extends React.Component {
    render() {
        return (
                <Query query={FIND_ALL_GOODS_AND_CATEGORIES}>
                    {
                        ({loading, data}) => {
                            if(loading) return <div id='wrapper-loader'><img src={loader} alt="img" /></div>
                            if(data) {
                                const {FindAllCategories, FindAllGoods} = data;
                                return (
                                    <>
                                        <Header />
                                        <main id='main-shop'>
                                            <div id='main-bg'  data-aos="fade-down" data-aos-duration="1000">
                                                <div>
                                                    <h1>Каталог</h1>
                                                </div>
                                            </div>
                                            <nav>                      
                                                <ul id='nav-shop'>
                                                {FindAllCategories.map(item => (
                                                    <li key={item._id}><Link to={`/shop/${item.text}`}>{item.name}</Link></li>
                                                ))}
                                                </ul>                            
                                            </nav>
                                            <div  className='wrapper-goods'>
                                            {FindAllGoods.map( item => (
                                                <div key={item._id} className='boxGood'>                                   
                                                    <Link to={`/shop/${item.category.text}/${item._id}`}><img src={item.image[0].url} alt="img" /></Link>
                                                </div>
                                            ))}
                                            </div>
                                        </main> 
                                        <Footer />
                                    </>
                                )
                            }
                        }
                    }
                </Query>
        );
    }
}