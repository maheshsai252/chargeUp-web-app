import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import CategoryDetail from './CategoryDetail';
import NavBar from '../../Nav/NavBar';
import Footer from '../../Nav/Footer';

export default function CategoryEntry() {
    const {category} = useParams()
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.post('/api/events-fetchByCategory/',{
                    searchCategory: category
                });
                console.log( response,"gotten")
                if(response.status===200) {
                    
                    setEvents(response.data);

                }
            } catch (error) {
                
            }
            
        }
        fetch();
    },[category])
    const categoryDump = {
        "music" : 
        "Discover the best Music events in your area and online.Even while music festivals may be in a state of semi-hibernation for the winter, there are still opportunities to see a variety of musicians in a fun environment. Enjoy incredible live performances at these music events that ChargeUp's specialists have carefully selected. Or, use a handful of the festival options for 2023 as a jumping-off point for your plans. It's never too early to start planning for festival season, after all.",
        "food" :
         "We've got it all—from free food carnivals to the swankiest food and drink fests in town. From attending top events to bucket listing your favorite to delicacies to volunteer opportunities. ChargEup is the place. Let us be your guide. Your guide to delicious food fests. Now is the time.",
         "theater":         
         "Looking for theater-tickets events in locations near you? Whether you're a local, new in town, or just passing through, you'll be sure to find something on charEup."
         ,
         
         "sports" :
         
         "Find your favorite Sports event tickets, schedules and seating charts in the sports events near you. Buy tickets for upcoming sports events, including baseball, basketball, football, golf, MMA and many more."
         ,
         "art" :
         
         "Looking for art-events events in locations near you? Whether you're a local, new in town, or just passing through, you'll be sure to find something on charEup."
         ,
         "business" :
         
         "ChargEup Business Journal regularly produces special events to recognize industry leaders and facilitate professional networking. View our event listings to get industry exposure."
         ,
         "science" :
         
         "Join us for events with stimulating research, immersive training, webinars, and peer collaboration."
         ,
         "travel" :
         
         "If You're a Travel Enthusiast, This Is for You. Make The First Stop on Your Next Vacation. View our event listings to join in your peers to travel together."
    }

    const [events,setEvents] = useState([]);
  return (
    <div>
    <NavBar />
        {/* {categoryDump[category]} */}
        <CategoryDetail category={category}  desc={categoryDump[category]} events={events} />
    <Footer />
    </div>
  )
}
