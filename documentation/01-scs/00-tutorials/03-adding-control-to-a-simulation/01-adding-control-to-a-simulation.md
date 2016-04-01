---
title: Adding control to a simulation
---






/*
 Some joint state variables
*/
private DoubleYoVariable tau_fulcrum, q_fulcrum, qd_fulcrum; // Respectively Torque, Position, Velocity

![note](/resources/images/attention-40.png) **Note on naming:** *By convention, adding a prefix of 'q', 'qd', and 'tau', refers to the joint angle, joint velocity, and joint torque, respectively.
E.g.  'q_FulcrumPin',  'qd_FulcrumPin', 'tau_FulcrumPin'.*


      q_fulcrum = fulcrumPinJoint.getQ();
      qd_fulcrum = fulcrumPinJoint.getQD();
      tau_fulcrum = fulcrumPinJoint.getTau();


* **Access joint properties:**  
`q_fulcrum = fulcrumPinJoint.getQ();`  
`qd_fulcrum = fulcrumPinJoint.getQD();`  
`tau_fulcrum = fulcrumPinJoint.getTau();`  
Hold references to some properties of this joint using DoubleYoVariables

<!--![concept](/resources/images/concept-50.png) **Concept: YoVariables**  -->

### YoVariables

YoVariables: short definition + typical use






In this tutorial, we will apply a control algorithm for balancing the double pendulum in the previous example.
We will treat the double pendulum as an "Acrobot" in which the first joint (shoulder) is a free bearing and thus can apply no torque. 

The second joint (elbow) will be controlled to balance the robot in an inverted position. 
The parameters we will use and the balancing controller are taken from the paper "The Swing Up Control Problem for the Acrobot" by Mark Spong. 
This paper is available at http://www.clemson.edu/ces/crb/ece496/spring2002/group1a/acrobot_swingup.pdf. 
Here we will only implement the balancing controller. The swing up control is left as an exercise.

1. Do the previous tutorial if you haven't already. Open the DoublePendulum project from the previous tutorial in Eclipse.
2. Go to File->New Class… and create the class named DoublePendulumController in the package doublePendulum.
3. Fill in DoublePendulumController as shown below:

{% highlight java %}
package us.ihmc.exampleSimulations.doublePendulum;
 
import us.ihmc.robotics.dataStructures.registry.YoVariableRegistry;
import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;
import us.ihmc.simulationconstructionset.robotController.RobotController;
 
public class DoublePendulumController implements RobotController
{
     
   // tau_* is torque, q_* is position, qd_* is velocity for joint *
   private DoubleYoVariable tau_joint1, tau_joint2, q_joint1, q_joint2, qd_joint1, qd_joint2;
   private DoubleYoVariable k1, k2, k3, k4; // these are the controller gain parameters
   private final YoVariableRegistry registry = new YoVariableRegistry("DoublePendulumController");
   private String name;
   public DoublePendulumController(DoublePendulumRobot rob, String name)
   {
      this.name = name;
       
      // get variable references from the robot
      q_joint1 = (DoubleYoVariable)rob.getVariable("q_joint1");
      qd_joint1 = (DoubleYoVariable)rob.getVariable("qd_joint1");
      tau_joint1 = (DoubleYoVariable)rob.getVariable("tau_joint1");
      q_joint2 = (DoubleYoVariable)rob.getVariable("q_joint2");
      qd_joint2 = (DoubleYoVariable)rob.getVariable("qd_joint2");
      tau_joint2 = (DoubleYoVariable)rob.getVariable("tau_joint2");
      // set controller gains
      // gains taken from Mark Spong (1995) "The Swing Up Control Problem for the Acrobot"
      k1 = new DoubleYoVariable("k1", registry);
      k1.set(-242.52);
      k2 = new DoubleYoVariable("k2", registry);
      k2.set(-96.33);
      k3 = new DoubleYoVariable("k3", registry);
      k3.set(-104.59);
      k4 = new DoubleYoVariable("k4", registry);
      k4.set(-49.05);
   }
   public void doControl()
   {
      tau_joint1.set(0.0); // free bearing
      // set the torque at the controlled second joint
      tau_joint2.set(-k1.getDoubleValue() * q_joint1.getDoubleValue() 
      - k2.getDoubleValue() * q_joint2.getDoubleValue() 
      - k3.getDoubleValue() * qd_joint1.getDoubleValue() 
      - k4.getDoubleValue() * qd_joint2.getDoubleValue());
   }
 
   public YoVariableRegistry getYoVariableRegistry()
   {
      return registry;
   }
    
