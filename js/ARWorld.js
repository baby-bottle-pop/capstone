import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ViroARSceneNavigator } from "react-viro";
import { gettingAllThunk, allBusinessThunk } from "../client/store/business";
import AddReview from "./AddReview";
import { connect } from "react-redux";
import Map from "./Map";

let InitialARScene = require("./AllMarkers");
class disARWorld extends Component {
  constructor(props) {
    super();
    this.state = {
      lat: 0,
      long: 0,
      clicked: false,
      map: false
    };
    this.geo_success = this.geo_success.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.catchError = this.catchError.bind(this);
    this.addReview = this.addReview.bind(this);
    this.mapCall = this.mapCall.bind(this);
    this.removeReviewBox = this.removeReviewBox.bind(this);
  }
  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    var options = { enableHighAccuracy: true, maximumAge: 0, timeout: 1000 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.geo_success,
        this.catchError,
        options
      );
    } else {
      this.catchError();
    }
  }

  async geo_success(position) {
    await this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
    this.props.allBusinessThunk(
      this.state.lat,
      this.state.long,
      "#6b8e23",
      "/res/city.png"
    );
  }
  catchError() {
    console.log("error");
  }

  render() {
    return (
      <View style={localStyles.outer}>
        {this.state.map ? (
          <View style={localStyles.ar}>
            <ViroARSceneNavigator
              style={{ flex: 0.65 }}
              {...this.state.sharedProps}
              initialScene={{
                scene: InitialARScene
              }}
              viroAppProps={{
                businesses: this.props.businesses,
                lat: this.state.lat,
                long: this.state.long,
                color: this.props.color,
                icon: this.props.icon,
                addReview: this.addReview,
                mapCall: this.mapCall,
                removeReviewBox: this.removeReviewBox
              }}
              worldAlignment="GravityAndHeading"
            />
            <Map style={{ flex: 0.35 }} />
          </View>
        ) : (
          <ViroARSceneNavigator
            style={{ flex: 0.7 }}
            {...this.state.sharedProps}
            initialScene={{
              scene: InitialARScene
            }}
            viroAppProps={{
              businesses: this.props.businesses,
              lat: this.state.lat,
              long: this.state.long,
              color: this.props.color,
              icon: this.props.icon,
              addReview: this.addReview,
              mapCall: this.mapCall
            }}
            worldAlignment="GravityAndHeading"
          />
        )}

        <View style={{ position: "absolute" }}>
          <View
            style={{
              flex: 0.9,
              bottom: 350,
              left: 10,
              flexDirection: "row-reverse",
              justifyContent: "space-around"
            }}
          >
            <TouchableOpacity
              style={localStyles.buttonTwo}
              onPress={() => {
                this.props.allBusinessThunk(
                  this.state.lat,
                  this.state.long,
                  "#6b8e23",
                  "/res/city.png"
                );
              }}
            >
              <Image
                source={require("./res/city.png")}
                style={{
                  alignItems: "center",
                  padding: 20,
                  marginEnd: 10,
                  height: 10,
                  width: 10,
                  tintColor: "#6b8e23"
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={localStyles.buttonTwo}
              onPress={() => {
                this.props.gettingAllThunk(
                  this.state.lat,
                  this.state.long,
                  "bars",
                  "#dda0dd",
                  "/res/baricon.png"
                );
              }}
            >
              <Image
                source={require("./res/baricon.png")}
                style={{
                  alignItems: "center",
                  padding: 20,
                  marginEnd: 10,
                  height: 10,
                  width: 10,
                  tintColor: "#dda0dd"
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={localStyles.buttonTwo}
              onPress={() => {
                this.props.gettingAllThunk(
                  this.state.lat,
                  this.state.long,
                  "activity",
                  "#ff69b4",
                  "/res/entertainment-icon-png-14.jpg"
                );
              }}
            >
              <Image
                source={require("./res/entertainment-icon-png-14.jpg")}
                style={{
                  alignItems: "center",
                  padding: 20,
                  marginEnd: 10,
                  height: 10,
                  width: 10,
                  tintColor: "#ff69b4"
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={localStyles.buttonTwo}
              onPress={() => {
                this.props.gettingAllThunk(
                  this.state.lat,
                  this.state.long,
                  "food",
                  "#1e90ff",
                  "/res/food.png"
                );
              }}
            >
              <Image
                source={require("./res/food.png")}
                style={{
                  alignItems: "center",
                  padding: 20,
                  marginEnd: 10,
                  height: 10,
                  width: 10,
                  tintColor: "#1e90ff"
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.clicked ? (
          <AddReview removeReviewBox={this.removeReviewBox} />
        ) : null}
      </View>
    );
  }

  addReview() {
    this.setState({ clicked: true });
  }

  removeReviewBox() {
    this.setState({ clicked: false });
  }

  mapCall() {
    this.setState({ map: true });
  }
}

let localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  ar: {
    flex: 1
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black"
  },
  imageIcon: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 25
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  buttonTwo: {
    alignItems: "center",
    padding: 20,
    marginEnd: 10,
    justifyContent: "space-between"
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

const mapStateToProps = state => ({
  businesses: state.businessReducer.business,
  color: state.businessReducer.color,
  icon: state.businessReducer.icon
});

const mapDispatchToProps = dispatch => {
  return {
    gettingAllThunk: (lat, long, category, color, icon) =>
      dispatch(gettingAllThunk(lat, long, category, color, icon)),
    allBusinessThunk: (lat, long, color, icon) =>
      dispatch(allBusinessThunk(lat, long, color, icon))
  };
};

const ARWorld = connect(mapStateToProps, mapDispatchToProps)(disARWorld);
export default ARWorld;
module.exports = ARWorld;
