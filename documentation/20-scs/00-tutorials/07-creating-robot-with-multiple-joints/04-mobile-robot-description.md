---

title: MobileRobot Class Description

---

## 1. Add the following code to the MobileRobot Class
   
{%highlight java%}
   public MobileRobot()
   {
      super("Mobile");

      // create first gimbal joint at the top of the mobile
      GimbalJoint firstGimbal = new GimbalJoint("gimbal_x", "gimbal_y", "gimbal_z", 
                                                new Vector3d(0.0, 0.0, 1.0), this, Axis.X, Axis.Y, Axis.Z);
      // attach a crossbar to the top gimbal joint
      Link bar1 = crossBar(M1, L1, R1, Ixx1, Iyy1, Izz1);
      firstGimbal.setLink(bar1);
      firstGimbal.setDamping(DAMP1);
      initJoint(firstGimbal);
      this.addRootJoint(firstGimbal);
      double xOffset, yOffset;
      GimbalJoint nextGimbal;
      GimbalJoint finalGimbal;
      Link nextLink;
      // for each point of the cross bar, attach a new gimbal joint and (smaller crossbar)
      // four toys will hang from each of these smaller crossbars
      for (int i = 0; i < 4; i++)
      {
         xOffset = 0.0;
         yOffset = 0.0;
         if (i == 0)
            xOffset = L1;
         else if (i == 1)
            xOffset = -L1;
         else if (i == 2)
            yOffset = L1;
         else // i == 3
            yOffset = -L1;
         nextGimbal = new GimbalJoint("gimbal1_" + i + "_x", "gimbal1_" + i + "_y", "gimbal1_" + i + "_z",
                                      new Vector3d(xOffset, yOffset, -L1 / 2.0), this, Axis.X, Axis.Y, Axis.Z);
         nextLink = crossBar(M2, L2, R2, Ixx2, Iyy2, Izz2);
         nextGimbal.setLink(nextLink);
         nextGimbal.setDamping(DAMP2);
         initJoint(nextGimbal);
         firstGimbal.addJoint(nextGimbal);
         // for each point of the smaller crossbar, add a gimbal joint with a "toy" link attached
         for (int j = 0; j < 4; j++)
         {
            xOffset = 0.0;
            yOffset = 0.0;
            if (j == 0)
               xOffset = L2;
            else if (j == 1)
               xOffset = -L2;
            else if (j == 2)
               yOffset = L2;
            else // j == 3
               yOffset = -L2;
            finalGimbal = new GimbalJoint("gimbal2_" + i + "_" + j + "_x", "gimbal2_" + i + "_" + j +  "_y", "gimbal2_"
                                          + i + "_" + j +  "_z", new Vector3d(xOffset, yOffset, -L2 / 2.0), this,
                                          Axis.X, Axis.Y, Axis.Z);
             
            // generate a random toy link and attach it to gimbal
            nextLink = randomShape();
            finalGimbal.setLink(nextLink);
            // add external force point at the toy COM
            Vector3d offset = new Vector3d();
            nextLink.getComOffset(offset);
            ExternalForcePoint point = new ExternalForcePoint("ef_track" + i + j, offset, this);
            finalGimbal.addExternalForcePoint(point);
            finalGimbal.setDamping(DAMP3);
            initJoint(finalGimbal);
            nextGimbal.addJoint(finalGimbal);
         }
      }
   }
{%endhighlight%}

Examine the lines where the 3 different levels of gimbal joints are defined. Note how in Java, Strings can be concatenated using `" " + " "`, and that integers will be turned into Strings in this way. For example, if `i=3`, then `"gimbal1_" + i "_x"` will result in `"gimbal1_3_x"`.
   
   Look at the offset Vector3d for each joint level. 
   
   * The first offset, `(0.0, 0.0, 1.0)`, simply places the mobile into the air. 
   * The second is `(xOffset, yOffset, -L1/2.0)` where `(xOffset, yOffset)` is either `(L1, 0)`, `(-L1, 0)`, `(0, L1)`, or `(0, -L1)`. 
       * This is from the second level of 4 gimbal joints to each of their parent joint, which is the first gimbal joint. 
       * The top crossbar goes down L1/2.0 and in each of the four directions by L1. Therefore, the given offsets should work. 
   * The third is `(xOffset, yOffset, -L2/2.0)` where `(xOffset, yOffset)` is either `(L2, 0)`, `(-L2, 0)`, `(0, L2)`, or `(0, -L2)`.
       * This is the final level of 16 gimbals from their parents above them. The smaller crossbars go down L2/2.0 and in each of the four directions by L2. Therefore, the given offsets should work. 
   
   
   
   
