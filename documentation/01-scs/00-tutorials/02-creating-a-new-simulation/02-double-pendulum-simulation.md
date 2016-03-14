---
title: DoublePendulumSimulation.java
---

1.Add a new class by going to File->New->Class on the menu. For the Class Name enter "DoublePendulumSimulation". For the package enter com.yobotics.exampleSimulations.doublePendulum. Click Finish.
2. Fill in DoublePendulumSimulation as shown below:

{% highlight java %}
package us.ihmc.exampleSimulations.doublePendulum;
 
import us.ihmc.simulationconstructionset.SimulationConstructionSet;
 
public class DoublePendulumSimulation
{
   private SimulationConstructionSet sim;
   public DoublePendulumSimulation()
   {
      DoublePendulumRobot doublePendulum = new DoublePendulumRobot();
//      doublePendulum.setController(new DoublePendulumController(doublePendulum,"doublePendulumController"));
      sim = new SimulationConstructionSet(doublePendulum);
      sim.setGroundVisible(false);
      sim.setCameraPosition(0, -40.0, 2.0);
       
      Thread myThread = new Thread(sim);
      myThread.start();
   }
    
   public static void main(String[] args)
   {
      new DoublePendulumSimulation();
   }
}
{% endhighlight %}

1. When your simulation is run **(NOTE: You need to actually add the DoublePendulumRobot class first before you can run the above code)**, first the main method will be called.
It creates a new DoublePendulumSimulation. In creating a DoublePendulumSimulation, a DoublePendulumRobot is first created, and then a SimulationConstructionSet object is created with that robot.
A Thread is then created using the SimulationConstructionSet object. Finally the Thread is started, thereby starting your simulation. This simple template can be used for creating any simulation using the Simulation Construction Set.