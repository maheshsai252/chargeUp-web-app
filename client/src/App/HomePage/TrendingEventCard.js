import { useEffect } from "react";
import "../css/flip.scss";

function TrendingEventCard(props) {
  useEffect(()=> {
    
  })
  return (
    <div className="col-12 col-md-6 col-lg-3 card2">
        <div className="flip-card">

            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={process.env.PUBLIC_URL+ '/resources/' + props.gif} alt="Avatar" />
              </div>
              <div className="flip-card-back">
                <div className="content">
                  <p>
                    {props.content}
                  </p>
                  
                  <button type="button btn-light">
                    <a href="/viewEvent/" >
                        Show More
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
    
  );
}

export default TrendingEventCard;
