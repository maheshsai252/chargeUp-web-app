import React from 'react'
import TrendingEventCard from './TrendingEventCard'

const cards = [
    {
      id: "1",
      variant: "hover",
      front: { title: "Hover", background: "ice-climbing.jpg" },
      back: {
        image: "ice-tool.jpg",
        brand: "Petzl",
        name: "Quark Ice Tool",
        price: 259.95
      }
    },
    {
      id: "2",
      variant: "click",
      front: { title: "Click", background: "rock-climbing.jpg" },
      back: {
        image: "climbing-helmet.jpg",
        brand: "Black Diamond",
        name: "Vapor Climbing Helmet",
        price: 139.95
      }
    },
    {
      id: "3",
      variant: "focus",
      front: { title: "Focus", background: "slacklining.jpg" },
      back: {
        image: "slackline.jpg",
        brand: "Barefoot",
        name: "Slackline",
        price: 39.99
      }
    }
  ];

export default function TrendingEventRow() {
  return (
    <div>
        <div className="container-fluid">
            <div className="row">
            {cards.map((card) => (
            <TrendingEventCard key={card.id}  gif="hiking.gif" content={card.back.name}/>
          ))}
                
            </div>
        </div>
    </div>
  )
}
