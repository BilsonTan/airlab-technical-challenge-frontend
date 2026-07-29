# Notes from developer:

### To run and test the code there's 2 ways:

### 1. From the root folder
- Run `yarn` on the root folder
- Run `yarn install:all` to install dependencies on both frontend and backend folders
- Run `yarn start:all` this will start both frontend and backend concurrently
- Run `yarn test:all` to test both frontend and backend concurrently

### 2. Can enter the the frontend folder and backend folder respectively to run it 
- Run `yarn` to install the dependencies for both frontend and backend
- Run `yarn start` to start the servers for each. Backend server uses port 8080 and frontend uses port 3000
- To test run `yarn test` or `yarn test-coverage`

# Objective

Create a browser based UI and supporting backend service to visualize a set of aircraft trajectories.

# Provided Resources

A file consisting of a set of trajectories is provided (trajectories.jsonl).
Each line of the file is a trajectory in JSON format.

Each trajectory consists of the following properties:

- id: an integer id that uniquely identifies the trajectory in the file
- adep: a string containing the departure airport ICAO code
- ades: a string containing the arrival airport ICAO code
- waypoints: a list containing waypoint objects with the following properties:
  - longitude: a double containing the longitude of the waypoint in degrees
  - latitude: a double containing the latitude of the waypoint in degrees
  - altitude: a double containing the estimated altitude in feet at which the aircraft will overfly the waypoint
  - time: a string containing the estimated time at which the aircraft will overfly the waypoint in ISO8601 format
  - name: a string containing the name of the waypoint (points associated with an airport will be named using its ICAO code)

# Required Tasks

1. Implement a backend service to serve the data in the provided file. `IMPLEMENTED`

   This should ideally be implemented using Java/Kotlin and Spring Framework.
   A Typescript (Javascript is NOT acceptable) on Node.js solution is acceptable also.

   Do include some unit tests to demonstrate your competency in backend unit testing.

   A well designed API is important. Do note your design considerations for discussion during the interview.

2. Implement a web application using Typescript (Javascript is NOT acceptable), React and a geospatial visualization library (e.g. DeckGL, OpenLayer, Leaflet, Cesium) to provide an interactive visualization of the trajectories. `IMPLEMENTED`

   Basic requirements for the visualization:

   - visualize trajectories as polylines and label each by their id
   - color each trajectory differently by their adep-ades pair
   - visualize each departure and arrival airports as points and label by their ICAO code
   - some unit tests to demonstrate your competency in frontend unit testing

# Good to Have Tasks

1. Filter visible trajectories by time range and arrival or departure airports `IMPLEMENTED`
2. Integration of the backend with a persistent storage (e.g. SQL database, MongoDB, ElasticSearch). `NOT IMPLEMENTED`

# Stretch Task

Implement other interesting ways of visualizing or interacting with the data. `NOT IMPLEMENTED`
