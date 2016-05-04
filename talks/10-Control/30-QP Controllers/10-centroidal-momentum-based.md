---

title: QP Based on Centroidal Momentum and Motion Constraints
full-title: A QP Control Framework Based on Centroidal Momentum and Motion Constraints

---

**By: Twan Koolen, MIT**  
**Published: Mar 18, 2014**  

<div class="auto-resizable-iframe"><div>
<iframe width="560" height="315" src="https://www.youtube.com/embed/VPgi4PE19iA" frameborder="0" allowfullscreen></iframe>
</div></div><br>

**Summary**  
This presentation describes the QP-based whole-body control framework that was used in IHMC's Virtual Robotics Challenge entry as well as during the DRC trials, albeit in a modified form. The control framework allows desired robot behaviors to be specified as linear constraints on the joint acceleration vector, termed motion constraints. The QP finds a joint acceleration vector and external forces that reconcile the motion constraints with friction cone constraints, using a conservative polyhedral approximation. Exploiting the properties of whole-body centroidal momentum results in a small QP size. Strong links between instantaneous capture point dynamics, the Centroidal Moment Pivot, and the rate of change of centroidal momentum allow for simple high level motion planning.