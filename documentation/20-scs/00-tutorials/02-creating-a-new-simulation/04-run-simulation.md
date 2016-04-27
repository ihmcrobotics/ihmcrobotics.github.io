---
title: Run the simulation
---

Now run `SimplePendulumSimulation`. You should see the SCS interface and it should look something like this:

![pendulum interface](/resources/images/documentation/scsTutorial/pendulum-simulation.png)

1. Press the Simulate button ![simulate](/resources/images/scs-tutorials/scsSimulateButton.png) and the pendulum will move and stop hanging at the bottom. In simulate mode, SCS will run as fast as possible, in this case, faster than real-time.  Since we specified the duration to be 60 seconds it also stops rather quickly.  If you press the Play button ![play](/resources/images/scs-tutorials/scsReplayButton.png) the simulation will playback in real-time.
2. In the Variable Search field press the space bar.  This will show all ten variables in the SCS system. Press the Goto In Point button ![gotoIn](/resources/images/scs-tutorials/scsGotoInPointButton.png) to reset the simulation to time 0, change a value such as `b_damp_FulcrumPinJoint` and press the Simulate button again to see how it affects the robot.
3. In the robot class experiment with different lengths, damping values, masses, and center of mass locations until you are comfortable with this simulation.