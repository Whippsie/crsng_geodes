function addRadioBool(name, category){
	for (var i = 0; i< name.length ; i++){	
		var id = "radio_"+name[i];
		$("#mods").after("<div class='radio' id='"+id+"'>"+name[i]+ "<br>");
		//$("#"+id).append("<br>");
		//Create 2 buttons for every option (T/F)
		for (var j = 0 ; j < 2 ; j++){
			var radioInput = document.createElement('input');
			var text = document.createElement('label');
			text.innerHTML = j%2 ? 'False' : 'True';
			radioInput.setAttribute('type', 'radio');
			radioInput.setAttribute('class', category);
			radioInput.setAttribute('name', name[i]); 
			radioInput.setAttribute('id', name[i]+j);
			radioInput.setAttribute('value', text.innerHTML);
			var temp = id;
			if (name[i].indexOf('/') !== -1){
				temp = id.replace('/','\\/');
			}
			$("#"+temp).append(text);
			$("#"+temp).append(radioInput);
		}
		$("#mods").after("</div>");
		$("#mods").after("<br>");
	}
	$("#mods").after("<br>");
	$("#confirm").before("<br>");
}
var dict = {"Camera":"/camera/"}

function updateUI(javaDict){
	//Remove hardcode
	$('input:radio.Camera').each(function() {
		//Si le radio appartient au dictionnaire et qu'on a la bonne valeur T/F présente dans le java, on le check
		if (jQuery(this).attr('name') in javaDict && jQuery(this).attr('value') == javaDict[jQuery(this).attr('name')]){
			jQuery(this).prop("checked", true).trigger("click");
		}
	});
}