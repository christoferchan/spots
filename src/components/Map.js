import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import { connect } from "react-redux";
import { getLocation } from "../store/actions/user";

import firebase from "../firebase/firebase";
import { startGetSpots, startRemoveSpot } from "../store/actions/studyAreas";

const geolocateStyle = {
  float: "left",
  marginLeft: "16.5rem",
  marginTop: ".8rem",
  padding: "2px"
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        longitude: -73.98872,
        latitude: 40.74851,
        zoom: 15,
        width: "66vw",
        height: "100vh",
        transitionDuration: 1000
      },
      selectedSpot: null,
      searchResultLayer: null
    };
  }
  mapRef = React.createRef();

  listener = e => {
    if (e.key === "Escape") {
      this.setState({ selectedDeli: null });
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.listener);
    // window.addEventListener("resize", this.resize);
    // this.resize();
    navigator.geolocation.getCurrentPosition(position => {
      console.log("longitudedeee", position.coords.longitude);
      this.props.getLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      });
    });

    firebase
      .firestore()
      .collection("spots")
      .get()
      .then(spots => this.props.startGetSpots(spots))
      .catch(err => console.log(err));
  }

  componentWillMount() {
    window.removeEventListener("keydown", this.listener);
  }

  // resize = () => {
  //   this.handleViewportChange({
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   });
  // };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  handleOnResult = event => {
    const [longitude, latitude] = event.result.geometry.coordinates;
    this.props.getLocation({
      longitude,
      latitude
    });
  };

  render() {
    console.log(this.state.selectedSpot);
    return (
      <div className="Map">
        <ReactMapGL
          ref={this.mapRef}
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
          mapStyle="mapbox://styles/devchumbing/cjppxb0rp52p12rpe2um2es4r"
          onViewportChange={viewport => this.setState({ viewport })}
          maxZoom={15}
        >
          {this.props.locations &&
            this.props.locations.map(spot => (
              <Marker
                key={spot.id}
                latitude={spot.latitude}
                longitude={spot.longitude}
              >
                <button
                  className="marker-btn"
                  onClick={e => {
                    this.setState({ selectedSpot: spot });
                  }}
                >
                  <img src="book.png" alt="Book Icon" />
                </button>
              </Marker>
            ))}
          {this.state.selectedSpot && (
            <Popup
              latitude={this.state.selectedSpot.latitude}
              longitude={this.state.selectedSpot.longitude}
              onClose={() => this.setState({ selectedSpot: null })}
            >
              <div className="popup_details">
                <h3 className="search_item_title popup_title">
                  {this.state.selectedSpot.title}
                </h3>
                <p className="search_item_description popup_address">
                  {this.state.selectedSpot.address}
                </p>
                <div className="popup_btn_container">
                  <button
                    className="popup_btn"
                    onClick={() =>
                      this.props.startRemoveSpot(this.state.selectedSpot)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Popup>
          )}
          <div style={{ diplay: "flex" }}>
            <Geocoder
              mapRef={this.mapRef}
              onResult={this.handleOnResult}
              onViewportChange={this.handleViewportChange}
              mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
              position="top-left"
            />
            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
          </div>
        </ReactMapGL>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.studyAreas,
    user: state.user.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLocation: coords => dispatch(getLocation(coords)),
    startGetSpots: spots => dispatch(startGetSpots(spots)),
    startRemoveSpot: spot => dispatch(startRemoveSpot(spot))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
