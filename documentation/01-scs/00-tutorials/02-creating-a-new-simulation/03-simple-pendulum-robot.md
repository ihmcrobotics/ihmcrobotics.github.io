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

## Description of the robot
  
*"A pendulum is a weight suspended from a pivot so that it can swing freely.
When a pendulum is displaced sideways from its resting, equilibrium position, it is subject to a restoring force due to gravity that will accelerate it back toward the equilibrium position.
When released, the restoring force combined with the pendulum's mass causes it to oscillate about the equilibrium position, swinging back and forth. 
The time for one complete cycle, a left swing and a right swing, is called the period. The period depends on the length of the pendulum and also to a slight degree on the amplitude, the width of the pendulum's swing."*  
Source: [Wikipedia](https://en.wikipedia.org/wiki/Pendulum)


![pendulum](/resources/images/scs-tutorials/simple-pendulum/pendulum.png) 

In order to build this pendulum for our simulation, we will use two SCS objects: one **Link** and one **Joint**. 

### Links and Joints
A **Link** object describes the physical properties (*Mass*, *Center of Mass* offset vector, *Moment of Intertia*, ...) of a rigid body. Additionally one can attach graphics to it.

A **Joint** object is used to model the connections between links. Joint describes the motion constraint between Links and physics simulation. SCS provides a variety of Joints used to build robots such as: FloatingJoint, FreeJoint, FloatingPlanarJoint, PinJoint, SliderJoint...   

To represent the pendulum's pivot, we will use a **PinJoint** which is a rotational joint with a single degree of freedom. Pin joints allow rotation around a single axis specified upon creation (Y axis in our case).   

## 1. Create the SimplePendulumRobot class

Now create a SimplePendulumRobot by adding a new class. For the class name, enter "SimplePendulumRobot". 

Make it extend the `Robot` class.
 
Add the following import statement `import us.ihmc.simulationconstructionset.Robot;` so that your compiler knows where to find the Robot class code. 
   
Your class should look like that: 

{% highlight java %}
package us.ihmc.exampleSimulations.simplePendulum;

import us.ihmc.simulationconstructionset.Robot;

public class SimplePendulumRobot extends Robot // SimplePendulumRobot inherits some properties and methods from Robot class
{

}
{% endhighlight %}

## 2. Define the parameters of the robot:
 
<details open>
<summary> Constructor: SimplePendulumRobot() </summary>

{% highlight java %}
  
public class SimplePendulumRobot extends Robot // SimplePendulumRobot inherits some properties and methods from Robot class
{
  /*
     Define the parameters of the robot
   */
   
   public static final double FULCRUM_RADIUS = 0.02;
   
   public static final double ROD_LENGTH = 1.0;
   public static final double ROD_RADIUS = 0.01;
   public static final double ROD_MASS = 0.01;

   public static final double BALL_RADIUS = 0.05;
   public static final double BALL_MASS = 1.0;

   // I = mrˆ2 pendulum's resistance to changes to its rotation in kg.mˆ2
   public static final double FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y = ROD_LENGTH * ROD_LENGTH * BALL_MASS; 

  /*
     Initial state of the pendulum
   */

   private double fulcrumInitialPositionDegrees = 90.0;
   private double fulcrumInitialPositionRadians = fulcrumInitialPositionDegrees * Math.PI / 180.0;
   private double fulcrumInitialVelocity = 0.0;

{% endhighlight %}
</details>

This part defines the parameters of the robot using constants and some initial conditions.  
`public` means that these variables can be accessed by any class, from anywhere in the project.  
`static` means that there's only one copy of these variables, no matter how many SimplePendulumRobots are created.  
`final` means that the values cannot be changed.

The combination of these three modifiers is used to define constants. We will use this constants later on to build our links. 

`private` means that these variables can only be accessed in this file.   

**Lengths are expressed in meters (m), masses in kilograms (kg)**


## 3. Define the constructor of the robot:

Before continuing, make sure you have added the following classes to your imports:  
{% highlight java %}
import us.ihmc.simulationconstructionset.Link;  
import us.ihmc.simulationconstructionset.PinJoint;  
import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;
import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;
import us.ihmc.robotics.Axis;
{% endhighlight %}

Type the following code: 
<details open>
<summary> Constructor: SimplePendulumRobot() </summary>
{% highlight java %}
   /*
       Constructor creates an instance of the class SimplePendulumRobot
   */
   public SimplePendulumRobot()
   {
      // a. Call parent class "Robot" constructor. The string "SimplePendulum" will be the name of the robot.  
      super("pendulum");

      // b. Add a pin joint to the robot
      PinJoint fulcrumPinJoint = new PinJoint("FulcrumPin", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);
      fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);
      fulcrumPinJoint.setLink(pendulumLink()); // pendulumLink() method defined next. 
      fulcrumPinJoint.setDamping(0.3);
      this.addRootJoint(fulcrumPinJoint);
   }

{% endhighlight %}
</details>   


* **Create a pin joint:**   
`PinJoint fulcrumPinJoint = new PinJoint("FulcrumPin", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);`   
The first parameter "FulcrumPin" is the name of the joint and will be used in all the variables associated with that joint.  
The second parameter "new Vector3d(0.0, 0.0, 1.5)" defines the offset of this joint from the previous joint.  
Since we want to position the fulcrum of the pendulum at a height of 1.5 meters above the ground, the default vector (0.0, 0.0, 1.5) will be used.   
The third parameter "this" refers to the robot itself. The final parameter "Axis.Y" defines the axis of rotation for this pin joint. 

                               
                         

* **Set some properties for this joint:**  
`fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);`  
Initial state of the pin joint. The pendulum will start its course from an horizontal position with no initial speed.  
`fulcrumPinJoint.setDamping(0.3);`  
Add some damping to force the pendulum ball to converge faster to equilibrium position. 
 
* **Finally, attach a Link to this joint:**   
`fulcrumPinJoint.setLink(pendulumLink());`  
The pendulumLink() method returns a Link object and is defined in the next part.   


* **Add RootJoint to the robot:**
`this.addRootJoint(fulcrumPinJoint);`  
This line adds fulcrumPinJoint as a rootJoint of the robot.   
In order to be part of a robot, a joint must either be added as a root joint, or be attached to a parent joint.  
This ensures the tree structure (forest structure if there are multiple root joints) of the robot.

   
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
      pendulumGraphics.addSphere(BALL_RADIUS, YoAppearance.Chartreuse());
      pendulumLink.setLinkGraphics(pendulumGraphics);
    
      return pendulumLink;
}
{% endhighlight %} 
</details>

