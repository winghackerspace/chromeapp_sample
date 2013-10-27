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
// Send servo position parameters to Arduino
function setPosition(position)
{
    var buffer = new ArrayBuffer(1);
    var uint8View = new Uint8Array(buffer);

    uint8View[0] = '0'.charCodeAt(0) + position;
    chrome.serial.write(connectionId, buffer, function() {});
}

//-----------------------------------------------------------------------------
//This the main entry fucntion.
onload = function() {

    setStatus("onLoad");

    var set=document.getElementById("set");

    chrome.serial.getPorts(function(ports)
    {
        buildPortPicker(ports)
        openSelectedPort();
    });

    document.getElementById("servo1").onchange = function()
    {
        setPosition(parseInt(this.value, 10));
    };


};//onLoad
