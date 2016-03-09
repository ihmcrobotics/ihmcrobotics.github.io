---

title: Description and analysis

---

1. Run the FlyballGovernorSimulation class. Note that the blue cylinder rises as the device spins faster. To vary the desired speed, change the value of q_d_cylinder_z.
2. Examine the FlyballGovernorRobot source code. Note where the ExternalForcePoints are created and attached.
3. Examine doConstraint in FlyballGovernorSimpleClosedLoopConstraint. Here is where the constraint forces betwen two points, A and B, are generated. We see that for each constraint, a linear spring-damper is used to "glue" the two ExternalForcePoints together:
{%highlight java%}
positionA.getPoint(posA);
positionB.getPoint(posB);
velocityA.getVector(velA);
velocityB.getVector(velB);
springForceA.sub(posB, posA);
positionErrorMagnitude.set(springForceA.length());
springForceA.scale(constraintGain.getDoubleValue());
dampingForceA.sub(velB, velA);
dampingForceA.scale(constraintDamp.getDoubleValue());
newForceA.add(springForceA, dampingForceA);
newForceB.scale(-1.0, newForceA);
 
forceA.set(newForceA);
forceB.set(newForceB);
{%endhighlight%}

4. Change the value of constraintGain and constraintDamp to 0.0 while in simulation. See that the constraint is no longer enforced and the "glue" joint comes apart.
5. Now look at the doControl() function in FlyballGovernorRobot. The feedback mechanism used in the FlyballGovernor is tau_rotation.set(k_feedback.getDoubleValue() * (q_d_cylinder_z.getDoubleValue() - q_cylinder_z.getDoubleValue())); The torque on the rotation joint is proportional to the height of the cylinder. This is an example of how flyballs on locomotive engines are used. Flyball governors throttle steam engines proportionally to the height of the cylinder. In essence, a flyball governor provides velocity feedback control completely mechanically.
6. Try implementing a closed-loop mechanism on your own. Examples include four-bar linkages or a necklace with rigid links.