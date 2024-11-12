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
    const [currentIntervalIndex, setCurrentIntervalIndex] = useState<number>(-1);


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

    useEffect(() => {
        let timer: number;
        if (started && countdown > 0) {
            timer = window.setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        } else if (countdown === 0 && currentIntervalIndex >= 0) {
            // @ts-ignore
            clearInterval(timer);
            if (currentIntervalIndex < intervalList.length - 1) {
                setCurrentIntervalIndex(currentIntervalIndex + 1);
                setCountdown(intervalList[currentIntervalIndex + 1].time);
            } else {
                setStarted(false);
            }
        }
        return () => clearInterval(timer);
    }, [started, countdown, currentIntervalIndex]);

    useEffect(() => {
        if (currentIntervalIndex >= 0) {
            createCurrentIntervalList(currentIntervalIndex);
        }
    }, [currentIntervalIndex]);

    const startSession = () => {
        setStarted(true);
        setCurrentIntervalIndex(0);
        setCountdown(intervalList[0].time);
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