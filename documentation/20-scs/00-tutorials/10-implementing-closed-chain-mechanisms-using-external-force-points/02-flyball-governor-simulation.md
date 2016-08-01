---

title: FlyballGovernorSimulation Class

---

## Create a class called FlyballGovernorSimulation
   Fill the class with the following:  
   This class simply creates a FlyballGovernorSimulation and performs the basic setup of the simulation.
{%highlight java%}
package us.ihmc.exampleSimulations.FlyballGovernor;

import javax.vecmath.Vector3d;
import us.ihmc.simulationconstructionset.Robot;
import us.ihmc.simulationconstructionset.SimulationConstructionSet;
import us.ihmc.robotics.dataStructures.YoVariableHolder;

public class FlyballGovernorSimulation
{
    private SimulationConstructionSet sim;
    public FlyballGovernorSimulation()
    {
        FlyballGovernorCommonControlParameters controllerParameters = new FlyballGovernorCommonControlParameters();

        FlyballGovernorRobot flyballGovernor1 = new FlyballGovernorRobot("UsualConstraint", controllerParameters, new Vector3d());
        flyballGovernor1.setController(new FlyballGovernorSimpleClosedLoopConstraintController(flyballGovernor1));
        sim = new SimulationConstructionSet(flyballGovernor1);
        sim.addYoVariableRegistry(controllerParameters.getYoVariableRegistry());
        sim.setCameraPosition(-0.0, 2.7265, 0.2599);
        sim.setCameraFix(0.0132, -0.0245, 0.113);
        sim.setupEntryBox("q_d_cylinder_z");
        sim.setupEntryBox("k_feedback");
        sim.setupGraph("qd_rotation");
        sim.setupGraph(new String[] {"q_d_cylinder_z", "q_cylinder_z"});
        sim.setupGraph("tau_rotation");
        sim.setDT(0.002, 10);
        Thread myThread = new Thread(sim);
        myThread.start();
    }
    public static void main(String[] args)
    {
        new FlyballGovernorSimulation();
    }
}
{%endhighlight%}