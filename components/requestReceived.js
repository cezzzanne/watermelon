import React from 'react'
import FullListing from '../components/fullListing'
import {Modal, ModalHeader, ModalBody} from "shards-react";

class RequestReceived extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.request;
    }

    getStatus(acc_buyer, acc_seller, rej_buyer, rej_seller, payed) {
        if (payed) {
            return 'Sold' ;
        } else if (rej_buyer) {
            return 'Canceled by buyer';
        } else if (rej_seller) {
            return 'Rejected by you';
        } else if (acc_seller) {
            return 'Waiting for Response';
        } else {
            return 'Need to Answer';
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.request);
    }



    render() {
        return (
            <div className="blog-comments__item d-flex p-3">
                <div className="blog-comments__avatar mr-3">
                    <img src={this.state.buyer.image} alt="User avatar"/></div>
                <div className="blog-comments__content">
                    <div className="blog-comments__meta text-muted">
                        <a className="text-secondary" href="#">From {this.state.buyer.name } {this.state.buyer.last_name } </a> on
                        <a className="text-secondary" href="#"> {this.state.service.title }</a>
                        <span className="text-muted">– ${ this.state.service.price } </span>
                    </div>
                    <p className="m-0 my-1 mb-2 text-muted">{ this.state.note } </p>
                    <div className="blog-comments__actions">
                        <div className="btn-group btn-group-sm">
                            <button type="button" className="btn btn-white">
                              <span className="text-success">
                              </span> Status: { this.getStatus(this.state.accepted_buyer, this.state.accepted_seller, this.state.rejected_buyer, this.state.rejected_seller, this.state.payed)}
                            </button>
                            <button hidden={this.state.accepted_seller || this.state.rejected_seller || this.state.rejected_buyer} onClick={this.props.approveRequest} type="button" className="btn btn-white">
                              <span className="text-success">
                                <i className="material-icons">check</i>
                              </span> Approve
                            </button>
                            <button hidden={this.state.accepted_seller || this.state.rejected_seller || this.state.rejected_buyer} onClick={this.props.rejectRequest} type="button" className="btn btn-white">
                              <span className="text-danger">
                                <i className="material-icons">clear</i>
                              </span> Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default RequestReceived
