---

title: Graphing the Variables

---
SCS allows for displaying 2D graphs of any variable in the simulation.

* To create a new empty graph, click on the `New Graph` button under the graphs section at the bottom of the GUI window.
* To add a variable to a graph, first select it in the variables tab by left-clicking it, then middle-click on the new empty graph.  

Go ahead and add `q_leftHipPitch` (the pitch angle of the robot's left hip) to the empty graph.  This will graph `q_leftHipPitch` from buffered data. If you have not run the sim or do not see any data, run the sim now.  Each graph can contain up to 4 variables.

Create some more new graphs, choose some more variables and place them in the graphs. Note that as more graphs are created, the others get smaller to accommodate them.

![VarGraph](/resources/images/scs-tutorials/scsVariablesGraph.png)

* The name and current value of each variable is underneath the graph it appears in. 
* To remove a variable from a graph, middle click its name or right-click the graph and select it from the context menu. 
* Note that if you remove all the variables from a graph, it will be empty but not disappear. If you wish to remove the empty graphs, click on the `Remove Empty` button.
* Click on the `Add Column` button to increase the number of graph columns. Click on the `Sub Column` button to remove the number of graph columns.

![VarGraphProps](/resources/images/scs-tutorials/scsVariableGraphProperties.png)

* Double click on a variable name in one of the graphs. A Graph Properties Dialog Box will appear. This box will show which variables in the graph are set to AutoScale. This means that when graphed, a variable will be plotted such that it vertically fills the graph, with the minimum value touching the bottom of the graph and the maximum value touching the top of the graph. 
* Change to Manual scaling by clicking on the Manual radio button. Notice that the manual settings are now enabled. The default values are 0.0 minimum and 1.0 maximum. 
 The data range is listed on the bottom. Change the minimum and maximum values. Graph the variable if it isn't already (middle click in an open graph) and note that the variable is plotted with the new data range.
* Double click on a graph containing two variables and change the plot type from 'Time' to 'Phase'. The first variable will now be the x-axis, with the second variable the y-axis. 
