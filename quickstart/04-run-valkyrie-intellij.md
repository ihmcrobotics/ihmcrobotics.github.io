---

title: Run ValkyrieDemo
full-title: Run ValkyrieDemo from IntelliJ
order: 4
category: quickStart
tab: IntelliJ

---

Now we will run the Valkyrie simulation from IntelliJ, but the JVM requires more memory.  We suggest at least 4GB.

# Create the Run Configuration

Right click on `ValkyrieDemo.java` in your project window, and select  `Run 'ValkyrieDemo.main()'` from the menu.  This will start the simulator and preconfigure the application's run configuration for you.

![NewRunConfiguration](/resources/images/quickstart/intellij/run-valkyrie-demo.png)

Quit the java application window and select `Edit Configurations...` from the menu bar at the top.


![RunConfigurationVMSettings](/resources/images/quickstart/intellij/edit-run-configuration-menu.png)


Make sure that "ValkyrieDemo" name is selected under "Application".  
Choose the `Configuration` tab and add `-Xms4096m -Xmx4096m` to the `VM Options:` text area.  Now click `Apply` to save your configuration.  

![RunConfigurationVMSettings](/resources/images/quickstart/intellij/run-configuration.png)



# Run ValkyrieDemo

You can now click ![RunConfigurationVMSettings](/resources/images/quickstart/intellij/run-icon.png) from the menu bar at the top to run the simulation.


Once your program launches you should see the SCS Splash Screen, followed by the Valkyrie simulation. Click the `Simulate` button. Valkyrie should settle and balance in a standing position.

![Valkyrie Sim](/resources/images/quickstart/scsValkyrieStanding.png)


<a name="walk"></a>To make Valkyrie walk, type "walk" in the Variable search field. Find the variable named "walk", and set it's value to "1.0". If Valkyrie does not start walking, click the `Simulate` button, and Valkyrie should begin the flat ground walking track script. Congratulations! Everything is installed correctly!

![Walking](/resources/images/quickstart/scsValkyrieWalking.png)

If the simulation 'crashes', you will need to quit it and restart from Eclipse.

![Crashing](/resources/images/quickstart/scsValkyrieCrashing.png)

For a more detailed explanation of Gradle Projects, IHMC Robotics Libraries, and SCS, see the [Documentation](/documentation/01-scs/00-tutorials/01-running-a-simulation) pages.
