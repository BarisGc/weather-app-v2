import Select from "react-select";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "./general/Loading";
import {
  fetchWeatherData,
  changeSelectedLocation,
  setCurrentLocation,
  updateStatus,
  checkIsCurrentLocationDataLoaded,
} from "../redux/weatherDataSlice";
import useGeoLocation from "../redux/customHooks/useGeoLocation";
import { Col } from "react-bootstrap";

function LocationSelectionDropDown() {
  // Global States & Selectors
  const dispatch = useDispatch();
  const status = useSelector((state) => state.weatherData.status);
  const citiesList = useSelector((state) => state.weatherData.citiesList);
  const selectedLocation = useSelector(
    (state) => state.weatherData.selectedLocation
  );
  const currentLocation = useSelector(
    (state) => state.weatherData.currentLocation
  );

  const getCurrentLocation = useGeoLocation();

  useEffect(() => {
    console.log("getCurrentLocation", getCurrentLocation);

    if (getCurrentLocation.loaded == true) {
      dispatch(checkIsCurrentLocationDataLoaded(true));
      dispatch(
        setCurrentLocation({
          ...getCurrentLocation,
          name: "",
        })
      );
      dispatch(updateStatus());
    }
  }, [dispatch, getCurrentLocation]);

  useEffect(() => {
    if (status == "idle") {
      if (!currentLocation.error) {
        dispatch(
          fetchWeatherData({
            selectedLocation: selectedLocation,
            currentLatitude: currentLocation.coordinates.lat,
            currentLongitude: currentLocation.coordinates.lng,
          })
        );
      } else {
        dispatch(
          fetchWeatherData({
            selectedLocation: selectedLocation,
            currentLatitude: currentLocation.error.message,
            currentLongitude: currentLocation.error.message,
          })
        );
      }
    }
  }, [dispatch, selectedLocation, currentLocation, status]);

  const options = citiesList.map((data) => {
    return {
      value: data.city,
      label: data.city,
    };
  });

  // console.log("options", options);
  // console.log("citiesList", citiesList);

  const handleSelectedLocation = (selection) => {
    dispatch(changeSelectedLocation(selection));
    dispatch(updateStatus());
  };
  console.log("dropdownöncesi selectedlocation", selectedLocation);
  return (
    <>
      {status === "succeeded" && (
        <Col md={{ span: 4, offset: 4 }} className="mt-3 mb-4">
          <Select
            className={""}
            name="selectedLocation"
            value={selectedLocation}
            onChange={handleSelectedLocation}
            options={options}
            autoFocus
            isSearchable={true}
            placeholder={"Select a Location"}
          />
        </Col>
      )}
    </>
  );
}

export default LocationSelectionDropDown;
