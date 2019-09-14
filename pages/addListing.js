import React from 'react'

class AddListing extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {currentDisplay: <DashboardOverview/>, goDashboardTab: 'nav-link active', serviceListingsTab: 'nav-link', profileTab: 'nav-link', newListingTab: 'nav-link'};
        this.goDashboard = this.goDashboard.bind(this);
        this.goServiceListings = this.goServiceListings.bind(this);
        this.goProfile = this.goProfile.bind(this);
        this.goNewListing = this.goNewListing.bind(this);
        // // this.setScripts = this.setScripts.bind(this);
    }

    goDashboard(event) {
        document.location.href = '/userdashboard';
    }

    goServiceListings(event) {
        document.location.href = '/servicelist';

    }

    goProfile(event) {
        document.location.href = '/profile';

    }

    goNewListing(event) {

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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.snow.css" />

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
                                    <a className='nav-link active' href="#"  onClick={this.goNewListing}>
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
                                    <span className="text-uppercase page-subtitle">Services</span>
                                    <h3 className="page-title">Add New Service</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-9 col-md-12">
                                    <div className="card card-small mb-3">
                                        <div className="card-body">
                                            <form className="add-new-post">
                                                <input className="form-control form-control-lg mb-3" type="text"
                                                       placeholder="Your Post Title" />
                                                <div id="editor-container" className="add-new-post__editor mb-1"></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-12">
                                    <div className='card card-small mb-3'>
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">Actions</h6>
                                        </div>
                                        <div className='card-body p-0'>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item p-3">
                        <span className="d-flex mb-2">
                          <i className="material-icons mr-1">flag</i>
                          <strong className="mr-1">Status:</strong> Draft
                          <a className="ml-auto" href="#">Edit</a>
                        </span>
                                                    <span className="d-flex mb-2">
                          <i className="material-icons mr-1">visibility</i>
                          <strong className="mr-1">Visibility:</strong>
                          <strong className="text-success">Public</strong>
                          <a className="ml-auto" href="#">Edit</a>
                        </span>
                                                    <span className="d-flex mb-2">
                          <i className="material-icons mr-1">calendar_today</i>
                          <strong className="mr-1">Schedule:</strong> Now
                          <a className="ml-auto" href="#">Edit</a>
                        </span>
                                                    <span className="d-flex">
                          <i className="material-icons mr-1">score</i>
                          <strong className="mr-1">Readability:</strong>
                          <strong className="text-warning">Ok</strong>
                        </span>
                                                </li>
                                                <li className="list-group-item d-flex px-3">
                                                    <button className="btn btn-sm btn-outline-accent">
                                                        <i className="material-icons">save</i> Save Draft
                                                    </button>
                                                    <button className="btn btn-sm btn-accent ml-auto">
                                                        <i className="material-icons">file_copy</i> Publish
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='card card-small mb-3'>
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">Categories</h6>
                                        </div>
                                        <div className='card-body p-0'>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item px-3 pb-2">
                                                    <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox" className="custom-control-input" id="category1"
                                                               checked />
                                                        <label className="custom-control-label"
                                                               htmlFor="category1">For Fun</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox" className="custom-control-input" id="category2"
                                                               checked />
                                                        <label className="custom-control-label"
                                                               htmlFor="category2">Exercise</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox" className="custom-control-input" id="category3" />
                                                        <label className="custom-control-label"
                                                               htmlFor="category3">Travel</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox" className="custom-control-input" id="category4" />
                                                        <label className="custom-control-label"
                                                               htmlFor="category4">New To The City</label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox" className="custom-control-input" id="category5" />
                                                        <label className="custom-control-label"
                                                               htmlFor="category5">To Loan</label>
                                                    </div>
                                                </li>
                                                <li className="list-group-item d-flex px-3">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="New category"
                                                               aria-label="Add new category" aria-describedby="basic-addon2" />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-white px-2" type="button">
                                                                <i className="material-icons">add</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
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
                    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous" defer></script>
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
            <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.min.js" defer></script>
            <script src="../static/js/app/app-blog-new-post.1.1.0.js" defer></script>
            </body>
            </html>
        );
    }
}
export default AddListing
