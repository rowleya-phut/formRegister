$( document ).ready(function() {
    console.log( "ready to return recently submitted forms!" );

    //record the time when page first loaded
    //var timePageAccessed = Date.now();

    $("#roomSelectorForm").submit(function(e) {
    var form = $(this);

    //validate dropdown
    var dropDownsCompleted = true;
    //console.log($('.dropDowns'));
    $('.dropDowns').each(function(){
        //includes() not compatible with IE11
        //so using IE11 polyfill
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
        if (!String.prototype.includes) {
            String.prototype.includes = function(search, start) {
              'use strict';
          
              if (search instanceof RegExp) {
                throw TypeError('first argument must not be a RegExp');
              } 
              if (start === undefined) { start = 0; }
              return this.indexOf(search, start) !== -1;
            };
          }
        var isDefaultValue = ($(this).children("option:selected").val()).includes("Choose");

        var optionValue = $(this).children("option:selected").val();

        if(isDefaultValue){
            $(this).css('border-color', '#C80000');
            dropDownsCompleted = false;
        } else {
            $(this).css('border-color', '#BDC7BC');
        }
    });
    console.log("dropdowns comepleted: " + dropDownsCompleted);

    e.preventDefault(); 

    var url = "php/getFormData.php";

    //convert UNIX time to human readable string
    function convertUnix(unixTime){
        var string = "";
        var dateCompleted = new Date(unixTime*1000);
        var minute = dateCompleted.getMinutes();
        var hour = dateCompleted.getHours();
        
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var day = weekday[dateCompleted.getDay()];
        var date = dateCompleted.getDate();
        
        var monthNames = new Array(12)
        monthNames[0] = "Jan";
        monthNames[1] = "Feb";
        monthNames[2] = "Mar";
        monthNames[3] = "Apr";
        monthNames[4] = "May";
        monthNames[5] = "June";
        monthNames[6] = "July";
        monthNames[7] = "Aug";
        monthNames[8] = "Sept";
        monthNames[9] = "Oct";
        monthNames[10] = "Nov";
        monthNames[11] = "Dec";
        var month = monthNames[dateCompleted.getMonth()];

        var year = dateCompleted.getFullYear();
        string += day + " "+ date + " " + month + "  " + year + ": " + hour + ":" + minute;
        return string;
    }

    //function make the ajax call to the server
    //refactored to a function as it is called multiple times
    function AjaxCall(){
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            //dataType: 'json',
            })
            .done(function (data) { 
                console.log('Submission successful');
                //console.log(data);
                var result = $.parseJSON(data);
                //console.log(result[0].EvaluationId);
    
                var string = "";
                var count = 0;
                $.each(result, function(index, value){
                    var readableDate = convertUnix(value.EvaluationId);
                    string += "<li>" + readableDate + "</li>";
                    //console.log(value.EvaluationId);
                    count+=1;
                });
                //attach the built string to the element on the html  
                $('#returnedFormsList').empty()    
                $(string).appendTo('#returnedFormsList');
                $('#totalCount').text(count);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Error" + errorThrown);
            });
    }
        if(dropDownsCompleted){
            AjaxCall();
            setInterval(function(){
            AjaxCall();
            }, 5000); 
        }
    });
});