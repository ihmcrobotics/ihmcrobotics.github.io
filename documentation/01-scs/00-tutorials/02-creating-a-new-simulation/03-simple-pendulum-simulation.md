---
title: SimplePendulumSimulation.java
---

1. Add a new class, right click on the package `simplePendulum` then select `New => Java Class` on the menu. For the Class Name enter "SimplePendulumSimulation". 
2. Fill in SimplePendulumSimulation.java as shown below:

<details open>
<summary> Simple Pendulum Simulation </summary>
{% highlight java %}

package us.ihmc.exampleSimulations.simplePendulum;

import us.ihmc.simulationconstructionset.SimulationConstructionSet;
import us.ihmc.simulationconstructionset.SimulationConstructionSetParameters;

/**
 * SimplePendulumSimulation
 */
public class SimplePendulumSimulation
{
   public static final double DT = 0.001;
   private SimulationConstructionSet sim;


   public SimplePendulumSimulation()
   {
      SimplePendulumRobot robot = new SimplePendulumRobot();
      
      SimulationConstructionSetParameters parameters = new SimulationConstructionSetParameters();
      parameters.setDataBufferSize(32000);

      sim = new SimulationConstructionSet(robot, parameters);
      sim.setDT(DT, 20);
      sim.setGroundVisible(true);
      sim.setCameraPosition(0, -9.0, 0.6);
      sim.setCameraFix(0.0, 0.0, 0.70);

      sim.setSimulateDuration(60.0);

      Thread myThread = new Thread(sim);
      myThread.start();
   }

   public static void main(String[] args)
   {
      new SimplePendulumSimulation();
   }
}


{% endhighlight %}
</details>

1. When your simulation is run, first the main method will be called.   
It creates a new SimplePendulumSimulation. In creating a SimplePendulumSimulation, a SimplePendulumRobot is first created, and then a SimulationConstructionSet object is created with that robot.
A Thread is then created using the SimulationConstructionSet runnable object. Finally the Thread is started, thereby starting your simulation.
This simple template can be used for creating any simulation using the Simulation Construction Set.  
You can find more about the methods used in this first class in the [SimulationConstructionSet API](/documentation/01-scs/01-api/00-api/) page.

Now you should have a enough elements in your robot and your simulation to make it run!