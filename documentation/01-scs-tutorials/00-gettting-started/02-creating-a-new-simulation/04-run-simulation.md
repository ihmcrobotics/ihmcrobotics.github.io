---
title: Run the simulation
---

1. Before compiling, make sure that the Simulation Construction Set Libraries are referenced properly in Eclipse. Go to Project->Properties on the menu. Click on Java Build Path on the left. 
Select the Libraries tab. Make sure that all the required .jar files are included in the libraries.
2. Open DoublePendulumSimulation and click on  in the top bar of buttons. Alternatively, on the menu, select Run->Run As->Java Application. This should compile and run the project.
 If there are any problems, they should appear in the Problems Tab on the bottom of the Eclipse IDE.
3. A simulation of the DoublePendulumRobot should appear if there weren't any troubles in compiling.
4. Start running the simulation. Note that the pendulum doesn't do anything as it is perfectly (and unrealistically) suspended straight up. Stop the simulation.
Then put q_joint1 in a numeric entry box. Change its value from 0.0 to 0.01. Alternatively, you may change the first value in **pin1.setInitialState(0.0,0.0);** in the DoublePendulumRobot class.
5. Run the simulation again. Now the pendulum will fall and flop around. Notice that its behavior is chaotic, as this is a chaotic system. 
However, even though it is a chaotic system, if run twice in a row, it will produce the exact same trajectories due to starting from exactly the same initial conditions.
 If start from slightly different conditions, it should produce different behavior.
6. Experiment with different lengths, masses, and center of mass locations until you are comfortable with this simulation and compiling simulations with Eclipse.