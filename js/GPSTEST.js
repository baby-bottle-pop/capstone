"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroARScene, ViroText, ViroConstants, ViroCamera } from "react-viro";

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    // Set initial state here
    this.state = {
      lat: 0,
      long: 0
    };

    // bind 'this' to functions
    this.geo_success = this.geo_success.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.catchError = this.catchError.bind(this);
  }
  componentDidMount() {
    setInterval(this.getLocation, 2000);
  }

  catchError() {
    console.log("error");
  }

  getLocation() {
    var options = { enableHighAccuracy: true, maximumAge: 0, timeout: 1000 };
    if (navigator.geolocation) {
      var watchID = navigator.geolocation.watchPosition(
        this.geo_success,
        this.catchError,
        options
      );
      setInterval(function() {
        navigator.geolocation.clearWatch(watchID);
      }, 100);
    } else {
      this.catchError();
    }
  }

  render() {
    return (
      <ViroARScene>
        <ViroCamera position={[0, 0, 0]} active={true}>
          <ViroText
            text={`${this.state.lat}, ${this.state.long}`}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -3]}
            style={styles.helloWorldTextStyle}
          />
        </ViroCamera>
      </ViroARScene>
    );
  }

  geo_success(position) {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });

    console.log("position====>", position);
    console.log("state===>", this.state);
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;
