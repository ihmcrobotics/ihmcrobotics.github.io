---

title: Description and Analysis

---

## 1. Examine the FlyballGovernorRobot source code
   Add the following constructor to your FlyballGovernorRobot class.  
   Note where the ExternalForcePoints are created and attached.  
   
   {%highlight java%}
   public FlyballGovernorRobot(String nameSuffix, FlyballGovernorCommonControlParameters controllerParameters, Vector3d baseWorldOffset)
       {
           super("FlyballGovernor" + nameSuffix);
           PinJoint rotation = new PinJoint("rotation", baseWorldOffset, this, Axis.Z);
           rotation.setDamping(DAMPING1);
           Link centerRod = centerRod();
           rotation.setLink(centerRod);
           this.addRootJoint(rotation);
           // One of the flyballs
           PinJoint upperPivot1 = new PinJoint("upperPivot1", new Vector3d(R1, 0.0, L1), this, Axis.Y);
           upperPivot1.setInitialState(-0.3, 0.0);
           upperPivot1.setDamping(DAMPING2);
           upperPivot1.setLimitStops(-Math.PI / 2.0, -0.2, 100, 10);
           Link flyBall1 = flyBallLink();
           upperPivot1.setLink(flyBall1);
           rotation.addJoint(upperPivot1);
           PinJoint lowerPivot1 = new PinJoint("lowerPivot1", new Vector3d(0.0, 0.0, -2.0 / 3.0 * L2), this, Axis.Y);
           lowerPivot1.setInitialState(0.5, 0.0);
           Link loopLink1 = loopLink();
           lowerPivot1.setLink(loopLink1);
           upperPivot1.addJoint(lowerPivot1);
           constraint1A = new ExternalForcePoint("constraint1A", new Vector3d(0.0, 0.0, -L3), this);
           lowerPivot1.addExternalForcePoint(constraint1A);
           // The other flyball
           PinJoint upperPivot2 = new PinJoint("upperPivot2", new Vector3d(-R1, 0.0, L1), this, Axis.Y);
           upperPivot2.setInitialState(0.3, 0.0);
           upperPivot2.setDamping(DAMPING2);
           upperPivot2.setLimitStops(0.2, Math.PI / 2.0, 100, 10);
           Link flyBall2 = flyBallLink();
           upperPivot2.setLink(flyBall2);
           rotation.addJoint(upperPivot2);
           PinJoint lowerPivot2 = new PinJoint("lowerPivot2", new Vector3d(0.0, 0.0, -2.0 / 3.0 * L2), this, Axis.Y);
           lowerPivot2.setInitialState(-0.5, 0.0);
           Link loopLink2 = loopLink();
           lowerPivot2.setLink(loopLink2);
           upperPivot2.addJoint(lowerPivot2);
           constraint2A = new ExternalForcePoint("constraint2A", new Vector3d(0.0, 0.0, -L3), this);
           lowerPivot2.addExternalForcePoint(constraint2A);
   
           // The sliding Cylinder:
           CylinderJoint cylinderJoint = new CylinderJoint("cylinder_theta", "cylinder_z", baseWorldOffset, this, Axis.Z);
           cylinderJoint.setInitialState(0.0, 0.0, 0.05, 0.0);
           Link cylinderLink = cylinderLink();
           cylinderJoint.setLink(cylinderLink);
           this.addRootJoint(cylinderJoint);
           constraint1B = new ExternalForcePoint("constraint1B", new Vector3d(R4, 0.0, L4 / 2.0), this);
           constraint2B = new ExternalForcePoint("constraint2B", new Vector3d(-R4, 0.0, L4 / 2.0), this);
           cylinderJoint.addExternalForcePoint(constraint1B);
           cylinderJoint.addExternalForcePoint(constraint2B);
           this.setController(this);
   
           k_feedback = controllerParameters.getK_feedback();
           q_d_cylinder_z = controllerParameters.getQ_d_cylinder_z();
           this.initControl();
       }
       {%endhighlight%}
   
