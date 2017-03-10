---

title: Creating Links

---

In this tutorial we will create various shapes and add them to a link.
The next figure shows eleven different shapes, each with a coordinate system at their origin point. 

![ Eleven example shapes. Coordinate systems are located at the origin of each shape.](/resources/images/documentation/Figure6Shapes-500-300.png)

*Eleven example shapes. Coordinate systems are located at the origin of each shape.*

## 1. Create a new package with the name linkExamples
  This should have the same folder structure that you used in the [Pendulum Example].
  Your new `linkExamples` package should be within your `us.ihmc.exampleSimulations` package. 
  
## 2. Add the class LinkExamplesSimulation 

Create a new class in the `us.ihmc.exampleSimulations.linkExamples` package called `LinkExamplesSimulation`
     
## 3. Fill in LinkExamplesSimulation as follows:  

The following code is where you will be declaring final variables for shapes like a sphere, ellipsoid, cylinder, arc torus, and wedge.

We typically declare these variables separately than the creation of the shapes so that they can can be more easily changed and found.

{% highlight java %}

package us.ihmc.exampleSimulations.linkExamples;

import java.util.ArrayList;
import javax.vecmath.Point2d;

import us.ihmc.graphicsDescription.MeshDataGenerator;
import us.ihmc.graphicsDescription.MeshDataHolder;
import us.ihmc.graphicsDescription.appearance.AppearanceDefinition;
import us.ihmc.graphicsDescription.appearance.YoAppearance;
import us.ihmc.robotics.robotDescription.LinkGraphicsDescription;
import us.ihmc.simulationconstructionset.Link;
import us.ihmc.simulationconstructionset.Robot;
import us.ihmc.simulationconstructionset.SimulationConstructionSet;

public class LinkExamplesSimulation
{
    private SimulationConstructionSet sim;
    
    private static final double SPHERE_R = 0.15;
    
    private static final double ELLIPSOID_RX = 0.1, ELLIPSOID_RY = 0.2, ELLIPSOID_RZ = 0.3;
    
    private static final double CYLINDER_H = 0.4, CYLINDER_R = 0.05;
    
    private static final double ARC_TORUS_START_ANG = 0.0, ARC_TORUS_END_ANG = 1.5 * Math.PI;
    private static final double ARC_TORUS_MAJ_RAD = 0.2, ARC_TORUS_MIN_RAD = 0.05;
    
    private static final double OFFSET = 1.5, COORD_LENGTH = 0.5;
    
    private static final double WEDGE_X = 0.4, WEDGE_Y = 0.3, WEDGE_Z = 0.2;   
}
{% endhighlight %}

The parameters that adjust placement and spacing of the shapes are the `OFFSET` and `COORD_LENGTH`.

## 4. Add a constructor to your LinkExamplesSimulation class
   The structure of this code should now be familiar to you. Notice, however, that this is purely a static graphic we are creating. There is no robot, and thus no dynamics.  
   This will allow us to focus on creating the graphics of a link.
   
   {% highlight java %}
   
   public LinkExamplesSimulation()
   {
       Robot nullRob = null;
       sim = new SimulationConstructionSet(nullRob);
       // position the camera to view links
       sim.setCameraPosition(10.0, 6.0, 3.0);
       sim.setCameraFix(0.5, 0.5, 0.0);
       Link exampleShapes = exampleShapes();
       sim.addStaticLink(exampleShapes);
       sim.setGroundVisible(false);
   
       Thread myThread = new Thread(sim);
       myThread.start();
   }
   {% endhighlight %}
   
## 5. Next add the method exampleShapes to your LinkExampleSimulation class
This method will show you examples of how to create simple shapes, assign a color, and add them to your simulation.

In this method there are examples of a Sphere, Ellipsoid, Cylinder, ArcTorus, Extruded Polygon, Mesh Data, and a Gridded Polytope.

{% highlight java %}
private Link exampleShapes()
{
    Link ret = new Link("example shapes");
    LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();

    // Sphere
    linkGraphics.translate(OFFSET, 0.0, 0.0);
    linkGraphics.addCoordinateSystem(COORD_LENGTH);
    linkGraphics.addSphere(SPHERE_R, YoAppearance.Black());

    // Ellipsoid
    linkGraphics.translate(OFFSET, 0.0, 0.0);
    linkGraphics.addCoordinateSystem(COORD_LENGTH);
    linkGraphics.addEllipsoid(ELLIPSOID_RX,
                            ELLIPSOID_RY,
                            ELLIPSOID_RZ,
                            YoAppearance.Black());

    // Cylinder
    linkGraphics.translate(-1 * OFFSET, 1.0, 0.0);
    linkGraphics.addCoordinateSystem(COORD_LENGTH);
    linkGraphics.addCylinder(CYLINDER_H, CYLINDER_R, YoAppearance.Black());

    // ArcTorus
    linkGraphics.translate(OFFSET, 0.0, 0.0);
    linkGraphics.addCoordinateSystem(COORD_LENGTH);
    linkGraphics.addArcTorus( ARC_TORUS_START_ANG,
                            ARC_TORUS_END_ANG,
                            ARC_TORUS_MAJ_RAD,
                            ARC_TORUS_MIN_RAD,
                            YoAppearance.Black());

    // Extruded Polygon
    linkGraphics.translate(-1 * OFFSET, 1.0, 0.0);
    linkGraphics.addCoordinateSystem(COORD_LENGTH);
    ArrayList<Point2d> polygonPoints = new ArrayList<Point2d>();
    polygonPoints.add(new Point2d());
    polygonPoints.add(new Point2d(0.4, 0.0));
    polygonPoints.add(new Point2d(0.3, 0.3));
    double height = 0.25;
    linkGraphics.addExtrudedPolygon(polygonPoints, height, YoAppearance.Black());

    // Mesh Data
    linkGraphics.translate(OFFSET, 0.0, 0.0);
    linkGraphics.addCoordinateSystem(COORD_LENGTH);
    MeshDataHolder meshData = MeshDataGenerator.Wedge(WEDGE_X, WEDGE_Y, WEDGE_Z);
    AppearanceDefinition meshAppearance = YoAppearance.Black();
    linkGraphics.addMeshData(meshData, meshAppearance );

    ret.setLinkGraphics(linkGraphics);

    return ret;
}
{% endhighlight %}
   
