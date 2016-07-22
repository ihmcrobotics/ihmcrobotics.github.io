---

title: MobileRobot.class description

---

## 1. Examine where the 3 levels of gimbal joints are defined:
   Examine the lines where the 3 different levels of gimbal joints are defined. Note how in Java, Strings can be concatened using " " + " ", and that integers will be turned into Strings in this way. For example, if i=3, then "gimbal1_" + i "_x" will result in "gimbal1_3_x".
   
   Look at the offset Vector3d for each joint level. The first is (0.0,0.0,1.0). The second is (xOffset, yOffset, -L1/2.0) where (xOffset,yOffset) is either (L1,0), (-L1,0), (0,L1), or (0,-L1). 
   The third is (xOffset, yOffset, -L2/2.0) where (xOffset,yOffset) is either (L2,0), (-L2,0), (0,L2), or (0,-L2).
    
   * The first offset is (0.0,0.0,1.0) simply to place the mobile into the air. 
   * The second offset is the offset from the second level of 4 gimbal joints to each of their parent joint, which is the first gimbal joint. 
   The top crossbar goes down L1/2.0 and in each of the four directions by L1. Therefore, the given offsets should work. 
   * The third offset is the offset of the final level of 16 gimbals from their parents above them. The smaller crossbars go down L2/2.0 and in each of the four directions by L2.
   Therefore, the given offsets should work. 
   
   Note that the joint offsets are completely independent of any translations or rotations which are performed while specifying links:
   
   * **firstGimbal = new GimbalJoint("gimbal_x", "gimbal_y","gimbal_z", new Vector3d(0.0,0.0,1.0), this, Axis.X, Axis.Y, Axis.Z);**
   * **nextGimbal = new GimbalJoint("gimbal1_" + i + "_x", "gimbal1_" + i + "_y", "gimbal1_" + i + "_z", new Vector3d(xOffset, yOffset, -L1 / 2.0), this, Axis.X, Axis.Y, Axis.Z);**
   * **finalGimbal = new GimbalJoint("gimbal2_" + i + "_" + j + "_x", "gimbal2_" + i + "_" + j + "_y", "gimbal2_" + i + "_" + j + "_z", new Vector3d(xOffset, yOffset, -L2 / 2.0), this, Axis.X, Axis.Y, Axis.Z);**
    
    
## 2. Note that viscous damping is set for each joint. 
   Viscous damping of the form tau=damping * velocity will be added on top of any torques due to joint limits or a control system. For this simulation, the mobile is completely passive and damping is the only source of joint torque:
   
   * **firstGimbal.setDamping(DAMP1);**
   * **nextGimbal.setDamping(DAMP2);**
   * **finalGimbal.setDamping(DAMP3);**
    
    
## 3. Note that the function initJoint is called for each joint. 
   `initJoint` creates random values for the position and velocity of each of the 3 degrees of freedom for the GimbalJoint and sets the state using `GimbalJoint.setInitialState();`
   
   * **joint.setInitialState(init_q1, init_qd1, init_q2, init_qd2, init_q3, init_qd3);**
   
   
## 4. Creation of the joints, including their offsets, damping, and initialization should be clear. 
   If not, review the above joint generation.
   
   Note that creation of the joints is completely independent of the creation of the link shapes, and that the joint locations and functions will be the same no matter which links are attached to them.
   

## 5. Now let's examine the creation of the links. 
  * We start with the top link, which is a flattened cylinder.
  * We add it to the robot using `Robot.addStaticLink(Link)` since it is not attached to any joints and therefore cannot move.
   Since the first joint of the robot had an offset of (0.0,0.0,1.0), we need to translate to (0.0,0.0,1.0+R1/2.0) before adding this link:
    * **Link topLink = new Link("top");**
    * **Graphics3DObject topLinkGraphics = new Graphics3DObject();**
    * **topLinkGraphics.translate(0.0, 0.0, 1.0+R1/2.0);**
    * **topLinkGraphics.addCylinder(L1/60.0, L1/3.0, YoAppearance.DarkBlue());**
    * **topLink.setLinkGraphics(topLinkGraphics);**
    * **this.addStaticLink(topLink);**


## 6. In creating the crossbar geometry: 
   We first create the upper sphere-capped cylinder which projects downward. Since the origin of a cylinder is the center of its base, we must first translate down the length of the upper cylinder (length/2.0) before adding it:
   
   * **linkGraphics.addSphere(R1, YoAppearance.Red());**
   * **linkGraphics.translate(0.0, 0.0, -length/2.0);**
   * **linkGraphics.addCylinder(length/2.0, radius);**


## 7. Next, we create the 2 horizontal cylinders, capped with red spheres on both ends. 
   They both are created identically, except that they are translated and rotated differently. The first one is created as follows:
   
   * **linkGraphics.identity();**
       * This line brings us back to the gimbal joint.
   * **linkGraphics.translate(length, 0.0, -length/2.0);** 
       * Translate down length/2.0 and in the X direction by length.
   * **linkGraphics.rotate(-Math.PI/2.0, Axis.Y);**
       * Rotate by –Math.PI/2.0 about the Y axis. This will now make the Z axis point in the direction in which we wish to place our cylinder (along the original X axis).
   * **linkGraphics.addCylinder(2.0*length, radius);** 
       * Add the cylinder.
   * **linkGraphics.addSphere(radius, YoAppearance.Red());**
       * Add a sphere to cap this end of the cylinder.
   * **linkGraphics.translate(0.0, 0.0, 2.0*length);**
       * Translate along the Z axis to the other end of the cylinder.
   * **linkGraphics.addSphere(radius, YoAppearance.Red());**
       * Cap the other end of the cylinder.


## 8. The second cylinder is identical to the first, except for the initial translation and rotation:
   * **linkGraphics.translate(0.0, length, -length/2.0);** 
       * Translate down length/2.0 and in the Y direction by length.
   * **linkGraphics.rotate(Math.PI/2.0, Axis.X);** 
       * Rotate by Math.PI/2.0 about the X axis. This will now make the Z axis point in the direction in which we wish to place our cylinder (along the original Y axis).
   
   
## 9. Examine the randomShape code. 
   It will randomly select a string length, an appearance and a shape for each of the 16 toys at the ends of the mobile. How this code works should now be clear to you.
   If not, experiment with it, or try making a simulation of a different style of mobile to become comfortable with joints and links.
   
For more detailed information on joints check out the [Robots and Joint API Page]

[Robots and Joint API Page]: /documentation/20-scs/01-api/20-robot-and-joint-api