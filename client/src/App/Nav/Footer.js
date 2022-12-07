import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/style.scss";

const myComponentStyle = {
    fontFamily: 'cursive'
}
export default function Footer() {
  return (
    <div>
        <footer className="text-center text-light-start bg-dark text-muted">
            <div className="justify-content-center justify-content-lg-between p-4">
  
                <div>
      
                    <a href="/" className="me-4 text-reset">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="/" className="me-4 text-reset">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="/" className="me-4 text-reset">
                        <i className="fab fa-instagram"></i>
                     </a>
                    <a href="/" className="me-4 text-reset">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="/" className="me-4 text-reset">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <div className="text-center text-light p-4">
                © 2022 <span style={myComponentStyle}> chargEup </span> 
            </div>
        </footer>

    </div>
  )
}