## 2. Add the link methods to the FlyballGovernorRobot class
   These methods build the links for the simulation.
{%highlight java%}
private Link centerRod()
    {
        Link ret = new Link("Center Rod");
        ret.setMass(M1);
        ret.setMomentOfInertia(0.0, 0.0, Izz1);
        ret.setComOffset(0.0, 0.0, L1 / 2.0);

        LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();
        linkGraphics.addCylinder(L1, R1, YoAppearance.Red());
        ret.setLinkGraphics(linkGraphics);

        return ret;
    }
    private Link flyBallLink()
    {
        Link ret = new Link("Flyball");
        ret.setMass(M2);
        ret.setMomentOfInertia(Ixx2, Iyy2, Izz2);
        ret.setComOffset(0.0, 0.0, -L2);

        LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();
        linkGraphics.translate(0.0, 0.0, -L2);
        linkGraphics.addCylinder(L2, R2);
        linkGraphics.addSphere(SPHERE_R, YoAppearance.DarkGreen());
        ret.setLinkGraphics(linkGraphics);

        return ret;
    }

    private Link loopLink()
    {
        Link ret = new Link("Loop");
        ret.setMass(M3);
        ret.setMomentOfInertia(Ixx3, Iyy3, Izz3);
        ret.setComOffset(0.0, 0.0, -L3 / 2.0);
        LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();
        linkGraphics.translate(0.0, 0.0, -L3);
        linkGraphics.addCylinder(L3, R3);
        ret.setLinkGraphics(linkGraphics);
        return ret;
    }
    private Link cylinderLink()
    {
        Link ret = new Link("Cylinder Link");
        ret.setMass(M4);
        ret.setMomentOfInertia(Ixx4, Iyy4, Izz4);
        ret.setComOffset(0.0, 0.0, L4 / 2.0);
        LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();
        linkGraphics.addCylinder(L4, R4, YoAppearance.DarkBlue());
        linkGraphics.addCylinder(L4 / 8.0, 1.1 * R4);
        linkGraphics.translate(0.0, 0.0, 7.0 / 8.0 * L4);
        linkGraphics.addCylinder(L4 / 8.0, 1.1 * R4);
        ret.setLinkGraphics(linkGraphics);
        return ret;
    }
{%endhighlight%}


## 3. Add the doConstraint method in FlyballGovernorSimpleClosedLoopConstraint

   

{%highlight java%}
    private void doConstraint(YoFramePoint positionA, YoFramePoint positionB, YoFrameVector velocityA, YoFrameVector velocityB,
                              YoFrameVector forceA, YoFrameVector forceB, DoubleYoVariable positionErrorMagnitude)
    {
        positionA.get(posA);
        positionB.get(posB);
        velocityA.get(velA);
        velocityB.get(velB);
        springForceA.sub(posB, posA);
        positionErrorMagnitude.set(springForceA.length());
        springForceA.scale(constraintGain.getDoubleValue());
        dampingForceA.sub(velB, velA);
        dampingForceA.scale(constraintDamp.getDoubleValue());
        newForceA.add(springForceA, dampingForceA);
        newForceB.scale(-1.0, newForceA);

        forceA.set(newForceA);
        forceB.set(newForceB);
    }
{%endhighlight%}

   Here is where the constraint forces between two points, A and B, are generated. We see that for each constraint, a linear spring-damper is used to "glue" the two ExternalForcePoints together.

## 4. Run the FlyballGovernorSimulation class
   Note that the blue cylinder rises as the device spins faster. To vary the desired speed, change the value of `q_d_cylinder_z`.

## 5. Change the value of constraintGain and constraintDamp to 0.0 while in simulation
   See that the constraint is no longer enforced and the "glue" joint comes apart.
  
