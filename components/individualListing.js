import React from 'react'
import FullListing from '../components/fullListing'
import {Modal, ModalHeader} from "shards-react";

class IndividualListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pillStyleInd: null};
        this.getService = this.getService.bind(this);
    }

    getService() {
        console.log(String(this.props.listing.main_image));
    }

    render() {
        const type = this.props.listing.type;
        if (type === 'service') {
            this.state.pillStyleInd = "card-post__category badge badge-pill badge-info float-right"
        } else if (type === 'experience') {
            this.state.pillStyleInd = "card-post__category badge badge-pill badge-light float-right"
        } else if (type === 'item') {
            this.state.pillStyleInd = "card-post__category badge badge-pill badge-warning float-right"
        }
        return (
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div className="card card-small card-post card-post--1">
                    <div className="card-post__image" style={{ backgroundImage: `url(${this.props.listing.main_image})`}}>
                        <a href="#" className={this.state.pillStyleInd}>{ this.props.listing.type }</a>
                        <div className="card-post__author d-flex">
                            <a href="#" style={{ backgroundImage: `url(${this.props.listing.owner.image})`}} className="card-post__author-avatar card-post__author-avatar--small">Offered by: { this.props.listing.owner.name }</a>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            <a className="text-fiord-blue" href="#">{ this.props.listing.title }</a>
                        </h5>
                        <p className="card-text d-inline-block mb-3">{ this.props.listing.description}</p>
                    </div>
                    <div className="card-footer border-top d-flex">
                        <div className="float-left">
                            <a onClick={this.props.clickHandlerProfile} className="btn btn-sm btn-white" href="#">
                                <i className="far fa-user mr-1"></i> { this.props.listing.owner.name } </a>
                        </div>
                        <div className="my-auto ml-auto">
                            <a onClick={this.props.clickHandler} className="btn btn-sm btn-success" href="#">
                                 See More <i className="fas fa-arrow-right mr-1"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default IndividualListing
