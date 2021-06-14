import React from 'react';
import {Alert} from 'react-native';
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import config from "./config";

const API_KEY = config;

export default class extends React.Component {

  state = {
    isLoading: true
  };
  getWeather = async(latitude, longitude) => {    
    const {data} = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    console.log(data);
  }
  getLocation = async() => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords:{latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({isLoading: false});
    } catch (error) {
      Alert.alert("can's find you.");
    }
  }

  componentDidMount(){
    this.getLocation();
  }

  render(){
    const {isLoading} = this.state;
    return isLoading ? <Loading /> : null;
  }
}

