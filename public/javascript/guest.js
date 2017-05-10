$(document).ready(function(){
    var gradeMapping = {
    'A+': 4.0,
    'A' : 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B' : 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C' : 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D' : 1.0,
    'D-': .7,
    'F' : 0.0,
};
    
    
    
    $('#addToTable').click(function() {
            
        var className = $('#name').val();
        var unitsAttempted = $('#units').val();
        var gradeReceived = $('#received').val();
        
        
        //TODO add error checking: empty values and regex for grades negative units
        if (unitsAttempted.length > 0 && gradeReceived.length > 0 && Number(unitsAttempted) > 0
            && gradeMapping[gradeReceived.toUpperCase()] !== undefined) {
            $('tbody')
        .append('<tr><td>' + className + '</td><td class="numUnits">' 
        + unitsAttempted +'</td><td class="gradeReceived">' + gradeReceived.toUpperCase() +'</td></tr>');
        }
        
        
        
        var showWelcome = $('tbody').children().length === 0 ? "block" : "none";
        var showTable = $('tbody').children().length === 0 ? "none" : "table";
        // console.log(showTable);
        // console.log("hi");
        $('#welcome').css("display", showWelcome);
        $('table').css("display", showTable);
        $('#gpa').css("display", showTable);
        
        $('#name').val("");
        $('#units').val("");
        $('#received').val("");
        
        var totalUnits = 0;
        var gradePoints = 0;
        
        $('tbody tr').each(function() {
            var u = Number($(this).find('.numUnits').html());
            var g = $(this).find('.gradeReceived').html();
            totalUnits += u;
            gradePoints += gradeMapping[g] * u;
        });
        
        $('#gpa').html('Total GPA: ' + (gradePoints/totalUnits).toFixed(2));

    });
});



