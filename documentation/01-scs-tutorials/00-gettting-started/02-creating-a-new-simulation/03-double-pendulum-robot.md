---
title: DoublePendulumRobot.java
---

1. Now create a DoublePendulumRobot by adding a new class (File->New Class…). For the class name, enter "DoublePendulumRobot". Click OK.  The pendulum will be stationary. 
You will shortly learn how to change its initial condition have it move.

![note](/resources/images/attention-40.png) **NOTE: Depending on Eclipse's configuration you may face an Access Restriction error when the _Vector3d(0.0, 0.0, 0.0)_ method is called.**  

This error will refer to the vecmath.jar file in your java directory. To fix this, you must go to: 
_Window -> Preferences_. Click the _Java_ tab, The _Compiler_ subtab, then _Error/Warnings_. Click the _Deprecated and Restricted APIs_ tab.
Then, change Forbidden reference (access rules) from Error to Warning or Ignore.
Now you should be able to paste the code below without any problems.

On Eclipse for OS X, select the project, _DoublePendulum_, click the drop down next to the run arrow and select _Run Configuration_. 
In the new window that appears, select the Arguments tab and uncheck _'Use the -XstartOnFirstThread argument when launching with SWT'_.

 
2.Fill in DoublePendulumRobot as shown below:


{% highlight java %}

package us.ihmc.exampleSimulations.doublePendulum;
 
import javax.vecmath.Vector3d;
 
import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;
import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;
import us.ihmc.robotics.Axis;
import us.ihmc.simulationconstructionset.Joint;
import us.ihmc.simulationconstructionset.Link;
import us.ihmc.simulationconstructionset.PinJoint;
import us.ihmc.simulationconstructionset.Robot;
 
/**
 * This class DoublePendulumRobot is a public class that extends Robot. The class Robot is
 * included in the Simulation Construction Set and has built in graphics, dynamics, etc.
 * Extending the class is an easy way to make a new type of robot, in this case a DoublePendulumRobot.
 */
public class DoublePendulumRobot extends Robot
{
   private static final long serialVersionUID = -7671864179791904256L;
     
   /* L1 and L2 are the link lengths, M1 and M2 are the link masses, and R1 and R2 are the radii of the links,
    * Iyy1 and Iyy2 are the moments of inertia of the links. The moments of inertia are defined about the COM
    * for each link.
    */
   public static final double
      L1 = 1.0, L2 = 2.0, M1 = 1.0, M2 = 1.0, R1 = 0.1, R2 = 0.05, Iyy1 = 0.083, Iyy2 = 0.33;
    
   public DoublePendulumRobot()
   {
      super("DoublePendulum"); // create and instance of Robot
      // Create joints and assign links. Pin joints have a single axis of rotation.
      PinJoint pin1 = new PinJoint("joint1", new Vector3d(0.0, 0.0, 0.0), this, Axis.Y);
      // pin1.setInitialState(0.0, 0.0);
      Link link1 = link1();
      pin1.setLink(link1); // associate link1 with the joint pin1
      this.addRootJoint(pin1);
      /*
       *  The second joint is initiated with the offset vector (0.0,0.0,L1) since
       *  it should be placed a distance of L1 in the Z direction from the previous joint.
       */
      Joint pin2 = new PinJoint("joint2", new Vector3d(0.0, 0.0, L1), this, Axis.Y);
      Link link2 = link2();
      pin2.setLink(link2);
      pin1.addJoint(pin2);
   }
 
   /**
    * Create the first link for the DoublePendulumRobot.
    */
   private Link link1()
   {
      Link ret = new Link("link1");
      ret.setMass(M1);
      ret.setComOffset(0.0, 0.0, L1 / 2.0);
      ret.setMomentOfInertia(0.0, Iyy1, 0.0);
      // create a LinkGraphics object to manipulate the visual representation of the link
      Graphics3DObject linkGraphics = new Graphics3DObject();
      linkGraphics.addCylinder(L1, R1, YoAppearance.Red());
       
      // associate the linkGraphics object with the link object
      ret.setLinkGraphics(linkGraphics);
      return ret;
   }
   /**
    * Create the second link for the DoublePendulumRobot.
    */
   private Link link2()
   {
      Link ret = new Link("link2");
      ret.setMass(M2);
      ret.setComOffset(0.0, 0.0, L2 / 2.0);
      ret.setMomentOfInertia(0.0, Iyy2, 0.0);
      Graphics3DObject linkGraphics = new Graphics3DObject();
      linkGraphics.addCylinder(L2, R2, YoAppearance.Green());
      ret.setLinkGraphics(linkGraphics);
      return ret;
   }
}

