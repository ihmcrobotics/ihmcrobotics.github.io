---

title: Balancing Experiments with a Hierarchical Inverse Dynamics Controller
full-title: Balancing Experiments with a Hierarchical Inverse Dynamics Controller on Humanoid

---

**By: Alexander Herzog, MPI**  
**Published: Mar 18, 2014**  

<div class="auto-resizable-iframe"><div>
<iframe width="560" height="315" src="https://www.youtube.com/embed/te-453kApgs" frameborder="0" allowfullscreen></iframe>
</div></div><br>

**Summary**  
Recently several hierarchical inverse dynamics controllers based on cascades of quadratic programs have been proposed for application to torque controlled robots. They have important theoretical benefits but have never been implemented on a torque controlled robot where model inaccuracies and real-time computation requirements can be problematic. In this contribution we present an experimental evaluation of these algorithms in the context of balance control for a humanoid robot. The presented experiments demonstrate the applicability of the approach under real robot conditions (i.e. model uncertainty, estimation errors, etc). We propose a simplification of the optimization problem that allows us to decrease computation time enough to implement it in a fast torque control loop. We implement a momentum-based balance controller which shows robust performance in face of unknown disturbances, even when the robot is standing on only one foot. In a second experiment, a tracking task is evaluated to demonstrate the performance of the controller with more complicated hierarchies. Our results show that hierarchical inverse dynamics controllers can be used for feedback control of humanoid robots and that momentum-based balance control can be efficiently implemented on a real robot.