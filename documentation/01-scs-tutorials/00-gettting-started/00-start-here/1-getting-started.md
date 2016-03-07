---

title: Getting Started

---

Since the Simulation Construction Set is written in 100% Java, it can be run from many platforms. We currently support Windows and Linux platforms. If you wish to run the Simulation Construction Set from a different platform, contact us and we will help you out. We recommend running the program on a Pentium 4 PC or better with 3D graphics card running either Windows 98, 2000, ME, NT, XP, Windows 7, or Linux. Instructions are provided below for installing the program on a Windows machine with a 3D graphics card supporting Open-GL or DirectX. We will use Eclipse to compile the simulations, but any Java development tools can be used.  

1. If you do not have a Java IDE, download and install Eclipse.  This can be downloaded at [http://eclipse.org/downloads](http://eclipse.org/downloads) for all major platforms (Windows, Mac, Linux).  This is a free, open source IDE with many free plugins.  A useful one is, Subclipse, an SVN support plugin.

2. If you are not familiar with the Java IDE, get comfortable with the environment by writing and running some programs.  Try to get comfortable importing and setting up libraries.  

3. In the Eclipse menu bar, click on Help -> Help Contents. In the window that pops up, click on Java development user guide. This guide gives good information on creating projects, running them, and setting up libraries.  Help can also be easily found online. Download the SimulationConstructionSet (SCS) and the other IHMC tools from [http://ihmc.us/groups/scs](http://ihmc.us/groups/scs).  Third party tools required for some of the simulation are also available for download from the site.  Also, download the Javadocs and ExampleSimulations. 

4. The tools undergo changes frequently and the SCS is not backward compatible. The files are titled in the pattern xxxxxx_SimulationConstructionSet.jar where xxxxxx is the version number. If there are any previous versions of the Simulation Construction Set, remove them.

5. You will also need the latest version of Apple QuickTime to create QuickTime movies of your simulations. This is available for download from [www.apple.com](www.apple.com).

6. Open a simulation from the Example Simulations. In Eclipse, there are many ways to do so; a common way is to import the folder into the workspace. In the menu bar, select File -> Import -> Under the General Tab, select Existing Projects into Workspace.  Select the root directory either by entering the location of the project in the ExampleSimulations folder or browsing to it.  Clicking finish should import the project into the workspace.

7. Upon importing, there will likely be errors in the project.  This is due to the project unable to find files where it is expecting them, and you will need to add the .jars it expects to your Java classpath. There are many ways to do this:

    1. One way is to add all the .jars as external references.  Click on the root project folder in the Package Explorer; on the Menu Bar, click Project -> Properties.  In the pop-up window, select Java Build Path, then select the Libraries tab.  Click the Add External Jars button, then browse to the location of the SCS .jars, select them then click open.  This will add the .jars to the buildpath of the project. This must be done for all .jars required on the project and on every project.  The Add External Jars page can also be accessed through the context menu that comes up if you right click the project.
    2. Similarly to adding all the .jars separately, you can bundle them into a User Library so that only one file needs to be included.  This library will have to be included in every project.
    3. Another, more complicated method is to add the .jars to our classpath environment variable.  This tends to be very difficult, and should only be done by those very experienced in Java.

8. Along with the IHMC .jar files, don't forget to include the third party .jars as they are critical to many of the simulations.
9. Compile and run the example simulation. If you have any problems, the most likely problems are:
    1. Not having the .jar files in the Java classpath. How to do this properly takes a bit of getting used to. If you are not a Java expert and have trouble with this step, we advise finding someone who is a Java expert to help you through it. Java is an extremely intuitive and easy to use language, except for setting up classpaths. Part of the blame is on the poor IDE design. Perhaps future IDEs will make this process easier…
    2. Not having enough memory in the Java heap size. To fix this, add -Xmx1024m to the VM arguments in the Run Configurations window in Eclipse by clicking on the project, in the menu bar, click Run -> Run Configurations…  This will tell the Java virtual machine to allow the heap space to grow up to 1024 MB.
    3. If you receive an error similar to: “can’t load IA 32-bit .dll on an amd64 platform”, the x64 .dlls may not be accessed correctly or are non-existent.  To fix this, the program must be run on an x86 JRE or JDK.  If you do not have one, it can be downloaded from http://java.com/en/download/manual.jsp.  To use this, you must change your run configuration.  In Eclipse, click on the project, in the menu bar, click Run -> Run Configurations…  Click the JRE tab, select the Alternate JRE radio button. If there is not an x86 JRE, click the Installed JREs… button.  Click the Add button in the pop-up window.  In the following pop-up window, select Standard VM, click Next, then click Directory…  Browse to the location of your x86 JRE, select it and click OK.  Change the JRE name field to one that does not conflict and you can easily tell it is an x86 JRE. Click Finish. Click OK on the Installed JREs pop up window.  You should then be able to select your x86 JRE in the Alternate JRE drop down menu. Click Apply, then Run.
    4. Also, make sure to remove any missing project references from your projects as the IDE will try to compile with them first before using the .jars.

10. Download the newest driver for your graphics card if you experience any difficulty with the 3D views. Several users have experience graphics problems in which the arrow tends to flash and the simulation is jerky. These problems seem to be fixed when the newest driver for their graphics card is installed.


Upon running the program, a Graphical User Interface (GUI) displaying the robot should appear as in Figure 1. Experiment with the simulation. Move on to the next section for instructions on running the simulation.

