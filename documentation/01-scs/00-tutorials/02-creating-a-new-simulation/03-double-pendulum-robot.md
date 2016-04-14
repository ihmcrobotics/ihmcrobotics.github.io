---

title: The Robot Class
full-title: "The Robot Class: SimplePendulumRobot.java"

---

Now that you have the simulation class up and running it's time to add a robot.  Robots in SCS extend the `us.ihmc.simulationconstructionset.Robot` class and are made up of joints and links.  The class Robot is included in Simulation Construction Set and has built in graphics, dynamics, etc. Extending the class is an easy way to make a new type of robot, in this case a simple pendulum robot with one joint and one link.

## Create the SimplePendulumRobot Class

1. Create a new class in the `us.ihmc.exampleSimulations.simplePendulum` package called `SimplePendulumRobot` that extends `us.ihmc.simulationconstructionset.Robot`.

2. The robot class is responsible for defining the structure of a robot using joints and links and can also specify 3D objects which visually represent each joint and link in the 3D world.  Copy the following code into your new class:

    ```java
    package us.ihmc.exampleSimulations.simplePendulum;
    
    import us.ihmc.simulationconstructionset.Robot;
    import us.ihmc.simulationconstructionset.Link;
    import us.ihmc.simulationconstructionset.PinJoint;
    
    import us.ihmc.robotics.Axis;
    
    import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;
    import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;
    
    import javax.vecmath.Vector3d;
    
    public class SimplePendulumRobot extends Robot
    {
        // Pendulum constants and initial values
        //  - Lengths are in meters (m)
        //  - Masses are in kilograms (kg)
        
        public static final double FULCRUM_RADIUS = 0.02;
    
        public static final double ROD_LENGTH = 1.0;
        public static final double ROD_RADIUS = 0.01;
    
        public static final double BALL_RADIUS = 0.05;
        public static final double BALL_MASS = 1.0;
    
        // I = mrˆ2 pendulum's resistance to changes to its rotation in kg.mˆ2
        public static final double FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y = ROD_LENGTH * ROD_LENGTH * BALL_MASS;
    
        private double fulcrumInitialPositionDegrees = 90.0;
        private double fulcrumInitialPositionRadians = fulcrumInitialPositionDegrees * Math.PI / 180.0;
        private double fulcrumInitialVelocity = 0.0;
    
        public SimplePendulumRobot()
        {
            // 1.
            super("pendulum");
    
            // 2.
            Link pendulumLink = new Link("PendulumLink");
            pendulumLink.setMass(BALL_MASS);
            pendulumLink.setComOffset(0.0, 0.0, -ROD_LENGTH);
            pendulumLink.setMomentOfInertia(0.0, FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y, 0.0);
    
            // 3.
            PinJoint fulcrumPinJoint = new PinJoint("FulcrumPinJoint", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);
            fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);
            fulcrumPinJoint.setLink(pendulumLink);
            fulcrumPinJoint.setDamping(0.3);
    
            // 4.
            addRootJoint(fulcrumPinJoint);
    
            // 5.
            Graphics3DObject pendulumGraphics = new Graphics3DObject();
            pendulumGraphics.addSphere(FULCRUM_RADIUS, YoAppearance.BlueViolet());
            pendulumGraphics.translate(0.0, 0.0, -ROD_LENGTH);
            pendulumGraphics.addCylinder(ROD_LENGTH, ROD_RADIUS, YoAppearance.Black());
            pendulumGraphics.translate(0.0, 0.0, 0.0);
            pendulumGraphics.addSphere(BALL_RADIUS, YoAppearance.Chartreuse());
            pendulumLink.setLinkGraphics(pendulumGraphics);
        }
    }
    ```

    `SimplePendulumRobot` extends Robot and then defines the pendulum's constants and initial values.  Then in the constructor:

    1. `super("pendulum");` creates an instance of the class Robot named "pendulum" in the SCS system.

    2. Next a link named "PendulumLink" is created with it's mass set to `BALL_MASS` in kilograms (kg). The center of mass offset of the link is then set to be `-ROD_LENGTH` in the Z direction, and a moment of inertia about the Y axis is set. Note that the moment of inertia is defined about the center of mass. Therefore, if the moment of inertia is set to zero, the link would be a point mass.
    
        // TODO Define what a link is!!!

    3. Then a PinJoint named "FulcrumPinJoint" is created and `pendulumLink` is attached to it.  The PinJoint constructor has four parameters.  The first is the SCS system name.  The second defines the offset of the joint from it's parent.  In this case the joint is placed 1.5 meters above the ground.  The third parameter associates the joint with 'this' robot.  The final parameter defines the axis of rotation for the pin joint to be the Y axis. Next the pin joint's initial state is set, `pendulumLink` is attached, and a dampening value is specified.
    
        // TODO Define what a joint is and some examples of them.
    
    4. `addRootJoint(fulcrumPinJoint);` adds the pin joint as the root joint of the robot.  In order to be part of a robot, a joint must either be added as a root joint, or be attached to a parent joint.  This ensures the tree structure (forest structure if there are multiple root joints) of the robot.
    
    5. Finally, the 3D objects representing the robot in the 3D world are defined as a purple sphere at the pin joint, a black cylinder for the pendulum's rod, and a light green sphere at the end of the pendulum.
    
## Add the Robot to the Simulation

Now that you have a robot class, it needs to be instantiated in the simulation class and added to SCS.

1. In the `SimplePendulumSimulation` class constructor, replace this line

    ```java
          sim = new SimulationConstructionSet(parameters);
    ```
    
    with
    
    ```java
          SimplePendulumRobot robot = new SimplePendulumRobot();
    
          sim = new SimulationConstructionSet(robot, parameters);
    ```
