---

title: Creating Links

---

In this tutorial, we will create various shapes and add them to a link. Figure 6 shows eleven different shapes, each with a coordinate system at their origin point. 

![ Eleven example shapes. Coordinate systems are located at the origin of each shape.](/resources/images/documentation/Figure6Shapes-500-300.png)

Figure 6: Eleven example shapes. Coordinate systems are located at the origin of each shape.

1. Create a new project in Eclipse with the name LinkExamples.
2. Add the class LinkExamplesSimulation
3. Fill in LinkExamplesSimulation as follows: 
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
       private static final double
          CUBE_L = 0.2, CUBE_W = 0.1, CUBE_H = 0.3;
       private static final double SPHERE_R = 0.15;
       private static final double
          ELLIPSOID_RX = 0.1, ELLIPSOID_RY = 0.2, ELLIPSOID_RZ = 0.3;
       private static final double
          HEMI_ELLIPSOID_RX = 0.2, HEMI_ELLIPSOID_RY = 0.1, HEMI_ELLIPSOID_RZ = 0.4;
       private static final double
          CYLINDER_H = 0.4, CYLINDER_R = 0.05;
       private static final double
          CONE_H = 0.4, CONE_R = 0.1;
       private static final double
          GEN_TRUNCATED_CONE_HEIGHT = 0.2, GEN_TRUNCATED_CONE_BX = 0.15, GEN_TRUNCATED_CONE_BY = 0.15, GEN_TRUNCATED_CONE_TX = 0.1, GEN_TRUNCATED_CONE_TY = 0.05;
       private static final double
          ARC_TORUS_START_ANG = 0.0, ARC_TORUS_END_ANG = 1.5 * Math.PI, ARC_TORUS_MAJ_RAD = 0.2, ARC_TORUS_MIN_RAD = 0.05;
       private static final double
          PYRAMID_CUBE_LX = 0.15, PYRAMID_CUBE_LY = 0.15, PYRAMID_CUBE_LZ = 0.08, PYRAMID_CUBE_LH = 0.15;
     
       private static final double
          OFFSET = 1.2, COORD_LENGTH = 0.5;
       private static final double WEDGE_X = 0.4, WEDGE_Y = 0.3, WEDGE_Z = 0.2;
     
       public LinkExamplesSimulation()
       {
          Robot nullRob = null;
          sim = new SimulationConstructionSet(nullRob);
          // position the camera to view links
          sim.setCameraPosition(6.0, 6.0, 3.0);
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
          Graphics3DObject linkGraphics = new Graphics3DObject();
          // Cube
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          linkGraphics.addCube(CUBE_L, CUBE_W, CUBE_H, YoAppearance.Teal());
          // Sphere
          linkGraphics.translate(OFFSET, 0.0, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          linkGraphics.addSphere(SPHERE_R, YoAppearance.Aqua());
          // Ellipsoid
          linkGraphics.translate(OFFSET, 0.0, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          linkGraphics.addEllipsoid(ELLIPSOID_RX, ELLIPSOID_RY, ELLIPSOID_RZ, YoAppearance.Navy());
          // Hemiellipsoid
          linkGraphics.translate(-2.0 * OFFSET, OFFSET, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          linkGraphics.addHemiEllipsoid(HEMI_ELLIPSOID_RX, HEMI_ELLIPSOID_RY, HEMI_ELLIPSOID_RZ, YoAppearance.DarkBlue());
          // Cylinder
          linkGraphics.translate(OFFSET, 0.0, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          linkGraphics.addCylinder(CYLINDER_H, CYLINDER_R, YoAppearance.Green());
          // Cone
          linkGraphics.translate(OFFSET, 0.0, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          linkGraphics.addCone(CONE_H, CONE_R, YoAppearance.DarkGreen());
          // GenTruncCone
          linkGraphics.translate(-2.0 * OFFSET, OFFSET, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          linkGraphics.addGenTruncatedCone(GEN_TRUNCATED_CONE_HEIGHT, GEN_TRUNCATED_CONE_BX, GEN_TRUNCATED_CONE_BY, GEN_TRUNCATED_CONE_TX, GEN_TRUNCATED_CONE_TY,
                                  YoAppearance.Red());
          // ArcTorus
          linkGraphics.translate(OFFSET, 0.0, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          linkGraphics.addArcTorus(ARC_TORUS_START_ANG, ARC_TORUS_END_ANG, ARC_TORUS_MAJ_RAD, ARC_TORUS_MIN_RAD, YoAppearance.DarkRed());
          // PyramidCube
          linkGraphics.translate(OFFSET, 0.0, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          linkGraphics.addPyramidCube(PYRAMID_CUBE_LX, PYRAMID_CUBE_LY, PYRAMID_CUBE_LZ, PYRAMID_CUBE_LH, YoAppearance.BlackMetalMaterial());
           
          // Extruded Polygon
          linkGraphics.translate(-2.0 * OFFSET, OFFSET, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          ArrayList<Point2d> polygonPoints = new ArrayList<Point2d>();
          polygonPoints.add(new Point2d());
          polygonPoints.add(new Point2d(0.4, 0.0));
          polygonPoints.add(new Point2d(0.3, 0.3));     
          double height = 0.25;
          linkGraphics.addExtrudedPolygon(polygonPoints, height, YoAppearance.Purple());
           
          // Mesh Data
          linkGraphics.translate(OFFSET, 0.0, 0.0);
          linkGraphics.addCoordinateSystem(COORD_LENGTH);
          MeshDataHolder meshData = MeshDataGenerator.Wedge(WEDGE_X, WEDGE_Y, WEDGE_Z);
          AppearanceDefinition meshAppearance = YoAppearance.Gold();
          linkGraphics.addMeshData(meshData, meshAppearance );
           
          // Gridded Polytope
    //      linkGraphics.translate(OFFSET, 0.0, 0.0);
    //      linkGraphics.addGriddedPolytope();
           
          ret.setLinkGraphics(linkGraphics);
           
          return ret;
       }
     
    }
    {% endhighlight %}
4. The structure of this code should now be familiar to you. Notice, however, that this is purely a static graphic we are creating. There is no robot, and thus no dynamics. This will allow us to focus on creating the graphics of a link.
5. Run LinkExampleSimulation. You should get a view resembling that of Figure 6.
6. Modify the values of the parameters of the shape and notice how it changes the shapes.
7. Notice the location of the coordinate systems relative to each shape. The origin of each coordinate system is at the origin of each shape.
8. Add rotations and more translation and notice their effects.
9. Notice that all of the shapes are black. Try creating some with different appearances using the YoAppearance utility API.
10. Once you are comfortable with the shapes and appearances, try experimenting to make an object, such as a snowman, out of the shapes.