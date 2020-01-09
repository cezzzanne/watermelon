import React from 'react'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Tus from '@uppy/tus'
import XHRUpload from '@uppy/xhr-upload';
import {Alert} from "shards-react";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', lastName: '', profession: '', alterEgo: '', description: '', location: '', profileImg: '', email: '', uppy: null, userID: '',
        loading: false, uploadSuccess: false, uploadFailed: false};
        this.goDashboard = this.goDashboard.bind(this);
        this.goServiceListings = this.goServiceListings.bind(this);
        this.goProfile = this.goProfile.bind(this);
        this.goNewListing = this.goNewListing.bind(this);
        this.submitProfile = this.submitProfile.bind(this);
        this.handleChangeProfile = this.handleChangeProfile.bind(this);
        this.openImageModal = this.openImageModal.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.goMessages = this.goMessages.bind(this);
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

    }

    goNewListing(event) {
        document.location.href = '/addListing';

    }

    goMessages(event) {
        document.location.href = '/messages';
    }


    async submitProfile(e) {
        e.preventDefault();
        console.log(this.state);
        this.setState({loading: true});
        fetch('https://watermelonapi.herokuapp.com/change-profile',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: this.state.name, lastName: this.state.lastName, profession: this.state.profession,
                    alterEgo: this.state.alterEgo, description: this.state.description, location: this.state.location,
                    profileImg: this.state.profileImg, email: this.state.email, userID: this.state.userID})
            }).then(async (res) => {
                const data = await res.json();
                console.log(data);
                if (data.success) {
                    this.setState({loading: false, uploadSuccess: true});
                } else {
                    this.setState({loading: false, uploadFailed: true});
                }
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }


    async componentDidMount() {
        console.log('didmount');
        const userID = await localStorage.getItem('userID');
        this.setState({userID: userID});
        fetch('https://watermelonapi.herokuapp.com/get-profile',
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
            const user = data.user;
            console.log(data);
            this.setState({name: user.name, lastName: user.last_name, location: user.location, profileImg: user.image, description: user.description, email: user.email, profession: user.profession,
            alterEgo: user.alter_ego})
        });
        this.state.uppy = Uppy({
            restrictions: {
                maxNumberOfFiles: 1,
                minNumberOfFiles: 1,
            }});
        this.state.uppy.use(Dashboard, {
            id: 'dash2',
            trigger: '#select-files',
            showProgressDetails: true,
            proudlyDisplayPoweredByUppy: false,
            showLinkToFileUploadResult: false,
        })
            .use(XHRUpload, { endpoint: 'https://watermelonapi.herokuapp.com/add-service/image' })
            .on('complete', (result) => {
                this.setState({profileImg: result.successful[0].response.body.image});
                console.log(this.state.profileImg);
                this.state.uppy.getPlugin('dash2').closeModal();
            });
        console.log('mounting')
    }

    openImageModal() {
        const dashboard = this.state.uppy.getPlugin('dash2');
        dashboard.openModal();
    }

    handleChangeProfile(event) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({[target]: value});
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
                                    <a className="nav-link " href="#" onClick={this.goMessages}>
                                        <i className="material-icons" >message</i>
                                        <span>Inbox</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className='nav-link active' href="#"  onClick={this.goProfile}>
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
                                            <a className="dropdown-item" href="#">
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
                        <Alert theme="success" dismissible={this.closeAlert} open={this.state.uploadSuccess}>
                            <i className="far fa-check-circle"></i>   Great! your profile has been updated!
                        </Alert>
                        <Alert theme="danger" dismissible={this.closeAlert} open={this.state.uploadFailed}>
                            <i className="fas fa-exclamation-triangle"></i>   There seems to be something wrong with your data, <strong>try again!</strong>  &rarr;
                        </Alert>

                        <div className="main-content-container container-fluid px-4">
                            <div className="page-header row no-gutters py-4">
                                <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                                    <span className="text-uppercase page-subtitle">Overview</span>
                                    <h3 className="page-title">User Profile</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card card-small mb-4 pt-3">
                                        <div className="card-header border-bottom text-center">
                                            <div className="mb-3 mx-auto">
                                                <img className="rounded-circle" src={this.state.profileImg} width="110" /></div>
                                            <h4 className="mb-0">{ this.state.name} {this.state.lastName}</h4>
                                            <span className="text-muted d-block mb-2">{ this.state.profession} / { this.state.alterEgo}</span>
                                            <button type="button" className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2">
                                                <i className="material-icons mr-1">gps_fixed</i>{ this.state.location}
                                            </button>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-4">
                                                <div className="progress-wrapper">
                                                    <strong className="text-muted d-block mb-2">Email</strong>
                                                    <p>{ this.state.email }</p>
                                                </div>
                                            </li>
                                            <li className="list-group-item p-4">
                                                <strong className="text-muted d-block mb-2">A bit about you:</strong>
                                                <span>{ this.state.description}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="card card-small mb-4">
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">Account Details</h6>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item p-3">
                                                <div className="row">
                                                    <div className="col">
                                                        <form>
                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label htmlFor="name">First Name</label>
                                                                    <input onChange={this.handleChangeProfile} type="text" className="form-control" id="name"
                                                                           placeholder="First Name" /></div>
                                                                <div className="form-group col-md-6">
                                                                    <label htmlFor="lastName">Last Name</label>
                                                                    <input onChange={this.handleChangeProfile} type="text" className="form-control" id="lastName"
                                                                           placeholder="Last Name" /></div>
                                                            </div>
                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label htmlFor="profession">Profession</label>
                                                                    <input onChange={this.handleChangeProfile} type="text" className="form-control" id="profession"
                                                                           placeholder="What do you do for a living?" /></div>
                                                                <div className="form-group col-md-6">
                                                                    <label htmlFor="alterEgo">Alter Ego</label>
                                                                    <input onChange={this.handleChangeProfile} type="text" className="form-control" id="alterEgo"
                                                                           placeholder="What do you do when you are you?" /></div>
                                                            </div>
                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label htmlFor="location">Location</label>
                                                                    <input onChange={this.handleChangeProfile} type="text" className="form-control" id="location"
                                                                           placeholder="Where do you reside?" /></div>
                                                                <div className="form-group col-md-6">
                                                                    <label htmlFor="profileImg">Profile Image</label><br />
                                                                    <a id="profileImg" href="#" onClick={this.openImageModal} >Change Image </a></div>
                                                            </div>

                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <label htmlFor="email">Email</label>
                                                                    <input onChange={this.handleChangeProfile} type="email" className="form-control" id="email"
                                                                           placeholder="Email"  /></div>
                                                                <div className="form-group col-md-6">
                                                                    <label htmlFor="password">Password</label>
                                                                    <input type="password" className="form-control" id="password"
                                                                           placeholder="Password" /></div>
                                                            </div>


                                                            <div className="form-row">
                                                                <div className="form-group col-md-12">
                                                                    <label htmlFor="description">Description</label>
                                                                    <textarea onChange={this.handleChangeProfile} className="form-control" id="description"
                                                                              rows="5" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                                              Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus
                                                                              illum assumenda eligendi cumque?"></textarea>
                                                                </div>
                                                            </div>
                                                            <button disabled={this.state.loading} onClick={this.submitProfile} className="btn btn-accent">
                                                                <span hidden={!this.state.loading} className="spinner-border spinner-border-sm"
                                                                      role="status" aria-hidden="true"></span>
                                                                Update Account</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
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
export default Profile
