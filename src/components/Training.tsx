'use client';

import {Header} from "./Header.tsx";
import {Session} from "./Session.tsx";
import {Container, Row} from "react-bootstrap";

export function Training() {

    return (
        <Container>
            <Row>
                <Header/>
            </Row>
            <Row>
                <Session/>
            </Row>
        </Container>
    );
}