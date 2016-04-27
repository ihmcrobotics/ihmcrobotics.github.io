---

title: Installing Gradle on Ubuntu

---


Up-to-date versions of Gradle are available from a Launchpad PPA. The version of Gradle available without the PPA is woefully out of date. You will need to add the following PPA: <https://launchpad.net/~cwchien/+archive/ubuntu/gradle>. All put together, this looks like:

{% highlight bash %}
$ sudo add-apt-repository ppa:cwchien/gradle
$ sudo apt-get update
$ sudo apt-get install gradle
{% endhighlight %}
