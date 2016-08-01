---

title: FlyballGovernorRobot Class

---

## Create another class called FlyballGovernorRobot
   Fill the class with the following:  
   This class simply creates the initControl and doControl methods and declares initial variables that can be easily changed later on.

{% highlight java %}
package us.ihmc.exampleSimulations.FlyballGovernor;

import javax.vecmath.Vector3d;
import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;
import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;
import us.ihmc.robotics.Axis;
import us.ihmc.simulationconstructionset.CylinderJoint;
import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;
import us.ihmc.simulationconstructionset.ExternalForcePoint;
import us.ihmc.simulationconstructionset.Link;
import us.ihmc.simulationconstructionset.PinJoint;
import us.ihmc.simulationconstructionset.Robot;
import us.ihmc.robotics.dataStructures.registry.YoVariableRegistry;
import us.ihmc.simulationconstructionset.robotController.RobotController;

@SuppressWarnings("unused")
public class FlyballGovernorRobot extends Robot implements RobotController
{
    private static final long serialVersionUID = -2657468625455223170L;
    private static final double L1 = 0.30, R1 = 0.01, M1 = 0.1, DAMPING1 = 0.0004;
    private static final double L2 = 0.2, R2 = 0.005, M2 = 0.5, SPHERE_R = 0.03, DAMPING2 = 0.5;
    private static final double L3 = 0.1, R3 = 0.005, M3 = 0.1;
    private static final double L4 = 0.06, R4 = 0.03, M4 = 0.2;
    private static final double Ixx1 = 0.5 * M1 * L1 * L1, Iyy1 = 0.5 * M1 * L1 * L1, Izz1 = 0.5 * M1 * R1 * R1;
    private static final double Ixx2 = 0.5 * M2 * SPHERE_R * SPHERE_R, Iyy2 = 0.5 * M2 * SPHERE_R * SPHERE_R, Izz2 = 0.5 * M2 * SPHERE_R * SPHERE_R;
    private static final double Ixx3 = 0.5 * M3 * L3 * L3, Iyy3 = 0.5 * M3 * L3 * L3, Izz3 = 0.5 * M3 * R3 * R3;
    private static final double Ixx4 = 0.5 * M4 * L4 * L4, Iyy4 = 0.5 * M4 * L4 * L4, Izz4 = 0.5 * M4 * R4 * R4;

    private final ExternalForcePoint constraint1A, constraint1B, constraint2A, constraint2B;
    
    public ExternalForcePoint getConstraint1A()
    {
        return constraint1A;
    }
    public ExternalForcePoint getConstraint1B()
    {
        return constraint1B;
    }
    public ExternalForcePoint getConstraint2A()
    {
        return constraint2A;
    }
    public ExternalForcePoint getConstraint2B()
    {
        return constraint2B;
    }
    private DoubleYoVariable tau_rotation, q_cylinder_z, qd_cylinder_z;
    private final YoVariableRegistry registry = new YoVariableRegistry("FlyballGovernorController");

    private final DoubleYoVariable k_feedback, q_d_cylinder_z;
    public DoubleYoVariable[] getControlVars()
    {
        return new DoubleYoVariable[] {k_feedback, q_d_cylinder_z};
    }
    public void initControl()
    {
        tau_rotation = (DoubleYoVariable)this.getVariable("tau_rotation");
        q_cylinder_z = (DoubleYoVariable)this.getVariable("q_cylinder_z");
        qd_cylinder_z = (DoubleYoVariable)this.getVariable("qd_cylinder_z");
    }
    public void doControl()
    {
        tau_rotation.set(k_feedback.getDoubleValue() * (q_d_cylinder_z.getDoubleValue() - q_cylinder_z.getDoubleValue()));
    }
    public YoVariableRegistry getYoVariableRegistry()
    {
        return registry;
    }

    public void initialize()
    {
    }
    public String getDescription()
    {
        return getName();
    }
}
{% endhighlight %}