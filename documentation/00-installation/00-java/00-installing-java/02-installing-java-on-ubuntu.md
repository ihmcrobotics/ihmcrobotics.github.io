---

title: Installing Java on Ubuntu 

---

* Installing Java on Ubuntu 14.04

We currently support Ubuntu 14.04 LTS with either OpenJDK 7 or Oracle Java 8.


* Installing OpenJDK 7 on Ubuntu 14.04


Ubuntu ships with OpenJDK 7 in its repositories. We suggest also installing the source attachments and Javadocs for easy code navigation in your IDE. To install:

{% highlight bash %}
$ sudo apt-get update
$ sudo apt-get install openjdk-7-jdk openjdk-7-doc openjdk-7-source
{% endhighlight %}


* Installing Oracle Java 8 on Ubuntu 14.04


Oracle Java 8 can be tapped via a PPA for usage on Ubuntu 14.04. To use Oracle Java 8:

{% highlight bash %}
$ sudo add-apt-repository ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get install oracle-java8-installer oracle-java8-set-default
{% endhighlight %}

More information about what these commands are doing can be found here: <http://www.webupd8.org/2012/09/install-oracle-java-8-in-ubuntu-via-ppa.html>
