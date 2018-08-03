---
title: Adding control to a simulation
---


One can add control capabilities to any Robot by setting a RobotController via the `setController(RobotController aRobotController)` method.

## 1. Create the SimplePendulumController Class  

Create a new class in the `us.ihmc.exampleSimulations.simplePendulum` package called `SimplePendulumController` that implements `us.ihmc.simulationconstructionset.robotController.RobotController`.

Your class should look like this:

{% highlight java %}
package us.ihmc.exampleSimulations.simplePendulum;

import us.ihmc.robotics.dataStructures.registry.YoVariableRegistry;
import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;
import us.ihmc.robotics.robotController.RobotController;

public class SimplePendulumController implements RobotController
{ 
   @Override public void initialize(){}
       
   @Override public void doControl(){}
      
   @Override public YoVariableRegistry getYoVariableRegistry(){}
   
   @Override public String getName(){}
   
   @Override public String getDescription(){}
   
}
{% endhighlight %}

* **Interface Implementations**  
 
   The `RobotController` interface requires you to implement:  
   - `initialize()` Not used at this point.   
   - `doControl()` This method gets called each update, that's where your control code is written.
   - `getYoVariableRegistry()` returns a YoVariableRegistry object that you need to instantiate in the controller. This object will give you access to the control variables.   
   - `getName()` and `getDescription()` not used at this point.
       


## 2. Add properties and create a constructor for SimplePendulumController

We will start by populating the class with the following elements: 

{% highlight java %}
   
   // A name for this controller
   private final String name = "pendulumController";

   // This line instantiates a registry that will contain relevant controller variables that will be accessible from the simulation panel.
   private final YoVariableRegistry registry = new YoVariableRegistry("PendulumController");

   // This is a reference to the SimplePendulumRobot that enables the controller to access this robot's variables.
   private SimplePendulumRobot robot;

   /* Control variables: */

   // Target angle
   private DoubleYoVariable desiredPositionRadians;

   // Controller parameter variables
   private DoubleYoVariable p_gain, d_gain, i_gain;

   // This is the desired torque that we will apply to the fulcrum joint (PinJoint)
   private double torque;

   

   /* Constructor: 
    Where we instantiate and initialize control variables 
   */
   public SimplePendulumController(SimplePendulumRobot robot)
   {
      this.robot = robot;
      desiredPositionRadians = new DoubleYoVariable("DesiredPosRad", registry);
      desiredPositionRadians.set(-1.5);

      p_gain = new DoubleYoVariable("ProportionalGain", registry);
      p_gain.set(250.0);
      d_gain = new DoubleYoVariable("DerivativeGain", registry);
      d_gain.set(100.0);
      i_gain = new DoubleYoVariable("IntegralGain", registry);
      i_gain.set(10.0);
   }
{% endhighlight %}

## 3. Add some accessors to the SimplePendulumRobot

In the `SimplePendulumRobot` class; add the following lines of code so that one can have access to and set fulcrum joint properties:  

Above the constructor add some variables to store the current state of the fulcrum joint.

{% highlight java %}

   /* Some joint state variables */
   private DoubleYoVariable tau_fulcrum, q_fulcrum, qd_fulcrum; // Respectively Torque, Position, Velocity

{% endhighlight %}

![note](/resources/images/attention-40.png) **Note on naming:** *By convention, adding a prefix of 'q', 'qd', and 'tau', refers to the joint angle, joint velocity, and joint torque, respectively.
E.g.  'q_fulcrum',  'qd_fulcrum', 'tau_fulcrum'.*

Add some more lines of code to the constructor to access to the joint's properties:

{% highlight java %}
  
   public SimplePendulumRobot()
   {
      ...
      // Hold references to some properties of this joint using DoubleYoVariables
      q_fulcrum = fulcrumPinJoint.getQYoVariable();
      qd_fulcrum = fulcrumPinJoint.getQDYoVariable();
      tau_fulcrum = fulcrumPinJoint.getTauYoVariable();
   }
{% endhighlight %}

<!--![concept](/resources/images/concept-50.png) **Concept: YoVariables**  -->
<!--### YoVariables-->
<!--YoVariables: short definition + typical use-->

Add some accessor methods to the pendulum robot.

{% highlight java %}

   /**
    * Fulcrum's angular position in radians
    * @return angular position in radians
    */
   public double getFulcrumAngularPosition()
   {
      return q_fulcrum.getDoubleValue();
   }

   /**
    * Fulcrum's angular velocity in radians per seconds
    * @return angular velocity in radians per seconds
    */
   public double getFulcrumAngularVelocity()
   {
      return qd_fulcrum.getDoubleValue();
   }

   /**
    * Fulcrum's torque in Newton meter
    * @return Torque in Newton meter
    */
   public double getFulcrumTorque()
   {
      return tau_fulcrum.getDoubleValue();
   }

   /**
    * Set Fulcrum's torque in Newton meter
    * @return Torque in Newton meter
    */
   public void setFulcrumTorque(double tau)
   {
      this.tau_fulcrum.set(tau);
   }
   
