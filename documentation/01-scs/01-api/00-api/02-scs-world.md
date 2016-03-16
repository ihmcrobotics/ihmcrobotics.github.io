---

title: Create the World

---

{% highlight java %}
void addStaticBranchGroup(BranchGroup staticBranchGroup)
{% endhighlight %}
Adds a static branch group with no physics. For creating the surrounding static world.

{% highlight java %}
void setupVarGroup(String name, String[] varNames)
void setupVarGroup(String name, String[] varNames, String[] regularExpressions)
{% endhighlight %}
Defines a group of variables that can be selected via the GUI. The first String array contains exact names. The second optional String array is regular expressions that will be matched to YoVariable names.

{% highlight java %}
void setupGraphGroup(String name, String[][] varNames)
{% endhighlight %}
Defines a graph group that can be selected via the GUI.

{% highlight java %}
void setupEntryBoxGroup(String name, String[] varNames)
{% endhighlight %}
Defines a group of entry boxes that can be selected via the GUI.

{% highlight java %}
void setupConfiguration(String name, String varGroup, String graphGroup, String entryBoxGroup)
{% endhighlight %}
Defines a configuration consisting of a variable group, a graph group, and an entry box group. Use "all" for the varGroup to display all the variables.

{% highlight java %}
void selectConfiguration(String name)
{% endhighlight %}
Selects the default configuration for the GUI.

{% highlight java %}
public void setGroundVisible(boolean isVisible)
{% endhighlight %}
Makes the ground invisible if isVisible is false, otherwise makes the ground visible.

{% highlight java %}
void setGroundAppearance(Appearance app)
{% endhighlight %}
Sets the Appearance of the ground to app.