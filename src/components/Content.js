import React from "react";
import moment from "moment";
import { Col, Row, Card, CardGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

import Loading from "./general/Loading";
function Content() {
  const status = useSelector((state) => state.weatherData.status);
  const dataList = useSelector((state) => state.weatherData.dataList);
  const currentLocation = useSelector(
    (state) => state.weatherData.currentLocation
  );

  return (
    <>
      {status === "loading" && <Loading />}
      {status === "succeeded" && (
        <>
          {/* Current Data */}
          <Col md={{ span: 8, offset: 2 }}>
            <CardGroup className="ContentCurrentDayCardsContainer">
              <Card className="justify-content-center align-items-center ContentCurrentDayCardsContainer border-0 py-3">
                <Card.Text className="fw-bold fst-italic mb-0 pb-0">{`Today : "${moment
                  .unix(dataList.CityCurrentDataByCityCoords.dt)
                  .format("ddd")}"`}</Card.Text>
                <Card.Img
                  variant="top"
                  src={`http://openweathermap.org/img/wn/${dataList.CityCurrentDataByCityCoords.weather[0].icon}@2x.png`}
                  className="w-50  "
                />
                <Card.Body className="pt-0 ">
                  <Card.Text className="">
                    {dataList.CityCurrentDataByCityCoords.weather[0].main}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="ContentCurrentDayCardsContainer">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center ">
                  <Card.Text className="">
                    {`Your Current Location: ${currentLocation.name}`}
                  </Card.Text>
                  <Card.Text className="">
                    {`Your Selected Location: ${dataList.CityCoordsByCityName[0].name}`}
                  </Card.Text>
                  <Card.Text className="display-1">
                    {dataList.CityCurrentDataByCityCoords.main.temp.toFixed(0)}℃
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="ContentCurrentDayCardsContainer">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Text>
                    {`Humidity: ${dataList.CityCurrentDataByCityCoords.main.humidity}%`}
                  </Card.Text>
                  <Card.Text>
                    {`Pressure: ${dataList.CityCurrentDataByCityCoords.main.pressure} hPa`}
                  </Card.Text>
                  <Card.Text>
                    {`Wind Speed: ${dataList.CityCurrentDataByCityCoords.wind.speed} meter/sec`}
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
          {/* Next Five Days Data */}
          <Col md={{ span: 8, offset: 2 }}>
            <Row xs={1} md={5} className="g-0 ">
              <Col className="ContentCurrentDayCardsContainer ">
                <Card className="ContentCurrentDayCardsContainer border-0">
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Text>
                      {`${moment
                        .unix(dataList.City5DaysDataByCityCoords.list[8].dt)
                        .utc()
                        .format("ddd")}`}
                    </Card.Text>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${dataList.City5DaysDataByCityCoords.list[8].weather[0].icon}@2x.png`}
                      className="w-50  "
                    />
                    <Card.Text>
                      {`${dataList.City5DaysDataByCityCoords.list[8].main.temp.toFixed(
                        0
                      )} ℃`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="ContentCurrentDayCardsContainer ">
                <Card className="ContentCurrentDayCardsContainer border-0">
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Text>
                      {`${moment
                        .unix(dataList.City5DaysDataByCityCoords.list[16].dt)
                        .utc()
                        .format("ddd")}`}
                    </Card.Text>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${dataList.City5DaysDataByCityCoords.list[16].weather[0].icon}@2x.png`}
                      className="w-50  "
                    />
                    <Card.Text>
                      {`${dataList.City5DaysDataByCityCoords.list[16].main.temp.toFixed(
                        0
                      )} ℃`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="ContentCurrentDayCardsContainer ">
                <Card className="ContentCurrentDayCardsContainer border-0">
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Text>
                      {`${moment
                        .unix(dataList.City5DaysDataByCityCoords.list[24].dt)
                        .utc()
                        .format("ddd")}`}
                    </Card.Text>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${dataList.City5DaysDataByCityCoords.list[24].weather[0].icon}@2x.png`}
                      className="w-50  "
                    />
                    <Card.Text>
                      {`${dataList.City5DaysDataByCityCoords.list[24].main.temp.toFixed(
                        0
                      )} ℃`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="ContentCurrentDayCardsContainer ">
                <Card className="ContentCurrentDayCardsContainer border-0">
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Text>
                      {`${moment
                        .unix(dataList.City5DaysDataByCityCoords.list[32].dt)
                        .utc()
                        .format("ddd")}`}
                    </Card.Text>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${dataList.City5DaysDataByCityCoords.list[32].weather[0].icon}@2x.png`}
                      className="w-50  "
                    />
                    <Card.Text>
                      {`${dataList.City5DaysDataByCityCoords.list[32].main.temp.toFixed(
                        0
                      )} ℃`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="ContentCurrentDayCardsContainer ">
                <Card className="ContentCurrentDayCardsContainer border-0">
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Text>
                      {`${moment
                        .unix(dataList.City5DaysDataByCityCoords.list[39].dt)
                        .utc()
                        .format("ddd")}`}
                    </Card.Text>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${dataList.City5DaysDataByCityCoords.list[39].weather[0].icon}@2x.png`}
                      className="w-50  "
                    />
                    <Card.Text>
                      {`${dataList.City5DaysDataByCityCoords.list[39].main.temp.toFixed(
                        0
                      )} ℃`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </>
      )}
    </>
  );
}

export default Content;
