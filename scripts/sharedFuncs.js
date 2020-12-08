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