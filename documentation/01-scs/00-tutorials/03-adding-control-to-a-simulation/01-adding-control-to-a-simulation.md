---
title: Adding control to a simulation
---

In the previous tutorial we got to the point where a simple pendulum robot converged to its equilibrium position simply by the action of gravity. 
In this tutorial we will illustrate the action of a controller on joints by forcing the pendulum to keep an horizontal position.
To this end we will write a simple PID controller that will adjust the torque of the PinJoint at the fulcrum.

One can add control capabilities to any Robot by setting a RobotController via the `setController(RobotController aRobotController)` method.

## 1. Create a new class called `SimplePendulumController`.  

This class must implement the `RobotController` interface which itself extends the `RobotControlElement` interface:

The SimplePendulumController class should look like this for the moment:

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

The `RobotControlElement` interface requires its implementation to contain the following methods:  
    - `initialize()` Not used at this point.   
    - `getYoVariableRegistry()` that returns a YoVariableRegistry object that you need to instantiate in the controller. This object will give you access to the control variables.   
    - convenience methods like `getName()` and `getDescription()`.  
 
The `RobotController` interface requires you to implement the `doControl()` method. 
This method get called each update, that's where your control code is written.    


## 2. Add properties and create a constructor for SimplePendulumController

We will start by populating the class with the following elements: 

{% highlight java %}
   
   // A name for this controller
   private final String name = "pendulumController"; 
   
   // This line instantiate a registry that will contain relevant controller variables that will be accessible from the simulation panel.
   private final YoVariableRegistry registry = new YoVariableRegistry("PendulumController");  

   // This is a reference to the SimplePendulumRobot using this controller. This reference is useful to access to this robot's variables.
   private SimplePendulumRobot robot;

   /* Control variables: */
   
   // Target angle
   private DoubleYoVariable desired_position_radians;
   
   // This is the variable desired torque that we will apply to the fulcrum joint (PinJoint)
   private double torque; 
   
   // Controller parameter variables
   private DoubleYoVariable p_gain, d_gain, i_gain;
   

   /* Constructor: 
    where we instantiate and initialize control variables 
   */
   public SimplePendulumController(SimplePendulumRobot robot)
   {
      this.robot = robot;
      desired_position_radians = new DoubleYoVariable("DesiredPosRad", registry);
      desired_position_radians.set(-1.5);

      p_gain = new DoubleYoVariable("ProportionalGain", registry);
      p_gain.set(250.0);
      d_gain = new DoubleYoVariable("DerivativeGain", registry);
      d_gain.set(100.0);
      i_gain = new DoubleYoVariable("IntegralGain", registry);
      i_gain.set(10.0);
   }
{% endhighlight %}

## 3. Add some accessors to the SimplePendulumRobot

In the `SimplePendulumRobot` class; add the following lines of code so that one can access to and set some private variables of the fulcrum joint:  

Above the constructor add some variables to store the current state of the fulcrum joint.

{% highlight java %}

   /* Some joint state variables */
   private DoubleYoVariable tau_fulcrum, q_fulcrum, qd_fulcrum; // Respectively Torque, Position, Velocity

{% endhighlight %}

![note](/resources/images/attention-40.png) **Note on naming:** *By convention, adding a prefix of 'q', 'qd', and 'tau', refers to the joint angle, joint velocity, and joint torque, respectively.
E.g.  'q_FulcrumPin',  'qd_FulcrumPin', 'tau_FulcrumPin'.*

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

   public void setFulcrumTorque(double tau)
   {
      this.tau_fulcrum.set(tau);
   }
{% endhighlight %}

Now that we have access to these variables, we can use them in our `doControl()` method.

{% highlight java %}

   private double position_error = 0;
   private double integral_error = 0;

   @Override public void doControl()
   {
      // Error term: Compute the difference between the desired position of the pendulum and its current position 
      position_error = desired_position_radians.getDoubleValue() - robot.getFulcrumAngularPosition(); 
      
      // Integral: Compute a simple numerical integration of the position error
      integral_error += position_error * SimplePendulumSimulation.DT;   
      
      // P.I.D
      torque = p_gain.getDoubleValue() * position_error + i_gain.getDoubleValue() * integral_error + d_gain.getDoubleValue() * (0 - robot.getFulcrumAngularVelocity()); 

      robot.setFulcrumTorque(torque);
   }
   
{% endhighlight %}


## 4. Link the controller to the robot 

In order for the control code to be accessed, it must be set in the Simulation Construction Set. 
Therefore, in `SimplePendulumSimulation` class add the following line of code under your robot's instantiation line:

{% highlight java %}   
   public SimplePendulumSimulation()
   {
      SimplePendulumRobot robot = new SimplePendulumRobot();
      robot.setController(new SimplePendulumController(robot)); // Add this line
    
    ...
    
{% endhighlight %}
