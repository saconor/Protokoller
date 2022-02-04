$(document).ready(function() {
    var max_fields = 10;
    var wrapper = $(".container1");
    var add_button = $("#add_form_field");
    var today = new Date();
    var wrapper = $("#guest_container");
		
    var wrapper2 = $("#guest_container");
    var add_guest_button = $(".add_guest");
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+" , "+time;

    let x = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        if (x < max_fields) {
            x++;
            $("#topic_container").append('<div><input type="text" class="form-control"name="mytext[]"/><a href="#" class="delete">Delete</a></div>'); //add input box
        } else {
            alert('You Reached the limits')
        }
    });

    $("#topic_container").on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })

       
		document.getElementById('meeting_title').textContent = "meeting Minutes  at " + dateTime;
		
		//load all members
	
		$(add_guest_button).click(function(e){
			$(wrapper2).append('<div><input type="text" class="form-control" name="mytext[]"/><a href="#" class="delete">Delete</a></div>');
		});
		
		(wrapper2).on("click", ".delete", function(e) {
			e.preventDefault();
			$(this).parent('div').remove();
		});
});