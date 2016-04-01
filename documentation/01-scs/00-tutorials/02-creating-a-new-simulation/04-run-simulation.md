---
title: Run the simulation
---
1. Make sure that your editor does not complain about any compilation issues and that all imports are specified. 
2. Select the SimplePendulumSimulation file in your editor and run it. 
3. Once your program launches you should see the SCS Splash Screen, followed by the SimplePendulum simulation. 
4. Look for the q_FulcrumPin variable in the search tab of the Variable Viewer, create a new graph and drag the q_FulcrumPin into it.
5. Click the `Simulate` button. The pendulum should start swinging very rapidly and finally stop after converging to its equilibrium position.  
The simulation should stop shortly after the pendulum position has converged. That's perfectly normal. If you remember we had set the simulation time parameter to 60 seconds.     
5. ZOom in a little, notice that the graph accurately shows the oscillations of the pendulum at each time step. 
6. Click and drag your mouse cursor on the graph to position the current time stamp to the beginning of the simulation (a black vertical bar should appear as you are dragging the mouse and follow your movement as the pendulum animates)
7. Click on the play button, now the pendulum will swing back and forth and stop after 60 seconds. Interestingly you can notice that if run the same simulation code twice in a row, it will produce the exact same trajectories due to starting from exactly the same initial conditions.
 If start from slightly different conditions, it should produce different behavior.

![pendulum initial state](/resources/images/scs-tutorials/simple-pendulum/pendulum-after-run-sim.png)  
Initial state of the pendulum - Starting from an angle of 90 degrees (q_Pinjoint value of 1.57 or π/2), converges to 0 after few seconds:  

You can now experiment different initial parameters and damping

In the next tutorial we are going to add some simple control to it. 