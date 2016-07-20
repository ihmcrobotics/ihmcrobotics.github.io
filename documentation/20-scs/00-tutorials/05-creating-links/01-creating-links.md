---

title: Creating Links

---

In this tutorial we will create various shapes and add them to a link.  
The next figure shows eleven different shapes, each with a coordinate system at their origin point. 

![ Eleven example shapes. Coordinate systems are located at the origin of each shape.](/resources/images/documentation/Figure6Shapes-500-300.png)

*Eleven example shapes. Coordinate systems are located at the origin of each shape.*

## 1. Create a new project in with the name LinkExamples
  This should have the same folder structure that you used in the [Pendulum Example].
   
## 2. Add the class LinkExamplesSimulation 

Create a new class in the `us.ihmc.exampleSimulations.linkExamples` package called `LinkExamplesSimulation`
     
## 3. Fill in LinkExamplesSimulation as follows:  

These parameters adjust the size, positional offset from each other(`OFFSET` & `COORD_LENGTH`) of each of the shapes that you will be creating.

    {% highlight java %}
    
    package us.ihmc.exampleSimulations.linkExamples;
    
    import java.util.ArrayList;
    import javax.vecmath.Point2d;
    import us.ihmc.graphics3DAdapter.graphics.Graphics3DObject;
    import us.ihmc.graphics3DAdapter.graphics.MeshDataGenerator;
    import us.ihmc.graphics3DAdapter.graphics.MeshDataHolder;
    import us.ihmc.graphics3DAdapter.graphics.appearances.AppearanceDefinition;
    import us.ihmc.graphics3DAdapter.graphics.appearances.YoAppearance;
    import us.ihmc.simulationconstructionset.Link;
    import us.ihmc.simulationconstructionset.Robot;
    import us.ihmc.simulationconstructionset.SimulationConstructionSet;
    
    
    
    public class LinkExamplesSimulation
    {
       private SimulationConstructionSet sim;
       
       private static final double SPHERE_R = 0.15;
       
       private static final double ELLIPSOID_RX = 0.1, ELLIPSOID_RY = 0.2, ELLIPSOID_RZ = 0.3;
       
       private static final double CYLINDER_H = 0.4, CYLINDER_R = 0.05;
       
       private static final double ARC_TORUS_START_ANG = 0.0, ARC_TORUS_END_ANG = 1.5 * Math.PI
       private static final double ARC_TORUS_MAJ_RAD = 0.2, ARC_TORUS_MIN_RAD = 0.05;
       
       private static final double OFFSET = 1.5, COORD_LENGTH = 0.5;
       
       private static final double WEDGE_X = 0.4, WEDGE_Y = 0.3, WEDGE_Z = 0.2;   
    }
    {% endhighlight %}
    
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
            Graphics3DObject linkGraphics = new Graphics3DObject();
    
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
    
            // Gridded Polytope
            //linkGraphics.translate(OFFSET, 0.0, 0.0);
            //linkGraphics.addGriddedPolytope();
    
            ret.setLinkGraphics(linkGraphics);
    
            return ret;
        }
        {% endhighlight %}
   
## 6. Add the a main method to your class
   This method should just simply create a new `LinkExamplesSimulation`.
    
   Just as follows:
     {% highlight java %}
     public static void main(String[] args)
     {
        new LinkExamplesSimulation();
     }
    {% endhighlight %}

## 7. Run LinkExampleSimulation. 
   You should get a view resembling that of the figure below.
![ Six example shapes. Coordinate systems are located at the origin of each shape.](/resources/images/documentation/Black6Figures.png)

## 8. Modify the values of the parameters of some of the shapes

   For example, try modifying the value of the sphere:
   {% highlight java %}
   private static final double SPHERE_R = 0.15;
   {% endhighlight %}
   
   Notice how it changes them.
   
## 9. Try modifying the space set between each shape relative to each shape. 
   The origin of each coordinate system is at the origin of each shape.
   
   Try modifying the `OFFSET` and `COORD_LENGTH` values.
   
   The parameters passed into `translate(OFFSET, 1.0, 0.0)` within the `exampleShapes()` method will change the placement of the shape that calls the `translate()` method.
   
## 10. Add rotations and more translation and notice their effects.  
   
## 11. Try creating some shapes with different appearances
   To change the appearance of some of the shapes take a look at the [YoAppearance Utility API].
  
   
## 12. Once you are comfortable with the shapes and appearances, try experimenting to make an object, such as a snowman, out of the shapes.  
   
   
   [Pendulum Example]: /documentation/20-scs/00-tutorials/02-creating-a-new-simulation
   [YoAppearance Utility API]: /documentation/20-scs/01-api/10-Link-and-graphics3D-object-API/#YoAppearance%20helper%20API