 $(document).ready(function() {
        var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+" , "+time;
		document.getElementById('meeting_title').textContent = "meeting Minutes  at " + dateTime;
		
		//load all members
		var wrapper = $(".member_container");
		
		$.getJSON("../members/members.json", function(data) {         
			alert(data["members"][0]["Name"]);
			
			for (i = 0; i < data["members"].length; i++) { 
				var iDiv = document.createElement('div');
				iDiv.class = "member";
				iDiv.id="member-"+i;
				iDiv.innerHTML= data["members"][i]["Name"]
				$(wrapper).append(iDiv);
			}
			
		});
		

		
		
		//add guests to meeting
		var wrapper2 = $(".guest_container");
		var add_guest_button = $(".add_guest");
		$(add_guest_button).click(function(e){
			$(wrapper2).append('<div><input type="text" name="mytext[]"/><a href="#" class="delete">Delete</a></div>');
		});
		
		(wrapper2).on("click", ".delete", function(e) {
			e.preventDefault();
			$(this).parent('div').remove();
			x--;
		});
		
});