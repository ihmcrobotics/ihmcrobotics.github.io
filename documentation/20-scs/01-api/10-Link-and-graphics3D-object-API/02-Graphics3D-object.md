---
title: Graphics3DObject constructor and methods
---

Part 2 lists the Graphics3DObject constructor and methods for adding rotation and translation. These transformations accumulate until identity() is called,
in which the transformation for new shapes to be added is reset to the origin. Note that if you rotate and then translate, the translation will be along the new coordinate system defined by the rotation.
For example, **rotate(Math.PI/2.0, Axis.X); translate(0.0,1.0,0.0);** is equivalent to **translate(0.0,0.0,1.0); rotate(Math.PI/2.0, Axis.X);**

Creates an instance of Graphics3DObject
{% highlight java %}
Graphics3DObject()
{% endhighlight %}

Reset back to the joint origin.
{% highlight java %}
void identity()
{% endhighlight %}

Translate by (tx,ty,tz)
{% highlight java %}
void translate(double tx, double ty, double tz)
{% endhighlight %}


Rotate by rotAng about rotAxis. rotAxis can be Axis.X, Axis.Y, or Axis.Z
{% highlight java %}
void rotate(double rotAng, int rotAxis)
{% endhighlight %}

Constants for specifying axis of rotation for Link.rotate method.
{% highlight java %}
public static final int Axis.X; 
public static final int Axis.Y; 
public static final int Axis.Z;
{% endhighlight %}

[Example of how Graphics3DObject is used]

[How Graphics3DObject is used]: /documentation/20-scs/00-tutorials/05-creating-links/#Run%20the%20Simulation
