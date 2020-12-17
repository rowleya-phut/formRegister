$( document ).ready(function() {

    $('#datepickerFrom').datepicker( {
        onSelect: function(date) {
            console.log(date);
        },
        selectWeek: true,
        inline: true,
        startDate: '01/01/2000',
        firstDay: 1
    });

    $('#datepickerTo').datepicker( {
        onSelect: function(date) {
            console.log(date);
        },
        selectWeek: true,
        inline: true,
        startDate: '01/01/2000',
        firstDay: 1
    });

    // $('#dateButton').click(function() {
    //     fromDate = $('#datepickerFrom').datepicker("getDate") / 1000;
    //     toDate = $('#datepickerTo').datepicker("getDate") /1000; 
    //     console.log(fromDate);
    //     console.log(toDate);
    // });

});