---
title: SimplePendulumRobot.java
---



<!--The pendulum will be stationary. You will shortly learn how to change its initial condition have it move.-->

<!--![note](/resources/images/attention-40.png) **NOTE: Depending on Eclipse's configuration you may face an Access Restriction error when the _Vector3d(0.0, 0.0, 0.0)_ method is called.**  -->
<!--This error will refer to the vecmath.jar file in your java directory. To fix this, you must go to: -->
<!--_Window -> Preferences_. Click the _Java_ tab, The _Compiler_ subtab, then _Error/Warnings_. Click the _Deprecated and Restricted APIs_ tab.-->
<!--Then, change Forbidden reference (access rules) from Error to Warning or Ignore.-->
<!--Now you should be able to paste the code below without any problems.-->

<!--On Eclipse for OS X, select the project, _SimplePendulum_, click the drop down next to the run arrow and select _Run Configuration_. -->
<!--In the new window that appears, select the Arguments tab and uncheck _'Use the -XstartOnFirstThread argument when launching with SWT'_.-->

The robot we are going to build now is a simple pendulum.   
*"A pendulum is a weight suspended from a pivot so that it can swing freely.
When a pendulum is displaced sideways from its resting, equilibrium position, it is subject to a restoring force due to gravity that will accelerate it back toward the equilibrium position.
When released, the restoring force combined with the pendulum's mass causes it to oscillate about the equilibrium position, swinging back and forth. 
The time for one complete cycle, a left swing and a right swing, is called the period. The period depends on the length of the pendulum and also to a slight degree on the amplitude, the width of the pendulum's swing."*  
Source: [Wikipedia](https://en.wikipedia.org/wiki/Pendulum)

In order to build this pendulum in SCS we'll use two objects: one Link and one Joint. 

Link definition  
Joint definition
 

In our case

1. Now create a SimplePendulumRobot by adding a new class. For the class name, enter "SimplePendulumRobot". 
2. Fill in SimplePendulumRobot.java as shown below:


Let's go through SimplePendulumRobot one line at a time:

<!--## 1. Class declaration, Namespace, and Imports -->
<!--<details open>-->
<!--<summary> Constructor: SimplePendulumRobot() </summary>-->

<!--{% highlight java %}-->
<!--package us.ihmc.exampleSimulations.simplePendulum; -->

<!--import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;-->
<!--import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;-->
<!--import us.ihmc.robotics.Axis;-->
<!--import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;-->

<!--// These lines import all the classes from the SimulationConstructionSet Library.-->
<!--import us.ihmc.simulationconstructionset.Link;-->
<!--import us.ihmc.simulationconstructionset.PinJoint;-->
<!--import us.ihmc.simulationconstructionset.Robot;-->

<!--import javax.vecmath.Vector3d;-->

<!--{% endhighlight %}-->
<!--</details>-->

<!--Make sure that your IDE automatically declared these imports-->
<!--* **package us.ihmc.exampleSimulations.SimplePendulum;** This line states which package this file is in. See a Java reference book for more information on packages.-->
<!--* **import us.ihmc.simulationconstructionset.*;** T-->
<!--* **import javax.vecmath.Vector3d;** This imports the vector math library functions that come with the Java3d extension. In particular, we will use Vector3d in creating this robot. -->
<!--PLEASE Read the NOTE comment in the previous page.-->
<!--* **public class SimplePendulumRobot extends Robot** This line declares the class SimplePendulumRobot to be a public class that extends Robot. -->
<!--The class Robot is included in the Simulation Construction Set and has built in graphics, dynamics, etc. Extending the class is an easy way to make a new type of robot, in this case a SimplePendulumRobot.-->


## 2. Define the parameters of the robot:
<details open>
<summary> Constructor: SimplePendulumRobot() </summary>

{% highlight java %}
 
public class SimplePendulumRobot extends Robot
{

   public static final double FULCRUM_RADIUS = 0.02;
   
   public static final double ROD_LENGTH = 1.0;
   public static final double ROD_RADIUS = 0.01;
   public static final double ROD_MASS = 0.01;

   public static final double BALL_RADIUS = 0.05;
   public static final double BALL_MASS = 1.0;

   // I = mrˆ2 pendulum's resistance to changes to its rotation in kg.mˆ2
   public static final double FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y = ROD_LENGTH * ROD_LENGTH * BALL_MASS; 

   private double fulcrumInitialPositionDegrees = 90.0;
   private double fulcrumInitialPositionRadians = fulcrumInitialPositionDegrees * Math.PI / 180.0;
   private double fulcrumInitialVelocity = 0.0;

   private DoubleYoVariable tau_fulcrum, q_fulcrum, qd_fulcrum; // Respectively Torque, Position, Velocity

{% endhighlight %}
</details>

This part defines the parameters of the robot.
<!--L1 and L2 are the link lengths, M1 and M2 are the link masses, and R1 and R2 are the radii of the links, Iyy1 and Iyy2 are the moments of inertia of the links.-->
TODO: Image description of the robot and its parameters
"private" means that these variables can only be accessed in this file. "static" means that there's only one copy of these variables,  
no matter how many SimplePendulumRobots are created, and "final" means that the values cannot be changed.

Define the parameters of the robot
lengths are expressed in meters (m), masses in kilograms (kg)

## 3. Define the constructor of the robot:
<details open>
<summary> Constructor: SimplePendulumRobot() </summary>
{% highlight java %}
   public SimplePendulumRobot()
   {
      // a. Call parent class Robot constructor
      super("pendulum");

      // b. Add a pin joint to the robot
      PinJoint fulcrumPinJoint = new PinJoint("FulcrumPin", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);
      fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);
      fulcrumPinJoint.setLink(pendulumLink());
      fulcrumPinJoint.setDamping(0.3);

      q_fulcrum = fulcrumPinJoint.getQ();
      qd_fulcrum = fulcrumPinJoint.getQD();
      tau_fulcrum = fulcrumPinJoint.getTau();


      this.addRootJoint(fulcrumPinJoint);
   }

{% endhighlight %}
</details>   
* **super("SimplePendulum");** This line creates an instance of the class Robot. The string "SimplePendulum" will be the name of the robot.  
* **PinJoint fulcrumPinJoint = new PinJoint("FulcrumPin", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);** This line creates a pin joint.  
The first parameter "FulcrumPin" is the name of the joint and will be used in all the variables associated with that joint.  
The second parameter "new Vector3d(0.0, 0.0, 1.5)" defines the offset of this joint from the previous joint.  
Since we ant to position the fulcrum of the pendulum at a height of 1.5 meters above the ground, the default vector (0.0, 0.0, 1.5) will be used.   
The third parameter "this" refers to the robot itself. The final parameter "Axis.Y" defines the axis of rotation for this pin joint.  
![note](/resources/images/attention-40.png) **Note on naming:** By convention, adding a prefix of 'q', 'qd', and 'tau', refers to the joint angle, joint velocity, and joint torque, respectively.  
E.g.  'q_FulcrumPin',  'qd_FulcrumPin', 'tau_FulcrumPin'.*
* **fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);**
* **fulcrumPinJoint.setLink(pendulumLink());**
* **fulcrumPinJoint.setDamping(0.3);**

