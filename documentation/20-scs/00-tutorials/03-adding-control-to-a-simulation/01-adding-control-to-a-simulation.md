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
import us.ihmc.simulationconstructionset.robotController.RobotController;

public class SimplePendulumController implements RobotController
{ 
   @Override public void initialize(){}
       
   @Override public void doControl(){}
      
   @Override public YoVariableRegistry getYoVariableRegistry(){}
   
   @Override public String getName(){}
   
   @Override public String getDescription(){}
   
}
{% endhighlight %}

* **Interfaces Implementations**  

   The `RobotControlElement` interface requires its implementation to contain the following methods:  
   - `initialize()` Not used at this point.   
   - `getYoVariableRegistry()` returns a YoVariableRegistry object that you need to instantiate in the controller. This object will give you access to the control variables.   
   - `getName()` and `getDescription()` not used at this point.  
    
   The `RobotController` interface requires you to implement:  
   - `doControl()` This method gets called each update, that's where your control code is written.    


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
      q_fulcrum = fulcrumPinJoint.getQ();
      qd_fulcrum = fulcrumPinJoint.getQD();
      tau_fulcrum = fulcrumPinJoint.getTau();
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
      // ERROR term: Compute the difference between the desired position the pendulum and its current position
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
