export default function PaymentPeriod(props) {
    const ListFeatures = () => {
        const printTable = () => window.print(); // Print the payment period

        const clearTable = () => {
            props.clearPeriod(); // Clear payment period
            props.setLoanState(false);
        };

        return (
            <>
                <button className="btn btn-sm btn-info" onClick={printTable}>
                    Print the schedule
                </button>
                <button
                    className="btn btn-sm btn-secondary"
                    onClick={clearTable}
                >
                    Clear the schedule
                </button>
            </>
        );
    }

    const PeriodList = (props) => {
        const period = props.data;

        if (period) {
            return period.map((list) => {
                return list.map((row, id) => {
                    return (
                        <tr key={id}>
                            {row.map((column, id) => {
                                return <td key={id}>{column}</td>;
                            })}
                        </tr>
                    );
                });
            });
        }
    }

    return (
        <div className="mt-3">
            <div className="row">
                <div className="col-md-3">
                    <h3 className="page-header">Payment period</h3>
                </div>
                <div className="col-md-4">
                    <ListFeatures />
                </div>
            </div>
            <div className="table-responsive">
                <table id="table" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Regular month</th>
                            <th>Total amount</th>
                            <th>Interest amount</th>
                            <th>Loan principal</th>
                            <th>Payment</th>
                            <th>Loan balance</th>
                        </tr>
                    </thead>
                    <tbody className="results">
                        <PeriodList data={props.data} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}
