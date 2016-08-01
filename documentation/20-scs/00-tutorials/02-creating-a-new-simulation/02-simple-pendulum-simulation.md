  
      Thread myThread = new Thread(sim);
      myThread.start();
   }

   public static void main(String[] args)
   {
      new SimplePendulumSimulation();
   }
}
{% endhighlight %}

* **Copy the Code and Run the Simulation**
Replace your class contents with the above and run the simulation.
Don't forget to add `-Xms4096m -Xmx4096m` to your VM's run configuration as specified in the [Quick Start]. Since there is no robot in your simulation, you will just get an empty world as follows:  
    ![blank simulation](/resources/images/documentation/scsTutorial/blank-Simulation.png)

## 2.Set the Simulation Parameters

Before we add a robot, there are some basic parameters and settings that you should apply to `SimulationConstructionSet`.  Replace the simulation class contents with the following:

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
      SimulationConstructionSetParameters parameters = new SimulationConstructionSetParameters();
      parameters.setDataBufferSize(32000);    

      sim = new SimulationConstructionSet(parameters);
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

<br>

If you run the simulation now, it will not look any different, but what you have done is:

* **Create Simulation Parameters**  
`SimulationConstructionSetParameters parameters = new SimulationConstructionSetParameters();`
Instantiate a `SimulationConstructionSetParameters` object
`parameters.setDataBufferSize(32000);`
Sets the initial data buffer size to be 32000 bytes.

* **Create a new Simulation and set its properties**
`sim = new SimulationConstructionSet(parameters);`  
Instantiate a new Runnable SimulationConstructionSet object with default values and a buffer size of 32000 bytes as defined in `parameters` object   
`sim.setDT(DT, 20);`  
Sets the simulation's delta time value to be 20 milliseconds.             
`sim.setGroundVisible(true);`  
Sets the ground to be visible in the 3D view.  
`sim.setCameraPosition(0, -9.0, 0.6);`  
`sim.setCameraFix(0.0, 0.0, 0.70);`  
Sets the location and orientation of the camera in the 3D world.  
`sim.setSimulateDuration(60.0);`  
Specifies that the simulation will only run for a duration of 60 seconds.  For this tutorial, this allows the simulation to run to a point where it does not overflow the data buffer.

Now it's time to add a robot.

{% assign QuickStart = site.data.constants["QuickStart"] %}
 
[Quick Start]: {{QuickStart.url}}
