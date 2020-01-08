import React from 'react'
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput,
    DatePicker,
    Button,
    ButtonGroup,
    Tooltip,
    Alert, ModalBody, FormGroup, ModalFooter
} from "shards-react";
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Tus from '@uppy/tus'
import XHRUpload from '@uppy/xhr-upload';
import {Modal, ModalHeader} from "shards-react";
import IndividualListing from "../components/individualListing";

class AddListing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {datesVisible: false, startDate: new Date(), endDate: new Date(), setImages: null, uppy: null, setLocation: false,
        modalLocationOpen: false, currentLocation: null, selectedLocation: null, finalLocation: null, setMainImage: null, uppy2: null, totalAmount: null,
        typeOfListing: 'service', postTitle: '', postDescription: '', profileImg: '', loading: false, uploadSuccess: false, uploadFailed: false, stripeModal: false,
        stripeSuccess: false};

        this.goDashboard = this.goDashboard.bind(this);
        this.toggleDates = this.toggleDates.bind(this);
        this.removeDates = this.removeDates.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);

        this.goServiceListings = this.goServiceListings.bind(this);
        this.goProfile = this.goProfile.bind(this);
        this.goNewListing = this.goNewListing.bind(this);
        this.openImageModal = this.openImageModal.bind(this);
        this.openLocationModal = this.openLocationModal.bind(this);
        this.closeLocationModal = this.closeLocationModal.bind(this);
        this.selectLocation = this.selectLocation.bind(this);
        this.openMainImageModal = this.openMainImageModal.bind(this);
        this.uploadService = this.uploadService.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.goMessages = this.goMessages.bind(this);
    }

    goMessages(event) {
        document.location.href = '/messages';
    }

    closeAlert() {
        this.setState({uploadSuccess: false, uploadFailed: false});
    }



    async uploadService() {
        this.setState({loading: true});
        console.log(this.state);
        const userID = await localStorage.getItem('userID');
        const description =  document.getElementsByClassName("ql-editor")[0].innerText;
        fetch('https://watermelonapi.herokuapp.com/add-service',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID, title: this.state.postTitle, description, type: this.state.typeOfListing,
                    total: this.state.totalAmount, continuous: this.state.datesVisible, startDate: this.state.startDate,
                    endDate: this.state.endDate, mainImage: this.state.setMainImage, otherImages: this.state.setImages,
                    finalLocation: this.state.finalLocation
                })
            }).then(async (res) => {
            const data = await res.json();
            if (data.success === 'false') {
                this.setState({uploadFailed: true, loading: false});
            } else {
                this.setState({uploadSuccess: true, loading: false});
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            this.setState({uploadFailed: true, loading: false});
        });
    }

    changeInput(event) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({[target]: value});
    }

    async componentDidMount() {
        const userID = await localStorage.getItem('userID');
        const img = await localStorage.getItem('image');
        this.setState({profileImg: img });
        if (window.location.href.indexOf("scope") > -1) {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            fetch('https://watermelonapi.herokuapp.com/stripe/setup-success',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code,
                        userID
                    })
                }).then(async (res) => {
                    const data = await res.json();
                    console.log(data);
                    if (data.success === "true") {
                        this.setState({stripeModal: false, stripeSuccess: true });
                    }
            });


        }
        fetch('https://watermelonapi.herokuapp.com/get-stripe',
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
                const data = await res.json();
                console.log(data);
                if (data.no_stripe === "true") {
                    this.setState({stripeModal: true})
                }
            });
        this.state.uppy = Uppy();
        const headersSend = {'Access-Control-Allow-Origin': '*'};
        console.log(headersSend);
        this.state.uppy.use(Dashboard, {
            trigger: '#select-files',
            showProgressDetails: true,
            proudlyDisplayPoweredByUppy: false,
            showLinkToFileUploadResult: false,
        })
            .use(XHRUpload, { endpoint: 'https://watermelonapi.herokuapp.com/add-service/image' })
            .on('complete', (result) => {
                // MULTIPLE IMAGES HERE
                console.log(result);
                const imageArray = [];
                for (let file of  result.successful) {
                    console.log(file);
                    imageArray.push(file.response.body.image)
                }
                console.log(imageArray);
                this.setState({setImages: imageArray});
                console.log(this.state.setImages);
                this.state.uppy.getPlugin('Dashboard').closeModal();
            });

        this.state.uppy2 = Uppy({
            restrictions: {
                maxNumberOfFiles: 1,
                minNumberOfFiles: 1,
            }});
        this.state.uppy2.use(Dashboard, {
            id: 'dash2',
            trigger: '#select-files',
            showProgressDetails: true,
            proudlyDisplayPoweredByUppy: false,
            showLinkToFileUploadResult: false,
        })
            .use(XHRUpload, { endpoint: 'https://watermelonapi.herokuapp.com/add-service/image' })
            .on('complete', (result) => {
                this.setState({setMainImage: result.successful[0].response.body.image});
                console.log(this.state.setMainImage);
                this.state.uppy2.getPlugin('dash2').closeModal();
            });
    }

    openMainImageModal() {
        const dashboard2 = this.state.uppy2.getPlugin('dash2');
        dashboard2.openModal();
    }

    openImageModal() {
        const dashboard = this.state.uppy.getPlugin('Dashboard');
        dashboard.openModal();
    }

    selectLocation(e) {
        const selected = this.state.selectedLocation;
        const current = this.state.currentLocation;
        if (e.target.id === 'selected') {
            this.setState({finalLocation: selected, modalLocationOpen: false});
        } else {
            this.setState({finalLocation: current, modalLocationOpen: false});
        }
        console.log(this.state.finalLocation);
    }

    openLocationModal() {
        this.setState({modalLocationOpen: true});
        setTimeout(() => {
            mapboxgl.accessToken = 'pk.eyJ1IjoicGFibG9hcmVsbGFubyIsImEiOiJjanhjN2JzZ20wMGdlNDFxeDFlcjRpb3IwIn0.T9fCWehIFtPt64Izknxn7g';
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v9',
                attributionControl: false
            });
            map.resize();
            const geoloc = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            });

            map.addControl(geoloc);
            geoloc.on('geolocate', (e) => {
                this.setState({currentLocation: [e.coords.longitude, e.coords.latitude]})
            });
            map.on('click', (e) => {
                this.setState({selectedLocation: [e.lngLat.lng, e.lngLat.lat]});
                map.loadImage('https://img.icons8.com/ios/50/000000/t.png', (error, image) => {
                    if (error) throw error;
                    if (map.getSource('points')) {
                        map.removeLayer('points');
                        map.removeSource('points');
                        map.removeImage('cat');
                    }
                    map.addImage('cat', image);
                    map.addLayer({
                        "id": "points",
                        "type": "symbol",
                        "source": {
                            "type": "geojson",
                            "data": {
                                "type": "FeatureCollection",
                                "features": [{
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [e.lngLat.lng, e.lngLat.lat]
                                    }
                                }]
                            }
                        },
                        "layout": {
                            "icon-image": "cat",
                            "icon-size": 0.4
                        }
                    });
                });
            });
        }, 300);
    }

    closeLocationModal() {
        this.setState({modalLocationOpen: false});
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

    toggleDates(event) {
        event.target.outline = false;
        this.setState({datesVisible: true});
    }


    removeDates(event) {
        this.setState({datesVisible: false});
    }

    handleDateChange(val) {
        this.setState({
            startDate: new Date(val),
            endDate: new Date(val)
        });
    }

    handleEndDateChange(val) {
        this.setState({
            endDate: new Date(val)
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
                <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                      rel="stylesheet" />
                <link rel="stylesheet"
                      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                      crossOrigin="anonymous" />
                <link rel="stylesheet" id="main-stylesheet" data-version="1.1.0"
                      href="../static/css/shards-dashboards.1.1.0.min.css" />
                <link href="https://transloadit.edgly.net/releases/uppy/v1.4.0/uppy.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="../static/css/extras.1.1.0.min.css" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.snow.css" />
                <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.2/mapbox-gl.js' />
                <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.2/mapbox-gl.css' rel='stylesheet' />
                <link rel="stylesheet" href="../static/css/addListing.css" />


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
                        <form action="#"
                              className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">

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
                                    <a className="nav-link " href="#" onClick={this.goMessages}>
                                        <i className="material-icons" >message</i>
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
                                            <img className="user-avatar rounded-circle mr-2" src={this.state.profileImg}
                                                  />
                                            <span className="d-none d-md-inline-block">Pablo Arellano</span>
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
                        <Alert theme="success" dismissible={this.closeAlert} open={this.state.stripeSuccess}>
                            <i className="far fa-check-circle"></i>   Great! your Stripe information has been added!
                        </Alert>
                        <Alert theme="success" dismissible={this.closeAlert} open={this.state.uploadSuccess}>
                            <i className="far fa-check-circle"></i>  Great! your listing has been posted!
                        </Alert>
                        <Alert theme="danger" dismissible={this.closeAlert} open={this.state.uploadFailed}>
                            <i className="fas fa-exclamation-triangle"></i>  There seems to be something wrong with your data, <strong>try again!</strong>  &rarr;
                        </Alert>
                        <div className="main-content-container container-fluid px-4">

                            <Modal open={this.state.stripeModal} >
                                <ModalHeader>
                                    Stripe not activated &#9995;
                                </ModalHeader>
                                <ModalBody>
                                    You need to activate Stripe Payments before posting an offering (so we can give you your money when people pay you!)
                                    <br />
                                    <br />
                                    You can do so in <a href='https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GV88KEAourGxuzf6rqeKUmogybcc0p8Q&scope=read_write'> this link &#128204; </a>
                                </ModalBody>
                            </Modal>



                            <Modal toggle={this.closeLocationModal} open={this.state.modalLocationOpen} >
                                <ModalHeader>
                                    Location
                                </ModalHeader>
                                <ModalBody style={{height: 400, padding: 0}}>
                                    <div id='map' style={{height: '100%'}}></div>
                                </ModalBody>
                                <ModalFooter>
                                    <div className="row formInput">
                                        <Button onClick={this.selectLocation} disabled={!this.state.currentLocation} block theme="primary">Set My Location</Button>
                                    </div>
                                    <div className="row formInput">
                                        <Button onClick={this.selectLocation} id="selected" disabled={!this.state.selectedLocation} block theme="success">Set Selected Location</Button>
                                    </div>
                                </ModalFooter>
                            </Modal>
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
                                                <input onChange={this.changeInput} id='postTitle' className="form-control form-control-lg mb-3" type="text"
                                                       placeholder="Your Post Title" />
                                                <div id="editor-container" className="add-new-post__editor mb-1"></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-12">

                                    <div className='card card-small mb-3'>
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">Requirements</h6>
                                        </div>
                                        <div className='card-body p-0'>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item px-3 pb-2">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <select id='typeOfListing' onChange={this.changeInput} defaultValue="Type" className="custom-select custom-select-md">
                                                                <option value="service">Service</option>
                                                                <option value="item">Item</option>
                                                                <option value="experience">Experience</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: 10}} className="row">
                                                        <div className="col-12">
                                                    <InputGroup className="mb-2">
                                                        <FormInput onChange={this.changeInput} id='totalAmount' placeholder="Total Amount" />
                                                        <InputGroupAddon type="append">
                                                            <InputGroupText>€</InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: 10}} className="row">
                                                        <div className="col-12 text-center">
                                                            <ButtonGroup>
                                                                <Button id="TooltipExample" onClick={this.removeDates} outline={this.state.datesVisible} theme='primary'>Continuous</Button>
                                                                <Button onClick={this.toggleDates} outline={!this.state.datesVisible} theme='primary'>Select Dates</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                    </div>
                                                    <div hidden={!this.state.datesVisible} style={{marginTop: 10}} className="row">
                                                        <div className="col-6 text-center">
                                                            <small className="text-muted"> Start Date </small>
                                                            <DatePicker
                                                                selected={this.state.startDate}
                                                                onChange={this.handleDateChange}
                                                                size="sm"
                                                                dropdownMode="select"
                                                            />
                                                        </div>
                                                        <div className="col-6 text-center">
                                                            <small className="text-muted"> End Date </small>
                                                            <DatePicker
                                                                selected={this.state.endDate}
                                                                onChange={this.handleEndDateChange}
                                                                size="sm"
                                                                dropdownMode="select"
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>


                                    <div className='card card-small mb-3'>
                                        <div className="card-header border-bottom">
                                            <h6 className="m-0">Status</h6>
                                        </div>
                                        <div className='card-body p-0'>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item p-3">
                        <span className="d-flex mb-2">
                          <i className="material-icons mr-1">flag</i>
                          <strong className="mr-1">Status:</strong> Draft
                        </span>

                                                    <span className="d-flex mb-2">
                          <i className="material-icons mr-1">image</i>
                          <strong className="mr-1">Main Image:</strong>
                          <strong hidden={!this.state.setMainImage} className="text-success">Uploaded</strong>
                               <strong hidden={this.state.setMainImage} className="text-danger">Not Set</strong>
                          <a onClick={this.openMainImageModal} hidden={this.state.setMainImage} className="ml-auto" href="#">Add</a>
                          <a onClick={this.openMainImageModal} hidden={!this.state.setMainImage} className="ml-auto" href="#">Edit</a>
                        </span>

                                                    <span className="d-flex mb-2">
                          <i className="material-icons mr-1">image</i>
                          <strong className="mr-1">Other Images:</strong>
                          <strong hidden={!this.state.setImages} className="text-success">Uploaded</strong>
                               <strong hidden={this.state.setImages} className="text-warning">Not Set</strong>
                          <a onClick={this.openImageModal} hidden={this.state.setImages} className="ml-auto" href="#">Add</a>
                          <a onClick={this.openImageModal} hidden={!this.state.setImages} className="ml-auto" href="#">Edit</a>
                        </span>
                                                    <span className="d-flex mb-2">
                          <i className="material-icons mr-1">calendar_today</i>
                          <strong className="mr-1">Schedule:</strong>
                               <strong hidden={this.state.datesVisible} >Continuous</strong>
                               <strong hidden={!this.state.datesVisible}>Dated</strong>
                        </span>
                                                    <span className="d-flex">
                          <i className="material-icons mr-1">my_location</i>
                          <strong className="mr-1">Location:</strong>
                               <strong hidden={!this.state.finalLocation} className="text-success">Uploaded</strong>
                               <strong hidden={this.state.finalLocation} className="text-danger">Not Set</strong>
                          <a onClick={this.openLocationModal} hidden={this.state.finalLocation} className="ml-auto" href="#">Add</a>
                          <a onClick={this.openLocationModal} hidden={!this.state.finalLocation} className="ml-auto" href="#">Edit</a>
                                                </span>
                                                </li>
                                                <li className="list-group-item d-flex px-3">
                                                    <button className="btn btn-sm btn-outline-accent">
                                                        <i className="material-icons">save</i> Save Draft
                                                    </button>
                                                    <button hidden={this.state.loading} disabled={!this.state.finalLocation || !this.state.setMainImage || !this.state.totalAmount || !this.state.postTitle} onClick={this.uploadService} className="btn btn-sm btn-accent ml-auto">
                                                        <i className="material-icons">file_copy</i> Publish
                                                    </button>
                                                    <button hidden={!this.state.loading} className="btn btn-primary" type="button" disabled>
                                                                <span className="spinner-border spinner-border-sm"
                                                                      role="status" aria-hidden="true"></span>
                                                        <span className="sr-only">Updating...</span>
                                                    </button>
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
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Sharrre/2.0.1/jquery.sharrre.min.js" defer></script>
            <script src="../static/js/extras.1.1.0.min.js" defer></script>
            <script src="https://transloadit.edgly.net/releases/uppy/v1.4.0/uppy.min.js"></script>

            <script src="../static/js/shards-dashboards.1.1.0.min.js" defer></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.min.js" defer></script>
            <script src="../static/js/app/app-blog-new-post.1.1.0.js" defer></script>
            <script src="../static/js/testFile.js" defer></script>
            </body>
            </html>
        );

    }
}
export default AddListing
