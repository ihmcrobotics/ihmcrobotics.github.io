---
title: Creating a new simulation
---

This tutorial assumes you know a little about Eclipse, and a little about Java. In parallel with these tutorials, you should also experiment with Eclipse to learn how to use its features. 
You should also learn Java, if you haven't already, by picking up a good Java book or two. We recommend Bruce Eckel's "Thinking in Java", which can be downloaded for free at [bruceeckel.com](http://www.mindview.net/Books/TIJ/) , or purchased. 
In this tutorial, we will create a simple simulation of a double pendulum. By the end of the tutorial you should be able to create and simulate simple passive systems with pin joints.

1. Start Eclipse.
2. Start a new project by going to File->New-> Java Project. The New Java Project wizard will appear for entering the project information. For project name enter "DoublePendulum". Select Create new project in workspace. Keep the other entries as their defaults. Click Next.
3. The Java Settings window of the project wizard will appear. Change the Default output folder to DoublePendulum/classes instead of DoublePendulum/bin.
4. Click on the Projects tab and include the SimulationConstructionSet, IHMCJavaToolkit, IHMCRoboticsToolkit, Graphics3DAdapter. Click on the Libraries tab and Add Library and include JRE System Library. Click finish when done.
5. Every simulation requires a Robot class and a Simulation class. Therefore we will create **DoublePendulumRobot** and **DoublePendulumSimulation**.



