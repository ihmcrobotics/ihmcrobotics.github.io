---
title: Link constructor and methods
---

Link constructor and methods for setting the mass, center of mass offset, and moment of inertia. 
These methods affect the dynamics of the link. All of the others are for graphical purposes only. The center of mass offset is the vector from the joint to the center of mass. 
The moment of inertia is defined about the center of mass. Thus a moment of inertia of zero corresponds to a point mass.

Creating a Link and Setting its Properties

Creates a link with name lname.
{% highlight java %} 
Link(String lname) 
{% endhighlight %}

Sets the mass of the link.
{% highlight java %}
void setMass(double mass)
{% endhighlight %}

Sets the moment of inertia of the link about the center of mass.
{% highlight java %}
void setMomentOfInertia(double Ixx, double Iyy, double Izz)
{% endhighlight %}

Sets the center of mass offset of the link with respect to its corresponding joint.
{% highlight java %}
void setComOffset(double xOffset, double yOffset, double zOffset)
{% endhighlight %}

Sets the associated graphics properties object for this link
{% highlight java %}
Void setLinkGraphics(Graphics3DObject linkGraphics)
{% endhighlight %}

### Related Example:
[Example of how Link Constructors are used]

[Example of how Link Constructors are used]: /documentation/20-scs/00-tutorials/05-creating-links