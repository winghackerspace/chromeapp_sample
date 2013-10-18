//connection ID for the serial API
var connectionId = -1;

//-----------------------------------------------------------------------------
//setStatus is use as to display "debug" message.
//
function setStatus(status)
{
  document.getElementById('status').innerText = status;
}


//-----------------------------------------------------------------------------
//build the Serial Port selector for user to choose serial port.
//
function buildPortPicker(ports) 
{
	setStatus("buildPortPicker"); 
  
	var eligiblePorts = ports.filter(function(port) 
	{
		return !port.match(/[Bb]luetooth/);
	});

	var portPicker = document.getElementById('port-picker');
	eligiblePorts.forEach(function(port)
	{
        var portOption = document.createElement('option');
        portOption.value = portOption.innerText = port;
        portPicker.appendChild(portOption);
	});

    portPicker.onchange = function()
	{
        if (connectionId != -1) {
        chrome.serial.close(connectionId, openSelectedPort);
        return;
        }
        openSelectedPort();
    };
}//buildPortPicker

//-----------------------------------------------------------------------------
//callback function for the chrome.serial.open
//
function onOpen(openInfo)
{
    setStatus("onOpen"); 
    connectionId = openInfo.connectionId;

    if (connectionId == -1) 
	{
        setStatus("connection fail");
        return;
    }
 
}//onOpen

//----------------------------------------------------------------------------- 
//open the selected serial port
//
function openSelectedPort() 
{
  var portPicker = document.getElementById('port-picker');
  var selectedPort = portPicker.options[portPicker.selectedIndex].value;
  //open the serial port
  chrome.serial.open(selectedPort,{bitrate:9600}, onOpen);
}

//-----------------------------------------------------------------------------
//This the main entry fucntion.
onload = function() {

    setStatus("onLoad"); 
  
    var set=document.getElementById("set");

	//set button event listener
	//when set button is pressed, send char '0' to the serial port
    set.addEventListener('click', function() 
	{
        var buf = new ArrayBuffer(1);
        var data= new Uint8Array(buf);
        data[0] = 48;   //48 is '0'
    
        chrome.serial.write(connectionId, buf, function() {});
        setStatus("Set is pressed");
    });
  
	//clear button event listener, 
	//when clear button is pressed, send char '1' to the serial port
    clear.addEventListener('click', function()
	{
        var buf = new ArrayBuffer(1);
        var data= new Uint8Array(buf);
        data[0] = 49;
        chrome.serial.write(connectionId, buf, function() {});
        setStatus("clear is pressed");
    });

    chrome.serial.getPorts(function(ports)
	{
        buildPortPicker(ports)
        openSelectedPort();
    });

};//onLoad