{% endhighlight %}


Let's go through DoublePendulumRobot one line at a time:

1. **package us.ihmc.exampleSimulations.doublePendulum;** This line states which package this file is in. See a Java reference book for more information on packages.
    * **import us.ihmc.simulationconstructionset.*;** These lines import all the classes from the SimulationConstructionSet Library.
    * **import javax.vecmath.Vector3d;** This imports the vector math library functions that come with the Java3d extension. In particular, we will use Vector3d in creating this robot. PLEASE Read the NOTE comment in the previous page.
    * **public class DoublePendulumRobot extends Robot** This line declares the class DoublePendulumRobot to be a public class that extends Robot. The class Robot is included in the Simulation Construction Set and has built in graphics, dynamics, etc. Extending the class is an easy way to make a new type of robot, in this case a DoublePendulumRobot.
    * **private static final double L1 = 1.0, L2 = 2.0, M1 = 1.0, M2 = 1.0, R1 = 0.1, R2 = 0.05, Iyy1 = 0.5, Iyy2 = 1.0;** This line defines the parameters of the robot. L1 and L2 are the link lengths, M1 and M2 are the link masses, and R1 and R2 are the radii of the links, Iyy1 and Iyy2 are the moments of inertia of the links. "private" means that these variables can only be accessed in this file. "static" means that there's only one copy of these variables, no matter how many DoublePendulumRobots are created, and "final" means that the values cannot be changed.
    * **super("DoublePendulum");** This line creates an instance of the class Robot. The string "DoublePendulum" will be the name of the robot.
    * **PinJoint pin1 = new PinJoint("joint1", new Vector3d(0.0, 0.0, 0.0), this, Axis.Y);** This line creates a pin joint. The first parameter "joint1" is the name of the joint and will be used in all the variables associated with that joint.  The second parameter "new Vector3d()" defines the offset of this joint from the previous joint. Since no offset is desired, the default vector (0,0,0) will be used. The third parameter "this" refers to the robot itself. The final parameter "Axis.Y" defines the axis of rotation for this pin joint.
 ***Note on naming:***  *By convention, adding a prefix of 'q', 'qd', and 'tau', refers to the joint angle, joint velocity, and joint torque, respectively.  E.g.  'q_joint1',  'qd_joint1', 'tau_joint1'.*
    * **Link link1 = link1();** This line creates a new link by calling the link1 method.
    * **pin1.setLink(link1);** This associates link1 with the joint pin1.
    * **this.addRootJoint(pin1);** This line adds pin1 as a rootJoint of the robot. In order to be part of a robot, a joint must either be added as a root joint, or be attached to a parent joint. This ensures the tree structure (forest structure if there are multiple root joints) of the robot.
    * **Joint joint2 = new PinJoint("joint2", new Vector3d(0.0,0.0,L1), this, Axis.Y);** This line creates the second pin joint in the same way that the first one was created. This time however, the offset vector is (0.0,0.0,L1) since the second pin joint should be placed a distance of L1 in the Z direction from the previous joint.
    * **Link link2 = link2();** This line creates the second link by calling method link2.
    * **pin2.setLink(link2);** This line associates the joint pin2 with the Link link2.
    * **pin1.addJoint(pin2);** This line adds the joint pin2 as a child to the joint pin1.
    * **private Link link1();** This line is the beginning of the method link1 which will return a Link.
    * **Link ret = new Link("link1");** This line creates a new Link named "link1" and assigns it to the return value ret.
    * **ret.setMass(M1);** This line sets the mass of the link to M1.
    * **ret.setComOffset(0.0,0.0,L1/2.0);** This line sets the center of mass offset of the link to be L1/2 in the Z direction.
    * **ret.setMomentOfInertia(0.0, Iyy1, 0.0);** This line sets the moment of inertial. Note that the moment of inertia is defined about the center of mass. Therefore, if the moment of inertia is set to zero, the link will be a point mass.
    * **Graphics3DObject linkGraphics = new Graphics3DObject();** This line creates a new instance of the Graphics3DObject class.
    * **linkGraphics.addCylinder(L1,R1, YoAppearance.Green());** This line adds a cylinder of length L1 and radius R1. This will make the link visually look like a cylinder in the graphical interface.
    * **ret.setLinkGraphics(linkGraphics);** This line associates our link object with the linkGraphics object.
    * **return ret;** This line returns the link. The method link2 is similar to link1 and thus will not be explained line by line in this tutorial.