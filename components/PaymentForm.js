import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {Button} from "shards-react";
import RequestMade from "./requestMade";

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: false, complete: false, error: false};
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        this.setState({loading: true});
        const userID = await localStorage.getItem('userID');
        let token = await this.props.stripe.createToken({name: "Name"});
        console.log(token.token.id);
        const tokenID = token.token.id;
        const requestID = this.props.service.id;
        fetch('https://watermelonapi.herokuapp.com/buyer/approve',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID,
                    tokenID,
                    requestID
                })
            }).then(async (res) => {
            const data = await res.json();
            if (data.success === 'true') {
                this.setState({loading: false, complete: true});
            } else {
                this.setState({loading: false, error: true})
            }
        });
    }

    componentDidMount() {
        console.log(this.props.service);
    }

    render() {
        const createOptions = {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        fontFamily: 'Open Sans, sans-serif',
                        letterSpacing: '0.025em',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#c23d4b',
                    },
        };
        return (
            <div className="checkout">
                <div hidden={this.state.complete}>
                <p>Would you like to complete the purchase of <strong>{this.props.service.service.title}</strong> from
                <strong> {this.props.service.seller.name}</strong> for <strong> ${this.props.service.service.price}</strong>?</p>
                    <p hidden={!this.state.error} style={{color: 'red'}}><strong> There seems to be an error with your payment information. Try again!</strong> </p>
                <CardElement style={createOptions}  />
                <Button hidden={this.state.loading} style={{marginTop: 20}} theme="success" className="float-right" onClick={this.submit}>Purchase</Button>
                <Button hidden={!this.state.loading}  block theme="success">
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </Button>
                </div>
                <div hidden={!this.state.complete}>
                    <strong>Congratulations 🎉! Your purchase has been approved. You will be connected through your email addresses shortly to sort out the details!</strong>
                </div>
            </div>

        );
    }
}

export default injectStripe(CheckoutForm);