Note that the joint offsets are completely independent of any translations or rotations which are performed while specifying links:
   
   `firstGimbal = new GimbalJoint("gimbal_x", "gimbal_y","gimbal_z", new Vector3d(0.0,0.0,1.0), this, Axis.X, Axis.Y, Axis.Z);`  
   
   `nextGimbal = new GimbalJoint("gimbal1_" + i + "_x", "gimbal1_" + i + "_y", "gimbal1_" + i + "_z", new Vector3d(xOffset, yOffset, -L1 / 2.0), this, Axis.X, Axis.Y, Axis.Z);`  
   
   `finalGimbal = new GimbalJoint("gimbal2_" + i + "_" + j + "_x", "gimbal2_" + i + "_" + j + "_y", "gimbal2_" + i + "_" + j + "_z", new Vector3d(xOffset, yOffset, -L2 / 2.0), this, Axis.X, Axis.Y, Axis.Z);`
    
    
Note that viscous damping is set for each joint

   Viscous damping of the form tau=damping * velocity will be added on top of any torques due to joint limits or a control system. For this simulation, the mobile is completely passive and damping is the only source of joint torque:
   
   `firstGimbal.setDamping(DAMP1);`  
   `nextGimbal.setDamping(DAMP2);`  
   `finalGimbal.setDamping(DAMP3);`
    
    
    
Note that the function initJoint is called for each joint

   `initJoint` creates random values for the position and velocity of each of the 3 degrees of freedom for the GimbalJoint and sets the state using `GimbalJoint.setInitialState();`  
   `joint.setInitialState(init_q1, init_qd1, init_q2, init_qd2, init_q3, init_qd3);`
   
   
   
Creation of the joints, including their offsets, damping, and initialization should be clear

   * If not, review the above joint generation.
   
   * Note that creation of the joints is completely independent of the creation of the link shapes, and that the joint locations and functions will be the same no matter which links are attached to them.
   

## 2. Now let's create the links
   Add the following to MobileRobot after `super("Mobile");`
   
{%highlight java%}

// create the top (fixed) link that serves as the base of the mobile
      Link topLink = new Link("top");
       
      Graphics3DObject topLinkGraphics = new Graphics3DObject();
      topLinkGraphics.translate(0.0, 0.0, 1.0 + R1 / 2.0);
      topLinkGraphics.addCylinder(L1 / 60.0, L1 / 3.0, YoAppearance.DarkBlue());
      topLink.setLinkGraphics(topLinkGraphics);
       
      this.addStaticLink(topLink);

{%endhighlight%}

We start with the top link, which is a flattened cylinder.
We add it to the robot using `Robot.addStaticLink(Link)` since it is not attached to any joints and therefore cannot move.
Since the first joint of the robot had an offset of `(0.0, 0.0, 1.0)`, we need to translate to `(0.0, 0.0, 1.0+R1/2.0)` before adding this link:

   `Link topLink = new Link("top");`      
   `Graphics3DObject topLinkGraphics = new Graphics3DObject();`  
   `topLinkGraphics.translate(0.0, 0.0, 1.0+R1/2.0);`  
   `topLinkGraphics.addCylinder(L1/60.0, L1/3.0, YoAppearance.DarkBlue());`  
   `topLink.setLinkGraphics(topLinkGraphics);`  
   `this.addStaticLink(topLink);`


## 3. Next, we will add and examine the steps creating the crossbar geometry
   Add the following to MobileRobot:
{%highlight java%}

