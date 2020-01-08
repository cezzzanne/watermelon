import React from 'react'
import { FormInput, FormGroup, Button, Modal, ModalBody, ModalHeader, ModalFooter  } from "shards-react";
import { ListGroup, ListGroupItem } from "shards-react";

class FullListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {otherImages: null, fullIndicator: null, pillStyle: null, dates: null}
    }

    componentDidMount() {
        const lat = JSON.parse(this.props.listing.location)[0];
        const lng = JSON.parse(this.props.listing.location)[1];
        mapboxgl.accessToken = 'pk.eyJ1IjoicGFibG9hcmVsbGFubyIsImEiOiJjanhjN2JzZ20wMGdlNDFxeDFlcjRpb3IwIn0.T9fCWehIFtPt64Izknxn7g';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            attributionControl: false,
            center: [lat, lng],
            zoom: 10,
        });
        new mapboxgl.Marker()
            .setLngLat([lat, lng])
            .addTo(map);
    }


    render() {
        console.log(this.props.listing.type);
        const firstImg = this.props.listing.other_images[0];
        this.state.otherImages = this.props.listing.other_images.map((image) => {
            if (image === firstImg) {
                return <div className="carousel-item active">
                        <img style={{ maxHeight: 300}} className="d-block w-100" src={image} alt="First slide"/>

                    </div>
            } else {
                return <div className="carousel-item">
                    <img style={{ maxHeight: 300}} className="d-block w-100" src={image} alt="First slide"/>
                </div>
            }
        });
        this.state.fullIndicator = this.props.listing.other_images.map((image, index) => {
           if (index === 0) {
               return <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
           } else {
               return  <li data-target="#carouselExampleIndicators" data-slide-to={index} />
           }
        });
        const type = this.props.listing.type;
        if (type === 'service') {
            this.state.pillStyle = "card-post__category badge badge-pill badge-info float-right"
        } else if (type === 'experience') {
            this.state.pillStyle = "card-post__category badge badge-pill badge-light float-right"
        } else if (type === 'item') {
            this.state.pillStyle = "card-post__category badge badge-pill badge-warning float-right"
        }
        console.log(this.props.listing.continuous);
        if (this.props.listing.continuous) {
            this.state.dates = <p>All the time!</p>;
        } else {
            // noinspection JSAnnotator
            function formattedDate(d) {
                let month = String(d.getMonth() + 1);
                let day = String(d.getDate());
                const year = String(d.getFullYear());

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return `${day}/${month}/${year}`;
            }
            let startDate = formattedDate(new Date(this.props.listing.start_date));
            let endDate = formattedDate(new Date(this.props.listing.end_date));
            this.state.dates = <p>Available from {startDate} to {endDate} .</p>
        }
        return (
          <div>
              <img src={this.props.listing.main_image} style={{minWidth: '100%', maxHeight: 120, borderRadius: 4}} />
              <ModalBody>
                  <a href="#" className={this.state.pillStyle}>{ this.props.listing.type }</a>
                  <h3>{this.props.listing.title } </h3>
                  <p>By: { this.props.listing.owner.name } </p>
                  <h5>Details </h5>
                  <h6>What</h6>
                  <p style={{marginTop: 10}}>{this.props.listing.description }</p>
                    <hr />

                      <h6>When</h6>
                  <p style={{marginTop: 10}}>{this.state.dates }</p>
                  <hr />

                  <h6>Where</h6>
                  <div style={{height: 300, minWidth: '100%', borderRadius: 5, marginTop: 10}} id="map">

                  </div>
                  <hr />

                  <h6>More Images </h6>

                  <div style={{marginTop: 10}} id='otherImages'>
                      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                          <ol className="carousel-indicators">
                              { this.state.fullIndicator }

                          </ol>
                          <div className="carousel-inner">
                              { this.state.otherImages }
                          </div>
                          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                             data-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true" />
                              <span className="sr-only">Previous</span>
                          </a>
                          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                             data-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true" />
                              <span className="sr-only">Next</span>
                          </a>
                      </div>
                  </div>
              </ModalBody>
          </div>
        );
    }
}
export default FullListing
