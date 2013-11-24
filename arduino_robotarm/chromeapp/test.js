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
function setPosition1(position)
{
    var buffer = new ArrayBuffer(2);
    var uint8View = new Uint8Array(buffer);

    uint8View[0] = 49;
//  chrome.serial.write(connectionId, buffer, function() {});

    uint8View[1] = '0'.charCodeAt(0) + position;
    //console.log(
    chrome.serial.write(connectionId, buffer, function() {});

}

function setPosition2(position)
{
    var buffer = new ArrayBuffer(2);
    var uint8View = new Uint8Array(buffer);

    uint8View[0] = 50;
//    chrome.serial.write(connectionId, buffer, function() {});

    uint8View[1] = '0'.charCodeAt(0) + position;
    chrome.serial.write(connectionId, buffer, function() {});

}

function setPosition3(position)
{
    var buffer = new ArrayBuffer(2);
    var uint8View = new Uint8Array(buffer);

    uint8View[0] = 51;
    //chrome.serial.write(connectionId, buffer, function() {});
    uint8View[1] = '0'.charCodeAt(0) + position;
    chrome.serial.write(connectionId, buffer, function() {});
}

function setPosition4(position)
{
    var buffer = new ArrayBuffer(2);
    var uint8View = new Uint8Array(buffer);

    uint8View[0] = 52;
    //chrome.serial.write(connectionId, buffer, function() {});
    uint8View[1] = '0'.charCodeAt(0) + position;
    chrome.serial.write(connectionId, buffer, function() {});
}

function setPosition5(position)
{
    var buffer = new ArrayBuffer(2);
    var uint8View = new Uint8Array(buffer);

    uint8View[0] = 53;
    //chrome.serial.write(connectionId, buffer, function() {});
    uint8View[1] = '0'.charCodeAt(0) + position;
    chrome.serial.write(connectionId, buffer, function() {});
}

//-----------------------------------------------------------------------------
//This the main entry fucntion.
onload = function() {

    setStatus("onLoad");

    chrome.serial.getPorts(function(ports)
    {
        buildPortPicker(ports)
        openSelectedPort();
    });

    document.getElementById("servo1").onchange = function()
    {
        setPosition1(parseInt(this.value, 10));
    };
    document.getElementById("servo2").onchange = function()
    {
        setPosition2(parseInt(this.value, 10));
    };

    document.getElementById("servo3").onchange = function()
    {
        setPosition3(parseInt(this.value, 10));
    };
    document.getElementById("servo4").onchange = function()
    {
        setPosition4(parseInt(this.value, 10));
    };
    document.getElementById("servo5").onchange = function()
    {
        setPosition5(parseInt(this.value, 10));
    };
};//onLoad

