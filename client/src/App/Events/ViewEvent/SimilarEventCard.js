import React from 'react'
import img from '../../resources/halo1.jfif'
import '../../css/style.scss'

export default function SimilarEventCard() {
  return (
    <div>
         <div className="col-12 col-md-6 col-lg-4">
                <div className="card bg-dark like">
                    <img src={img} className="card-img-top" alt="test1" />
                    <div className="card-body bg-dark text-light">  
                        <h5 className="card-title">Halloween Bar Crawl!</h5>
                        <p className="card-text">"Join us for the annual Halloween Bar Crawl! Top Shelf Crawls has put together the premier list of bars and nightclubs for our crawlers!"</p>  
                        <a href="/" className="btn btn-primary">Get your pass now!</a>
                    </div>
                </div>
            </div>
    </div>
  )
}