* **q_fulcrum = fulcrumPinJoint.getQ();  
qd_fulcrum = fulcrumPinJoint.getQD();  
tau_fulcrum = fulcrumPinJoint.getTau();**  
Provide a reference 


   
## 4. Create the Link for the SimplePendulumRobot:  
<details open>
<summary> Method: pendulumLink() </summary>
{% highlight java %}
    private Link pendulumLink()
    {
      Link pendulumLink = new Link("PendulumLink");
      pendulumLink.setMomentOfInertia(0.0, FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y, 0.0);
      pendulumLink.setMass(BALL_MASS);
      pendulumLink.setComOffset(0.0, 0.0, -ROD_LENGTH);
    
      Graphics3DObject pendulumGraphics = new Graphics3DObject();
      pendulumGraphics.addSphere(FULCRUM_RADIUS, YoAppearance.BlueViolet());
      pendulumGraphics.translate(0.0, 0.0, -ROD_LENGTH);
      pendulumGraphics.addCylinder(ROD_LENGTH, ROD_RADIUS, YoAppearance.Black());
      pendulumGraphics.translate(0.0, 0.0, 0.0);
      pendulumGraphics.addSphere(BALL_RADIUS, YoAppearance.Chartreuse());
      pendulumLink.setLinkGraphics(pendulumGraphics);
    
      return pendulumLink;
}
{% endhighlight %} 
</details>
**Link link1 = link1();** This line creates a new link by calling the link1 method.
**pin1.setLink(link1);** This associates link1 with the joint pin1.
**this.addRootJoint(pin1);** This line adds pin1 as a rootJoint of the robot. In order to be part of a robot, a joint must either be added as a root joint, or be attached to a parent joint.  
This ensures the tree structure (forest structure if there are multiple root joints) of the robot.
   
