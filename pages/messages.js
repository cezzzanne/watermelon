import React from 'react'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Tus from '@uppy/tus'
import XHRUpload from '@uppy/xhr-upload';
import IndividualListing from "../components/individualListing";
import RequestMade from "../components/requestMade";
import RequestReceived from "../components/requestReceived";
import {Elements, StripeProvider} from 'react-stripe-elements';
import PaymentForm from '../components/PaymentForm';
import {Modal, ModalHeader, ModalFooter, Button, FormTextarea, ModalBody} from "shards-react";


class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, requestsMade: null, requestsReceived: null, userID: null, paymentModal: false,
        currentService: null};
        this.goDashboard = this.goDashboard.bind(this);
        this.goServiceListings = this.goServiceListings.bind(this);
        this.goProfile = this.goProfile.bind(this);
        this.goNewListing = this.goNewListing.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
        // from a seller perspective
        this.approveRequest = this.approveRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({paymentModal: false});
    }

    acceptRequest(item) {
        const userID = this.state.userID;
        const requestID = item.id;
        this.setState({currentService: item}, ()=> {
            this.setState({paymentModal: true});
        });

    }

    cancelRequest(item) {
        const userID = this.state.userID;
        const requestID = item.id;
        fetch('https://watermelonapi.herokuapp.com/buyer/reject',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID, requestID
                })
            }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            const myList = data.r_sent.map((item)=> {
                return <RequestMade request={item} acceptRequest={()=> self.approveRequest(item)} cancelRequest={()=> self.rejectRequest(item)} />
            });
            this.setState({requestsMade: myList})
        });
    }

    approveRequest(item) {
        const userID = this.state.userID;
        const requestID = item.id;
        fetch('https://watermelonapi.herokuapp.com/seller/approve',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID, requestID
                })
            }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            const myList = data.r_received.map((item)=> {
                return <RequestReceived request={item} approveRequest={()=> self.approveRequest(item)} rejectRequest={()=> self.rejectRequest(item)} />
            });
            this.setState({requestsReceived: myList})
            });
    }

    rejectRequest(item) {
        const userID = this.state.userID;
        const requestID = item.id;
        fetch('https://watermelonapi.herokuapp.com/seller/reject',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID, requestID
                })
            }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            const myList = data.r_received.map((item)=> {
                return <RequestReceived request={item} approveRequest={()=> self.approveRequest(item)} rejectRequest={()=> self.rejectRequest(item)} />
            });
            this.setState({requestsReceived: myList})
        });
    }

    closeAlert() {
        this.setState({uploadSuccess: false, uploadFailed: false});
    }

    goDashboard(event) {
        document.location.href = '/userdashboard';
    }

    goServiceListings(event) {
        document.location.href = '/serviceList';

    }

    goProfile(event) {
        document.location.href = '/profile';

    }

    goNewListing(event) {
        document.location.href = '/addListing';

    }

    async componentDidMount() {
        console.log('didmount');
        const userID = await localStorage.getItem('userID');
        this.setState({userID: userID});
        fetch('https://watermelonapi.herokuapp.com/get-messages',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID
                })
            }).then(async (res) => {
            const user = await res.json();
            console.log(user);
            const self = this;
            const myList = user.requests_made.map(function(item){
                return <RequestMade request={item} acceptRequest={()=> self.acceptRequest(item)} cancelRequest={()=> self.cancelRequest(item)} />;

            });
            const requestsReceived = user.requests_received.map((item)=> {
                return <RequestReceived request={item} approveRequest={()=> self.approveRequest(item)} rejectRequest={()=> self.rejectRequest(item)} />
            });
            this.setState({name: user.name, lastName: user.last_name, profileImg: user.image, loading: false, requestsMade: myList, requestsReceived: requestsReceived});
        });
    }


    async logout() {
        localStorage.clear();
        document.location.href = '/';
    }


    render() {
        return (
            <html className="no-js h-100" lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>twise</title>
                <meta name="description"
                      content="A high-quality &amp; free Bootstrap admin dashboard template pack that comes with lots of templates and components." />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                      crossOrigin="anonymous" />
                <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                      rel="stylesheet" />
                <link href="https://transloadit.edgly.net/releases/uppy/v1.4.0/uppy.min.css" rel="stylesheet" />

                <link rel="stylesheet"
                      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                      crossOrigin="anonymous" />
                <link rel="stylesheet" id="main-stylesheet" data-version="1.1.0"
                      href="../static/css/shards-dashboards.1.1.0.min.css" />
                <link rel="stylesheet" href="../static/css/extras.1.1.0.min.css" />
                <script async defer src="https://js.stripe.com/v3/"></script>
                <script async defer src="https://buttons.github.io/buttons.js"></script>
            </head>
            <body className="h-100">
            <div className="container-fluid">
                <div className="row">
                    <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
                        <div className="main-navbar">
                            <nav
                                className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
                                <a className="navbar-brand w-100 mr-0" href="#" style={{lineHeight: 25}} >
                                    <div className="d-table m-auto">
                                        <img id="main-logo" className="d-inline-block align-top mr-1"
                                             style={{maxWidth: 25}} src="https://img.icons8.com/ios/100/000000/watermelon.png"
                                             alt="Shards Dashboard" />
                                        <span className="d-none d-md-inline ml-1">twise</span>
                                    </div>
                                </a>
                                <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
                                    <i className="material-icons">&#xE5C4;</i>
                                </a>
                            </nav>
                        </div>
                        <div className="nav-wrapper">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className='nav-link' href="#" onClick={this.goServiceListings}>
                                        <i className="material-icons">view_module</i>
                                        <span>Listings</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="#">
                                        <i className="material-icons">vertical_split</i>
                                        <span>Your Listings</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className='nav-link' href="#"  onClick={this.goNewListing}>
                                        <i className="material-icons">note_add</i>
                                        <span>Add New Listing</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">
                                        <i className="material-icons">message</i>
                                        <span>Inbox</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className='nav-link' href="#"  onClick={this.goProfile}>
                                        <i className="material-icons">person</i>
                                        <span>Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
                        <Modal  toggle={this.closeModal} open={this.state.paymentModal}>
                            <ModalBody>
                                <StripeProvider apiKey="pk_test_lBh9zKVPdcwuWv40Dt19tu1h00DpSKWW1b">
                                    <div className="example">
                                        <h3>React Stripe Elements Example</h3>
                                        <Elements>
                                            <PaymentForm service={this.state.currentService} />
                                        </Elements>
                                    </div>
                                </StripeProvider>
                            </ModalBody>

                        </Modal>
                        <div className="main-navbar sticky-top bg-white">
                            <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
                                <form action="#" className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">

                                </form>
                                <ul className="navbar-nav border-left flex-row ">
                                    <li className="nav-item border-right dropdown notifications">
                                        <a className="nav-link nav-link-icon text-center" href="#" role="button"
                                           id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                           aria-expanded="false">
                                            <div className="nav-link-icon__wrapper">
                                                <i className="material-icons">&#xE7F4;</i>
                                                <span className="badge badge-pill badge-danger">0</span>
                                            </div>
                                        </a>
                                        {/*<div className="dropdown-menu dropdown-menu-small"*/}
                                             {/*aria-labelledby="dropdownMenuLink">*/}
                                            {/*<a className="dropdown-item" href="#">*/}
                                                {/*<div className="notification__icon-wrapper">*/}
                                                    {/*<div className="notification__icon">*/}
                                                        {/*<i className="material-icons">&#xE6E1;</i>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                                {/*<div className="notification__content">*/}
                                                    {/*<span className="notification__category">Your Services</span>*/}
                                                    {/*<p>4 people have messaged you about your new item!*/}

                                                        {/*<span className="text-success text-semibold"> 28%</span> in the*/}
                                                        {/*last week. Great job!</p>*/}
                                                {/*</div>*/}
                                            {/*</a>*/}
                                            {/*<a className="dropdown-item" href="#">*/}
                                                {/*<div className="notification__icon-wrapper">*/}
                                                    {/*<div className="notification__icon">*/}
                                                        {/*<i className="material-icons">&#xE8D1;</i>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                                {/*<div className="notification__content">*/}
                                                    {/*<span className="notification__category">Services</span>*/}
                                                    {/*<p>Last week your revenue descreased by*/}
                                                        {/*<span className="text-danger text-semibold"> 5.52%</span>. It*/}
                                                        {/*could have been worse!</p>*/}
                                                {/*</div>*/}
                                            {/*</a>*/}
                                            {/*<a className="dropdown-item notification__all text-center" href="#"> View*/}
                                                {/*all Notifications </a>*/}
                                        {/*</div>*/}
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-nowrap px-3" data-toggle="dropdown"
                                           href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                            <img className="user-avatar rounded-circle mr-2" src={ this.state.profileImg }
                                            />
                                            <span className="d-none d-md-inline-block">{ this.state.name } { this.state.lastName }</span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-small">
                                            <a onClick={this.goProfile} className="dropdown-item" href="#">
                                                <i className="material-icons">&#xE7FD;</i> Profile</a>
                                            <a className="dropdown-item" href="#">
                                                <i className="material-icons">vertical_split</i>Your Listings</a>
                                            <a onClick={this.goNewListing} className="dropdown-item" href="#">
                                                <i className="material-icons">note_add</i>Add Listing</a>
                                            <div className="dropdown-divider"></div>
                                            <a onClick={this.logout} className="dropdown-item text-danger" href="#">
                                                <i className="material-icons text-danger">&#xE879;</i> Logout </a>
                                        </div>
                                    </li>
                                </ul>
                                <nav className="nav">
                                    <a href="#"
                                       className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left"
                                       data-toggle="collapse" data-target=".header-navbar" aria-expanded="false"
                                       aria-controls="header-navbar">
                                        <i className="material-icons">&#xE5D2;</i>
                                    </a>
                                </nav>
                            </nav>
                        </div>

                        {/*<Alert theme="success" dismissible={this.closeAlert} open={this.state.uploadSuccess}>*/}
                            {/*<i className="far fa-check-circle"></i>   Great! your profile has been updated!*/}
                        {/*</Alert>*/}
                        {/*<Alert theme="danger" dismissible={this.closeAlert} open={this.state.uploadFailed}>*/}
                            {/*<i className="fas fa-exclamation-triangle"></i>   There seems to be something wrong with your data, <strong>try again!</strong>  &rarr;*/}
                        {/*</Alert>*/}

                        <div className="main-content-container container-fluid px-4">
                            <div className="page-header row no-gutters py-4">
                                <div className="col-10 col-sm-4 text-center text-sm-left mb-0">
                                    <span className="text-uppercase page-subtitle">Messages</span>
                                    <h3 className="page-title">Manage Requests
                                    </h3>
                                </div>
                            </div>

                            <div hidden={!this.state.loading} className="text-center">

                                <div style={{marginTop: '30vh'}} className="spinner-grow text-info" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div style={{marginTop: '30vh'}} className="spinner-grow text-info" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div style={{marginTop: '30vh'}} className="spinner-grow text-info" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                            <div hidden={this.state.loading} className="col-lg-12 col-md-12 col-sm-12 mb-4">

                            <div className="card card-small blog-comments">
                                <div className="card-header border-bottom">
                                    <h6 className="m-0">Requests Made &#128228;</h6>
                                </div>
                                <div className="card-body p-0">
                                    { this.state.requestsMade}
                        </div>
                </div>

                                <div className="card card-small blog-comments" style={{marginTop: 60}}>
                                    <div className="card-header border-bottom">
                                        <h6 className="m-0">Requests Received &#128229; </h6>
                                    </div>
                                    <div className="card-body p-0">

                                        {this.state.requestsReceived}

                                    </div>
                                </div>


                            </div>
                            </div>
                        <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Blog</a>
                                </li>
                            </ul>
                            <span className="copyright ml-auto my-auto mr-2">Copyright © 2019
              <a href="#" rel="nofollow"> twise</a>
            </span>
                        </footer>
                    </main>

                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.3.1.min.js"
                    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous" defer></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
                    integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
                    crossOrigin="anonymous" defer></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
                    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
                    crossOrigin="anonymous" defer></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js" defer></script>
            <script src="https://unpkg.com/shards-ui@latest/dist/js/shards.min.js" defer></script>
            <script src="https://transloadit.edgly.net/releases/uppy/v1.4.0/uppy.min.js"></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/Sharrre/2.0.1/jquery.sharrre.min.js" defer></script>
            <script src="../static/js/extras.1.1.0.min.js" defer></script>
            <script src="../static/js/shards-dashboards.1.1.0.min.js" defer></script>
            </body>
            </html>
        );
    }
}
export default Messages
