---

title: Camera Methods

---
<a name="scsCameraAPI">

{% highlight java %}
void setCameraFix(double fixX, double fixY, double fixZ)
{% endhighlight %}
Sets the coordinates of the position that the camera is fixed to (looking at).

{% highlight java %}
void setCameraTracking(boolean track, boolean trackX, boolean trackY, boolean trackZ)
{% endhighlight %}
Sets whether the camera is tracking an object or not. Tracking along individual axes (x,y,z) can be set.

{% highlight java %}
void setCameraTrackingOffsets(double dx, double dy, double dz)
{% endhighlight %}
Sets the offset vector of the fix point of the camera from the object it is tracking.

{% highlight java %}
void setCameraTrackingVars(String xName, String yName, String zName)
{% endhighlight %}
Sets the variable names of the object the camera is tracking. Default is q_x, q_y, q_z.

{% highlight java %}
void setCameraPosition(double posX, double posY, double posZ)
{% endhighlight %}
Sets the coordinates of the position of the camera.

{% highlight java %}
void setCameraDolly(boolean dolly, boolean dollyX, boolean dollyY, boolean dollyZ)
{% endhighlight %}
Sets whether the camera is dollying relative to an object or not. Dolly along individual axes (x,y,z) can be set.

{% highlight java %}
void setCameraDollyOffsets(double dx, double dy, double dz)
{% endhighlight %}
Sets the camera offset vector from the object it is dollying relative to.

{% highlight java %}
void setCameraDollyVars(String xName, String yName, String zName)
{% endhighlight %}
Sets the variable names of the object the camera is dollying relative to. Default is q_x, q_y, q_z.