/**
    * Creates a cross bar link from the given parameters.
    */
   private Link crossBar(double mass, double length, double radius, double Ixx, double Iyy, double Izz)
   {
      Link ret = new Link("CrossBar");
      ret.setMass(mass);
      ret.setComOffset(0.0, 0.0, -length / 2.0);
      ret.setMomentOfInertia(Ixx, Iyy, Izz);
      Graphics3DObject linkGraphics = new Graphics3DObject();
      linkGraphics.addSphere(R1, YoAppearance.Red());
      linkGraphics.translate(0.0, 0.0, -length / 2.0);
      linkGraphics.addCylinder(length / 2.0, radius);
      linkGraphics.identity();
      linkGraphics.translate(length, 0.0, -length / 2.0);
      linkGraphics.rotate(-Math.PI / 2.0, Axis.Y);
      linkGraphics.addCylinder(2.0 * length, radius);
      linkGraphics.addSphere(radius, YoAppearance.Red());
      linkGraphics.translate(0.0, 0.0, 2.0 * length);
      linkGraphics.addSphere(radius, YoAppearance.Red());
      linkGraphics.identity();
      linkGraphics.translate(0.0, length, -length / 2.0);
      linkGraphics.rotate(Math.PI / 2.0, Axis.X);
      linkGraphics.addCylinder(2.0 * length, radius);
      linkGraphics.addSphere(radius, YoAppearance.Red());
      linkGraphics.translate(0.0, 0.0, 2.0 * length);
      linkGraphics.addSphere(radius, YoAppearance.Red());
      ret.setLinkGraphics(linkGraphics);
       
      return ret;
   }
{%endhighlight%}

We first create the upper sphere-capped cylinder which projects downward. Since the origin of a cylinder is the center of its base, we must first translate down the length of the upper cylinder (length/2.0) before adding it:
   
   `linkGraphics.addSphere(R1, YoAppearance.Red());`  
   `linkGraphics.translate(0.0, 0.0, -length/2.0);`   
   `linkGraphics.addCylinder(length/2.0, radius);`  

Now look at creating the 2 horizontal cylinders, capped with red spheres on both ends

They both are created identically, except that they are translated and rotated differently. The first one is created as follows:
      
   * This line brings us back to the gimbal joint: `linkGraphics.identity();`   
 
   * Translate down length/2.0 and in the X direction by length: `linkGraphics.translate(length, 0.0, -length/2.0);`   
      
   * Rotate by –Math.PI/2.0 about the Y axis. This will now make the Z axis point in the direction in which we wish to place our cylinder (along the original X axis): `linkGraphics.rotate(-Math.PI/2.0, Axis.Y);`
       
   * Add the cylinder: `linkGraphics.addCylinder(2.0*length, radius);`
        
   * Add a sphere to cap this end of the cylinder: `linkGraphics.addSphere(radius, YoAppearance.Red());`
            
   * Translate along the Z axis to the other end of the cylinder: `linkGraphics.translate(0.0, 0.0, 2.0*length);`
       
   * Cap the other end of the cylinder: `linkGraphics.addSphere(radius, YoAppearance.Red());`


The second cylinder is identical to the first, except for the initial translation and rotation
       
   * Translate down length/2.0 and in the Y direction by length: `linkGraphics.translate(0.0, length, -length/2.0);`
       
   * Rotate by Math.PI/2.0 about the X axis. This will now make the Z axis point in the direction in which we wish to place our cylinder (along the original Y axis): `linkGraphics.rotate(Math.PI/2.0, Axis.X);`
   
   
## 4. Add the following randomShape code to the MobileRobot Class

This method will randomly select a string length, an appearance and a shape for each of the 16 toys at the ends of the mobile. How this code works should now be clear to you.

If not, try to experiment with it, or try making a simulation of a different style of mobile to become comfortable with joints and links.

