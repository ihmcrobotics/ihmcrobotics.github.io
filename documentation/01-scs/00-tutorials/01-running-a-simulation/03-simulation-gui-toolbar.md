---

title: Simulation GUI Toolbar

---


Figure 2: Simulation GUI Toolbar.
Stop the playback by either going to Run->Stop on the menu bar or by pushing the stop button worddav7ee30db0d6e7a5804d3202f63e6b3528.png [imported from a Word document] .
Look at the graphs of the data. Notice that there is a green bar at the beginning of the data, a red bar at the end of the data, and a black bar somewhere in the middle. 
The green bar marks the data in point. The red bar marks the data out point. And the black bar marks the current index. 
The in and out points are used in any of the functions which require a window on the data. For example, when you played back the data, the playback looped to the in point once it reached the out point.
Zoom in on the data by going to Graphs->Zoom In on the menu or by pushing the Zoom In button worddav99bde806bfd2a22ce6d048ab5ee297ba.png [imported from a Word document] .
Push it a couple more times to zoom in further. Notice that zooming tends to center the data on the black line that marks the current index.
 Zoom out by going to Graphs->Zoom Out on the menu or by pushing the Zoom Out button worddav0b42972260233df4cca210ef09aeb223.png [imported from a Word document] . 
 Zoom in and out until a few cycles of data fit the screen.
"Scrub" the data by left clicking on the data and dragging the mouse left and right. Notice that this moves the black line marking the current index.
 As you move the index, both the 3D graphics of the robot will be animated, and the variable values in the variable panels will update.
"Step" forward through the data, one point at a time, by either going to Run->Step Forward on the menu or by pushing the Step Forward button worddav202bfa042c8ff8f2bc93bff48ccf67cb.png [imported from a Word document] or by pushing the right arrow key on your keyboard after clicking in the graph. "Step" backward through the data, one point at a time, by either going to Run->Step Backward on the menu or by pushing the Step Backward button worddav1dd1a033d6e5aa90f54e6508c189688e.png [imported from a Word document] or by pushing the left arrow key on your keyboard after clicking in the graph.
"Pan" the data by first zooming into a section and then clicking on the data with the right mouse button and dragging left and right. This will move the data that you are zoomed into.
Zoom out so that you can see the in point (green line), out point (red line) and current index (black line) in the data. 
Go to the in point by either going to Run->Goto In Point on the menu or by pushing the Goto In Point button worddav6956f46d0cdf2772bd041273a1318812.png [imported from a Word document] .
Go to the out point by either going to Run->Goto Out Point on the menu or by pushing the Goto Out Point button worddav1e26bc4f242dbd964abc986aa78a689b.png [imported from a Word document] .
Now change the in point. First, left click somewhere in the middle of the data to move the current index there. Next, go to Run->Set In Point on the menu or push the Set In Point button worddavbf5ede9f731d2eb19ad8e4d52d916b54.png [imported from a Word document] .
Now change the out point. First, left click somewhere in the middle of the data to move the current index there. Next, go to Run->Set Out Point on the menu or push the Set Out Point button worddava23084bba63cf7a9ba64adbc7f3f5b5a.png [imported from a Word document] .
Play the simulation (Run->Play on menu or play button worddavc3349db686adcf9d8ba957577b0bb2cd.png [imported from a Word document] ) and notice that it now loops around the new in and out points. Note that if the in point is after the out point, then the playback loops around the entire data buffer, which is a circular buffer.