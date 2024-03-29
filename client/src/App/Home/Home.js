import React, { useEffect } from 'react'
import NavBar from '../Nav/NavBar'
import EntryCarousel from '../HomePage/EntryCarousel'
import TrendingEvents from '../HomePage/TrendingEvents'
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Footer from '../Nav/Footer';
import { useDispatch } from 'react-redux';
import { ActionCreators } from '../actions/actionCreators';
import Categories from '../HomePage/Categories';
import EventsNearYou from '../HomePage/EventsNearYou';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ActionCreators.changeActiveTab("Home"))
    })
  return (
    <div>
        <NavBar />
        <EntryCarousel />
        <Categories />
        <TrendingEvents />
        <EventsNearYou />
        <Footer />
    </div>
  )
}



export default Home
