import React from 'react'
import FullListing from '../components/fullListing'
import {Modal, ModalHeader, ModalBody} from "shards-react";

class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="card card-small mb-4 pt-3">
                <div className="card-header border-bottom text-center">
                    <div className="mb-3 mx-auto">
                        <img className="rounded-circle" src={ this.props.profile.image } width="110" /></div>
                    <h4 className="mb-0">{ this.props.profile.name} {this.props.profile.last_name}</h4>
                    <span className="text-muted d-block mb-2">{ this.props.profile.profession} / { this.props.profile.alter_ego}</span>
                    <button type="button" className="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2">
                        <i className="material-icons mr-1">gps_fixed</i>{ this.props.profile.location}
                    </button>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item p-4">
                        <strong className="text-muted d-block mb-2">A bit about { this.props.profile.name}:</strong>
                        <span>{ this.props.profile.description}</span>
                    </li>
                </ul>
            </div>
        );
    }
}
export default ProfileModal
