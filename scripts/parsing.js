
function parsetoROS(){
	var ros = '<launch> \n \t <arg name="veh" default="$(env VEHICLE_NAME)"/> \n ';
	//For demos, using a master file
	ros += '\t <include file="$(find duckietown_demos)/launch/master.launch"> \n ';
	$('input:radio:checked').each(function() {
		ros += '\t \t <arg name="'+dict["Camera"]+jQuery(this).attr('name') + '" value="' + jQuery(this).attr('value')+'" /> \n';
	});
	ros += '\t </include>';
	ros += '\n </launch>';
	//alert(ros);
	console.log(ros);
	writeTextFile("Camera.launch", ros, 'ros');
}


function dictToJava(args){
	var javatext="";
	//TODO: Check the node and adapt instead of just giving Camera
	javatext += "public class " + "Camera { \n";
	for (var key in args){
		if (args.hasOwnProperty(key)) {
			var getParamPos = key.indexOf(dict["Camera"]);
			if (getParamPos !== -1){
				var flag_name = key.slice(getParamPos + dict["Camera"].length);
				javatext += " \t private boolean " + flag_name + " = " + args[key] + " ;\n";
			}
		}
	}
	javatext += "}";
	writeTextFile("CameraFromROS.java", javatext, 'java');
	console.log(javatext);
	return javatext;
}
function rosToDict(){
	var temp = loadFile("Camera.launch");
	var res = temp.split("\n");
	var args = {};
	for (var i = 0; i<res.length;i++){
		if (res[i].indexOf('<arg')!== -1){
			var split = res[i].split(" ");
			var arg_name = "";
			for (var j = 0; j<split.length;j++){
				if (split[j].indexOf('name=')!== -1){
					arg_name = split[j].slice(6,split[j].length-1);
				}
				if (split[j].indexOf('value=')!== -1){
					var arg_val = split[j].slice(7,split[j].length-1);
					args[arg_name]= arg_val;
					arg_name = "";
				}

			}
		}
	}
	return args;
}

function preparedata (data){
	var name = [];
	var j = 0;
	data = data.replace(/\n/g,'');
	data = data.replace(/\t/g, ' ');
	var res = data.split(" ");
	for (var i = 0; i<res.length;i++){
		//For now only checks variables
		if (res[i] == "private"){
			//For now only supports boolean type
			if (res[i+1] == "boolean"){
				name[j] = res[i+2];
				j++;
			}
		}
	}
	return name;
}

function preparedataDict (data){
	var name = {};
	var j = 0;
	data = data.replace(/\n/g,'');
	data = data.replace(/\t/g, ' ');
	var res = data.split(" ");
	for (var i = 0; i<res.length;i++){
		//For now only checks variables
		if (res[i] == "private"){
			//For now only supports boolean type
			if (res[i+1] == "boolean"){
				if (res[i+3] != '='){
					name[j] = res[i+2];
				}else{
					name[res[i+2]]=res[i+4];
				}
				j++;

			}
		}
	}
	return name;
}