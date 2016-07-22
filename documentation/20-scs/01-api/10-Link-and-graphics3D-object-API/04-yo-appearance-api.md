---

title: YoAppearance helper API

---

Table 4 lists the methods in the YoAppearance helper API. To add a shape to a link, you simply use the corresponding method. 

For example, the following code will create a red sphere with radius of 0.3 meters and of the given mass and moment of inertia.

{% highlight java %}
Link link1 = new Link("link1");
link1.setMass(1.0);
link1.setMomentOfIntertia(0.1, 0.1, 0.1);
link1.setComOffset(0.0,0.0,0.0);
link1.addSphere(0.3, YoAppearance.Red());
{% endhighlight %}


Returns an Appearance with the given RGB values, each between 0.0 and 1.0
Appearance YoAppearance.RGBColor(float red, float green, float blue)

The user can choose among a set of predefined Appearances with the following syntax: 
{% highlight java %}
//Returns a black Appearance.
Appearance YoAppearance.Black()
//Returns a white Appearance.
Appearance YoAppearance.White()
//Returns a blue Appearance.
Appearance YoAppearance.Blue()
//...
{% endhighlight %}

The available colors are: White, Black, Blue, DarkBlue, Red, DarkRed, Green, DarkGreen, Silver, Gray, Marroon, Purple, Fushia, Olive, Yellow, navy, Teal, Aqua, BlackMetalMaterial, and AluminumMaterial.      

Sets the transparency of Appearance app to the desired value. 1.0 is fully transparent.
{% highlight java %}
void YoAppearance.makeTransparent(Appearance app, float transparency);
{% endhighlight %}

Sets the polygon attributes of Appearance app such that only edges are drawn.
{% highlight java %}
void makeLineDrawing(Appearance app);
{% endhighlight %}

Returns a texture mapped Earth Appearance. The Earth graphics are taken from the Java3D tutorials.
{% highlight java %}
Appearance YoAppearance.EarthTexture(Component comp);
{% endhighlight %}

Returns a texture mapped stone Appearance. The stone graphics are taken from the Java3D tutorials.
{% highlight java %}
Appearance YoAppearance.StoneTexture(Component comp);
{% endhighlight %}

[Back to Creating Links Tutorial]

[Back to Creating Links Tutorial]: /documentation/20-scs/00-tutorials/05-creating-links/#Run%20the%20Simulation