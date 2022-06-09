import { useState, useEffect } from "react";
import LoanCalculateForm from "./LoanCalculateForm";
import PaymentPeriod from "../../components/Main/Period/PaymentPeriod";

const LOCAL_STORAGE_KEY = "LoanCalculator.paymentPeriod";

export default function LoanCalculator() {
    const [paymentPeriod, setPaymentPeriod] = useState("");
    const [loanCalculated, setLoanCalculated] = useState(false);

    useEffect(() => {
        const storedPeriod = JSON.parse(
            sessionStorage.getItem(LOCAL_STORAGE_KEY)
        );
        if (storedPeriod) setPaymentPeriod(storedPeriod);
    }, []);

    useEffect(() => {
        sessionStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(paymentPeriod)
        );
    }, [paymentPeriod]);

    const calculatePaymentPeriod = (period) => {
        setPaymentPeriod([period]);
        setLoanCalculated(true);
    }

    const clearPaymentPeriod = () => {
        setPaymentPeriod([]);
    }

    const loanCalculatedCheck = (state) => {
        setLoanCalculated(state);
    }

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-body">
                    <LoanCalculateForm
                        getLoanState={loanCalculated}
                        handleSubmit={calculatePaymentPeriod}
                        setLoanState={loanCalculatedCheck}
                    />
                </div>
            </div>
            <PaymentPeriod
                data={paymentPeriod}
                clearPeriod={clearPaymentPeriod}
                setLoanState={loanCalculatedCheck}
            />
        </div>
    );
}
