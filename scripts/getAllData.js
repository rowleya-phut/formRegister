$( document ).ready(function() {
    console.log( "ready to read ALL data!" );
    /////////////////staff rooms ajax call//////////////////////////
    $.ajax({method: "POST", url: "php/getAllDataRaw.php"})
    .done(function(returnedData){
      var result = $.parseJSON(returnedData);
      console.log(result);
        var string = "";
        $.each(result, function(index, value){
            //build an option element string for each object in the returned JSON
            string += "<li>" + 'RoomId' + "</li>";
        });
        //attach the built string to the element on the html      
        $(string).appendTo('#dataDiv');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Read Error: " + errorThrown);
    });

    ///////////////////////////////////////////////////////////

});