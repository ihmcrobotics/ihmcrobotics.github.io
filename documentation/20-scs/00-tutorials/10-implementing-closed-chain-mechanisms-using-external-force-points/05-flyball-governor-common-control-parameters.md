---

title: FlyballGovernorCommonControlParameters Class

---

## Create another class called FlyballGovernorCommonControlParameters
   Fill the class with the following:
   
{%highlight java%}
package us.ihmc.exampleSimulations.flyballGovernor;
import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;
import us.ihmc.robotics.dataStructures.registry.YoVariableRegistry;

public class FlyballGovernorCommonControlParameters
{
    private final YoVariableRegistry registry = new YoVariableRegistry(getClass().getSimpleName());
    private final DoubleYoVariable k_feedback = new DoubleYoVariable("k_feedback", registry);
    private final DoubleYoVariable q_d_cylinder_z = new DoubleYoVariable("q_d_cylinder_z", registry);

    public FlyballGovernorCommonControlParameters()
    {
        initialize();
    }

    public void initialize()
    {
        k_feedback.set(0.2);
        q_d_cylinder_z.set(0.1);
    }
    public DoubleYoVariable getK_feedback()
    {
        return k_feedback;
    }
    public DoubleYoVariable getQ_d_cylinder_z()
    {
        return q_d_cylinder_z;
    }
    public YoVariableRegistry getYoVariableRegistry()
    {
        return registry;
    }
}
{%endhighlight%}