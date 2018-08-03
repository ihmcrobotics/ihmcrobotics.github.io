---

title: Efficient Whole-Body Dynamic Locomotion Controller
full-title: An Efficient Controller for Whole-Body Dynamic Locomotion

---

**By: Scott Kuindersma, MIT**  
**Published: Mar 18, 2014**  

<div class="auto-resizable-iframe"><div>
<iframe width="560" height="315" src="https://www.youtube.com/embed/hS5US0Gndfs" frameborder="0" allowfullscreen></iframe>
</div></div><br>

**Summary**  
We describe a dynamic walking controller implemented as a convex quadratic program (QP). The controller minimizes a control-Lyapunov function derived from a simple walking model while respecting the dynamic, input, and contact constraints of the full robot dynamics. Using a custom active-set algorithm to exploit the sparsity and temporal structure common to most QP-based walking controllers, we surpass the performance of the best available off-the-shelf solvers and achieve 1kHz control rates for a 34-DOF humanoid. We describe applications to balancing and walking with Atlas.