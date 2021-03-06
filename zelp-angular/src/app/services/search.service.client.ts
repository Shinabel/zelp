const API_URL = "http://localhost:4000/api/";
// const API_URL = "https://cs4550-zelp-nodejs.herokuapp.com/api/";

export class SearchServiceClient {
  // GET

  // result of the yelp API
  getSearchResult(name, location) {
    return fetch(API_URL + "restaurant/" + name + "/" + location).then(
      response => response.json()
    );
  }

  getPosts(input) {
    return fetch(API_URL + "post/contains/" + input).then(response =>
      response.json()
    );
  }
}
