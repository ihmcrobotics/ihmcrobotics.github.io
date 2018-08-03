---

title: Installing Java on Ubuntu 

---

* Installing Java on Ubuntu 14.04 or 16.04

We currently support Ubuntu 14.04 LTS with Oracle Java 8 or Ubuntu 16.04 using either OpenJDK 8 or Oracle JDK 8.

We suggest minor version u111 or higher because of certificate authority complications; using lower versions might cause problems for the IHMC build scripts with authenticating against certain servers to download dependencies.

The reason we require Oracle JDK 8 on Ubuntu 14.04 LTS is because we utilize JavaFX, and the current OpenJDK PPA for Ubuntu 14.04 does not have an OpenJFX build. The 16.04 repositories come with OpenJDK 8 out of the box as well as OpenJFX


* Installing OpenJDK 8 on Ubuntu 16.04


Ubuntu ships with OpenJDK 8 in its repositories. We suggest also installing the source attachments and Javadocs for easy code navigation in your IDE. To install:

{% highlight bash %}
$ sudo apt-get update
$ sudo apt-get install openjdk-8-jdk openjdk-8-doc openjdk-8-source openjfx
{% endhighlight %}


* Installing Oracle Java 8 on Ubuntu 14.04 or Ubuntu 16.04


Oracle Java 8 can be tapped via a PPA for usage on Ubuntu 14.04. To use Oracle Java 8:

{% highlight bash %}
$ sudo add-apt-repository ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get install oracle-java8-installer oracle-java8-set-default
{% endhighlight %}

More information about what these commands are doing can be found here: <http://www.webupd8.org/2012/09/install-oracle-java-8-in-ubuntu-via-ppa.html>
