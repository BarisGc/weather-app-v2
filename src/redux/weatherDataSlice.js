import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//Define Location Options
import cities from "../data/cities_of_turkey.json";

//Fetch Data
export const fetchWeatherData = createAsyncThunk(
  "data/getWeatherData",
  async (dataRequest) => {
    console.log("api için selectedLocation", dataRequest);

    // Find Current Location
    let zero;
    let requestZero = [];
    console.log("typeof", typeof dataRequest.currentLatitude);
    let dataChecker = () => {
      if (
        //Check if it is error message or coords number
        isNaN(dataRequest.currentLatitude) ||
        isNaN(dataRequest.currentLongitude)
      ) {
        return dataRequest.currentLatitude; // Error Message as String
      } else {
        zero = `http://api.positionstack.com/v1/reverse?access_key=5510e8ea6ee6618565ed9ff8fb7f7cd7&query=${dataRequest.currentLatitude},${dataRequest.currentLongitude}`;
        return axios.get(zero);
      }
    };
    requestZero = await dataChecker();
    console.log("requestZero", requestZero);

    // Find City Coords by City Name
    let one = `http://api.openweathermap.org/geo/1.0/direct?q=${dataRequest.selectedLocation.value}&units=metric&appid=ab999271f6c1804cb233abd82c852543`;
    const requestOne = await axios.get(one);
    console.log("requestOne", requestOne.data[0]);

    // Find City Current Weather Data by City Coords
    let two = `https://api.openweathermap.org/data/2.5/weather?lat=${requestOne.data[0].lat}&lon=${requestOne.data[0].lon}&units=metric&appid=ab999271f6c1804cb233abd82c852543`;
    const requestTwo = await axios.get(two);
    console.log("requestTwo", requestTwo);

    // Find City 5days Weather Data by City Coords
    let three = `https://api.openweathermap.org/data/2.5/forecast?lat=${requestOne.data[0].lat}&lon=${requestOne.data[0].lon}&units=metric&appid=ab999271f6c1804cb233abd82c852543`;
    const requestThree = await axios.get(three);
    console.log("requestThree", requestThree);

    const allData = await axios
      .all([requestZero, requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseZero = responses[0];
          const responseOne = responses[1];
          const responseTwo = responses[2];
          const responseThree = responses[3];
          const mergedData = {
            CurrentLocation: responseZero.data
              ? responseZero.data
              : "The User Has Denied Location Access",
            CityCoordsByCityName: responseOne.data,
            CityCurrentDataByCityCoords: responseTwo.data,
            City5DaysDataByCityCoords: responseThree.data,
          };
          console.log("mergedData", mergedData);
          return mergedData;
        })
      );
    return allData;
  }
);

export const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState: {
    citiesList: cities,
    dataList: [],
    selectedLocation: {
      value: "Mugla",
      label: "Mugla",
    },
    status: "initial",
    currentLocation: {
      coordinates: {},
      name: "",
    },
    isCurrentLocationDataLoaded: false,
  },
  reducers: {
    changeSelectedLocation: (state, action) => {
      console.log("action.payloadselectedLocation", action.payload);
      state.selectedLocation = action.payload;
    },
    setCurrentLocation: (state, action) => {
      console.log("action.payloadcurrentLocation", action.payload);
      state.currentLocation = action.payload;
    },
    updateStatus: (state, action) => {
      console.log("action.payloadcurrentLocation", action.payload);
      state.status = "idle";
    },
    checkIsCurrentLocationDataLoaded: (state, action) => {
      state.isCurrentLocationDataLoaded = action.payload;
    },
  },
  extraReducers: {
    [fetchWeatherData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchWeatherData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.dataList = action.payload;
      state.selectedLocation = {
        value: action.payload.CityCurrentDataByCityCoords.name,
        label: action.payload.CityCurrentDataByCityCoords.name,
      };
      console.log("tsttttttttttt", state.isCurrentLocationDataLoaded);
      if (state.isCurrentLocationDataLoaded == true) {
        console.log(
          "buraya girdi mi?",
          action.payload.CurrentLocation !=
            "The User Has Denied Location Access"
        );
        state.currentLocation.name =
          action.payload.CurrentLocation !=
          "The User Has Denied Location Access"
            ? action.payload.CurrentLocation.data[0].region
            : "The User Has Denied Location Access";
      }
    },
    [fetchWeatherData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  changeSelectedLocation,
  setCurrentLocation,
  updateStatus,
  checkIsCurrentLocationDataLoaded,
} = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
