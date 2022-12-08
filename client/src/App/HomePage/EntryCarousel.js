import React from 'react'

import cemusicalfest from '../resources/cemusicfest.gif'
import cetheater from '../resources/cetheater.gif'
import banner from '../resources/banner_m.gif';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EntryCarousel() {
  return (
    <div>
    <Carousel>
    <Carousel.Item interval={5000}>
                <Card className="carv">
                    <img src={cemusicalfest} type="gif" alt="banner1" />
                </Card>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <Card className="carv">
                    <img src={banner} type="gif" alt="banner1" />
                </Card>
            </Carousel.Item>
           
            <Carousel.Item interval={5000}>
                <Card className="carv">
                    <img src={cetheater} type="gif" alt="banner1" />
                </Card>
            </Carousel.Item>
        </Carousel>
  </div>
  )
}
