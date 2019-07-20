import React from "react";
import { connect } from "react-redux";
import { startAddStudyArea } from "../store/actions/studyAreas";

const SearchItem = props => {
  const addStudyArea = location => {
    props.addStudyArea(location);
  };
  return (
    <div key={props.info.id} className="search_item_container">
      <div>
        <div />
        <h3 className="search_item_title">{props.info.name}</h3>
        <p className="search_item_description">
          {props.info.location.display_address[0]}
        </p>
        <p className="search_item_description">
          {props.info.location.display_address[1]}
        </p>
      </div>
      <div className="btn-search_container">
        <button
          className="marker-btn"
          onClick={e => {
            e.preventDefault();
            addStudyArea({
              longitude: props.info.coordinates.longitude,
              latitude: props.info.coordinates.latitude,
              title: props.info.name,
              address:
                props.info.location.display_address[0] +
                " " +
                props.info.location.display_address[1]
            });
          }}
        >
          <img src="plus.png" alt="Add Button" />
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addStudyArea: location => dispatch(startAddStudyArea(location))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchItem);
