---
title: Configurations
---

Change the value of a variable by first left-clicking on it in the variable panel to highlight it. Then click on the text "UNUSED" in the unused entry box on the bottom of the screen. 
The variable name should appear in the box along with the current variable value.
 To change the variable value, click in the box, enter a new value, and press Enter. To remove a variable from an entry box, right click on the variable name.
Go to Configuration on the Menu Bar. VarGroups, GraphGroups, and EntryBoxGroups have been configured using the SimulationConstructionSet API. 
Select a configuration and notice how the graphs change.
Go to Window->New Graph Window to create a new window for graphs. Then in that window select a configuration to plot some variables. 
The new graph window operates similarly to the graphs on the main window.
Select a new camera view by going to Viewport->Camera and selecting one of the available cameras.
Select a different viewport configuration by going to Viewport on the Menu Bar and selecting view2. The viewports were configured using the SimulationConstructionSet API. 
See the file SpringFlamingoSimulation.java for the code. With a multi-camera viewport, the active camera has a highlighted window. Any graphics or camera operations will occur on that camera.
Well, that's about it. Play with the simulation until you are comfortable with it. Then try some of the others.
 Trebuchet Demo is a simulation of a Trebuchet, a medieval siege warfare device. FallingBrick Demo is a falling object falling on a contoured surface. 
 Mobile Demo is a mobile with 21 gimbal joints (36 degrees of freedom). To quit a simulation go to File->Exit.