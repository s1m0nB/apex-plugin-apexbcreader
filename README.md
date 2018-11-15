APEX PlugIn: APEXBCREADER
=========================

This plugin is a javascript barcode reader region plugin for use in Oracle Application Express. 
Based upon the barcode reader of https://github.com/EddieLa/JOB v1.6.1

## usage
Download the latest PlugIn SQL File from this repository and import it in your APEX application.

The PlugIn can be used in APEX as a region. it uses the html5 <video> capabilties for the camera. 
The barcode reader will analyze the image and the value of barcode is read with the event 'apexbcreader'. 
You can use a Dynamic Action on this event to process this value further.

## reference
https://eocoe.blogspot.com/2018/11/a-barcode-reader-for-apex.html

https://github.com/EddieLa/JOB
