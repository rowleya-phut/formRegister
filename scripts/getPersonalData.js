$( document ).ready(function() {
    console.log( "ready to read ALL data!" );

    let evaluationId = 0;
    let string = "";
    /////////////////staff rooms ajax call//////////////////////////
    $.ajax({method: "POST", url: "php/getPersonalData.php"})
    .done(function(returnedData){
      var result = $.parseJSON(returnedData);
      //console.log(result);
      //show as latest form filled in at the top of the page
      result.reverse();

        $.each(result, function(key, value){
            string += "<br/>";
            string += "<table  class='table table-bordered'>";
            string += "<tr>";
            string += "<th>Form Key</th>";
            string += "<th>Form Contents</th>";
            string += "</tr>";
            $.each(value, function(key, value){
                //get the evaluationId for use in the related data queries
                if(key === "EvaluationId"){
                    evaluationId = value;
                }
                if(key === "Time_accessed"){
                    value = convertUnix(value);
                }
                string += "<tr>" ;
                string += '<td>' + key +'</td>';
                string += '<td>' + value + '</td>';
                string += "</tr>";    
            });
            string += "<tr>" ;
            //////////trainer impact section////////////////////////////
            string += '<td>Trainer Impact</td>';
            string += '<td>';
            let ulId = "trainImpact"+ evaluationId;
            string += '<ul id="'+ulId+'">';
            //ajax request to get trainer impact related data
            $.ajax({method: "POST", url: "php/getRelatedTrainerImpact.php", data: {"EVALID": evaluationId}})
            .done(function(returnedImpactData){
                var impactDataResult = $.parseJSON(returnedImpactData);
                //console.log(impactDataResult);
                
                $.each(impactDataResult, function(key, value){
                    $.each(value, function(key, value){
                        if(key === "ImpactDesc"){
                            string += "<li>" + value + "</li>"; 
                        }
                            
                    });
                    let appendList = "#"+ulId;
                    $(string).appendTo(appendList);
                    string = "";
                });
                
            });
            string += "</ul>";
            ///////////////////////////////////////////////////evaluationId
            string += '</td>';
            string += "</tr>"; 
            /////////end of trainer impact section/////////////////////////
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