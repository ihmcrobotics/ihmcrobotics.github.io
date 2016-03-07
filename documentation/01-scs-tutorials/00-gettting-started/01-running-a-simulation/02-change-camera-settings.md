---

title: Change the camera settings

---

Change the camera view of the robot. To do so, first make sure that the Track or Dolly check boxes are unchecked. 
Then, place your mouse pointer over the 3D window and hold the left button down. Now, drag the mouse until the desired orientation is achieved.
To zoom, hold the middle mouse button down while dragging the mouse up or down. 
To move the fix point of the camera (what the camera is looking at), hold down the right button while dragging the mouse. 
To set the fix point to be at the location of something in the graphical screen, hold down Shift and then click on the location on the screen. 
Play with moving the camera via the mouse until you are comfortable with it.
Change the camera parameters by using the dialog accessed through the pull-down menu (Viewport->Camera Properties…).
If tracking is enabled, then the camera will track the location specified by the variables q_x, q_y, q_z. 
If dolly is enabled, then the camera will move at an offset from the location specified by the variables q_x, q_y, q_z. 
The variables used for tracking or dolly can also be set using the SimulationConstructionSet API.



Figure 1: Screen snapshot of Yobotics! Simulation Construction Set GUI Window with a Spring Flamingo Simulation. 