   public String getName()
   {
      return name;
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

1. Let's go through DoublePendulumController one line at a time:
    * **package us.ihmc.exampleSimulations.doublePendulum;** This line states what package the class is in. See a Java reference book for more information on packages.
    * **import us.ihmc.simulationconstructionset.*;** This line imports all the classes from the SimulationConstructionSet library.
    * **public class DoublePendulumController implements RobotController** This line declares the class DoublePendulumController to be a public class that implements the interface RobotController. This interface is part of the Simulation Construction Set. To implement the interface, the class must contain the methods getYoVariableRegistry() and doControl(). Notice that these two methods are indeed defined for DoublePendulumController.
    * **private DoubleYoVariable tau_joint1, tau_joint2, q_joint1, q_joint2, qd_joint1, qd_joint2;** These are some of the variables that are automatically created during the creation of the DoublePendulumRobot. In order to use them in the controller, they must be named and extracted from the robot. tau_* is the torque at the joint, q_* is the position of the joint, and qd_* is the velocity of the joint.
    * **private DoubleYoVariable k1, k2, k3, k4;** These are the new control variables which will be used for control of the DoublePendulumRobot.
    * **public DoublePendulumController(DoublePendulumRobot rob, String name)** This is the constructor method for a DoublePendulumController. It requires passing the robot in, so that position and velocity variables can be extracted from it.
    * **q_joint1 = (DoubleYoVariable)rob.getVariable("q_joint1");** This line, and the others like it, extract the named variable from the robot.
    * **k1 = new DoubleYoVariable("k1", registry); k1.set(-242.52);** This line, and the others like it, create new variables for the control system and initialize their values. Note that to set or read the value of a variable, you must use the .val extension, or call the set() methods.
    * **public YoVariableRegistry getYoVariableRegistry()** This method must be implemented to meet the requirements of the RobotControl interface. It returns the YoVariableRegistry that was used for registering all the YoVariables for the controller. This is important so that the rest of the Simulation Construction Set can access the newly created variables.
    * **public void doControl()** This method must be implemented to meet the requirements of the RobotControl interface. It is where the control code is located. This control code gets called during every integration "tick".
    * **tau_joint1.set(0.0);** In the "Acrobot", the first joint is a free bearing. Therefore, the torque of joint1 is set to zero to emulate a perfect bearing joint.
    * **tau_joint2.set(-k1.getDoubleValue() * q_joint1.getDoubleValue() - k2.getDoubleValue() * q_joint2.getDoubleValue() - k3.getDoubleValue() * qd_joint1.getDoubleValue() - k4.getDoubleValue() * qd_joint2.getDoubleValue());** This is the balance control code. The torque at the second joint is a function of the positions and velocities of both the first and second joints. This control algorithm is sufficient to balance the Acrobat in the upright configuration under small perturbations.

2. In order for the control code to be accessed, it must be set in the Simulation Construction Set. 
Therefore, in DoublePendulumSimulation, after the line **DoublePendulumRobot doublePendulum = new DoublePendulumRobot();** add the line
**doublePendulum.setController(new DoublePendulumController(doublePendulum,"doublePendulumController"));**
{% highlight java %}
doublePendulum.setController(new DoublePendulumController(doublePendulum,"doublePendulumController"));
{% endhighlight %}

This will get the robot variables from the robot and create a new DoublePendulumController called controller. This controller will then be passed to the robot using setController,
so that the Simulation Construction Set now has access to the control code.In DoublePendulumRobot, check that the mass, length, and inertia parameters are set as follows:

{% highlight java %}
public static final double L1 = 1.0, L2 = 2.0, M1 = 1.0, M2 = 1.0, R1 = 0.1, R2 = 0.05, Iyy1 = 0.083, Iyy2 = 0.33;
{% endhighlight %}


These are the parameters used in Mark Spong's paper "The Swing Up Control Problem for the Acrobot" and are what control parameters k1, k2, k3, and k4 are tuned for.

1. Compile and run the project. If there were any troubles in compiling, Eclipse will let you know in the Problems tab and point you to where the bugs are.
2. Start running the simulation. Note that the pendulum doesn't do anything as it is perfectly (and unrealistically) suspended straight up. Stop the simulation.
3. Then put q_joint1 in a numeric entry box. Change its value from 0.0 to 0.01. Run the simulation again. Instead of falling down, this time the pendulum should balance by actuating its second joint. 
If it doesn't balance, make sure that the mass and moment of inertia parameters are set as shown above, that the control parameters k1, k2, k3, and k4 are set as shown above.
Also, make sure that the controller is being run by plotting tau_joint2 in a graphics window.
tau_joint2 should change as the joint angles and velocities change.
4. Experiment with q_joint1 and q_joint2 to see how much of a perturbation the Acrobot can recover from. Once the perturbation is too large,
the simple linear controller will go crazy. What is needed is a "swing up" controller.
5. As an exercise, either implement Spong's swing up controller from his paper or implement a simple open-loop swing up controller (a sinusoidal torque at joint2 should do the trick). 
Once the swing up controller swings the robot up, then trigger in the balancing controller. 
Note also that you may need to read the joint sensors (q_*) modulo 2*pi, in case the links wrap around. 
If you need to access time, the variable "t" is automatically created and can be accessed in the same way as the joint angle variables:

{% highlight java %}
t = (DoubleYoVariable)rob.getVariable("t");
{% endhighlight %}

Next we will describe the Link API (Application Programmers Interface). These are the classes and methods which are used for defining the geometry and inertial properties of the links of the robot simulations.
Then, in the next tutorial, we will experiment with the various shapes which are available.