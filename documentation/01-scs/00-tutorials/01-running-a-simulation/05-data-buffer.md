---

title: Data Buffer

---

As the robot is simulated, the data is stored in a data buffer. The period in which data is stored defaults to once every 20 milliseconds (50 Hertz). This can be changed through the SimulationConstructionSet API.
The default size of the data buffer is 8192 points. With these two defaults, 40.96 seconds of data can be recorded. If the simulation runs over this size, the buffer will become about 25% larger. 
It will continue to enlarge until it hits the max size limit that you set in the dialog box (default of 16384). Change these properties by going to Data Buffer->Data Buffer Properties on the menu. A dialog box pops up. 
Click on the Wrap radio button to change the fill policy from Enlarge to Wrap. With this policy, if you reach the end of the buffer, the current index is wrapped to the beginning of the buffer.

The data buffer can be made smaller by cropping it to the in point and out point.
Choose a window of data that you'd like to crop and set the in point to the beginning of the window worddavbf5ede9f731d2eb19ad8e4d52d916b54.png [imported from a Word document] and the out point to the end of the window worddava23084bba63cf7a9ba64adbc7f3f5b5a.png [imported from a Word document] . 
Then go to Data Buffer->Crop Buffer to In/Out in the menu. The data should be cropped to the window you selected.
Sometimes you may wish to move the data so that the in point is the first index but you don't wish to crop the data.
To do this, go to Data Buffer->Pack Buffer to In/Out on the menu. This will rotate the data in the buffer so that the in point is "packed" to the left.