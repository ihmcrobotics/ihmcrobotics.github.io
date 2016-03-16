---

title: Simulation Parameters

---

{% highlight java %}
void setDT(double simulateDT, int recordFrequency) 
double getDT()
{% endhighlight %}
Sets the integration time step and variable record frequency (steps per record). 
Defaults are 0.0004 seconds and 50 steps per record (0.02 seconds per record).

{% highlight java %}
void setPlaybackRealTimeRate(double rate)
{% endhighlight %}
Sets the playback slow-motion/fast-motion rate. The default value of 1.0 means real time playback.

{% highlight java %}
void setPlaybackDesiredFrameRate(double rate)
{% endhighlight %}
Sets the desired graphics update rate during playback. Default value is 0.04, or 25 fps.

{% highlight java %}
YoVariable getVar(String varname)
{% endhighlight %}
Finds and returns a YoVariable of the given name.

{% highlight java %}
void addStaticLink(Link staticLink)
{% endhighlight %}
Adds a static link with no physics. For creating the surrounding static world.

{% highlight java %}
public void setFastSimulate(boolean fastSimulate)
{% endhighlight %}
If fastSimulate is true, makes the GUI less responsive during simulation in order to increase simulation speed.
