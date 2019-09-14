import React from 'react'
import FullListing from '../components/fullListing'
import {Modal, ModalHeader} from "shards-react";

class ServiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentListing: null, modalOpen: false};

        this.goDashboard = this.goDashboard.bind(this);
        this.goProfile = this.goProfile.bind(this);
        this.goNewListing = this.goNewListing.bind(this);
        this.openListing = this.openListing.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    goDashboard(event) {
        document.location.href = '/userdashboard';
    }

    closeModal(event) {
        this.setState({currentListing: null, modalOpen: false});
    }

    goProfile(event) {
        document.location.href = '/profile';

    }

    goNewListing(event) {
        document.location.href = '/addlisting';

    }

    openListing(event) {
        this.setState({currentListing: <FullListing header='This header'/>, modalOpen: true});
    }

    render() {
        return (
            <html className="no-js h-100" lang="en">
            <head>
                <meta charSet="utf-8" />
                        <title>watermelon</title>
                        <meta name="description"
                              content="A high-quality &amp; free Bootstrap admin dashboard template pack that comes with lots of templates and components." />
                            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                                <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
                                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                                          rel="stylesheet" />
                                        <link rel="stylesheet"
                                              href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                                              integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                                              crossOrigin="anonymous" />
                                            <link rel="stylesheet" id="main-stylesheet" data-version="1.1.0"
                                                  href="../static/css/shards-dashboards.1.1.0.min.css" />
                                                <link rel="stylesheet" href="../static/css/extras.1.1.0.min.css" />
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
                                        <span className="d-none d-md-inline ml-1">watermelon</span>
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
                                    <a className='nav-link' href="#" onClick={this.goDashboard}>
                                        <i className="material-icons">edit</i>
                                        <span>Dashboard</span>
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
                                    <a className="nav-link " href="#">
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
                                                <span className="badge badge-pill badge-danger">2</span>
                                            </div>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-small"
                                             aria-labelledby="dropdownMenuLink">
                                            <a className="dropdown-item" href="#">
                                                <div className="notification__icon-wrapper">
                                                    <div className="notification__icon">
                                                        <i className="material-icons">&#xE6E1;</i>
                                                    </div>
                                                </div>
                                                <div className="notification__content">
                                                    <span className="notification__category">Your Services</span>
                                                    <p>4 people have messaged you about your new item!

                                                        <span className="text-success text-semibold"> 28%</span> in the
                                                        last week. Great job!</p>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                <div className="notification__icon-wrapper">
                                                    <div className="notification__icon">
                                                        <i className="material-icons">&#xE8D1;</i>
                                                    </div>
                                                </div>
                                                <div className="notification__content">
                                                    <span className="notification__category">Services</span>
                                                    <p>Last week your revenue descreased by
                                                        <span className="text-danger text-semibold"> 5.52%</span>. It
                                                        could have been worse!</p>
                                                </div>
                                            </a>
                                            <a className="dropdown-item notification__all text-center" href="#"> View
                                                all Notifications </a>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-nowrap px-3" data-toggle="dropdown"
                                           href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                            <img className="user-avatar rounded-circle mr-2" src="../static/images/avatars/1.jpg"
                                                 alt="User Avatar" />
                                                <span className="d-none d-md-inline-block">Pablo Arellano</span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-small">
                                            <a className="dropdown-item" href="#">
                                                <i className="material-icons">&#xE7FD;</i> Profile</a>
                                            <a className="dropdown-item" href="#">
                                                <i className="material-icons">vertical_split</i>Your Listings</a>
                                            <a className="dropdown-item" href="#">
                                                <i className="material-icons">note_add</i>Add Listing</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item text-danger" href="#">
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

                        <div className="main-content-container container-fluid px-4">
                            <Modal toggle={this.closeModal} open={this.state.modalOpen}>
                            { this.state.currentListing }
                            </Modal>
                            <div className="page-header row no-gutters py-4">
                                <div className="col-10 col-sm-4 text-center text-sm-left mb-0">
                                    <span className="text-uppercase page-subtitle">Services/Materials/Experiences</span>
                                    <h3 className="page-title">Browse Services</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small card-post card-post--1">
                                        <div className="card-post__image" style={{ backgroundImage: 'url(../static/images/serviceListings/7.jpeg)'}}>
                                            <a href="#" className="card-post__category badge badge-pill badge-success">Service</a>
                                            <div className="card-post__author d-flex">
                                                <a href="#" style={{ backgroundImage: 'url(../static/images/avatars/0.jpg)'}} className="card-post__author-avatar card-post__author-avatar--small">Written by Anna Kunis</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" href="#">Storage space for travellers with bags.</a>
                                            </h5>
                                            <p className="card-text d-inline-block mb-3">Don't carry your bags all around the city! Leave them with us for only $5 dollars
                                                a day!</p>

                                        </div>
                                        <div className="card-footer border-top d-flex">
                                            <div className="my-auto ml-auto">
                                                <a onClick={this.openListing} className="btn btn-sm btn-white" href="#">
                                                    <i className="far fa-bookmark mr-1"></i> See More </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small card-post card-post--1">
                                        <div className="card-post__image" style={{ backgroundImage: 'url(../static/images/serviceListings/13.jpeg)'}}>
                                            <a href="#" className="card-post__category badge badge-pill badge-info">Experience</a>
                                            <div className="card-post__author d-flex">
                                                <a href="#" style={{ backgroundImage: 'url(../static/images/avatars/2.jpg)'}} className="card-post__author-avatar card-post__author-avatar--small">Written by Anna Kunis</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" href="#">Financial Rundown and Planning</a>
                                            </h5>
                                            <p className="card-text d-inline-block mb-3">Start saving up for what you need, stop spending where you dont.
                                                I can offer you a financial rundown of your expenses for you for only 15 euros.</p>

                                        </div>
                                        <div className="card-footer border-top d-flex">
                                            <div className="my-auto ml-auto">
                                                <a className="btn btn-sm btn-white" href="#">
                                                    <i className="far fa-bookmark mr-1"></i> See More </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small card-post card-post--1">
                                        <div className="card-post__image" style={{ backgroundImage: 'url(../static/images/serviceListings/6.jpeg)'}}>
                                            <a href="#" className="card-post__category badge badge-pill badge-primary">Item</a>
                                            <div className="card-post__author d-flex">
                                                <a href="#" style={{ backgroundImage: 'url(../static/images/avatars/3.jpg)'}} className="card-post__author-avatar card-post__author-avatar--small">Written by Anna Kunis</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" href="#">Condo in Barcelona</a>
                                            </h5>
                                            <p className="card-text d-inline-block mb-3">Around Barcelona and looking where to stay?
                                                Rent out our condo for only 20 euros!</p>
                                        </div>
                                        <div className="card-footer border-top d-flex">
                                            <div className="my-auto ml-auto">
                                                <a className="btn btn-sm btn-white" href="#">
                                                    <i className="far fa-bookmark mr-1"></i> See More </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small card-post card-post--1">
                                        <div className="card-post__image" style={{ backgroundImage: 'url(../static/images/serviceListings/3.jpeg)'}}>
                                            <a href="#" className="card-post__category badge badge-pill badge-info">Experience</a>
                                            <div className="card-post__author d-flex">
                                                <a href="#" style={{ backgroundImage: 'url(../static/images/avatars/1.jpg)'}} className="card-post__author-avatar card-post__author-avatar--small">Written by Anna Kunis</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" href="#">Tour around Giza and Egypt</a>
                                            </h5>
                                            <p className="card-text d-inline-block mb-3">If you're in Giza and looking for a tour guide
                                                to take you to the best places for only 10 euros the whole day plus meals.</p>
                                        </div>
                                        <div className="card-footer border-top d-flex">
                                            <div className="my-auto ml-auto">
                                                <a className="btn btn-sm btn-white" href="#">
                                                    <i className="far fa-bookmark mr-1"></i> See More </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small card-post card-post--1">
                                        <div className="card-post__image" style={{ backgroundImage: 'url(../static/images/serviceListings/7.jpeg)'}}>
                                            <a href="#" className="card-post__category badge badge-pill badge-success">Service</a>
                                            <div className="card-post__author d-flex">
                                                <a href="#" style={{ backgroundImage: 'url(../static/images/avatars/0.jpg)'}} className="card-post__author-avatar card-post__author-avatar--small">Written by Anna Kunis</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" href="#">Storage space for travellers with bags.</a>
                                            </h5>
                                            <p className="card-text d-inline-block mb-3">Don't carry your bags all around the city! Leave them with us for only $5 dollars
                                                a day!</p>

                                        </div>
                                        <div className="card-footer border-top d-flex">
                                            <div className="my-auto ml-auto">
                                                <a className="btn btn-sm btn-white" href="#">
                                                    <i className="far fa-bookmark mr-1"></i> See More </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small card-post card-post--1">
                                        <div className="card-post__image" style={{ backgroundImage: 'url(../static/images/serviceListings/13.jpeg)'}}>
                                            <a href="#" className="card-post__category badge badge-pill badge-info">Experience</a>
                                            <div className="card-post__author d-flex">
                                                <a href="#" style={{ backgroundImage: 'url(../static/images/avatars/2.jpg)'}} className="card-post__author-avatar card-post__author-avatar--small">Written by Anna Kunis</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" href="#">Financial Rundown and Planning</a>
                                            </h5>
                                            <p className="card-text d-inline-block mb-3">Start saving up for what you need, stop spending where you dont.
                                                I can offer you a financial rundown of your expenses for you for only 15 euros.</p>

                                        </div>
                                        <div className="card-footer border-top d-flex">
                                            <div className="my-auto ml-auto">
                                                <a className="btn btn-sm btn-white" href="#">
                                                    <i className="far fa-bookmark mr-1"></i> See More </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small card-post card-post--1">
                                        <div className="card-post__image" style={{ backgroundImage: 'url(../static/images/serviceListings/6.jpeg)'}}>
                                            <a href="#" className="card-post__category badge badge-pill badge-primary">Item</a>
                                            <div className="card-post__author d-flex">
                                                <a href="#" style={{ backgroundImage: 'url(../static/images/avatars/3.jpg)'}} className="card-post__author-avatar card-post__author-avatar--small">Written by Anna Kunis</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" href="#">Condo in Barcelona</a>
                                            </h5>
                                            <p className="card-text d-inline-block mb-3">Around Barcelona and looking where to stay?
                                                Rent out our condo for only 20 euros!</p>
                                        </div>
                                        <div className="card-footer border-top d-flex">
                                            <div className="my-auto ml-auto">
                                                <a className="btn btn-sm btn-white" href="#">
                                                    <i className="far fa-bookmark mr-1"></i> See More </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small card-post card-post--1">
                                        <div className="card-post__image" style={{ backgroundImage: 'url(../static/images/serviceListings/3.jpeg)'}}>
                                            <a href="#" className="card-post__category badge badge-pill badge-info">Experience</a>
                                            <div className="card-post__author d-flex">
                                                <a href="#" style={{ backgroundImage: 'url(../static/images/avatars/1.jpg)'}} className="card-post__author-avatar card-post__author-avatar--small">Written by Anna Kunis</a>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <a className="text-fiord-blue" href="#">Tour around Giza and Egypt</a>
                                            </h5>
                                            <p className="card-text d-inline-block mb-3">If you're in Giza and looking for a tour guide
                                                to take you to the best places for only 10 euros the whole day plus meals.</p>
                                        </div>
                                        <div className="card-footer border-top d-flex">
                                            <div className="my-auto ml-auto">
                                                <a className="btn btn-sm btn-white" href="#">
                                                    <i className="far fa-bookmark mr-1"></i> See More </a>
                                            </div>
                                        </div>
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
              <a href="#" rel="nofollow"> watermelon</a>
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
