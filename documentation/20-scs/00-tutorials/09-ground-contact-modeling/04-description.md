---

title: Description and Analysis

---

## 1. Examine the source code
   Find the following 4 lines in `FallingBrickRobot` where the ground contact is defined:

{%highlight java%}
GroundContactModel groundModel = new LinearGroundContactModel(this, 1422, 150.6, 50.0, 1000.0, this.getRobotsYoVariableRegistry());
GroundProfile3D profile = new WavyGroundProfile();
groundModel.setGroundProfile3D(profile);
this.setGroundContactModel(groundModel);
{%endhighlight%}

## 2. Lets look at it one line at a time
   Notice that the `groundModel` is an instance of the class `LinearGroundContactModel` and the `GroundProfile` is an instance of the class `WavyGroundProfile()`. 

## 3. Examine the file WavyGroundProfile.java
   Since `WavyGroundProfile` implements the interface `GroundProfile`, it defines the methods: 
   
   `heightAt`, `isClose`, `surfaceNormalAt`, `closestIntersectionTo`, `closestIntersectionAndNormalAt`, `getXmin`, `getXmax`, `getYmin`, `getYmax`, `getXTiles`, and `getYTiles`. 
   
   The point where the height of the ground is defined is in heightAt: **return 1.0 * Math.exp(-Math.abs(2.0*x)) * Math.exp(-Math.abs(2.0*y)) * Math.sin(2.0*Math.PI*0.7*x);**

## 4. Change the profile of the terrain
   Do this by changing the function `heightAt`. Run the simulation and see how the profile of the ground changed.
   
   To read more about how to use and setup GroundProfile check out the [Ground Profile Interface API] page.

## 5. Examine the file LinearGroundContactModel.java
   Since `LinearGroundContactModel` implements the interface `GroundContactModel`, it defines the method `doGroundContact`, where the ground contact forces are computed.

## 6. Study the doGroundContact and resolveContactForceZUp methods in the file LinearStickSlipGroundContactModel.java
   Notice that the ground is modeled as a linear spring-damper in the x and y directions and a non-linear spring and a linear damper in the z direction.
   Using a non-linear (hardening) spring in the z direction is a standard way to prevent ground chatter or bounce while still simulating a stiff ground. This `GroundContactModel` is a simple one and does not take into consideration the surface normal of the ground, or ground slipping. 
   For this example simulation, that is ok, but in many instances, these effects are important. If so, then you should use one of the other ground contact models in the `com.yobotics.simulationconstructionset.utils` package, or create your own.

## 7. Experiment with different values of ground spring and damping constants
   Note that as you lower the stiffnesses, greater penetration into the ground will occur. As you lower the damping constants, vibrations occur longer. 
   However, if you increase the stiffness or damping constants too much, instabilities can occur due to numerical instabilities.

## 8. As a general rule of thumb
   Ground stiffness and damping are tuned experimentally until an acceptable ground penetration and bounce is achieved. 
   Try tuning the ground parameters for different ground penetration and bounce.


Various GroundProfiles and GroundContactModels are provided in the `com.yobotics.simulationconstructionset.util.ground` directory.
You should examine the source code of these files (found in SimulationConstructionSet\src) 
in order to determine the model and profile best for your simulation, and to understand how to create your own custom ground contact model.

[Ground Profile Interface API]: /documentation/20-scs/01-api/30-kinematic-external-force-point-and-ground-contact-point-api