## 6. Add the main method to your class
This method should just simply create a new `LinkExamplesSimulation`.

Just as follows:
{% highlight java %}
public static void main(String[] args)
{
    new LinkExamplesSimulation();
}
{% endhighlight %}
   
   
## Full code for the class
<details>
<summary> Link Examples Simulation </summary>

{% highlight java %}
package us.ihmc.exampleSimulations.linkExamples;

import java.util.ArrayList;
import javax.vecmath.Point2d;

import us.ihmc.graphicsDescription.MeshDataGenerator;
import us.ihmc.graphicsDescription.MeshDataHolder;
import us.ihmc.graphicsDescription.appearance.AppearanceDefinition;
import us.ihmc.graphicsDescription.appearance.YoAppearance;
import us.ihmc.robotics.robotDescription.LinkGraphicsDescription;
import us.ihmc.simulationconstructionset.Link;
import us.ihmc.simulationconstructionset.Robot;
import us.ihmc.simulationconstructionset.SimulationConstructionSet;


public class LinkExamplesSimulation
{
   private SimulationConstructionSet sim;

   private static final double SPHERE_R = 0.15;

   private static final double ELLIPSOID_RX = 0.1, ELLIPSOID_RY = 0.2, ELLIPSOID_RZ = 0.3;

   private static final double CYLINDER_H = 0.4, CYLINDER_R = 0.05;

   private static final double ARC_TORUS_START_ANG = 0.0, ARC_TORUS_END_ANG = 1.5 * Math.PI;
   private static final double ARC_TORUS_MAJ_RAD = 0.2, ARC_TORUS_MIN_RAD = 0.05;

   private static final double OFFSET = 1.5, COORD_LENGTH = 0.5;

   private static final double WEDGE_X = 0.4, WEDGE_Y = 0.3, WEDGE_Z = 0.2;


   public LinkExamplesSimulation()
   {
      Robot nullRob = null;
      sim = new SimulationConstructionSet(nullRob);
      // position the camera to view links
      sim.setCameraPosition(10.0, 6.0, 3.0);
      sim.setCameraFix(0.5, 0.5, 0.0);
      Link exampleShapes = exampleShapes();
      sim.addStaticLink(exampleShapes);
      sim.setGroundVisible(false);

      Thread myThread = new Thread(sim);
      myThread.start();
   }


   public static void main(String[] args)
   {
      new LinkExamplesSimulation();
   }


   private Link exampleShapes()
   {
      Link ret = new Link("example shapes");
      LinkGraphicsDescription linkGraphics = new LinkGraphicsDescription();

      // Sphere
      linkGraphics.translate(OFFSET, 0.0, 0.0);
      linkGraphics.addCoordinateSystem(COORD_LENGTH);
      linkGraphics.addSphere(SPHERE_R, YoAppearance.Black());

      // Ellipsoid
      linkGraphics.translate(OFFSET, 0.0, 0.0);
      linkGraphics.addCoordinateSystem(COORD_LENGTH);
      linkGraphics.addEllipsoid(ELLIPSOID_RX,
                                ELLIPSOID_RY,
                                ELLIPSOID_RZ,
                                YoAppearance.Black());

      // Cylinder
      linkGraphics.translate(-1 * OFFSET, 1.0, 0.0);
      linkGraphics.addCoordinateSystem(COORD_LENGTH);
      linkGraphics.addCylinder(CYLINDER_H, CYLINDER_R, YoAppearance.Black());

      // ArcTorus
      linkGraphics.translate(OFFSET, 0.0, 0.0);
      linkGraphics.addCoordinateSystem(COORD_LENGTH);
      linkGraphics.addArcTorus( ARC_TORUS_START_ANG,
                                ARC_TORUS_END_ANG,
                                ARC_TORUS_MAJ_RAD,
                                ARC_TORUS_MIN_RAD,
                                YoAppearance.Black());

      // Extruded Polygon
      linkGraphics.translate(-1 * OFFSET, 1.0, 0.0);
      linkGraphics.addCoordinateSystem(COORD_LENGTH);
      ArrayList<Point2d> polygonPoints = new ArrayList<Point2d>();
      polygonPoints.add(new Point2d());
      polygonPoints.add(new Point2d(0.4, 0.0));
      polygonPoints.add(new Point2d(0.3, 0.3));
      double height = 0.25;
      linkGraphics.addExtrudedPolygon(polygonPoints, height, YoAppearance.Black());

      // Mesh Data
      linkGraphics.translate(OFFSET, 0.0, 0.0);
      linkGraphics.addCoordinateSystem(COORD_LENGTH);
      MeshDataHolder meshData = MeshDataGenerator.Wedge(WEDGE_X, WEDGE_Y, WEDGE_Z);
      AppearanceDefinition meshAppearance = YoAppearance.Black();
      linkGraphics.addMeshData(meshData, meshAppearance );

      ret.setLinkGraphics(linkGraphics);

      return ret;
   }

}
{% endhighlight %}
</details>
   [Pendulum Example]: /documentation/20-scs/00-tutorials/02-creating-a-new-simulation