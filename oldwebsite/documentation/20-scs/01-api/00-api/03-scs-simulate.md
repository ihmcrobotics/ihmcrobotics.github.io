---

title: Simulate methods

---

{% highlight java %}
public void simulate()
{% endhighlight %}
Simulate continuously.

{% highlight java %}
public void simulate(double simulationTime)
{% endhighlight %}
Simulate for simulationTime time.

{% highlight java %}
public void simulate(int numTicks)
{% endhighlight %}
Simulate for numTicks ticks.

{% highlight java %}
public void addSimulateDoneListener(SimulateDoneListener listener)
{% endhighlight %}
Adds a SimulateDoneListener that is called back when simulate() is completed. SimulateDoneListener is an interface whose sole method is public void simulateDone()

{% highlight java %}
public void stop()
{% endhighlight %}
Stop simulating.