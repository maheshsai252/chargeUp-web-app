import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from '../Nav/NavBar';

export default function Faq() {
  return (
    <div>
        <NavBar />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-8 text-center">
                    <div className="section-title">
                        <h4>FAQ's</h4>
                        <h2>Frequently Asking <span>Question’s</span></h2>
                    </div>
                </div>
            </div>
    
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="accordion" id="accordionExample">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="mb-0">
                                            {/* <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"> */}
                                                Tickets & Receipts
                                            {/* </button> */}
                                        </h5>
                                    </div>
    
                                    {/* <div id="collapseOne" className="collapse" data-parent="#accordionExample"> */}
                                        <div className="card-body">
                                            Contact the event organizer
                                            If you have questions about an event, see if the information you need is on the event listing. If it’s not and you have a ticket already, go to "Tickets" in your ChargeUp account. Then select your order, and click “Contact the organizer”. If you don’t have a ticket, go to the event listing and click "Contact". ChargeUp can't answer questions about an event on the organizer's behalf.                                        </div>
                                    {/* </div> */}
                                </div>
    
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="mb-0">
                                            {/* <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> */}
                                                Account & Profile
                                            {/* </button> */}
                                        </h5>
                                    </div>
                                    {/* <div id="collapseTwo" className="collapse" data-parent="#accordionExample"> */}
                                        <div className="card-body">
                                            To reset your ChargeUp password, click "Forgot password" when logging in or go here to reset your password. Password reset emails come from "noreply@order.chargeup.com" and have the subject line, "Reset your ChargeUp password".                                        </div>
                                    </div>
                                {/* </div> */}
    
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="mb-0">
                                            {/* <button className="btn btn-link collapsed" type="button" data-toggle="collapse" */}
                                                {/* data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> */}
                                               Legal , Trust or privacy Issue
                                            {/* </button> */}
                                        </h5>
                                    </div>
                                    {/* <div id="collapseThree" className="collapse" data-parent="#accordionExample"> */}
                                        <div className="card-body">
                                            ChargeUp & California Data Protection
                                            ChargeUp takes data privacy and security very seriously. We take steps to make sure that we comply with our data privacy law obligations, and our goal is to make it easy for our Organizers to comply with their respective obligations.                                        </div>
                                    </div>
                                {/* </div> */}
    
                            </div>
    
                            <div className="col-xl-6 col-lg-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="mb-0">
                                            {/* <button className="btn btn-link collapsed" type="button" data-toggle="collapse" */}
                                                {/* data-target="#collapse5" aria-expanded="false" aria-controls="collapseOne"> */}
                                                Orders
                                            {/* </button> */}
                                        </h5>
                                    </div>
    
                                    {/* <div id="collapse5" className="collapse" data-parent="#accordionExample"> */}
                                        <div className="card-body">
                                            To edit order information like your name or email address, go to “Tickets” in your ChargeUp account. Choose the order you want to update and click “Edit”.                                         </div>
                                    {/* </div> */}
                                </div>
    
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="mb-0">
                                            {/* <button className="btn btn-link collapsed" type="button" data-toggle="collapse" */}
                                                {/* // data-target="#collapse6" aria-expanded="false" aria-controls="collapseTwo"> */}
                                                Terms of Use
                                            {/* </button> */}
                                        </h5>
                                    </div>
                                    {/* <div id="collapse6" className="collapse" data-parent="#accordionExample"> */}
                                        <div className="card-body">
                                            ChargeUp may terminate or suspend your account, delete your profile or any of your User Content, and restrict your use of all or any part of the Platform at any time and for any reason, without any liability to ChargeUp, subject to applicable law                                        </div>
                                    {/* </div> */}
                                </div>
    
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="mb-0">
                                            {/* <button className="btn btn-link collapsed" type="button" data-toggle="collapse" */}
                                                {/* // data-target="#collapse7" aria-expanded="false" aria-controls="collapseThree"> */}
                                                Contact Us
                                            {/* </button> */}
                                        </h5>
                                    </div>
                                    {/* <div id="collapse7" className="collapse" data-parent="#accordionExample"> */}
                                        <div className="card-body">
                                            1-800-379-6453 <br />8 am - 5 pm PT<br />Mon - Fri
                                        </div>
                                    {/* </div> */}
                                </div>
    
                            </div>
    
                        </div>
    
                    </div>
    
                </div>
            </div>
        </div>
    </div>
  )
}
