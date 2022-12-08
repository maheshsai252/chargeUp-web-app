import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './categories.css';

import music from "../resources/music.gif";
import food from "../resources/food.gif";
import theater from "../resources/theater.gif";
import sports from "../resources/sports.gif";
import arts from "../resources/arts.gif";
import science from "../resources/science.gif";
import business from "../resources/business.gif";
import travel from "../resources/travel.gif";

const Categories = () => {
    return (
        <div>
            <h2>Categories</h2>
            <Carousel>
            <Carousel.Item interval={5000}>
                <div class="cards-wrapperv">
                    <Card className="cardv">
                        <a href='/category/music'><img src={music} type="gif" alt="Music" /></a>
                    </Card>
                    <Card className="cardv">
                    <a href='/category/food'><img src={food} type="gif" alt="Food" /></a>
                    </Card>
                    <Card className="cardv">
                    <a href='/category/theater'><img src={theater} type="jpg" alt="Theater" /></a>
                    </Card>
                    <Card className="cardv">
                    <a href='/category/sports'><img src={sports} type="gif" alt="Sports" /></a>
                    </Card>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
            <div class="cards-wrapperv">
            <Card className="cardv">
            <a href='link'><img src={arts} type="jpg" alt="Arts"/></a>
                    </Card>
                    <Card className="cardv">
                    <a href='/category/science'><img src={science} type="gif" alt="Science"/></a>
                    </Card>
                    <Card className="cardv">
                    <a href='/category/business'><img src={business} type="jpg" alt="Business"/></a>
                    </Card>
                    <Card className="cardv">
                    <a href='/category/travel'><img src={travel} type="jpg" alt="Travel"/></a>
                    </Card>
                    </div>
            </Carousel.Item>
        </Carousel>
        </div>
        
    );
}

export default Categories