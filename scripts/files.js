//PHP or NODE.JS to r/w
function writeTextFile(filepath, output, type) {
	//sw = new StreamWriter("TestFile.txt");
    // Add some text to the file.
    //sw.Write("This is the ");
	//var txtFile = new File(filepath);
	//txtFile.open("w"); //
	//txtFile.writeln(output);
	//txtFile.close();
		if (type == 'java'){
			var link = document.getElementById('downloadlinkjava');
		}else{
			var link = document.getElementById('downloadlinkros');
		}
		link.href = makeTextFile(output);
		link.download = filepath;
		var event = new MouseEvent('click');
		link.dispatchEvent(event);
}
var textFile = null;
makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};

function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}