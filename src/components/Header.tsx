'use client';

import logo from "../assets/logo.png";
import {useOption} from "./providers/OptionsProvider.tsx";
import {Col, Container, Row} from "react-bootstrap";

export function Header() {
    const {
        sessionList, sessionNames,
        setSelectedSession, setSelectedSessionData
    } = useOption();

    return (
        <Container>
            <Row className="align-items-center border">
                <Col>
                    <h1>Intervallprogram</h1>
                </Col>
                <Col className="flex-grow-1">
                    <div className="form-group">
                        <select
                            className="form-control"
                            onChange={(e) => {
                                setSelectedSession(e.target.value);
                                setSelectedSessionData(sessionList[e.target.value]);
                            }}
                        >
                            <option value="">Select a session</option>
                            {sessionNames.map((sessionName) => (
                                <option key={sessionName} value={sessionName}>
                                    {sessionName}
                                </option>
                            ))}
                        </select>
                    </div>
                </Col>
                <Col>
                    <img src={logo} alt="NTNUI Tri Logo" style={{maxHeight: "60px"}}
                         className="img-fluid float-end"/>
                </Col>
            </Row>
        </Container>
    );
}