import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Alert } from "shards-react";
import { FormInput, FormGroup, Button, Modal, ModalBody, ModalHeader, ModalFooter  } from "shards-react";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', modalOpen: false, firstName: '', lastName: '', email: '', password: '', showAlert: false, validInputs: false,
        loginModal: false, login_username: '', login_password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.loginModal = this.loginModal.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
    }

    submitLogin() {
        fetch('https://watermelonapi.herokuapp.com/login',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.state.login_username, password: this.state.login_password
                })
            }).then(async (res) => {
            const data = await res.json();
            if (data.success === 'false') {
                this.setState({showAlert: true});
            } else {
                await localStorage.setItem('userID', data.userID);
                document.location.href = '/serviceList';
            }
        }).catch((error) => {
            this.setState({showAlert: true});
            console.log(JSON.stringify(error));
        });
    }

    onBlur() {
        console.log('left');
    }

    handleChange(event) {
        // console.log(event.target);
        // event.target.classList.add('is-valid');
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({[target]: value});
        switch (target) {
            case 'password':
                if (value.length <= 7) {
                    // referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
                    // Where referenceNode is the node you want to put newNode after
                    element.classList.add('is-invalid');
                    if (element.nextSibling === null) {
                        const err = document.createElement('div');
                        err.innerHTML = '<small>Must be at least 8 characters long</small>';
                        element.parentNode.insertBefore(err, element.nextSibling);
                    }
                    this.setState({validInputs: false});
                } else {
                    element.classList.remove('is-invalid');
                    element.classList.add('is-valid');
                    if (element.nextSibling !== null) {
                        element.nextSibling.remove();
                    }
                    this.setState({validInputs: true});
                }
                break;
            case 'username':
                if (value.length <= 4) {
                    // referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
                    // Where referenceNode is the node you want to put newNode after
                    element.classList.add('is-invalid');
                    if (element.nextSibling === null) {
                        const err = document.createElement('div');
                        err.innerHTML = '<small>Must be at least 5 characters long </small>';
                        element.parentNode.insertBefore(err, element.nextSibling);
                    }
                    this.setState({validInputs: false});

                } else {
                    element.classList.remove('is-invalid');
                    element.classList.add('is-valid');
                    if (element.nextSibling !== null) {
                        element.nextSibling.remove();
                    }
                    this.setState({validInputs: true});
                }
                break;
            case 'email':
                if (!value.includes('@')) {
                    // referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
                    // Where referenceNode is the node you want to put newNode after
                    element.classList.add('is-invalid');
                    if (element.nextSibling === null) {
                        const err = document.createElement('div');
                        err.innerHTML = '<small>Must be an email </small>';
                        element.parentNode.insertBefore(err, element.nextSibling);
                    }
                    this.setState({validInputs: false});

                } else {
                    element.classList.remove('is-invalid');
                    element.classList.add('is-valid');
                    if (element.nextSibling !== null) {
                        element.nextSibling.remove();
                    }
                    this.setState({validInputs: true});
                }
                break;
            default:
                break;
        }
    }

    showModal() {
        this.setState({modalOpen: true});
    }

    handleChangeLogin(event) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({[target]: value});
    }

    loginModal() {
        this.setState({loginModal: true});
    }

    closeModal() {
        this.setState({modalOpen: false, loginModal: false});
    }

    submitRegister() {
        // TODO: Handle authentication with backend
        if (!this.state.validInputs) {
            this.setState({showAlert: true});
        } else {
            fetch('https://watermelonapi.herokuapp.com/register',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: this.state.username, firstName: this.state.firstName, lastName: this.state.lastName,
                        email: this.state.email, password: this.state.password
                    })
                }).then(async (res) => {
                const data = await res.json();
                if (data.success === 'false') {
                    this.setState({showAlert: true});
                } else {
                    await localStorage.setItem('userID', data.userID);
                    document.location.href = '/profile';
                }
            }).catch((error) => {
                this.setState({showAlert: true});
                console.log(JSON.stringify(error));
            });
        }
    }

    closeAlert() {
        this.setState({showAlert: false});
    }

    render() {
        return (
            <html data-wf-page="5d64641099c8ff63fad51eab" data-wf-site="5d64641099c8ff8c27d51ea6">
            <head>
                <meta charSet="utf-8"/>
                <title>twise</title>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
                <meta content="Webflow" name="generator"/>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                      crossOrigin="anonymous"/>
                <link href="../static/css/shards.min.css" rel="stylesheet" type="text/css"/>

                <link href="../static/css/normalize.css" rel="stylesheet" type="text/css"/>
                <link href="../static/css/webflow.css" rel="stylesheet" type="text/css"/>
                <link href="../static/css/watermelon-325cb2.webflow.css" rel="stylesheet" type="text/css"/>
                <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
                        type="text/javascript"></script>

            </head>
            <body className="body">

            <div data-collapse="medium" data-animation="default" data-duration="400" className="navbar w-nav">
                <div className="nav-wrapper">
                    <h1 className="heading-24">watermelon</h1>
                    <nav role="navigation" className="nav-menu w-nav-menu"><a href="#" className="navlink w-nav-link">About
                        Us</a><a href="#" className="navlink w-nav-link">How it Works</a>
                        <a onClick={this.showModal} href="#" className="navlink w-nav-link">Register</a>
                        <a onClick={this.loginModal} href="#" className="navlink w-nav-link">Login</a>
                    </nav>
                    <div className="menu-button w-nav-button">
                        <div onClick={this.showModal} className="w-icon-nav-menu">
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-section">

                <div className="hero-wrapper">
                    <Modal className="modalRegister" toggle={this.closeModal} open={this.state.modalOpen} >
                        <Alert theme="warning" dismissible={this.closeAlert} open={this.state.showAlert}>
                            There seems to be something wrong with your data, <strong>try again!</strong>  &rarr;
                        </Alert>
                        <ModalHeader closeAriaLabel="X">
                            Register

                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <div className="row formInput">
                                    <div className="col-6">
                                        <label htmlFor="username">First Name</label>
                                        <FormInput required onChange={this.handleChange} value={this.state.firstName} id="firstName"/>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="username">Last Name</label>
                                        <FormInput required onChange={this.handleChange} value={this.state.lastName} id="lastName"/>
                                    </div>
                                </div>
                                <div className="row formInput">
                                     <div className="col-12">
                                <label htmlFor="username">Username</label>
                                <FormInput onBlur={this.onBlur}  min-length="3" required onChange={this.handleChange} value={this.state.username} id="username"/>
                                     </div>
                                </div>
                                <div className="row formInput">
                                    <div className="col-12">
                                        <label htmlFor="username">Email</label>
                                        <FormInput type="email" required onChange={this.handleChange} value={this.state.email} id="email"/>
                                    </div>
                                </div>
                                <div className="row formInput">
                                    <div className="col-12">
                                        <label htmlFor="username">Password</label>
                                        <FormInput type="password" required onChange={this.handleChange} value={this.state.password} id="password"/>
                                    </div>

                                </div>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <div className="row formInput">
                                <Button onClick={this.closeModal} block theme="danger">Close</Button>
                            </div>
                            <div className="row formInput">
                                <Button onClick={this.submitRegister} block theme="success">Register!</Button>
                            </div>
                        </ModalFooter>
                    </Modal>

                    <Modal className="modalLogin" toggle={this.closeModal} open={this.state.loginModal} >
                        <Alert theme="warning" dismissible={this.closeAlert} open={this.state.showAlert}>
                            There seems to be something wrong with your data, <strong>try again!</strong>  &rarr;
                        </Alert>
                        <ModalHeader closeAriaLabel="X">
                            Login
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <div className="row formInput">
                                    <div className="col-12">
                                        <label htmlFor="username">Username</label>
                                        <FormInput onBlur={this.onBlur}  min-length="3" required onChange={this.handleChangeLogin} value={this.state.login_username} id="login_username"/>
                                    </div>
                                </div>
                                <div className="row formInput">
                                    <div className="col-12">
                                        <label htmlFor="username">Password</label>
                                        <FormInput type="password" required onChange={this.handleChangeLogin} value={this.state.login_password} id="login_password"/>
                                    </div>
                                </div>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <div className="row formInput">
                                <Button onClick={this.closeModal} block theme="danger">Close</Button>
                            </div>
                            <div className="row formInput">
                                <Button onClick={this.submitLogin} block theme="success">Login!</Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                    <h1 className="hero-heading">Find your passion in the world.</h1>
                    <p className="hero-para">Unique experiences and services around you. <br/>No money? No Problem. Get
                        15 coins when signing up.</p>
                    <div className="w-form">
                        <form id="email-form-3" name="email-form-3" data-name="Email Form 3"><input type="text"
                                                                                                    className="text-field-long-2 w-input"
                                                                                                    autoFocus={true}
                                                                                                    maxLength="256"
                                                                                                    name="email-2"
                                                                                                    data-name="Email 2"
                                                                                                    placeholder="I.e, Coding Classes"
                                                                                                    id="email-2"
                                                                                                    required=""/></form>
                        <div className="w-form-done">
                            <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div className="w-form-fail">
                            <div>Oops! Something went wrong while submitting the form.</div>
                        </div>
                    </div>
                    <div><a href="#" className="button-grey w-button">Financial Help</a><a href="#"
                                                                                           className="button-grey w-button">Party
                        Planning</a><a href="#" className="button-grey w-button">Gym Classes</a><a href="#"
                                                                                                   className="button-grey w-button">Guitar
                        Lessons</a></div>
                    <a href="#" className="button w-button">Find an experience</a></div>
            </div>
            <div className="move-up-wrapper">
                <div className="experience-image-section">
                    <div className="experience-image-wrapper"><img src="../static/images/experiences-min.png"
                                                                   srcSet="../static/images/experiences-min-p-500.png 500w, ../static/images/experiences-min-p-800.png 800w, ../static/images/experiences-min-p-1080.png 1080w, ../static/images/experiences-min-p-1600.png 1600w, ../static/images/experiences-min.png 4200w"
                                                                   sizes="(max-width: 479px) 100vw, (max-width: 4666px) 90vw, 4200px"
                                                                   alt="" className="image-2"/></div>
                </div>
                <div className="section">
                    <h1 className="main-headings"><strong className="bold-text">Some of the popular activities on the
                        platform.</strong></h1>
                    <div className="columns w-row">
                        <div className="w-col w-col-4">
                            <div className="quote-card-2">
                                <div className="news-item-image back3">
                                    <div className="card-cta-tag card-cta-tag-small card-cta-colour2"><a href="#"
                                                                                                         className="card-cta-text card-cta-text-sml">Services</a>
                                    </div>
                                </div>
                                <div className="div-block-37">
                                    <h1 className="heading-23">Dog Training </h1>
                                    <p className="para-mid">Walk your dog around the park for 2 hours on Weekdays.</p>
                                    <div className="div-block-33"><img src="../static/images/tom-img_1tom-img.jpg"
                                                                       width="45" alt="" className="image-3"/>
                                        <div className="div-block-34">
                                            <div className="text-block-9">Thomas Bekkers</div>
                                            <div className="text-name-under">Teacher</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="div-block-35"></div>
                            </div>
                        </div>
                        <div className="w-col w-col-4">
                            <div className="quote-card-2">
                                <div className="news-item-image back1">
                                    <div className="card-cta-tag card-cta-tag-small card-cta-colour2"><a href="#"
                                                                                                         className="card-cta-text card-cta-text-sml">Items</a>
                                    </div>
                                </div>
                                <div className="div-block-37">
                                    <h1 className="heading-23">Car for a Weekend</h1>
                                    <p className="para-mid">My family is going out for the weekend. We will rent our car
                                        for the weekend for 35 coins.</p>
                                    <div className="div-block-33"><img src="../static/images/car2.jpg" width="45" alt=""
                                                                       className="image-3"/>
                                        <div className="div-block-34">
                                            <div className="text-block-9">Pablo Xaru</div>
                                            <div className="text-name-under">Cook</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="div-block-35"></div>
                            </div>
                        </div>
                        <div className="w-col w-col-4">
                            <div className="quote-card-2">
                                <div className="news-item-image back2">
                                    <div className="card-cta-tag card-cta-tag-small card-cta-colour2"><a href="#"
                                                                                                         className="card-cta-text card-cta-text-sml">Experiences</a>
                                    </div>
                                </div>
                                <div className="div-block-37">
                                    <h1 className="heading-23">Tour around Portofino in boat</h1>
                                    <p className="para-mid">Taking out my boat around this weekend. Saturday 3pm. Fits
                                        4. 10 coins per person.</p>
                                    <div className="div-block-33"><img src="../static/images/tom-img_1tom-img.jpg"
                                                                       width="45" alt="" className="image-3"/>
                                        <div className="div-block-34">
                                            <div className="text-block-9">Eddie Vedder</div>
                                            <div className="text-name-under">Financial Analyst</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="div-block-35"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="video-section">
                    <div className="video-wrapper">
                        <div className="w-layout-grid video-grid">
                            <div id="w-node-de997b90b439-fad51eab" className="video-content-block">
                                <h1 className="main-headings"><strong>Find experiences around you</strong></h1>
                                <p className="main-text">Hosts are chefs, hikers, or just knowledgeable locals who want
                                    to show others little-known pockets of their community. They can host an experience
                                    or multiple ones over the course of a few days.<br/></p>
                            </div>
                            <img src="../static/images/undraw_experts3_3njd-1.svg" alt=""/></div>
                    </div>
                </div>
                <div className="number-section">
                    <div className="number-wrapper">
                        <div className="w-layout-grid number-grid">
                            <div id="w-node-cd28e4ecce54-fad51eab" className="number-block">
                                <h1 className="red-number">86k</h1>
                                <p className="number-text">experiences</p>
                            </div>
                            <div id="w-node-184232471d03-fad51eab" className="number-block">
                                <h1 className="red-number">156</h1>
                                <p className="number-text">cities available</p>
                            </div>
                            <div id="w-node-b4d0f45b11e9-fad51eab" className="number-block">
                                <h1 className="red-number">12C</h1>
                                <p className="number-text">average price</p>
                            </div>
                            <div id="w-node-28431d5b82d0-fad51eab" className="number-block">
                                <h1 className="red-number">22k</h1>
                                <p className="number-text">pictures taken</p>
                            </div>
                            <div id="w-node-a9ec50c418b4-fad51eab" className="number-block">
                                <h1 className="red-number">975</h1>
                                <p className="number-text">5-star ratings</p>
                            </div>
                            <div id="w-node-0a394c0f5114-fad51eab" className="number-block">
                                <h1 className="red-number">850</h1>
                                <p className="number-text">videos created</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feature-section">
                    <div className="feature-wrapper">
                        <div className="w-layout-grid feature-grid">
                            <div id="w-node-3cc37d11f01e-fad51eab" className="feature-image-block">
                                <div className="feature-random-block">
                                    <div className="div-block-2"></div>
                                    <img src="../static/images/girl-min.png"
                                         srcSet="../static/images/girl-min-p-500.png 500w, ../static/images/girl-min-p-800.png 800w, ../static/images/girl-min-p-1080.png 1080w, ../static/images/girl-min.png 2436w"
                                         sizes="100vw" alt="" className="feature-image image-style"/><img
                                    src="../static/images/-min.png"
                                    srcSet="../static/images/-min-p-500.png 500w, ../static/images/-min.png 1266w"
                                    sizes="(max-width: 991px) 100vw, 60px" alt="" className="plus-image"/>
                                    <p className="feature-title">Meet Angela: See the new things she's done for her and
                                        others. </p>
                                </div>
                            </div>
                            <div id="w-node-286dbaef29d9-fad51eab" className="solo-features">
                                <div className="solo-feature solo-feature-1">
                                    <h1 className="solo-feat">Gain extra money</h1>
                                    <p className="paragraph">Millions of people can find what you offer and connect
                                        within an instant.</p>
                                </div>
                                <div className="solo-feature solo-feature-2">
                                    <h1 className="solo-feat">Promote your brand</h1>
                                    <p className="paragraph">Have a shareable profile with photos, videos, and
                                        reviews.</p>
                                </div>
                                <div className="solo-feature solo-feature-3">
                                    <h1 className="solo-feat">Meet locals like you</h1>
                                    <p className="paragraph">Join a global community of hosts. Connect through
                                        meetups &amp; events.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-section">
                    <div className="search-wrapper">
                        <h1 className="main-headings">Ready add value to your community?</h1>
                        <p className="search-para">Start by something peculiar you can offer. We’ll guide you through
                            each step. What can you do? What don't you use? You have a lot to offer.</p>
                        <div className="search-form w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" className="form"><select
                                id="field" name="field" className="select-field w-select">
                                <option value="first">Select a city</option>
                                <option value="">California</option>
                                <option value="First">Texas</option>
                                <option value="">New York</option>
                                <option value="">Florida</option>
                            </select><input type="submit" value="Create an experience" data-wait="Please wait..."
                                            className="submit-button w-button"/></form>
                            <div className="w-form-done">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-section">
                    <div className="footer-wrapper">
                        <div className="footer-line"></div>
                        <div className="footer-plugs">
                            <h1 className="heading-25">Watermelon</h1>
                            <div className="terms-and-stuff"><a href="#" className="bottom-link">Terms</a><a href="#"
                                                                                                             className="bottom-link">Privacy</a><a
                                href="#" className="bottom-link">Site Map</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js" type="text/javascript"
                    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossOrigin="anonymous"></script>
            <script src="../static/js/webflow.js" type="text/javascript"></script>
            </body>
            </html>
        );
    }
}

export default NameForm
