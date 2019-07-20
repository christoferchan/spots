export const getSearchResults = businesses => ({
  type: "GET_SEARCH_RESULTS",
  businesses
});

export const startSearch = term => {
  return (dispatch, getState) => {
    const { user } = getState();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(
      proxyurl +
        `https://api.yelp.com/v3/businesses/search?sort_by=distance&radius=800&term=${term}&limit=10&longitude=${
          user.location.longitude
        }&latitude=${user.location.latitude}`,
      {
        credentials: "same-origin",
        headers: {
          Authorization: process.env.REACT_APP_YELP_API_KEY
        }
      }
    )
      .then(res => res.text())
      .then(con => dispatch(getSearchResults(JSON.parse(con))))
      .catch(err => console.log(err));
  };
};
