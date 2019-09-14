import React from 'react'
import { FormInput, FormGroup, Button, Modal, ModalBody, ModalHeader, ModalFooter  } from "shards-react";

class FullListing extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
          <div>
                  <ModalHeader closeAriaLabel="X">
                      { this.props.header }
                  </ModalHeader>
          </div>
        );
    }
}
export default FullListing
