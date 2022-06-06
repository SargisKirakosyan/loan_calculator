function calculate() {
    var creditmoney, maturity, interest, prepayment, credit_amount, table, monthly_paid,
        month, print_table_row, column, row, coins, loan, monthly_fee;

    creditmoney = Number($('#creditmoney').val());
    maturity = Number($('#months').val());
    interest = Number($('#percent').val() / maturity);
    prepayment = Number($('#prepayment').val());
    table = $('.results');
    table.empty(); // Empty the table each time when call the calculate function
    credit_amount = creditmoney - (creditmoney / 100 * prepayment); // The credit amount after prepayment
    monthly_paid = credit_amount / maturity; // Sum of monthly paid without interest

    for (month = 1; month <= maturity; month++) {
        print_table_row = $('<tr></tr>');

        function cell(value, round) {
            if (isNaN(value) || !isFinite(value)) {
                value = 'error';
            } else if (round) {
                value = Math.ceil(value);
            } else {
                column = Math.ceil(value * 100) / 100;
                row = Math.floor(column);
                coins = Math.ceil((column - row) * 100);
                coins = ',' + (coins + '00').slice(0, 2);
                coins = '<span>' + coins + '</span>';
                value = Math.floor(value) + coins;
            }
            $('<td></td>').html(value).appendTo(print_table_row);
        }
        cell(month, true);
        cell(credit_amount);
        loan = credit_amount * interest / 100; // Size of interest for each month
        cell(loan);
        cell(monthly_paid);
        monthly_fee = monthly_paid + loan; // Sum of monthly paid with interest
        cell(monthly_fee);
        credit_amount -= monthly_paid;
        cell(month < maturity ? credit_amount : 0);
        table.append(print_table_row);
    }
}

function printList() {
    window.print(); // Print the payment period
};

function clearList() {
    $('.results').empty();
}