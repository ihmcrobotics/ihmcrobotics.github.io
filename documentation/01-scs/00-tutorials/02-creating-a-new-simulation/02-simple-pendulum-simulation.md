---
title: SimplePendulumSimulation.java
---
To start with this tutorial on Simulation Contruction Set we will create one of the simplest robot possible a Pendulum.  
Going through this first tutorial will help you familiarize with the structure of a simulation program.     

1. Add a new class, right click on the package `simplePendulum` then select `New > Java Class` on the menu. For the Class Name enter "SimplePendulumSimulation". 
2. Fill in SimplePendulumSimulation as shown below:

<details>
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

1. When your simulation is run **(NOTE: You need to actually add the SimplePendulumRobot class first before you can run the above code)**, first the main method will be called. 
It creates a new SimplePendulumSimulation. In creating a SimplePendulumSimulation, a SimplePendulumRobot is first created, and then a SimulationConstructionSet object is created with that robot.
A Thread is then created using the SimulationConstructionSet runnable object. Finally the Thread is started, thereby starting your simulation.
This simple template can be used for creating any simulation using the Simulation Construction Set.