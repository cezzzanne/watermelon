import React from 'react'

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.goDashboard = this.goDashboard.bind(this);
        this.goServiceListings = this.goServiceListings.bind(this);
        this.goProfile = this.goProfile.bind(this);
        this.goNewListing = this.goNewListing.bind(this);
    }

    goDashboard(event) {

    }

    goServiceListings(event) {
        console.log('aatemp');
        document.location.href = '/servicelist';

    }

    goProfile(event) {
        console.log('aatemp');

        document.location.href = '/profile';

    }

    goNewListing(event) {
        console.log('aatemp');

        document.location.href = '/addlisting';

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
                                    <a className='nav-link' href="#" onClick={this.goServiceListings}>
                                        <i className="material-icons">view_module</i>
                                        <span>Listings</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className='nav-link active' href="#" onClick={this.goDashboard}>
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
                                    <a className='nav-link' href="#"  onClick={this.goNewListing}>
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
                                    <a className='nav-link' href="#"  onClick={this.goProfile}>
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
                            <div className="page-header row no-gutters py-4">
                                <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                                    <span className="text-uppercase page-subtitle">Dashboard</span>
                                    <h3 className="page-title">Services</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg col-md-6 col-sm-6 mb-4">
                                    <div className="stats-small stats-small--1 card card-small">
                                        <div className="card-body p-0 d-flex">
                                            <div className="d-flex flex-column m-auto">
                                                <div className="stats-small__data text-center">
                                                    <span className="stats-small__label text-uppercase">Services</span>
                                                    <h6 className="stats-small__value count my-3">4</h6>
                                                </div>
                                                <div className="stats-small__data">
                                                    <span
                                                        className="stats-small__percentage stats-small__percentage--increase">4.7%</span>
                                                </div>
                                            </div>
                                            <canvas height="120" className="blog-overview-stats-small-1"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-md-6 col-sm-6 mb-4">
                                    <div className="stats-small stats-small--1 card card-small">
                                        <div className="card-body p-0 d-flex">
                                            <div className="d-flex flex-column m-auto">
                                                <div className="stats-small__data text-center">
                                                    <span className="stats-small__label text-uppercase">Views</span>
                                                    <h6 className="stats-small__value count my-3">182</h6>
                                                </div>
                                                <div className="stats-small__data">
                                                    <span
                                                        className="stats-small__percentage stats-small__percentage--increase">12.4%</span>
                                                </div>
                                            </div>
                                            <canvas height="120" className="blog-overview-stats-small-2"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-md-4 col-sm-6 mb-4">
                                    <div className="stats-small stats-small--1 card card-small">
                                        <div className="card-body p-0 d-flex">
                                            <div className="d-flex flex-column m-auto">
                                                <div className="stats-small__data text-center">
                                                    <span className="stats-small__label text-uppercase">Messages</span>
                                                    <h6 className="stats-small__value count my-3">54</h6>
                                                </div>
                                                <div className="stats-small__data">
                                                    <span
                                                        className="stats-small__percentage stats-small__percentage--decrease">3.8%</span>
                                                </div>
                                            </div>
                                            <canvas height="120" className="blog-overview-stats-small-3"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-md-4 col-sm-6 mb-4">
                                    <div className="stats-small stats-small--1 card card-small">
                                        <div className="card-body p-0 d-flex">
                                            <div className="d-flex flex-column m-auto">
                                                <div className="stats-small__data text-center">
                                                    <span className="stats-small__label text-uppercase">Transactions</span>
                                                    <h6 className="stats-small__value count my-3">43</h6>
                                                </div>
                                                <div className="stats-small__data">
                                                    <span
                                                        className="stats-small__percentage stats-small__percentage--increase">12.4%</span>
                                                </div>
                                            </div>
                                            <canvas height="120" className="blog-overview-stats-small-4"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-md-4 col-sm-12 mb-4">
                                    <div className="stats-small stats-small--1 card card-small">
                                        <div className="card-body p-0 d-flex">
                                            <div className="d-flex flex-column m-auto">
                                                <div className="stats-small__data text-center">
                                                    <span
                                                        className="stats-small__label text-uppercase">Likes</span>
                                                    <h6 className="stats-small__value count my-3">533</h6>
                                                </div>
                                                <div className="stats-small__data">
                                                    <span
                                                        className="stats-small__percentage stats-small__percentage--decrease">2.4%</span>
                                                </div>
                                            </div>
                                            <canvas height="120" className="blog-overview-stats-small-5"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8 col-md-12 col-sm-12 mb-4">
                                    <div className="card card-small">
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">Transaction History</h6>
                                        </div>
                                        <div className="card-body pt-0">
                                            <div className="row border-bottom py-2 bg-light">
                                                <div className="col-12 col-sm-6">
                                                    <div id="blog-overview-date-range"
                                                         className="input-daterange input-group input-group-sm my-auto ml-auto mr-auto ml-sm-auto mr-sm-0"
                                                         style={{maxWidth: 350}}>
                                                        <input type="text" className="input-sm form-control"
                                                               name="start" placeholder="Start Date"
                                                               id="blog-overview-date-range-1" />
                                                        <input type="text" className="input-sm form-control"
                                                               name="end" placeholder="End Date"
                                                               id="blog-overview-date-range-2" />
                                                        <span className="input-group-append">
                            <span className="input-group-text">
                              <i className="material-icons"></i>
                            </span>
                          </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6 d-flex mb-2 mb-sm-0">
                                                    <button type="button"
                                                            className="btn btn-sm btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0">View
                                                        Full Report &rarr;</button>
                                                </div>
                                            </div>
                                            <canvas height="130" style={{maxWidth: '100%'}} className="blog-overview-users"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small h-100">
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">People Interested</h6>
                                        </div>
                                        <div className="card-body d-flex py-0">
                                            <canvas height="220" className="blog-users-by-device m-auto"></canvas>
                                        </div>
                                        <div className="card-footer border-top">
                                            <div className="row">
                                                <div className="col">
                                                    <select className="custom-select custom-select-sm"
                                                            style={{maxWidth: 130}}>
                                                        <option defaultValue='Last Week'>Last Week</option>
                                                        <option value="1">Today</option>
                                                        <option value="2">Last Month</option>
                                                        <option value="3">Last Year</option>
                                                    </select>
                                                </div>
                                                <div className="col text-right view-report">
                                                    <a href="#">Full report &rarr;</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className="card card-small h-100">
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">New Draft</h6>
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <form className="quick-post-form">
                                                <div className="form-group">
                                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                                           aria-describedby="emailHelp" placeholder="Thinking of new service" />
                                                </div>
                                                <div className="form-group">
                                                    <textarea className="form-control"
                                                              placeholder="Adding my apartment"></textarea>
                                                </div>
                                                <div className="form-group mb-0">
                                                    <button type="submit" className="btn btn-accent">Create Draft
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12 col-sm-12 mb-4">
                                    <div className="card card-small blog-comments">
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">Messages</h6>
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="blog-comments__item d-flex p-3">
                                                <div className="blog-comments__avatar mr-3">
                                                    <img src="../static/images/avatars/1.jpg" alt="User avatar"/></div>
                                                <div className="blog-comments__content">
                                                    <div className="blog-comments__meta text-muted">
                                                        <a className="text-secondary" href="#">James Johnson</a> on
                                                        <a className="text-secondary" href="#"> House in Ibiza</a>
                                                        <span className="text-muted">– 3 days ago</span>
                                                    </div>
                                                    <p className="m-0 my-1 mb-2 text-muted">Well, the way they make
                                                        shows is, they make one show ...</p>
                                                    <div className="blog-comments__actions">
                                                        <div className="btn-group btn-group-sm">
                                                            <button type="button" className="btn btn-white">
                              <span className="text-success">
                                <i className="material-icons">check</i>
                              </span> Approve
                                                            </button>
                                                            <button type="button" className="btn btn-white">
                              <span className="text-danger">
                                <i className="material-icons">clear</i>
                              </span> Reject
                                                            </button>
                                                            <button type="button" className="btn btn-white">
                              <span className="text-light">
                                <i className="material-icons">more_vert</i>
                              </span> Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="blog-comments__item d-flex p-3">
                                                <div className="blog-comments__avatar mr-3">
                                                    <img src="../static/images/avatars/2.jpg" alt="User avatar"/></div>
                                                <div className="blog-comments__content">
                                                    <div className="blog-comments__meta text-muted">
                                                        <a className="text-secondary" href="#">James Johnson</a> on
                                                        <a className="text-secondary" href="#"> Guitar Lessons</a>
                                                        <span className="text-muted">– 4 days ago</span>
                                                    </div>
                                                    <p className="m-0 my-1 mb-2 text-muted">After the avalanche, it took
                                                        us a week to climb out. Now...</p>
                                                    <div className="blog-comments__actions">
                                                        <div className="btn-group btn-group-sm">
                                                            <button type="button" className="btn btn-white">
                              <span className="text-success">
                                <i className="material-icons">check</i>
                              </span> Approve
                                                            </button>
                                                            <button type="button" className="btn btn-white">
                              <span className="text-danger">
                                <i className="material-icons">clear</i>
                              </span> Reject
                                                            </button>
                                                            <button type="button" className="btn btn-white">
                              <span className="text-light">
                                <i className="material-icons">more_vert</i>
                              </span> Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="blog-comments__item d-flex p-3">
                                                <div className="blog-comments__avatar mr-3">
                                                    <img src="../static/images/avatars/3.jpg" alt="User avatar"/></div>
                                                <div className="blog-comments__content">
                                                    <div className="blog-comments__meta text-muted">
                                                        <a className="text-secondary" href="#">James Johnson</a> on
                                                        <a className="text-secondary" href="#"> Bag Services</a>
                                                        <span className="text-muted">– 5 days ago</span>
                                                    </div>
                                                    <p className="m-0 my-1 mb-2 text-muted">My money's in that office,
                                                        right? If she start giving me...</p>
                                                    <div className="blog-comments__actions">
                                                        <div className="btn-group btn-group-sm">
                                                            <button type="button" className="btn btn-white">
                              <span className="text-success">
                                <i className="material-icons">check</i>
                              </span> Approve
                                                            </button>
                                                            <button type="button" className="btn btn-white">
                              <span className="text-danger">
                                <i className="material-icons">clear</i>
                              </span> Reject
                                                            </button>
                                                            <button type="button" className="btn btn-white">
                              <span className="text-light">
                                <i className="material-icons">more_vert</i>
                              </span> Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer border-top">
                                            <div className="row">
                                                <div className="col text-center view-report">
                                                    <button type="submit" className="btn btn-white">View All Comments
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 mb-4">
                                    <div className="card card-small">
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">Top Services</h6>
                                        </div>
                                        <div className="card-body p-0">
                                            <ul className="list-group list-group-small list-group-flush">
                                                <li className="list-group-item d-flex px-3">
                                                    <span className="text-semibold text-fiord-blue">Bag Service</span>
                                                    <span
                                                        className="ml-auto text-right text-semibold text-reagent-gray">55</span>
                                                </li>
                                                <li className="list-group-item d-flex px-3">
                                                    <span
                                                        className="text-semibold text-fiord-blue">Ibiza House</span>
                                                    <span
                                                        className="ml-auto text-right text-semibold text-reagent-gray">32</span>
                                                </li>
                                                <li className="list-group-item d-flex px-3">
                                                    <span className="text-semibold text-fiord-blue">Guitar Lessons</span>
                                                    <span
                                                        className="ml-auto text-right text-semibold text-reagent-gray">25</span>
                                                </li>
                                                <li className="list-group-item d-flex px-3">
                                                    <span className="text-semibold text-fiord-blue">Financial Rundown</span>
                                                    <span
                                                        className="ml-auto text-right text-semibold text-reagent-gray">12</span>
                                                </li>

                                            </ul>
                                        </div>
                                        <div className="card-footer border-top">
                                            <div className="row">
                                                <div className="col">
                                                    <select className="custom-select custom-select-sm">
                                                        <option defaultValue='Last Week'>Last Week</option>
                                                        <option value="1">Today</option>
                                                        <option value="2">Last Month</option>
                                                        <option value="3">Last Year</option>
                                                    </select>
                                                </div>
                                                <div className="col text-right view-report">
                                                    <a href="#">Full report &rarr;</a>
                                                </div>
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
                    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                    crossOrigin="anonymous" defer></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
                    integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
                    crossOrigin="anonymous" defer></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
                    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
                    crossOrigin="anonymous" defer></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js" defer></script>
            <script src="https://unpkg.com/shards-ui@latest/dist/js/shards.min.js" defer></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Sharrre/2.0.1/jquery.sharrre.min.js" defer></script>
            <script src="../static/js/extras.1.1.0.min.js" defer></script>
            <script src="../static/js/shards-dashboards.1.1.0.min.js" defer></script>
            <script src="../static/js/app/app-blog-overview.1.1.0.js" defer></script>
            </body>
            </html>
        );
    }
}
export default UserDashboard
