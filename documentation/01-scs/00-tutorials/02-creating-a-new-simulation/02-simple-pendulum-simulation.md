---

title: The Simulation Class 
full-title: "The Simulation Class: SimplePendulumSimulation.java"

---

Every SCS simulation requires an instance of `us.ihmc.simulationconstructionset.SimulationConstructionSet` and a Thread to run it.   IHMC's convention is to create a 'simulation' class which performs this function.
 
## Create `SimplePendulumSimulation`

1. In the java directory of your project, `src/main/java`, create a new java class `us.ihmc.exampleSimulations.simplePendulum.SimplePendulumSimulation`.

2. The simulation class is responsible for instantiating an instance of `SimulationConstructionSet` and starting a new `Thread` to run it.  The simplest version of this is as follows:

    ```java
    package us.ihmc.exampleSimulations.simplePendulum;
    
    import us.ihmc.simulationconstructionset.SimulationConstructionSet;
    
    /**
     * SimplePendulumSimulation
     */
    public class SimplePendulumSimulation
    {
       private SimulationConstructionSet sim;
    
       public SimplePendulumSimulation()
       {
          sim = new SimulationConstructionSet();
    
          Thread myThread = new Thread(sim);
          myThread.start();
       }
    
       public static void main(String[] args)
       {
          new SimplePendulumSimulation();
       }
    }
    ```

3. Replace your class contents with the above and run the simulation. Don't forget to add `-Xms4096m -Xmx4096m` to your VM's run configuration as specified in the [Quick Start]. Since there is no robot in your simulation, you will just get an empty world as follows:  
    
    ![blank simulation](/resources/images/documentation/scsTutorial/blank-Simulation.png)

4. Before we add a robot, there are some basic parameters and settings that you should apply to `SimulationConstructionSet`.  Replace the simulation class contents with the following:

    ```java
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
          parameters.setDataBufferSize(32000);    // 1.
    
          sim = new SimulationConstructionSet(parameters);
          sim.setDT(DT, 20);                      // 2.
          sim.setGroundVisible(true);             // 3.
          sim.setCameraPosition(0, -9.0, 0.6);    // 4.
          sim.setCameraFix(0.0, 0.0, 0.70);       // 5.
          sim.setSimulateDuration(60.0);          // 6.
    
          Thread myThread = new Thread(sim);
          myThread.start();
       }
    
       public static void main(String[] args)
       {
          new SimplePendulumSimulation();
       }
    }
    ```
    
    <br>
    If you run the simulation now, it will not look any different, but what you have done is:

    1. Specified the intial data buffer size to be 32000 bytes.

    2. Set the simulation's delta time value to be 20 milliseconds.

    3. Set the ground to be visible in the 3D view.

    4. Set the location of the camera in the 3D world.

    5. Set the orientation of the camera in the 3D world.

    6. Specified that the simulation will only run for a duration of 60 seconds.  For this tutorial, this allows the simulation to run to a point where it does not overflow the data buffer.

Now it's time to add a robot.

[Quick Start]: /quickstart