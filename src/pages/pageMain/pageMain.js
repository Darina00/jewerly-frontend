import React from 'react';
import {Link} from 'react-router-dom';
import { IoIosArrowRoundForward } from "react-icons/io";
import Gallery from '../../components/gallery/gallery';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Photo from '../../media/photo.jpg';
import Photo11 from '../../media/11.jpg';
import Photo22 from '../../media/22.jpg';
import Photoa from '../../media/a.jpg';
import Photob from '../../media/в.jpg';
import Photoc from '../../media/с.jpg';
import './pageMain.css';
import '../../animation/animation';

export default class PageMain extends React.Component {
    render() {
        return(
            <>
                <Header />
                <main>
                    <Gallery />
                    <div id='section-about' data-aos="fade-up" data-aos-duration="2000">
                        <div className='item-on-bg'>
                            <div id="items-left" data-aos="fade-right">
                                <h1>Про нас</h1>
                                <p>JEWELRY - это ювелирный трендсеттер Украины</p>
                                <Link to="/about-us">Читать дальше <IoIosArrowRoundForward size="50px" /></Link>   
                            </div>
                            <img src={Photo} id="item-right" data-aos="zoom-out" alt="img" />
                        </div>
                    </div>
                    <div id='section'>
                        <div id='top-section' data-aos="zoom-in">
                            <div className='box-item'>
                                <p>Вы у нас впервые? Зарегистрируйтесь</p>
                                <Link to='/registration'>Зарегистрироваться <IoIosArrowRoundForward size="50px" /></Link>   
                            </div>
                            <img src={Photo11} className='box-item' alt="img" />
                            <img src={Photo22} className='box-item' alt="img" />
                        </div>

                        <div id="bottom-section">
                            <div id='box-shop' data-aos="fade-right">
                                <Link to='/shop'><h1>Каталог <IoIosArrowRoundForward size="50px" /></h1></Link>
                            </div>
                            <div>
                                <div id='col'>
                                    <div id="top">
                                        <img src={Photoa} data-aos="zoom-in" alt="img" />
                                    </div>
                                    <div id="bottom">
                                        <img src={Photoc} data-aos="zoom-in" alt="img" />
                                        <img src={Photob} data-aos="zoom-in" alt="img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }
}