## 6. Now look at the doControl() function in FlyballGovernorRobot
   The feedback mechanism used in the `FlyballGovernor` is `tau_rotation.set(k_feedback.getDoubleValue() * (q_d_cylinder_z.getDoubleValue() - q_cylinder_z.getDoubleValue()));` 
   The torque on the rotation joint is proportional to the height of the cylinder. This is an example of how flyballs on locomotive engines are used. Flyball governors throttle steam engines proportionally to the height of the cylinder. In essence, a flyball governor provides velocity feedback control completely mechanically.

## 7. Try implementing a closed-loop mechanism on your own
   Examples include four-bar linkages or a necklace with rigid links.
   
## Full Code for Classes
<details>
<summary>FlyballGovernorSimulation</summary>
{%highlight java%}
package us.ihmc.exampleSimulations.flyballGovernor;

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
</details>

<details>
<summary>FlyballGovernorRobot</summary>
{%highlight java%}
package us.ihmc.exampleSimulations.flyballGovernor;

import javax.vecmath.Vector3d;
import us.ihmc.robotics.robotDescription.LinkGraphicsDescription;
import us.ihmc.graphicsDescription.appearance.YoAppearance;
import us.ihmc.robotics.Axis;
import us.ihmc.simulationconstructionset.CylinderJoint;
import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;
import us.ihmc.simulationconstructionset.ExternalForcePoint;
import us.ihmc.simulationconstructionset.Link;
import us.ihmc.simulationconstructionset.PinJoint;
import us.ihmc.simulationconstructionset.Robot;
import us.ihmc.robotics.dataStructures.registry.YoVariableRegistry;
import us.ihmc.robotics.robotController.RobotController;

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
    public FlyballGovernorRobot(String nameSuffix, FlyballGovernorCommonControlParameters controllerParameters, Vector3d baseWorldOffset)
    {
        super("FlyballGovernor" + nameSuffix);
        PinJoint rotation = new PinJoint("rotation", baseWorldOffset, this, Axis.Z);
        rotation.setDamping(DAMPING1);
        Link centerRod = centerRod();
        rotation.setLink(centerRod);
        this.addRootJoint(rotation);
        // One of the flyballs
        PinJoint upperPivot1 = new PinJoint("upperPivot1", new Vector3d(R1, 0.0, L1), this, Axis.Y);
        upperPivot1.setInitialState(-0.3, 0.0);
        upperPivot1.setDamping(DAMPING2);
        upperPivot1.setLimitStops(-Math.PI / 2.0, -0.2, 100, 10);
        Link flyBall1 = flyBallLink();
        upperPivot1.setLink(flyBall1);
        rotation.addJoint(upperPivot1);
        PinJoint lowerPivot1 = new PinJoint("lowerPivot1", new Vector3d(0.0, 0.0, -2.0 / 3.0 * L2), this, Axis.Y);
        lowerPivot1.setInitialState(0.5, 0.0);
        Link loopLink1 = loopLink();
        lowerPivot1.setLink(loopLink1);
        upperPivot1.addJoint(lowerPivot1);
        constraint1A = new ExternalForcePoint("constraint1A", new Vector3d(0.0, 0.0, -L3), this);
        lowerPivot1.addExternalForcePoint(constraint1A);
        // The other flyball
        PinJoint upperPivot2 = new PinJoint("upperPivot2", new Vector3d(-R1, 0.0, L1), this, Axis.Y);
        upperPivot2.setInitialState(0.3, 0.0);
        upperPivot2.setDamping(DAMPING2);
        upperPivot2.setLimitStops(0.2, Math.PI / 2.0, 100, 10);
        Link flyBall2 = flyBallLink();
        upperPivot2.setLink(flyBall2);
        rotation.addJoint(upperPivot2);
        PinJoint lowerPivot2 = new PinJoint("lowerPivot2", new Vector3d(0.0, 0.0, -2.0 / 3.0 * L2), this, Axis.Y);
        lowerPivot2.setInitialState(-0.5, 0.0);
        Link loopLink2 = loopLink();
        lowerPivot2.setLink(loopLink2);
        upperPivot2.addJoint(lowerPivot2);
        constraint2A = new ExternalForcePoint("constraint2A", new Vector3d(0.0, 0.0, -L3), this);
        lowerPivot2.addExternalForcePoint(constraint2A);

        // The sliding Cylinder:
        CylinderJoint cylinderJoint = new CylinderJoint("cylinder_theta", "cylinder_z", baseWorldOffset, this, Axis.Z);
        cylinderJoint.setInitialState(0.0, 0.0, 0.05, 0.0);
        Link cylinderLink = cylinderLink();
        cylinderJoint.setLink(cylinderLink);
        this.addRootJoint(cylinderJoint);
        constraint1B = new ExternalForcePoint("constraint1B", new Vector3d(R4, 0.0, L4 / 2.0), this);
        constraint2B = new ExternalForcePoint("constraint2B", new Vector3d(-R4, 0.0, L4 / 2.0), this);
        cylinderJoint.addExternalForcePoint(constraint1B);
        cylinderJoint.addExternalForcePoint(constraint2B);
        this.setController(this);

        k_feedback = controllerParameters.getK_feedback();
        q_d_cylinder_z = controllerParameters.getQ_d_cylinder_z();
        this.initControl();
    }
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
    private Link centerRod()
    {
        Link ret = new Link("Center Rod");
        ret.setMass(M1);
        ret.setMomentOfInertia(0.0, 0.0, Izz1);
        ret.setComOffset(0.0, 0.0, L1 / 2.0);

        LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();
        linkGraphics.addCylinder(L1, R1, YoAppearance.Red());
        ret.setLinkGraphics(linkGraphics);

        return ret;
    }
    private Link flyBallLink()
    {
        Link ret = new Link("Flyball");
        ret.setMass(M2);
        ret.setMomentOfInertia(Ixx2, Iyy2, Izz2);
        ret.setComOffset(0.0, 0.0, -L2);

        LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();
        linkGraphics.translate(0.0, 0.0, -L2);
        linkGraphics.addCylinder(L2, R2);
        linkGraphics.addSphere(SPHERE_R, YoAppearance.DarkGreen());
        ret.setLinkGraphics(linkGraphics);

        return ret;
    }

    private Link loopLink()
    {
        Link ret = new Link("Loop");
        ret.setMass(M3);
        ret.setMomentOfInertia(Ixx3, Iyy3, Izz3);
        ret.setComOffset(0.0, 0.0, -L3 / 2.0);
        LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();
        linkGraphics.translate(0.0, 0.0, -L3);
        linkGraphics.addCylinder(L3, R3);
        ret.setLinkGraphics(linkGraphics);
        return ret;
    }
    private Link cylinderLink()
    {
        Link ret = new Link("Cylinder Link");
        ret.setMass(M4);
        ret.setMomentOfInertia(Ixx4, Iyy4, Izz4);
        ret.setComOffset(0.0, 0.0, L4 / 2.0);
        LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();
        linkGraphics.addCylinder(L4, R4, YoAppearance.DarkBlue());
        linkGraphics.addCylinder(L4 / 8.0, 1.1 * R4);
        linkGraphics.translate(0.0, 0.0, 7.0 / 8.0 * L4);
        linkGraphics.addCylinder(L4 / 8.0, 1.1 * R4);
        ret.setLinkGraphics(linkGraphics);
        return ret;
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
{%endhighlight%}
</details>

<details>
<summary>FlyballGovernorSimpleClosedLoopConstraintController</summary>
{%highlight java%}
package us.ihmc.exampleSimulations.flyballGovernor;

import javax.vecmath.Point3d;
import javax.vecmath.Vector3d;
import us.ihmc.robotics.referenceFrames.ReferenceFrame;
import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;
import us.ihmc.simulationconstructionset.ExternalForcePoint;
import us.ihmc.robotics.dataStructures.registry.YoVariableRegistry;
import us.ihmc.robotics.robotController.RobotController;
import us.ihmc.robotics.math.frames.YoFramePoint;
import us.ihmc.robotics.math.frames.YoFrameVector;

public class FlyballGovernorSimpleClosedLoopConstraintController implements RobotController
{
    private final YoFramePoint position1A, position1B, position2A, position2B;
    private final YoFrameVector velocity1A, velocity1B, velocity2A, velocity2B;
    private final YoFrameVector force1A, force1B, force2A, force2B;
    private final ReferenceFrame worldFrame = ReferenceFrame.getWorldFrame();
    private final YoVariableRegistry registry = new YoVariableRegistry(getClass().getSimpleName());
    private final DoubleYoVariable constraintGain = new DoubleYoVariable("constraintGain", registry);
    private final DoubleYoVariable constraintDamp = new DoubleYoVariable("constraintDamp", registry);
    private final DoubleYoVariable positionErrorMagnitude1 = new DoubleYoVariable("positionErrorMagnitude1", registry);
    private final DoubleYoVariable positionErrorMagnitude2 = new DoubleYoVariable("positionErrorMagnitude2", registry);

    // Temp variables:
    private Point3d posA = new Point3d();
    private Point3d posB = new Point3d();
    private Vector3d velA = new Vector3d();
    private Vector3d velB = new Vector3d();
    private Vector3d springForceA = new Vector3d();
    private Vector3d dampingForceA = new Vector3d();
    private Vector3d newForceA = new Vector3d();
    private Vector3d newForceB = new Vector3d();
    public FlyballGovernorSimpleClosedLoopConstraintController(FlyballGovernorRobot robot)
    {
        ExternalForcePoint constraint1A = robot.getConstraint1A();
        ExternalForcePoint constraint1B = robot.getConstraint1B();
        ExternalForcePoint constraint2A = robot.getConstraint2A();
        ExternalForcePoint constraint2B = robot.getConstraint2B();
        position1A = constraint1A.getYoPosition();
        position1B = constraint1B.getYoPosition();
        position2A = constraint2A.getYoPosition();
        position2B = constraint2B.getYoPosition();
        velocity1A = constraint1A.getYoVelocity();
        velocity1B = constraint1B.getYoVelocity();
        velocity2A = constraint2A.getYoVelocity();
        velocity2B = constraint2B.getYoVelocity();
        force1A = constraint1A.getYoForce();
        force1B = constraint1B.getYoForce();
        force2A = constraint2A.getYoForce();
        force2B = constraint2B.getYoForce();

        initialize();
    }
    public void initialize()
    {
        constraintGain.set(10000.0);
        constraintDamp.set(15.0);
    }
    public void doControl()
    {
        doConstraint(position1A, position1B, velocity1A, velocity1B, force1A, force1B, positionErrorMagnitude1);
        doConstraint(position2A, position2B, velocity2A, velocity2B, force2A, force2B, positionErrorMagnitude2);
    }
    private void doConstraint(YoFramePoint positionA, YoFramePoint positionB, YoFrameVector velocityA, YoFrameVector velocityB,
                              YoFrameVector forceA, YoFrameVector forceB, DoubleYoVariable positionErrorMagnitude)
    {
        positionA.get(posA);
        positionB.get(posB);
        velocityA.get(velA);
        velocityB.get(velB);
        springForceA.sub(posB, posA);
        positionErrorMagnitude.set(springForceA.length());
        springForceA.scale(constraintGain.getDoubleValue());
        dampingForceA.sub(velB, velA);
        dampingForceA.scale(constraintDamp.getDoubleValue());
        newForceA.add(springForceA, dampingForceA);
        newForceB.scale(-1.0, newForceA);

        forceA.set(newForceA);
        forceB.set(newForceB);
    }
    public YoVariableRegistry getYoVariableRegistry()
    {
        return registry;
    }
    public String getDescription()
    {
        return getName();
    }
    public String getName()
    {
        return registry.getName();
    }
}
{%endhighlight%}
</details>

<details>
<summary>FlyballGovernorCommonControlParameters</summary>
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
</details>