import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import LocationSelectionDropDown from "./components/LocationSelectionDropDown";
import { Container, Row } from "react-bootstrap";

function App() {
  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>
      <Row>
        <Content />
      </Row>
      <Row>
        <LocationSelectionDropDown />
      </Row>
    </Container>
  );
}

export default App;
