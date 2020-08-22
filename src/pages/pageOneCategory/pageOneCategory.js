import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import loader from '../../media/loader/rings.svg';
import '../../animation/animation';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

export default class PageOneCategory extends React.Component {
    render() {
        return(
            <Query 
                query={gql`
                    query {
                        FindCategory(text: "${this.props.match.params.nameCategory}") {
                            _id
                            name
                            text
                            good {
                                _id
                                name
                                image {
                                    url
                                }
                                category {
                                    text
                                }
                            }
                        }
                        FindAllCategories {
                            name
                            text
                        }
                    }
                `}
            >
                {
                    ({loading, data}) => {
                        if(loading) return <div id='wrapper-loader'><img src={loader} alt="img" /></div>
                        if(data) {
                            const {FindAllCategories, FindCategory} = data;
                            return (
                                <>
                                <Header />
                                <main id='main-shop'>
                                            <div id='main-bg'  data-aos="fade-down" data-aos-duration="1000">
                                                <div>
                                                    <h1>{this.props.match.params.nameCategory}</h1>
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
                                            {FindCategory.good.map( item => (
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
        )
    }
}