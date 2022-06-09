import { useState, useRef } from "react";

export default function LoanCalculateForm(props) {
    const [creditMoney, setCreditMoney] = useState("");
    const [maturity, setMaturity] = useState("");
    const [interest, setInterest] = useState("");
    const [prepayment, setPrepayment] = useState("");
    let [totalPayment, setTotalPayment] = useState(0);
    const creditMoneyRef = useRef();
    const maturityRef = useRef();
    const interestRef = useRef();
    const prepaymentRef = useRef();
    const loanCalculated = props.getLoanState;

    const calculateLoan = () => {
        let [month, column, row, coins, interestAmount] = "";
        let creditAmount = creditMoney - (creditMoney / 100) * prepayment; // The credit amount after prepayment
        const monthlyPaid = creditAmount / maturity; // Sum of monthly paid without interest
        const calculatedTable = [];

        const tableCell = (value, round) => {
            if (Number.isNaN(value) || !isFinite(value)) {
                value = "Error";
            } else if (round) {
                value = Math.ceil(value);
            } else {
                column = Math.ceil(value * 100) / 100;
                row = Math.floor(column);
                coins = Math.ceil((column - row) * 100);
                coins = "," + (coins + "00").slice(0, 2);
                value = Math.floor(value) + coins;
            }
            if (!calculatedTable[month - 1]) {
                calculatedTable.push([value]);
            } else {
                calculatedTable[month - 1].push(value);
            }
        };

        for (month = 1; month <= maturity; month++) {
            if (month === 1) {
                setTotalPayment((totalPayment = 0));
            }
            tableCell(month, true); // The serial number of the month
            tableCell(creditAmount);
            interestAmount = (creditAmount * (interest / maturity)) / 100; // Size of interest for each month
            tableCell(interestAmount);
            tableCell(monthlyPaid); // Sum of monthly paid without interest
            tableCell(monthlyPaid + interestAmount); // Sum of monthly paid with interest
            setTotalPayment((totalPayment += monthlyPaid + interestAmount));
            creditAmount -= monthlyPaid;
            tableCell(month < maturity ? creditAmount : 0);
        }
        return calculatedTable;
    };

    const handleChange = () => {
        setCreditMoney(creditMoneyRef.current.value);
        setMaturity(maturityRef.current.value);
        setInterest(interestRef.current.value);
        setPrepayment(prepaymentRef.current.value);
    };

    const handleSubmit = (e) => {
        if (
            creditMoney !== "" &&
            maturity !== "" &&
            interest !== "" &&
            prepayment !== ""
        ) {
            props.handleSubmit(calculateLoan());
            props.setLoanState(true);
        }
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-lg-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Loan amount Դ
                            </span>
                        </div>
                        <input
                            type="number"
                            ref={creditMoneyRef}
                            min="100000"
                            max="15000000"
                            placeholder="100000-15000000"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Prepayment %
                            </span>
                        </div>
                        <input
                            type="number"
                            ref={prepaymentRef}
                            min="10"
                            max="70"
                            placeholder="10-70"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Months</span>
                        </div>
                        <input
                            type="number"
                            ref={maturityRef}
                            min="12"
                            max="250"
                            placeholder="12-250"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Loan interest rate %
                            </span>
                        </div>
                        <input
                            type="number"
                            ref={interestRef}
                            min="14"
                            max="24"
                            placeholder="14-24"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4">
                    <div className="input-group">
                        <button type="submit" className="btn btn-success">
                            Calculate
                        </button>
                    </div>
                </div>
                <div className="col-md-4 offset-2">
                    <p className="text-left font-weight-bold">
                        Your loan:{" "}
                        {loanCalculated
                            ? creditMoney - (creditMoney / 100) * prepayment
                            : 0}
                    </p>
                    <p className="text-left font-weight-bold">
                        Your total payment:{" "}
                        {loanCalculated ? totalPayment.toFixed(0) : 0}
                    </p>
                </div>
            </div>
        </form>
    );
}
