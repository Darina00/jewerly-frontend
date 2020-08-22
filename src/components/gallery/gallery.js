import React from 'react';
import {Carousel} from 'react-bootstrap';
import './gallery.css';
import '../../animation/animation';
import photo1 from '../../media/gallery/1.jpg';
import photo2 from '../../media/gallery/2.jpg';
import photo3 from '../../media/gallery/3.jpg';
import photo4 from '../../media/gallery/4.jpg';
import photo5 from '../../media/gallery/5.jpg';

export default function Gallery() {
    return (
        <Carousel id='gallery' interval="4000" data-aos="zoom-in" data-aos-duration="1000">
            <Carousel.Item>
                <img
                    className="d-block"
                    src={photo1}
                    alt="img"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block"
                    src={photo2}
                    alt="img"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block"
                    src={photo3}
                    alt="img"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block"
                    src={photo4}
                    alt="img"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block"
                    src={photo5}
                    alt="img"
                />
            </Carousel.Item>
        </Carousel>
    );
};