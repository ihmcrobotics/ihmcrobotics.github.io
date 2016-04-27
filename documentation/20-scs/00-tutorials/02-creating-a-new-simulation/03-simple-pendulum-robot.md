---
title: SimplePendulumRobot.java
---

Now that you have the simulation class up and running it's time to add a robot.  Robots in SCS extend the `us.ihmc.simulationconstructionset.Robot` class and are made up of joints and links. The class Robot is included in Simulation Construction Set and has built in graphics, dynamics, etc. Extending the class is an easy way to make a new type of robot.

To start with, we will create one of the simplest robots possible: a Pendulum.  

## Description of the robot
  
*"A pendulum is a weight suspended from a pivot so that it can swing freely.
When a pendulum is displaced sideways from its resting, equilibrium position, it is subject to a restoring force due to gravity that will accelerate it back toward the equilibrium position.
When released, the restoring force combined with the pendulum's mass causes it to oscillate about the equilibrium position, swinging back and forth. 
The time for one complete cycle, a left swing and a right swing, is called the period. The period depends on the length of the pendulum and also to a slight degree on the amplitude, the width of the pendulum's swing."*  
Source: [Wikipedia](https://en.wikipedia.org/wiki/Pendulum)


![pendulum](/resources/images/scs-tutorials/simple-pendulum/pendulum.png) 

In order to build this pendulum for our simulation, we will use two SCS objects: one **Link** and one **Joint**. 

### Links and Joints
The **Link** object describes the physical properties (*Mass*, *Center of Mass* offset vector, *Moment of Intertia*, ...) of a rigid body.

The **Joint** object is used to model the connections between links. Joints describes the motion constraint between Links and the physics simulation. 
SCS provides a variety of Joints used to build robots such as: FloatingJoint, FreeJoint, FloatingPlanarJoint, PinJoint, SliderJoint...   

To represent the pendulum's pivot, we will use a **PinJoint** which is a rotational joint with a single degree of freedom. Pin joints allow rotation around a single axis specified upon creation (the Y-axis in this case).   

## 1. Create the SimplePendulumRobot Class

Create a new class in the `us.ihmc.exampleSimulations.simplePendulum` package called `SimplePendulumRobot` that extends `us.ihmc.simulationconstructionset.Robot`.
   
Your class should look like this:

{% highlight java %}
package us.ihmc.exampleSimulations.simplePendulum;

import us.ihmc.simulationconstructionset.Robot;

public class SimplePendulumRobot extends Robot // SimplePendulumRobot inherits some properties and methods from Robot class
{

}
{% endhighlight %}

## 2. Define the Pendulum Constants and Initial Values:
 
<details open>
<summary> Constants and Initial Values </summary>
{% highlight java %}
public class SimplePendulumRobot extends Robot // SimplePendulumRobot inherits some properties and methods from Robot class
{
   /*
     Pendulum constants and initial values
      - Lengths are in meters (m)
      - Masses are in kilograms (kg)
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

***Lengths are expressed in meters (m), masses in kilograms (kg)**

## 3. Include Required Imports:

Before continuing, make sure you have added the following classes to your imports:  
<details open>
<summary> Required Imports </summary>
{% highlight java %}
import us.ihmc.simulationconstructionset.Link;  
import us.ihmc.simulationconstructionset.PinJoint;  

import us.ihmc.robotics.Axis;

import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;
import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;

import javax.vecmath.Vector3d;
{% endhighlight %}
</details>   

## 4. Define the Constructor of the Robot:

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
   }
{% endhighlight %}
</details>   

* **Call Parent Constructor:**  
`super("pendulum");` creates an instance of the class Robot named "pendulum" in the SCS system.

## 5. Create the Pendulum's Rod Using a Link:

Add the following to the end of the constructor:
<details open>
<summary> Create pendulumLink </summary>
{% highlight java %}
      // b. Create a link
      Link pendulumLink = new Link("PendulumLink");
      pendulumLink.setMass(BALL_MASS);
      pendulumLink.setComOffset(0.0, 0.0, -ROD_LENGTH);
      pendulumLink.setMomentOfInertia(0.0, FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y, 0.0);
{% endhighlight %}
</details>   

* **Create a new Link:**  
`Link pendulumLink = new Link("PendulumLink");`  
This line creates a new Link named "PendulumLink".

* **Set its physical properties:**  
`pendulumLink.setMass(BALL_MASS);`  
This line sets the mass of the link to 1.0 kg.  
`pendulumLink.setComOffset(0.0, 0.0, -ROD_LENGTH);`  
This line sets the center of mass offset of the link to be located at the tip of the rod which is 1.0m opposite the pivot joint.  
`pendulumLink.setMomentOfInertia(0.0, FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y, 0.0);`  
This line sets the moment of inertia about the Y axis. Note that the moment of inertia is defined about the center of mass.
Therefore, if the moment of inertia is set to zero, the link will be a point mass.  

## 6. Create the Pendulum's Pivot or fulcrum Using a PinJoint:

Add the following to the end of the constructor:
<details open>
<summary> Create: fulcrumPinJoint </summary>
{% highlight java %}
      // c. Create a pin joint attached to the link
      PinJoint fulcrumPinJoint = new PinJoint("FulcrumPinJoint", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);
      fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);
      fulcrumPinJoint.setDamping(0.3);
      fulcrumPinJoint.setLink(pendulumLink); 
      
      // d. Add fulcrumPinJoint as the root joint of the robot
      this.addRootJoint(fulcrumPinJoint);
{% endhighlight %}
</details>   

* **Create a pin joint:**   
`PinJoint fulcrumPinJoint = new PinJoint("FulcrumPinJoint", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);`   
The first parameter "FulcrumPinJoint" is the name of the joint and will be used in all the variables associated with that joint.  
The second parameter "new Vector3d(0.0, 0.0, 1.5)" defines the offset of this joint from the previous joint.  
Since we want to position the fulcrum of the pendulum at a height of 1.5 meters above the ground, the default vector (0.0, 0.0, 1.5) will be used.   
The third parameter "this" refers to the robot itself. The final parameter "Axis.Y" defines the axis of rotation for this pin joint. 

* **Set some properties for this joint:**  
`fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);`  
Initial state of the pin joint. The pendulum will start its course from an horizontal position with no initial speed.  
`fulcrumPinJoint.setDamping(0.3);`  
Add some damping to force the pendulum ball to converge faster to equilibrium position. 
 
* **Finally, attach a Link to this joint:**   
`fulcrumPinJoint.setLink(pendulumLink);`  
Set the link created previously as the link for this joint.   

* **Add a RootJoint to the robot:**  
`this.addRootJoint(fulcrumPinJoint);`  
This line adds `fulcrumPinJoint` as a rootJoint of the robot. 
In order to be part of a robot, a joint must either be added as a root joint, or be attached to a parent joint. 
This ensures the tree structure (forest structure if there are multiple root joints) of the robot.

## 7. Create the 3D Graphics which Represent the Link and Joint in SCS

Add the following to the end of the constructor:
<details open>
<summary> 3D Object Creation </summary>
{% highlight java %}
      // e. Add 3D objects
      Graphics3DObject pendulumGraphics = new Graphics3DObject();
      pendulumGraphics.addSphere(FULCRUM_RADIUS, YoAppearance.BlueViolet());
      pendulumGraphics.translate(0.0, 0.0, -ROD_LENGTH);
      pendulumGraphics.addCylinder(ROD_LENGTH, ROD_RADIUS, YoAppearance.Black());
      pendulumGraphics.translate(0.0, 0.0, 0.0);
      pendulumGraphics.addSphere(BALL_RADIUS, YoAppearance.Chartreuse());
      pendulumLink.setLinkGraphics(pendulumGraphics);
{% endhighlight %}
</details>   

* **Create a new Graphics3DObject:**  
`Graphics3DObject pendulumGraphics = new Graphics3DObject();`  
This line creates a new instance of the Graphics3DObject class which, once attached to its `LinkGraphics`, is used to visually represent links in the SCS 3D view. 
 
* **Add the pivot:**  
`pendulumGraphics.addSphere(FULCRUM_RADIUS, YoAppearance.BlueViolet());`  
Here we add a purple sphere 3D object to `pendulumGraphics`. Since no transformation has been applied to this graphic component the sphere's position is (0.0, 0.0, 0.0). This is used represent the pivot/fulcrum of the pendulum.  

* **Add the rod:**  
`pendulumGraphics.translate(0.0, 0.0, -ROD_LENGTH);`  
Translates from the current position by the specified distances. Graphic components added after translation will appear in the new location. The coordinate system for these translations is based on those that preceded it.   
`pendulumGraphics.addCylinder(ROD_LENGTH, ROD_RADIUS, YoAppearance.Black());`  
Adds a 1m long black cylinder representing the rod.  

* **Add the ball:**  
`pendulumGraphics.addSphere(BALL_RADIUS, YoAppearance.Chartreuse());`  
Adds a yellow sphere representing the ball at the end of the rod.   

* **Attach the Graphics3DObject to its Link:**  
`pendulumLink.setLinkGraphics(pendulumGraphics);`  
This line associates our `pendulumGraphics` object with the `pendulumLink` object and in doing so, translates and rotate the graphic components to be in the same frame of reference as the `pendulumLink`.   
 

## 8. Add the Robot to the Simulation

Now that you have a robot class, it needs to be instantiated in the simulation class and added to SCS.

In the `SimplePendulumSimulation` class constructor, replace this line

{% highlight java %}
      sim = new SimulationConstructionSet(parameters);
{% endhighlight %}

with

{% highlight java %}
      SimplePendulumRobot robot = new SimplePendulumRobot();
    
      sim = new SimulationConstructionSet(robot, parameters);
{% endhighlight %}


## Full code for the class:  
<details>
<summary> Simple Pendulum Robot </summary>

{% highlight java %}
package us.ihmc.exampleSimulations.simplePendulum;

import us.ihmc.simulationconstructionset.Robot;

import us.ihmc.simulationconstructionset.Link;  
import us.ihmc.simulationconstructionset.PinJoint;  

import us.ihmc.robotics.Axis;

import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;
import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;

import javax.vecmath.Vector3d;


public class SimplePendulumRobot extends Robot // SimplePendulumRobot inherits some properties and methods from Robot class
{
   /*
     Pendulum constants and initial values
      - Lengths are in meters (m)
      - Masses are in kilograms (kg)
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

   /*
       Constructor creates an instance of the class SimplePendulumRobot
   */
   public SimplePendulumRobot()
   {
      // a. Call parent class "Robot" constructor. The string "SimplePendulum" will be the name of the robot.  
      super("pendulum");

      // b. Create a link
      Link pendulumLink = new Link("PendulumLink");
      pendulumLink.setMass(BALL_MASS);
      pendulumLink.setComOffset(0.0, 0.0, -ROD_LENGTH);
      pendulumLink.setMomentOfInertia(0.0, FULCRUM_MOMENT_OF_INERTIA_ABOUT_Y, 0.0);

      // c. Create a pin joint attached to the link
      PinJoint fulcrumPinJoint = new PinJoint("FulcrumPinJoint", new Vector3d(0.0, 0.0, 1.5), this, Axis.Y);
      fulcrumPinJoint.setInitialState(fulcrumInitialPositionRadians, fulcrumInitialVelocity);
      fulcrumPinJoint.setDamping(0.3);
      fulcrumPinJoint.setLink(pendulumLink); 
      
      // d. Add fulcrumPinJoint as the root joint of the robot
      this.addRootJoint(fulcrumPinJoint);

      // e. Add 3D objects
      Graphics3DObject pendulumGraphics = new Graphics3DObject();
      pendulumGraphics.addSphere(FULCRUM_RADIUS, YoAppearance.BlueViolet());
      pendulumGraphics.translate(0.0, 0.0, -ROD_LENGTH);
      pendulumGraphics.addCylinder(ROD_LENGTH, ROD_RADIUS, YoAppearance.Black());
      pendulumGraphics.translate(0.0, 0.0, 0.0);
      pendulumGraphics.addSphere(BALL_RADIUS, YoAppearance.Chartreuse());
      pendulumLink.setLinkGraphics(pendulumGraphics);
   }
}
{% endhighlight %}
</details>


 
