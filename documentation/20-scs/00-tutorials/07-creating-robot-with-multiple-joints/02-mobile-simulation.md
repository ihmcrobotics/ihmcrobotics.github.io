---

title: Mobile Simulation

---

## Create the class MobileSimulation
   Fill it in as follows:

{%highlight java%}
package us.ihmc.exampleSimulations.mobile;
import us.ihmc.simulationconstructionset.SimulationConstructionSet;
/**
 * A simulation of a child’s mobile toy that uses a tree structure of 21 gimbal
 * joints (63 degrees of freedom total).
 */
public class MobileSimulation
{
   private SimulationConstructionSet sim;
   public MobileSimulation()
   {
      // Create an instance of MobileRobot
      MobileRobot mobile = new MobileRobot();
      // Instantiate a SCS object using the MobileRobot object reference
      sim = new SimulationConstructionSet(mobile);
      sim.setGroundVisible(false);
      sim.setCameraTracking(false, false, false, false);
      sim.setCameraDolly(false, false, false, false);
      // set camera to a convenient viewing angle
      sim.setCameraPosition(1.0, 1.0, 0.5);
      sim.setCameraFix(0.0, 0.0, 0.8);
      sim.setCameraTrackingVars("ef_track00_x", "ef_track00_y", "ef_track00_z");
      sim.setDT(0.02, 1);
      Thread myThread = new Thread(sim);
      myThread.start();
   }
   public static void main(String[] args)
   {
      new MobileSimulation();
   }
}
{%endhighlight%}

Note that the integration time step is set to 0.02 seconds: `sim.setDT(0.02, 1);`

This is a fairly large time step, but in this case it is possible since there are no high-frequency interactions in the system. In general, to set the integration time step, experiment with different values. As the time step gets higher, you will see different behavior due to numerical instabilities. Choose a time step which is low enough that making it any lower does not change the outcome of the simulation. 

The second parameter to setDT is 1, meaning that every integration step will be recorded.

Note that camera tracking and dollying are off and ground is set to invisible.

Instead of tracking and dollying the camera position and fix are set to get a good view of the mobile:

   `sim.setGroundVisible(false);`  
   `sim.setCameraTracking(false,false,false,false);`  
   `sim.setCameraDolly(false,false,false,false);`  
   `sim.setCameraPosition(1.0,1.0,0.5);`  
   `sim.setCameraFix(0.0,0.0,0.8);`  