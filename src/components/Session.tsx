'use client';

import {useOption} from "./providers/OptionsProvider.tsx";
import {useEffect, useState} from "react";
import {IntervalRow} from "../types.tsx";
import {Col, Container, ListGroup, Row} from "react-bootstrap";

export function Session() {
    const {selectedSessionData} = useOption();
    const [started, setStarted] = useState<boolean>(false);

    const [intervalList, setIntervalList] = useState<IntervalRow[]>([]);
    const [countdown, setCountdown] = useState<number>(0);

    const createCurrentIntervalList = (setActive: number) => {
        const currentIntervalList = selectedSessionData.map((sessionRow, index) => {
            return {
                time: sessionRow.time,
                power: sessionRow.power,
                active: index === setActive
            }
        });
        setIntervalList(currentIntervalList);
    }
    useEffect(() => {
        // create base interval list
        createCurrentIntervalList(-1);
    }, [selectedSessionData]);

    const waitForCountdown = (countDown: number) => {
        return new Promise<void>((resolve) => {
            let currentCountdown = countDown;
            setCountdown(currentCountdown);
            const interval = setInterval(() => {
                currentCountdown--;
                setCountdown(currentCountdown);
                if (currentCountdown === 0) {
                    clearInterval(interval);
                    resolve();
                }
            }, 1000);
        });
    }

    const startSession = async () => {
        // Start the session
        setStarted(true);
        for (let i = 0; i < intervalList.length; i++) {
            createCurrentIntervalList(i);
            setCountdown(intervalList[i].time);
            await waitForCountdown(intervalList[i].time);

        }
    }

    return (
        <Container className="session-full-height">
            <Row>
                <Col id={'table'} className="border session-full-height">
                    <ListGroup>
                        {intervalList.map((interval, index) => (
                            <ListGroup.Item key={index}>
                                {interval.time} - {interval.power} - {interval.active ? "ACTIVE" : "REST"}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col id={'countdown'} className="border">
                    {!started && <button onClick={() => startSession()}>Start</button>}
                    {started && <div>Countdown: {countdown}</div>}
                </Col>
                <Col id={'targetPower'} className="border">
                    Target power
                    {intervalList.filter((interval) => interval.active).map((interval) => (
                        <div key={interval.time}>
                            {interval.power}
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}