{% endhighlight %}

Now that we have access to these variables, we can use them in our `doControl()` method.

{% highlight java %}
   
   private double positionError = 0;
   private double integralError = 0;

   @Override public void doControl()
   {
      // ERROR term: Compute the difference between the desired position of the pendulum and its current position
      positionError = desiredPositionRadians.getDoubleValue() - robot.getFulcrumAngularPosition();

      // INTEGRAL term: Compute a simple numerical integration of the position error
      integralError += positionError * SimplePendulumSimulation.DT;

      // P.I.D
      torque =   p_gain.getDoubleValue() * positionError
               + i_gain.getDoubleValue() * integralError
               + d_gain.getDoubleValue() * (0 - robot.getFulcrumAngularVelocity());

      robot.setFulcrumTorque(torque);
   }
   
{% endhighlight %}


## 4. Link the controller to the robot 

In order for the control code to be accessed, it must be set in Simulation Construction Set. 
Therefore, in the `SimplePendulumSimulation` class add the following line of code under your robot's instantiation line:

{% highlight java %}   
   public SimplePendulumSimulation()
   {
      SimplePendulumRobot robot = new SimplePendulumRobot();
      robot.setController(new SimplePendulumController(robot)); // Add this line
    
    ...
    
{% endhighlight %}


## Full code for the class:

<details>
<summary> Simple Pendulum Controller </summary>

{% highlight java %}   
package us.ihmc.exampleSimulations.simplePendulum;

import us.ihmc.robotics.dataStructures.registry.YoVariableRegistry;
import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;
import us.ihmc.robotics.robotController.RobotController;

public class SimplePendulumController implements RobotController
{
   // A name for this controller
   private final String name = "pendulumController";

   // This line instantiates a registry that will contain relevant controller variables that will be accessible from the simulation panel.
   private final YoVariableRegistry registry = new YoVariableRegistry("PendulumController");

   // This is a reference to the SimplePendulumRobot that enables the controller to access this robot's variables.
   private SimplePendulumRobot robot;

   /* Control variables: */

   // Target angle
   private DoubleYoVariable desiredPositionRadians;

   // Controller parameter variables
   private DoubleYoVariable p_gain, d_gain, i_gain;

   // This is the desired torque that we will apply to the fulcrum joint (PinJoint)
   private double torque;

   /* Constructor:
      Where we instantiate and initialize control variables
   */
   public SimplePendulumController(SimplePendulumRobot robot)
   {
      this.robot = robot;
      desiredPositionRadians = new DoubleYoVariable("DesiredPosRad", registry);
      desiredPositionRadians.set(-1.5);

      p_gain = new DoubleYoVariable("ProportionalGain", registry);
      p_gain.set(250.0);
      d_gain = new DoubleYoVariable("DerivativeGain", registry);
      d_gain.set(100.0);
      i_gain = new DoubleYoVariable("IntegralGain", registry);
      i_gain.set(10.0);
   }

   @Override public void initialize()
   {

   }

   private double positionError = 0;
   private double integralError = 0;

   @Override public void doControl()
   {

      // ERROR term: Compute the difference between the desired position the pendulum and its current position
      positionError = desiredPositionRadians.getDoubleValue() - robot.getFulcrumAngularPosition();

      // INTEGRAL term: Compute a simple numerical integration of the position error
      integralError += positionError * SimplePendulumSimulation.DT;   //

      // P.I.D
      torque = p_gain.getDoubleValue() * positionError +
            i_gain.getDoubleValue() * integralError +
            d_gain.getDoubleValue() * (0 - robot.getFulcrumAngularVelocity());

      robot.setFulcrumTorque(torque);

   }

   @Override public YoVariableRegistry getYoVariableRegistry()
   {
      return registry;
   }

   @Override public String getName()
   {
      return name;
   }

   @Override public String getDescription()
   {
      return name;
   }
}
{% endhighlight %}
</details>

<details>
<summary> Simple Pendulum Robot </summary>

{% highlight java %} 
package us.ihmc.exampleSimulations.simplePendulum;

import us.ihmc.graphicsDescription.appearance.YoAppearance;
import us.ihmc.robotics.Axis;
import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;
import us.ihmc.robotics.robotDescription.LinkGraphicsDescription;
import us.ihmc.simulationconstructionset.Link;
import us.ihmc.simulationconstructionset.PinJoint;
import us.ihmc.simulationconstructionset.Robot;

import javax.vecmath.Vector3d;

/**
 *
 * In this tutorial, lengths are expressed in meters (m), masses in kilograms (kg)
 *
 */
public class SimplePendulumRobot extends Robot
{
   /*
      Define the parameters of the robot
   */
   public static final double ROD_LENGTH = 1.0;
   public static final double ROD_RADIUS = 0.01;
   public static final double ROD_MASS = 0.00;

   public static final double FULCRUM_RADIUS = 0.02;

   public static final double BALL_RADIUS = 0.05;
   public static final double BALL_MASS = 1.0;

   public static final double FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y =
         ROD_LENGTH * ROD_LENGTH * BALL_MASS; // I = mrˆ2 pendulum's resistance to changes to its rotation in  kg.mˆ2

   /*
      Initial state of the pendulum
   */

   private double fulcrumInitialPositionDegrees = 90.0;
   private double fulcrumInitialPositionRadians = fulcrumInitialPositionDegrees * Math.PI / 180.0;
   private double fulcrumInitialVelocity = 0.0;

   /* Some joint state variables */
   private DoubleYoVariable tau_fulcrum, q_fulcrum, qd_fulcrum; // Respectively Torque, Position, Velocity

   /*
      Define its constructor
    */
   public SimplePendulumRobot()
   {
      //` a. Call parent class "Robot" constructor. The string "SimplePendulum" will be the name of the robot.
      super("pendulum");

      // b. Add a joint to the robot
      PinJoint fulcrumPinJoint = new PinJoint("FulcrumPin", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);
      fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);
      fulcrumPinJoint.setLink(pendulumLink());// pendulumLink() method defined next.
      fulcrumPinJoint.setDamping(0.3);

      q_fulcrum = fulcrumPinJoint.getQYoVariable();
      qd_fulcrum = fulcrumPinJoint.getQDYoVariable();
      tau_fulcrum = fulcrumPinJoint.getTauYoVariable();

      this.addRootJoint(fulcrumPinJoint);
   }

   /**
    * Fulcrum's angular position in radians
    * @return angular position in radians
    */
   public double getFulcrumAngularPosition()
   {
      return q_fulcrum.getDoubleValue();
   }

   /**
    * Fulcrum's angular velocity in radians per seconds
    * @return angular velocity in radians per seconds
    */
   public double getFulcrumAngularVelocity()
   {
      return qd_fulcrum.getDoubleValue();
   }

   /**
    * Fulcrum's torque in Newton meter
    * @return Torque in Newton meter
    */
   public double getFulcrumTorque()
   {
      return tau_fulcrum.getDoubleValue();
   }

   /**
    * Set Fulcrum's torque in Newton meter
    * @return Torque in Newton meter
    */
   public void setFulcrumTorque(double tau)
   {
      this.tau_fulcrum.set(tau);
   }

   /**
    * Create the first link for the DoublePendulumRobot.
    */
   private Link pendulumLink()
   {
      Link pendulumLink = new Link("PendulumLink");
      pendulumLink.setMomentOfInertia(0.0, FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y, 0.0);
      pendulumLink.setMass(BALL_MASS);
      pendulumLink.setComOffset(0.0, 0.0, -ROD_LENGTH);

      LinkGraphicsDescription pendulumGraphics = new LinkGraphicsDescription();
      pendulumGraphics.addSphere(FULCRUM_RADIUS, YoAppearance.BlueViolet());
      pendulumGraphics.translate(0.0, 0.0, -ROD_LENGTH);
      pendulumGraphics.addCylinder(ROD_LENGTH, ROD_RADIUS, YoAppearance.Black());
      pendulumGraphics.addSphere(BALL_RADIUS, YoAppearance.Chartreuse());
      pendulumLink.setLinkGraphics(pendulumGraphics);

      return pendulumLink;
   }

}
{% endhighlight %}

</details>




<details>
<summary> Simple Pendulum Simulation </summary>

{% highlight java %}
package us.ihmc.exampleSimulations.simplePendulum;

import us.ihmc.simulationconstructionset.SimulationConstructionSet;
import us.ihmc.simulationconstructionset.SimulationConstructionSetParameters;


public class SimplePendulumSimulation
{

   public static final double DT = 0.001;
   private SimulationConstructionSet sim;

   public SimplePendulumSimulation()
   {
      SimplePendulumRobot robot = new SimplePendulumRobot();
      robot.setController(new SimplePendulumController(robot));

      SimulationConstructionSetParameters parameters = new SimulationConstructionSetParameters();
      parameters.setDataBufferSize(32000);

      sim = new SimulationConstructionSet(robot, parameters);
      sim.setDT(DT, 20);
      sim.setGroundVisible(true);
      sim.setCameraPosition(0, -9.0, 0.6);
      sim.setCameraFix(0.0, 0.0, 0.70);

      sim.setSimulateDuration(60.0); // sets the simulation duration to 60 seconds

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

