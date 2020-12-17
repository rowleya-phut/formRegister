$( document ).ready(function() {

    $('#dateButton').click(function() {

        let phpQueryURL = "php/getAllDataRawByDate.php";

        let fromDate = 0;
        let toDate = 0;

        $('#dataDiv').empty();

        fromDate = $('#datepickerFrom').datepicker("getDate") / 1000;
        toDate = $('#datepickerTo').datepicker("getDate") /1000; 
        // console.log(fromDate);
        // console.log(toDate);
        console.log( "ready to read ALL data!" );

        ajaxRequest(fromDate, toDate, phpQueryURL);

    });

    $('#personalButton').click(function() {

        let phpQueryURL = "php/getPersonalData.php";

        let fromDate = 0;
        let toDate = 0;

        $('#dataDiv').empty();

        fromDate = $('#datepickerFrom').datepicker("getDate") / 1000;
        toDate = $('#datepickerTo').datepicker("getDate") /1000; 
        // console.log(fromDate);
        // console.log(toDate);
        console.log( "ready to read ALL data!" );

        ajaxRequest(fromDate, toDate, phpQueryURL);

    });
});