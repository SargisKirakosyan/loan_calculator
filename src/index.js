import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/bootstrap.min.css";
import "./assets/css/styles.css";
import Nav from "./components/Header/Navbar/Nav";
import LoanCalculator from "./containers/Calculator/LoanCalculator";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Nav />
        <LoanCalculator />
    </React.StrictMode>
);
