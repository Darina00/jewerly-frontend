import React from 'react';
import Header from '../../components/header/header';
import './pageAbout.css';
import Footer from '../../components/footer/footer';
import img1 from '../../media/about/1.jpg';
import img2 from '../../media/about/2.jpg';
import img3 from '../../media/about/3.jpg';
import img4 from '../../media/about/4.jpg';
import img5 from '../../media/about/5.jpg';
import img6 from '../../media/about/6.jpg';
import img7 from '../../media/about/7.jpg';
import '../../animation/animation';

export default function PageAbout(props) {
    return (
        <>
        <Header/>
        <main id='wrapper-about'>
            <hr/>
            <h4 data-aos="fade-right"><b>JEWELRY</b> - это <span>ювелирный трендсеттер Украины</span>. Мы не следуем моде, мы сами создаем и задаем тенденции в мире украинских ювелирных изделий</h4>
            <br/>
            <hr/>
            <div data-aos="fade-up"  data-aos-duration="2000">
                <img src={img1}  data-aos="zoom-in" alt="img" />
                <img src={img2}  data-aos="zoom-in" alt="img" />
                <img src={img3}  data-aos="zoom-in" alt="img" />
            </div>
            <hr/>
            <h4 data-aos="fade-right"><b>JEWELRY</b> работает напрямую с поставщиком, а это означает, что у нас <span>постоянно обновляются ювелирные украшения и доступны все размеры</span>. </h4>
            <hr/>
            <div data-aos="fade-up"  data-aos-duration="2000">
                <img src={img4}  data-aos="zoom-in" alt="img" />
                <img src={img5}  data-aos="zoom-in" alt="img" />
                <img src={img6}  data-aos="zoom-in" alt="img" />
            </div>
            <div id='one'>
                <img src={img7} alt="img" />    
            </div>           
        </main>
        <Footer/>
        </>
    )
}