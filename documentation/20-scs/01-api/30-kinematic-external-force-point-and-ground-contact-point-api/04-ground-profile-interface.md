---

title: GroundProfile Interface

--- 

GroundProfile is an interface. By setting a GroundProfile to your GroundContactModel, and by setting your GroundContactModel to your robot, the ground when the simulation is run will be drawn as the ground profile.
The user can generate his/her own GroundProfile, or can use one of the GroundProfiles provided in the com.yobotics.simulationconstructionset.utils package. 
If no GroundProfile is specified, then a flat ground will be simulated.

Returns the height of this ground profile, given the x, y, and z values.
{%highlight java%}
public abstract double heightAt(double x, double y, double z);
{%endhighlight%}

Returns true if the ground contact point has penetrated this ground profile. Otherwise returns either true or false. Used only for efficiency, so it is always safe to return true.
{%highlight java%}
public abstract boolean isClose(double x, double y, double z);
{%endhighlight%}

Sets the point intersection to be the closest intersection between the ground profile and the point at (x,y,z). If computation of the intersection is too difficult, return (x, y, heightAt(x,y,z)).
{%highlight java%}
public abstract void closestIntersectionTo (double x, double y, double z, Point3d intersection);
{%endhighlight%}

Sets the vector normal to be the surface normal of the ground at point (x,y,z). Straight up is the vector (0,0,1)
{%highlight java%}
public abstract void surfaceNormalAt(double x, double y, double z, Vector3d normal);
{%endhighlight%}

Sets both the point intersection and surface normal. This method is redundant, but exists due to potential efficiency improvements by computing the intersection and surface normal at the same time. It is safe to implement this method by calling both closestIntersectionTo() and surfaceNormalAt()
{%highlight java%}
public abstract void closestIntersectionAndNormalAt(double x, double y, double z, Point3d intersection, Vector3d normal);
{%endhighlight%}

Returns the boundaries of the ground profile. Everything outside this bound will be drawn at a height of zero. Inside this bound, the ground will be drawn as per the profile. The smaller the bound, the more detailed the graphics. This bound does not effect the resolution of the ground physics, however, which is only bounded by the precision of the numbers.
{%highlight java%}
public abstract double getXMin(); 
public abstract double getXMax(); 
public abstract double getYMin(); 
public abstract double getYMax();
{%endhighlight%}

Returns the number of tilings to perform in both the x and y direction if the ground is texture mapped.
{%highlight java%}
public abstract double getXTiles(); 
public abstract double getYTiles();
{%endhighlight%}

### Related Example: 
[Example of GroundProfile in Use]

[Example of GroundProfile in Use]: /documentation/20-scs/00-tutorials/09-ground-contact-modeling