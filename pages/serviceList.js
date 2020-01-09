import React from 'react'
import IndividualListing from '../components/individualListing'
import {Modal, ModalHeader, ModalFooter, Button, FormTextarea, ModalBody, Alert} from "shards-react";
import FullListing from "../components/fullListing";
import ProfileModal from "../components/profileModal";

class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentListing: null, modalOpen: false, listings: [], name: '', loading: true, items: '', listingsJson: null,
        profileModalOpen: false, currentProfile: null, profileImg: '', note: '', noteBlock: true, sendingRequest: false, listingJSON: null,
        requestSuccess: false};
        this.goDashboard = this.goDashboard.bind(this);
        this.goProfile = this.goProfile.bind(this);
        this.goNewListing = this.goNewListing.bind(this);
        this.openListing = this.openListing.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openProfile = this.openProfile.bind(this);
        this.closeModalProfile = this.closeModalProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getItem = this.getItem.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.goMessages = this.goMessages.bind(this);
    }

    async createRequest() {
        this.setState({sendingRequest: true, noteBlock: true});
        const userID = await localStorage.getItem('userID');
        const itemID = this.state.listingJSON.id;
        fetch('https://watermelonapi.herokuapp.com/create-request',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID,
                    note: this.state.note,
                    itemID
                })
            }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            this.setState({sendingRequest: false, requestSuccess: true, currentListing: null, modalOpen: false})
            });
    }

    closeAlert() {
        this.setState({requestSuccess: false});
    }

    getItem() {
        this.setState({noteBlock: false});
    }

    handleChange(e) {
        this.setState({ note: e.target.value });
    }

    goDashboard(event) {
        document.location.href = '/userdashboard';
    }

    closeModal(event) {
        this.setState({currentListing: null, modalOpen: false, noteBlock: true});
    }

    closeModalProfile() {
        this.setState({currentProfile: null, profileModalOpen: false});
    }

    goProfile(event) {
        document.location.href = '/profile';

    }

    goNewListing(event) {
        document.location.href = '/addListing';

    }

    goMessages(event) {
        document.location.href = '/messages';
    }

    openListing(item) {
        console.log(item);
        this.setState({currentListing: <FullListing listing={item}/>, modalOpen: true, listingJSON: item});
    }

    async componentDidMount() {
        console.log('didmount');
        const userID = await localStorage.getItem('userID');
        fetch('https://watermelonapi.herokuapp.com/service-list',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userID
                })
            }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            let self = this;
            await localStorage.setItem('image', data.image);
            const myList = data.services.map(function(item){
                return <IndividualListing listing={item} clickHandlerProfile={()=> self.openProfile(item)} clickHandler={()=> self.openListing(item) }/>;
            });
            this.setState({name: data.name, listings: myList, loading: false, profileImg: data.image});

        });
        console.log('mounting')
    }

    openProfile(item) {
        console.log('here');
        this.setState({currentProfile: <ProfileModal profile={item.owner}/>, profileModalOpen: true})
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
                          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                                <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
                                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                                          rel="stylesheet" />
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                      crossOrigin="anonymous" />
                                            <link rel="stylesheet" id="main-stylesheet" data-version="1.1.0"
                                                  href="../static/css/shards-dashboards.1.1.0.min.css" />
                <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.2/mapbox-gl.js' />
                <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.2/mapbox-gl.css' rel='stylesheet' />
                                                <link rel="stylesheet" href="../static/css/extras.1.1.0.min.css" />
                                                    <script async defer src="https://buttons.github.io/buttons.js"></script>
                <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.min.js'></script>
                <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.css' type='text/css' />
                <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
                <link rel="stylesheet" href="../static/css/addListing.css" />

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
                        <form action="#"
                              className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
                            <div className="input-group input-group-seamless ml-3">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="fas fa-search"></i>
                                    </div>
                                </div>
                                <input className="navbar-search form-control" type="text"
                                       placeholder="Find new things...." aria-label="Search" /></div>
                        </form>
                        <div className="nav-wrapper">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className='nav-link active' href="#" onClick={this.goServiceListings}>
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
                                    <a className='nav-link' href='#'  onClick={this.goNewListing}>
                                        <i className="material-icons">note_add</i>
                                        <span>Add New Listing</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="#" onClick={this.goMessages}>
                                        <i className="material-icons">message</i>
                                        <span>Inbox</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className='nav-link'  href="#" onClick={this.goProfile}>
                                        <i className="material-icons">person</i>
                                        <span>Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
                        <div className="main-navbar sticky-top bg-white">
                            <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
                                <form action="#" className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                                    <div className="input-group input-group-seamless ml-3">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-search"></i>
                                            </div>
                                        </div>
                                        <input className="navbar-search form-control" type="text"
                                               placeholder="Find new things..." aria-label="Search" /></div>
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
                                                <span className="d-none d-md-inline-block">{ this.state.name }</span>
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
                        <Alert theme="success" dismissible={this.closeAlert} open={this.state.requestSuccess}>
                            <i className="far fa-check-circle"></i>   Your request has been sent!
                        </Alert>

                        <div className="main-content-container container-fluid px-4">

                            <Modal  toggle={this.closeModal} open={this.state.modalOpen}>
                                <div style={{maxHeight: '90vh', overflow: 'scroll'}}>

                                    { this.state.currentListing }
                                    <hr hidden={this.state.noteBlock} />

                                    <div hidden={this.state.noteBlock} style={{maxWidth: '80%', marginLeft: 20, marginBottom: 20}}>

                                        <p>
                                            {(this.state.note && `🗣 ${this.state.note}`) || "🤔 Want to say something to the owner of this item .. ?"}
                                        </p>
                                        <FormTextarea onChange={this.handleChange} />
                                    </div>
                                    <ModalFooter>
                                        <div className="float-left">
                                            <Button hidden={this.state.sendingRequest} onClick={this.closeModal} block theme="danger">Close</Button>
                                        </div>
                                        <div className="row formInput">
                                            <Button hidden={!this.state.noteBlock || this.state.sendingRequest} onClick={this.getItem} block theme="success">Get &#128640;
                                            </Button>
                                            <Button hidden={this.state.noteBlock} onClick={this.createRequest} block theme="success">Send &#128171;
                                            </Button>
                                            <Button hidden={!this.state.sendingRequest}  block theme="success">
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </Button>
                                        </div>
                                    </ModalFooter>
                                    </div>
                            </Modal>

                            <Modal  toggle={this.closeModalProfile} open={this.state.profileModalOpen}>
                                <div style={{maxHeight: '90vh', overflow: 'scroll'}}>
                                    { this.state.currentProfile }
                                </div>
                            </Modal>
                            <div className="page-header row no-gutters py-4">
                                <div className="col-10 col-sm-4 text-center text-sm-left mb-0">
                                    <span className="text-uppercase page-subtitle">Services/Materials/Experiences</span>
                                    <h3 className="page-title">Browse Services</h3>
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
                            <div id="services" className="row">

                                {this.state.listings}

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
                    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
                    integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
                    crossOrigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
                    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
                    crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
            <script src="https://unpkg.com/shards-ui@latest/dist/js/shards.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Sharrre/2.0.1/jquery.sharrre.min.js"></script>
            <script src="../static/js/extras.1.1.0.min.js"></script>
            <script src="../static/js/shards-dashboards.1.1.0.min.js"></script>
            </body>

            </html>
        );
    }
}
export default ServiceList
