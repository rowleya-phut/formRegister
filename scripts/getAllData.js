$( document ).ready(function() {
    console.log( "ready to read ALL data!" );
    /////////////////staff rooms ajax call//////////////////////////
    $.ajax({method: "POST", url: "php/getAllDataRaw.php"})
    .done(function(returnedData){
      var result = $.parseJSON(returnedData);
      console.log(result);

        // $.each(result, function(index, value){
        //     //build an option element string for each object in the returned JSON
        //     string += "<tr>" ;
        //     string += '<td>' + value['EvaluationId']+'</td>';
        //     string += '<td>' + index[1] + value['Free_Comment'] + '</td>';
        //     string += "</tr>";
        // });
        $.each(result, function(key, value){
            var string = "<br/>";
            string += "<table  class='table table-bordered'>";
            string += "<tr>";
            string += "<th>Form Key</th>";
            string += "<th>Form Contents</th>";
            string += "</tr>";
            $.each(value, function(key, value){
                if(key === "Time_accessed"){
                    value = convertUnix(value);
                }
                string += "<tr>" ;
                string += '<td>' + key +'</td>';
                string += '<td>' + value + '</td>';
                string += "</tr>";    
            });
            string += "</table>";
                    //attach the built string to the element on the html      
        $(string).appendTo('#dataDiv');
        string = "";
        });


    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Read Error: " + errorThrown);
    });

    ///////////////////////////////////////////////////////////

});