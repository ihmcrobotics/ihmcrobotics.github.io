---
title: Creating a new simulation
---

This tutorial assumes you know a little about your IDE (Eclipse or IntelliJ), and a little about Java. In parallel with these tutorials, you should also experiment with your IDE to learn how to use its features. 
You should also learn Java, if you haven't already, by picking up a good Java book or two. We recommend Bruce Eckel's "Thinking in Java", which can be downloaded for free at [bruceeckel.com](http://www.mindview.net/Books/TIJ/) , or purchased. 
In this tutorial, we will create a simple simulation of a simple pendulum. By the end of the tutorial you should be able to create and simulate simple passive systems with pin joints.

1. Start your editor.  
2. Create a new Java Project as described in the Quickstart guide using the Gradle build script below, and name it "SimulationConstructionSetTutorial". All exercises in this tutorial will be contained in this project.  
    {% highlight groovy %}
    
    apply plugin: 'java'  
      
    sourceCompatibility = 1.5  
      
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
    compile 'us.ihmc:SimulationConstructionSet:0.7.4' 
}

{% endhighlight %}

3. Make sure that the project dependencies have been correctly imported by expanding the "Gradle Projects" tool window. You should see a full list of dependencies under the Dependencies folder.   
4. For our first tutorial we are going to learn how to create a simple simulation. In the java directory of your project under `src/main/java`, create a new package named `exampleSimulations.simplePendulum`. 
5. Every simulation requires a Robot class and a Simulation class; Therefore in the `simplePendulum` package we will create two new Java classes named **SimplePendulumRobot** and **SimplePendulumSimulation**.





