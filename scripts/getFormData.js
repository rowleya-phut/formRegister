$( document ).ready(function() {
    console.log( "ready to read form data!" );
    /////////////////staff rooms ajax call//////////////////////////
    $.ajax({method: "POST", url: "php/getFormData.php"})
    .done(function(returnedData){
      var result = $.parseJSON(returnedData);
      console.log(result);
        var string = "";
        $.each(result, function(index, value){
            //build an option element string for each object in the returned JSON
            string += "<li>" + 'RoomId' + "</li>";
        });
        //attach the built string to the element on the html      
        $(string).appendTo('#returnedFormsList');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Read Error: " + errorThrown);
    });

    ///////////////////////////////////////////////////////////

});