The method **pendulumLink()** which returns a **Link** object is used to create a new link sets its physical properties as well as its shape and appearance.  

* **Create a new Link:**  
`Link pendulumLink = new Link("PendulumLink");` This line creates a new Link named "PendulumLink".

* **Set its physical properties:**  
`pendulumLink.setMomentOfInertia(0.0, Iyy1, 0.0);` This line sets the moment of inertial. Note that the moment of inertia is defined about the center of mass.
Therefore, if the moment of inertia is set to zero, the link will be a point mass.  
`pendulumLink.setMass(BALL_MASS);` This line sets the mass of the link to 1.0 kg.  
`pendulumLink.setComOffset(0.0, 0.0, -ROD_LENGTH);` This line sets the center of mass offset of the link to be located at the tip at the center of the ball at the end of the rod.
  
* **Add some graphic components to it:**  
`Graphics3DObject pendulumGraphics = new Graphics3DObject();` This line creates a new instance of the Graphics3DObject class.  
`pendulumGraphics.addSphere(FULCRUM_RADIUS, YoAppearance.BlueViolet());` Here we add a Sphere graphic component to the link's graphic to represent the position of the pivot/fulcrum.  
`pendulumGraphics.translate(0.0, 0.0, -ROD_LENGTH);` Translates from the current position by the specified distances. Graphic components added after translation will appear in the new location. 
The coordinate system for these translations is based on those that preceded it.  Each new has its coordinates reset to the parent joint's origin.  
`pendulumGraphics.addCylinder(ROD_LENGTH, ROD_RADIUS, YoAppearance.Black());` Adding the rod.   
`pendulumGraphics.addSphere(BALL_RADIUS, YoAppearance.Chartreuse());`Adding the ball at the end of the rod.   
`pendulumLink.setLinkGraphics(pendulumGraphics);` This line associates our link object with the linkGraphics object.
 

Now you should have a enough elements in your robot and your simulation to make it run!

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
     * In this tutorial, lengths are expressed in meters (m), masses in kilograms (kg)
     */
    public class SimplePendulumRobot extends Robot
    {
       /*
          1. Define the parameters of the robot
       */
       public static final double ROD_LENGTH = 1.0;
       public static final double ROD_RADIUS = 0.01;
           
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
        * 2. Define its constructor
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


 
