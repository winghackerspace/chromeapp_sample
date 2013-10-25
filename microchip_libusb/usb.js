var PIC_VENDOR_ID = 1240; //0x4D8, microchip
var PIC_PRODUCT_ID = 516; //0x0204, libusb demo
var DEVICE_INFO = {"vendorId": PIC_VENDOR_ID, "productId": PIC_PRODUCT_ID };

var picusb; //connection handler for usb device

//-----------------------------------------------------------------------------
//setStatus is use as to display "debug" message.
//
function setStatus(status)
{
  document.getElementById('status').innerText = status;
}

//-----------------------------------------------------------------------------
function onLed()
{
    setStatus("Toggle LED");

    //claim the interface 0 
    chrome.usb.claimInterface( picusb, 0, function(e){console.log("claim interface"); });

    var bulkWrite = {
        "direction": "out",
        "endpoint": 1,
        "data": new Uint8Array([128]).buffer }; //send 0x80 to the microchip

    //send packet
    chrome.usb.bulkTransfer(picusb, bulkWrite, function(e) {console.log("Send data" + e.data); });
}

//-----------------------------------------------------------------------------
var gotPermission = function(result)
{
    setStatus("Got Permission");

    chrome.usb.findDevices( DEVICE_INFO,
        function(devices) {
            if(!devices || !devices.length){
                setStatus("device not found");
                return;
            }
            setStatus("Found devices: "+ devices[0].handle);
            picusb = devices[0];

        }//function(devices)
    );
};

//-----------------------------------------------------------------------------
var permissionObj = {permissions: [{'usbDevices': [DEVICE_INFO] }]};

function onRequestClick()
{
    setStatus("Request Permission");

    chrome.permissions.request( permissionObj, function(result) {
    if (result) {
      gotPermission();
    } else {
        setStatus("Permission not granted");
    }
  });

}

//-----------------------------------------------------------------------------
onload = function()
{
    setStatus("Hello World");

    var request=document.getElementById("requestPermission");
    request.addEventListener('click', onRequestClick);

    var led=document.getElementById("led");
    led.addEventListener('click', onLed);

};//onload