{%highlight java%}
   /**
    * Generates a random link shape with a thin cylinder attached to represent a string.
    * The toys are generated from one of 9 colors and 7 shapes.
    */
    private Link randomShape()
    {
      Link ret = new Link("randomShape");
      double stringLength = L3 * (1.0 + 2.0 * Math.random());
      ret.setMass(M3);
      // assume a massless string
      ret.setComOffset(0.0, 0.0, -stringLength);
      ret.setMomentOfInertia(Ixx3, Iyy3, Izz3);
      Graphics3DObject linkGraphics = new Graphics3DObject();
      linkGraphics.translate(0.0, 0.0, -stringLength);
      linkGraphics.addCylinder(stringLength, R3);
      AppearanceDefinition app = YoAppearance.Black();
      int appSelection = (int) (Math.random() * 9.0);
      switch (appSelection)
      {
         case 0 :
            app = YoAppearance.Black();
            break;
         case 1 :
            app = YoAppearance.Red();
            break;
         case 2 :
            app = YoAppearance.DarkRed();
            break;
         case 3 :
            app = YoAppearance.Green();
            break;
         case 4 :
            app = YoAppearance.DarkGreen();
            break;
         case 5 :
            app = YoAppearance.Blue();
            break;
         case 6 :
            app = YoAppearance.DarkBlue();
            break;
         case 7 :
            app = YoAppearance.AluminumMaterial();
            break;
         case 8 :
            app = YoAppearance.BlackMetalMaterial();
            break;
      }
      int toySelection = (int) (Math.random() * 7.0);
      switch (toySelection)
      {
         case 0 :
            linkGraphics.addSphere(TOY_R, app);
            break;
         case 1 :
            linkGraphics.addCylinder(TOY_H, TOY_R, app);
            break;
         case 2 :
            linkGraphics.addCube(TOY_L, TOY_W, TOY_H, app);
            break;
         case 3 :
            linkGraphics.addCone(TOY_H, TOY_R, app);
            break;
         case 4 :
            linkGraphics.addEllipsoid(TOY_L, TOY_W, TOY_H, app);
            break;
         case 5 :
            linkGraphics.addHemiEllipsoid(TOY_L, TOY_W, TOY_H, app);
            break;
         case 6 :
            linkGraphics.addGenTruncatedCone(TOY_H, TOY_L, TOY_W, TOY_W, TOY_L, app);
      }
      ret.setLinkGraphics(linkGraphics);
      return ret;
   }
   {%endhighlight%}
   



For more detailed information on joints check out the [Robots and Joint API Page]


## Full Code for Classes
<details>
<summary>MobileSimulation Class</summary>
{%highlight java%}
package us.ihmc.exampleSimulations.Mobile;
import us.ihmc.simulationconstructionset.SimulationConstructionSet;
/**
 * A simulation of a child’s mobile toy that uses a tree structure of 21 gimbal
 * joints (63 degrees of freedom total).
 */
public class MobileSimulation
{
   private SimulationConstructionSet sim;
   public MobileSimulation()
   {
      // Create an instance of MobileRobot
      MobileRobot mobile = new MobileRobot();
      // Instantiate a SCS object using the MobileRobot object reference
      sim = new SimulationConstructionSet(mobile);
      sim.setGroundVisible(false);
      sim.setCameraTracking(false, false, false, false);
      sim.setCameraDolly(false, false, false, false);
      // set camera to a convenient viewing angle
      sim.setCameraPosition(1.0, 1.0, 0.5);
      sim.setCameraFix(0.0, 0.0, 0.8);
      sim.setCameraTrackingVars("ef_track00_x", "ef_track00_y", "ef_track00_z");
      sim.setDT(0.02, 1);
      Thread myThread = new Thread(sim);
      myThread.start();
   }
   public static void main(String[] args)
   {
      new MobileSimulation();
   }
}
{%endhighlight%}
</details>
<details>
<summary>MobilRobot Class</summary>
{%highlight java%}

package us.ihmc.exampleSimulations.Mobile;
 
import javax.vecmath.Vector3d;
import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;
import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;
import us.ihmc.graphics3DAdapter.graphics.appearances.AppearanceDefinition;
import us.ihmc.robotics.Axis;
import us.ihmc.simulationconstructionset.ExternalForcePoint;
import us.ihmc.simulationconstructionset.GimbalJoint;
import us.ihmc.simulationconstructionset.Joint;
import us.ihmc.simulationconstructionset.Link;
import us.ihmc.simulationconstructionset.Robot;
 
/**
 * MobileRobot is a representation of a child's mobile toy that uses a tree structure of 21 gimbal
 * joints (63 degrees of freedom total).
 */
public class MobileRobot extends Robot
{
    
   private static final long serialVersionUID = -5838475007549333013L;
    
