---

title: Graph properties

---
Click on the "New Graph" button under the graphs. This will create a new empty graph.
Find q_rh (the angle of the robot's right hip) in the first variable panel on the left (labeled SpringFlamingo). Left click on it, which will highlight the variable. 
Middle click on the new empty graph (labeled "Click to graph selected variable.") This will graph q_rh in that graph. Each graph can contain up to 4 variables. 
Create some more new graphs, choose some more variables and place them in the graphs. Note that as more graphs are created, the others get smaller to accommodate them.
Notice that the name and current value of each variable is underneath the graph it appears in. Ungraph some of the variables by clicking their name with the middle mouse button. 
Note that if you remove all the variables from a graph, it will be empty but not disappear. If you wish to remove the empty graphs, click on the "Remove Empty" button.
Click on the "Add Column" button to increase the number of graph columns. Click on the "Sub Column" button to remove the number of graph columns.
Double click on a variable name in one of the graphs. A Graph Properties Dialog Box (see Figure 3) will appear. This box will show which variables int he graph are set to AutoScale.
 This means that when graphed, a variable will be plotted such that it vertically fills the graph, with the minimum value touching the bottom of the graph and the maximum value touching the top of the graph. 
 Change to Manual scaling by clicking on the Manual radio button. Notice that the manual settings are now enabled. The default values are 0.0 minimum and 1.0 maximum. 
 The data range is listed on the bottom. Change the minimum and maximum values. Graph the variable if it isn't already (middle click in an open graph) and note that the variable is plotted with the new data range.
 


Figure 3: Variable Properties Dialog.

Figure 4: Phase Diagram of q_pitch vs. q_z in Spring Flammingo.
Double click on a graph containing a couple variables. Set them to manual and change their plotting ranges. Click Apply to see the graphs change to reflect your changes. Click OK when done.
Double click on a graph containing two variables and change the plot type from 'Time' to 'Phase'. The first variable will now be the x-axis, with the second variable the y-axis. 
Figure 4 shows an example of a phase plot you can make using the spring flammingo simulation.
As the robot is simulated, the data is stored in a data buffer. The period in which data is stored defaults to once every 20 milliseconds (50 Hertz). This can be changed through the SimulationConstructionSet API.
The default size of the data buffer is 8192 points. With these two defaults, 40.96 seconds of data can be recorded. If the simulation runs over this size, the buffer will become about 25% larger. 
It will continue to enlarge until it hits the max size limit that you set in the dialog box (default of 16384). Change these properties by going to Data Buffer->Data Buffer Properties on the menu. A dialog box pops up. 
Click on the Wrap radio button to change the fill policy from Enlarge to Wrap. With this policy, if you reach the end of the buffer, the current index is wrapped to the beginning of the buffer.