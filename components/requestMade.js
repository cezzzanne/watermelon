import React from 'react'
import FullListing from '../components/fullListing'
import {Modal, ModalHeader, ModalBody} from "shards-react";

class RequestMade extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.request;
        this.getStatus = this.getStatus.bind(this);
    }

    componentDidMount() {
        console.log(this.state.id);
    }

    getStatus(accepted_seller, accepted_buyer, rej_seller, rej_buyer) {
        if (rej_buyer) {
            return 'Rejected by You' ;
        } else if (accepted_seller && accepted_buyer) {
            return 'Accepted';
        } else if (rej_seller) {
            return 'Rejected Request'
        } else {
            return 'In Progress'
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.request);
    }

    render() {
        return (
            <div className="blog-comments__item d-flex p-3">
                <div className="blog-comments__avatar mr-3">
                    <img src={this.state.seller.image} alt="User avatar"/></div>
                <div className="blog-comments__content">
                    <div className="blog-comments__meta text-muted">
                        <a className="text-secondary" href="#">To { this.state.seller.name} { this.state.seller.last_name } </a> on
                        <a className="text-secondary" href="#"> { this.state.service.title }</a>
                        <span className="text-muted">– $ {this.state.service.price }</span>
                    </div>
                    <p className="m-0 my-1 mb-2 text-muted"> { this.state.note } </p>
                    <div className="blog-comments__actions">
                        <div className="btn-group btn-group-sm">
                            <button type="button" className="btn btn-white">
                              <span className="text-success">
                              </span> Status: { this.getStatus(this.state.accepted_seller, this.state.accepted_buyer, this.state.rejected_seller, this.state.rejected_buyer)}
                            </button>
                            <button onClick={this.props.acceptRequest} hidden={!this.state.accepted_seller || this.state.rejected_seller || this.state.payed || this.state.rejected_buyer} type="button" className="btn btn-white">
                              <span className="text-success">
                              </span> Confirm &#127881;
                            </button>
                            <button hidden={this.state.rejected_buyer || this.state.rejected_seller || this.state.payed} onClick={this.props.cancelRequest} type="button" className="btn btn-white">
                              <span className="text-danger">
                                <i className="material-icons">clear</i>
                              </span> Cancel
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default RequestMade