   private static final double
      L1 = 0.3, M1 = 0.1, R1 = 0.01, Ixx1 = 0.01, Iyy1 = 0.01, Izz1 = 0.01;
   private static final double
      L2 = 0.12, M2 = 0.05, R2 = 0.005, Ixx2 = 0.01, Iyy2 = 0.01, Izz2 = 0.01;
   private static final double
      L3 = 0.08, M3 = 0.03, R3 = 0.001, Ixx3 = 0.01, Iyy3 = 0.01, Izz3 = 0.01;;
   private static final double
      TOY_L = 0.02, TOY_W = 0.04, TOY_H = 0.03, TOY_R = 0.02;
   private static final double
      DAMP1 = 0.06, DAMP2 = 0.006, DAMP3 = 0.003;
   public MobileRobot()
   {
      super("Mobile");
      // create the top (fixed) link that serves as the base of the mobile
      Link topLink = new Link("top");
       
      Graphics3DObject topLinkGraphics = new Graphics3DObject();
      topLinkGraphics.translate(0.0, 0.0, 1.0 + R1 / 2.0);
      topLinkGraphics.addCylinder(L1 / 60.0, L1 / 3.0, YoAppearance.DarkBlue());
      topLink.setLinkGraphics(topLinkGraphics);
       
      this.addStaticLink(topLink);
      // create first gimbal joint at the top of the mobile
      GimbalJoint firstGimbal = new GimbalJoint("gimbal_x", "gimbal_y", "gimbal_z", 
                                                new Vector3d(0.0, 0.0, 1.0), this, Axis.X, Axis.Y, Axis.Z);
      // attach a crossbar to the top gimbal joint
      Link bar1 = crossBar(M1, L1, R1, Ixx1, Iyy1, Izz1);
      firstGimbal.setLink(bar1);
      firstGimbal.setDamping(DAMP1);
      initJoint(firstGimbal);
      this.addRootJoint(firstGimbal);
      double xOffset, yOffset;
      GimbalJoint nextGimbal;
      GimbalJoint finalGimbal;
      Link nextLink;
      // for each point of the cross bar, attach a new gimbal joint and (smaller crossbar)
      // four toys will hang from each of these smaller crossbars
      for (int i = 0; i < 4; i++)
      {
         xOffset = 0.0;
         yOffset = 0.0;
         if (i == 0)
            xOffset = L1;
         else if (i == 1)
            xOffset = -L1;
         else if (i == 2)
            yOffset = L1;
         else // i == 3
            yOffset = -L1;
         nextGimbal = new GimbalJoint("gimbal1_" + i + "_x", "gimbal1_" + i + "_y", "gimbal1_" + i + "_z",
                                      new Vector3d(xOffset, yOffset, -L1 / 2.0), this, Axis.X, Axis.Y, Axis.Z);
         nextLink = crossBar(M2, L2, R2, Ixx2, Iyy2, Izz2);
         nextGimbal.setLink(nextLink);
         nextGimbal.setDamping(DAMP2);
         initJoint(nextGimbal);
         firstGimbal.addJoint(nextGimbal);
         // for each point of the smaller crossbar, add a gimbal joint with a "toy" link attached
         for (int j = 0; j < 4; j++)
         {
            xOffset = 0.0;
            yOffset = 0.0;
            if (j == 0)
               xOffset = L2;
            else if (j == 1)
               xOffset = -L2;
            else if (j == 2)
               yOffset = L2;
            else // j == 3
               yOffset = -L2;
            finalGimbal = new GimbalJoint("gimbal2_" + i + "_" + j + "_x", "gimbal2_" + i + "_" + j +  "_y", "gimbal2_"
                                          + i + "_" + j +  "_z", new Vector3d(xOffset, yOffset, -L2 / 2.0), this,
                                          Axis.X, Axis.Y, Axis.Z);
             
            // generate a random toy link and attach it to gimbal
            nextLink = randomShape();
            finalGimbal.setLink(nextLink);
            // add external force point at the toy COM
            Vector3d offset = new Vector3d();
            nextLink.getComOffset(offset);
            ExternalForcePoint point = new ExternalForcePoint("ef_track" + i + j, offset, this);
            finalGimbal.addExternalForcePoint(point);
            finalGimbal.setDamping(DAMP3);
            initJoint(finalGimbal);
            nextGimbal.addJoint(finalGimbal);
         }
      }
   }
   /**
    * Initializes a GimbalJoint to a random initial position and velocity.
    */
   private void initJoint(GimbalJoint joint)
   {
      double init_q1 = (2.0 * Math.random() - 1.0) * 0.25;
      double init_q2 = (2.0 * Math.random() - 1.0) * 0.25;
      double init_q3 = (2.0 * Math.random() - 1.0) * Math.PI;
      double init_qd1 = (2.0 * Math.random() - 1.0) * 0.5;
      double init_qd2 = (2.0 * Math.random() - 1.0) * 0.5;
      double init_qd3 = (2.0 * Math.random() - 1.0) * 2.0;
      joint.setInitialState(init_q1, init_qd1, init_q2, init_qd2, init_q3, init_qd3);
   }
   /**
    * Creates a cross bar link from the given parameters.
    */
   private Link crossBar(double mass, double length, double radius, double Ixx, double Iyy, double Izz)
   {
      Link ret = new Link("CrossBar");
      ret.setMass(mass);
      ret.setComOffset(0.0, 0.0, -length / 2.0);
      ret.setMomentOfInertia(Ixx, Iyy, Izz);
      Graphics3DObject linkGraphics = new Graphics3DObject();
      linkGraphics.addSphere(R1, YoAppearance.Red());
      linkGraphics.translate(0.0, 0.0, -length / 2.0);
      linkGraphics.addCylinder(length / 2.0, radius);
      linkGraphics.identity();
      linkGraphics.translate(length, 0.0, -length / 2.0);
      linkGraphics.rotate(-Math.PI / 2.0, Axis.Y);
      linkGraphics.addCylinder(2.0 * length, radius);
      linkGraphics.addSphere(radius, YoAppearance.Red());
      linkGraphics.translate(0.0, 0.0, 2.0 * length);
      linkGraphics.addSphere(radius, YoAppearance.Red());
      linkGraphics.identity();
      linkGraphics.translate(0.0, length, -length / 2.0);
      linkGraphics.rotate(Math.PI / 2.0, Axis.X);
      linkGraphics.addCylinder(2.0 * length, radius);
      linkGraphics.addSphere(radius, YoAppearance.Red());
      linkGraphics.translate(0.0, 0.0, 2.0 * length);
      linkGraphics.addSphere(radius, YoAppearance.Red());
      ret.setLinkGraphics(linkGraphics);
       
      return ret;
   }
   /**
    * Generates a random link shape with a thin cylinder attached to represent a string.
    * The toys are generated from one of 9 colors and 7 shapes.
    */
    private Link randomShape()
    {
      Link ret = new Link("randomShape");
      double stringLength = L3 * (1.0 + 2.0 * Math.random());
      ret.setMass(M3);
      // assume a massless string
      ret.setComOffset(0.0, 0.0, -stringLength);
      ret.setMomentOfInertia(Ixx3, Iyy3, Izz3);
      Graphics3DObject linkGraphics = new Graphics3DObject();
      linkGraphics.translate(0.0, 0.0, -stringLength);
      linkGraphics.addCylinder(stringLength, R3);
      AppearanceDefinition app = YoAppearance.Black();
      int appSelection = (int) (Math.random() * 9.0);
      switch (appSelection)
      {
         case 0 :
            app = YoAppearance.Black();
            break;
         case 1 :
            app = YoAppearance.Red();
            break;
         case 2 :
            app = YoAppearance.DarkRed();
            break;
         case 3 :
            app = YoAppearance.Green();
            break;
         case 4 :
            app = YoAppearance.DarkGreen();
            break;
         case 5 :
            app = YoAppearance.Blue();
            break;
         case 6 :
            app = YoAppearance.DarkBlue();
            break;
         case 7 :
            app = YoAppearance.AluminumMaterial();
            break;
         case 8 :
            app = YoAppearance.BlackMetalMaterial();
            break;
      }
      int toySelection = (int) (Math.random() * 7.0);
      switch (toySelection)
      {
         case 0 :
            linkGraphics.addSphere(TOY_R, app);
            break;
         case 1 :
            linkGraphics.addCylinder(TOY_H, TOY_R, app);
            break;
         case 2 :
            linkGraphics.addCube(TOY_L, TOY_W, TOY_H, app);
            break;
         case 3 :
            linkGraphics.addCone(TOY_H, TOY_R, app);
            break;
         case 4 :
            linkGraphics.addEllipsoid(TOY_L, TOY_W, TOY_H, app);
            break;
         case 5 :
            linkGraphics.addHemiEllipsoid(TOY_L, TOY_W, TOY_H, app);
            break;
         case 6 :
            linkGraphics.addGenTruncatedCone(TOY_H, TOY_L, TOY_W, TOY_W, TOY_L, app);
      }
      ret.setLinkGraphics(linkGraphics);
      return ret;
   }
}

{%endhighlight%}
</details>
[Robots and Joint API Page]: /documentation/20-scs/01-api/20-robot-and-joint-api