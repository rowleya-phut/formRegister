$( document ).ready(function() {
    console.log( "ready!" );
    /////////////////staff rooms ajax call//////////////////////////
    $.ajax({method: "POST", url: "php/readRooms.php"})
    .done(function(returnedData){
      var result = $.parseJSON(returnedData);
      //console.log(result);
        var string = "";
        $.each(result, function(index, value){
            //build an option element string for each object in the returned JSON
            string += "<option value='"+value['RoomId']+"'>" + value['RoomId'] + "</option>";
        });
        //attach the built string to the element on the html      
        $(string).appendTo('#roomDropDown');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Read Error: " + errorThrown);
    });

    ///////////////////////////////////////////////////////////



});