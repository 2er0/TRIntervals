'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import {OptionsProvider} from "./components/providers/OptionsProvider.tsx";
import {Training} from "./components/Training.tsx";
import {Container} from "react-bootstrap";

function App() {

    return (
        <Container fluid data-bs-theme="dark">
            <OptionsProvider>
                <Training/>
            </OptionsProvider>
        </Container>
    )
}

export default App
