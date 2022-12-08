import React from 'react'
import calendar from '../../resources/calendar.jpg'
import '../../css/search.scss'
import wa from '../../resources/white-arrow.png'
import { format } from 'date-fns'
import pin from '../../resources/pin.png'
export default function VerticalCard({event}) {
    var bgimage = "https://chargeup.s3.amazonaws.com/"+event.filenames[0];
  return (
    <div>
        <div className="blog-cardv">
        <div className="metav">
        <div className='photov'>
            <img style={{width: '350px'}} 
                src= {"https://chargeup.s3.amazonaws.com/"+event.filenames[0]} alt='lol'/>          
        </div>    
            {/* <div className="photov" style={{backgroundImage: `url(${bgimage})`}}></div> */}
        </div>
        <div className="descriptionv">

            <p className="styleCardTitle" > {event.name}</p>

            <p> <i class="fas fa-map-pin"> </i>{event.place.split(',')[0]}<br /><br />
                <img src={calendar}  className="icon" alt="kk" /> {format(new Date(event.startDate), 'yyyy/MM/dd kk:mm')}
            </p>
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta.</p>
            <p className="read-more">
                <a href={"/event/"+event.nameTag}>Read More</a>
            </p>
        </div>
    </div>







        

    </div>
  )
}
