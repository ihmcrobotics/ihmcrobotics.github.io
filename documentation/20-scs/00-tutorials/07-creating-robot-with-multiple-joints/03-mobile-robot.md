---

title: Initial Variables in MobileRobot Class

---

## Create and add the class MobileRobot 
   Fill it in with the following:  

   These are the separately declared variables that are meant to be easily changed if needed.

{%highlight java%}

package us.ihmc.exampleSimulations.mobile;
 
import javax.vecmath.Vector3d;
import us.ihmc.robotics.robotDescription.LinkGraphicsDescription;
import us.ihmc.graphicsDescription.appearance.YoAppearance;
import us.ihmc.graphicsDescription.appearance.AppearanceDefinition;
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
}

{%endhighlight%}

