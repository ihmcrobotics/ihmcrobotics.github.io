---

title: Your First Project
full-title: Setting up your first project
order: 1

---

# Your first build.gradle

Once you have the requirements installed, we'll get started by setting up a project that depends on the IHMC `Valkyrie` package, which contains all of the code needed to simulate the [NASA Johnson Space Center Valkyrie](http://nasa-jsc-robotics.github.io/valkyrie/) Humanoid robot in IHMC's Simulation Construction Set, as well as the code needed to run our software on the real Valkyrie robot. We'll do this by setting up a Gradle project.

Gradle is a build system for Java. It has the benefit of being able to integrate with other Java technology that is used for dependency resolution like Ivy and Maven; if you're coming from a C/C++ world, you can think of it as CMake with a built-in package manager. In this particular case, we're going to leverage Gradle's ability to interact with *Maven repositories*. The IHMC software binary releases are provided as Maven artifacts. We will give the script the URLs for a few different repositories, and then we will specify dependencies using the Maven "Group Artifact Version (GAV)" nomenclature. Packages are identified by their "group", a namespace that may contain several packages, followed by the "artifact", or the name of the package we want to pull in, and then the "version" of the package that we want.

You can browse our Maven repository and download .jar files directly at <https://bintray.com/ihmcrobotics/maven-release>

As a nice bonus, all Maven artifacts maintain a descriptor (called a POM) that stores information about that artifact's dependencies. So unless you need to have control over which versions of a library you're using, when you specify a Maven artifact that you want to depend on you don't need to specify all of its dependencies by hand; they'll get resolved automatically by the build system as it inspects each artifact's POM!

Let's create a directory called `GradleProject` and in that directory create a file called `build.gradle`. You'll also want to create the folder where your source code lives; the Java convention enforced by Gradle is to have your source code live at `src/main/java`. This can be over-ridden in Gradle, but we'll leave that for another time. You should have a layout on disk like this:

    GradleProject
    ├── src
    │   └── main
    │       └── java
    └── build.gradle

Fill in your `build.gradle` like this:

{% highlight groovy linenos %}

apply plugin: 'java'

repositories {
   maven {
      url  "http://dl.bintray.com/ihmcrobotics/maven-release" // IHMC Code releases
   }

   maven {
      url  "http://dl.bintray.com/ihmcrobotics/maven-vendor" // Third-party libraries that we have vendored for various reasons
   }

   /*  
    *  Maven repos hosted at IHMC for some legacy vendored
    *  dependencies we have not been able to vendor on Bintray yet.
    *  This will be going away eventually.
    */
   maven {
        url "https://bengal.ihmc.us/nexus/content/repositories/thirdparty/"
   }

   jcenter() // One of the central Maven repos. You can also use mavenCentral() instead or in addition to.
}

dependencies {
   compile 'us.ihmc:Valkyrie:0.7.4' // <- Group: us.ihmc, Artifact: Valkyrie, Version: 0.7.4
}

{% endhighlight %}