**Joint joint2 = new PinJoint("joint2", new Vector3d(0.0,0.0,L1), this, Axis.Y);** This line creates the second pin joint in the same way that the first one was created.  
This time however, the offset vector is (0.0,0.0,L1) since the second pin joint should be placed a distance of L1 in the Z direction from the previous joint.
**Link link2 = link2();** This line creates the second link by calling method link2.
**pin2.setLink(link2);** This line associates the joint pin2 with the Link link2.
**pin1.addJoint(pin2);** This line adds the joint pin2 as a child to the joint pin1.
**private Link link1();** This line is the beginning of the method link1 which will return a Link.
**Link ret = new Link("link1");** This line creates a new Link named "link1" and assigns it to the return value ret.
**ret.setMass(M1);** This line sets the mass of the link to M1.
**ret.setComOffset(0.0,0.0,L1/2.0);** This line sets the center of mass offset of the link to be L1/2 in the Z direction.
**ret.setMomentOfInertia(0.0, Iyy1, 0.0);** This line sets the moment of inertial. Note that the moment of inertia is defined about the center of mass.  
Therefore, if the moment of inertia is set to zero, the link will be a point mass.
**Graphics3DObject linkGraphics = new Graphics3DObject();** This line creates a new instance of the Graphics3DObject class.
**linkGraphics.addCylinder(L1,R1, YoAppearance.Green());** This line adds a cylinder of length L1 and radius R1. This will make the link visually look like a cylinder in the graphical interface.
**ret.setLinkGraphics(linkGraphics);** This line associates our link object with the linkGraphics object.
**return ret;** This line returns the link. The method link2 is similar to link1 and thus will not be explained line by line in this tutorial.
   

## Full code for the class:  
<details>
<summary> Simple Pendulum Robot </summary>

    {% highlight java %}
    package us.ihmc.exampleSimulations.simplePendulum;
    
    import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;
    import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;
    import us.ihmc.robotics.Axis;
    import us.ihmc.robotics.dataStructures.variable.DoubleYoVariable;
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
          1. Define the parameters of the robot
       */
       public static final double ROD_LENGTH = 1.0;
       public static final double ROD_RADIUS = 0.01;
       public static final double ROD_MASS = 0.01;
    
       public static final double FULCRUM_RADIUS = 0.02;
    
       public static final double BALL_RADIUS = 0.05;
       public static final double BALL_MASS = 1.0;
    
       public static final double FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y =
             ROD_LENGTH * ROD_LENGTH * BALL_MASS; // I = mrˆ2 pendulum's resistance to changes to its rotation in  kg.mˆ2
    
       private double fulcrumInitialPositionDegrees = 90.0;
       private double fulcrumInitialPositionRadians = fulcrumInitialPositionDegrees * Math.PI / 180.0;
       private double fulcrumInitialVelocity = 0.0;
    
       private DoubleYoVariable tau_fulcrum, q_fulcrum, qd_fulcrum; // Respectively Torque, Position, Velocity
    
       /*
          2. Define its constructor
        */
       public SimplePendulumRobot()
       {
          // a. Call parent class Robot constructor
          super("pendulum");
    
          // b. Add a joint to the robot
          PinJoint fulcrumPinJoint = new PinJoint("FulcrumPin", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);
          fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);
          fulcrumPinJoint.setLink(pendulumLink());
          fulcrumPinJoint.setDamping(0.3);
    
          q_fulcrum = fulcrumPinJoint.getQ();
          qd_fulcrum = fulcrumPinJoint.getQD();
          tau_fulcrum = fulcrumPinJoint.getTau();
    
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
    
          Graphics3DObject pendulumGraphics = new Graphics3DObject();
          pendulumGraphics.addSphere(FULCRUM_RADIUS, YoAppearance.BlueViolet());
          pendulumGraphics.translate(0.0, 0.0, -ROD_LENGTH);
          pendulumGraphics.addCylinder(ROD_LENGTH, ROD_RADIUS, YoAppearance.Black());
          pendulumGraphics.translate(0.0, 0.0, 0.0);
          pendulumGraphics.addSphere(BALL_RADIUS, YoAppearance.Chartreuse());
          pendulumLink.setLinkGraphics(pendulumGraphics);
    
          return pendulumLink;
       }
    
    }
    {% endhighlight %}


</details>


 
