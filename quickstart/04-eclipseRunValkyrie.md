---

title: Run ValkyrieDemo
full-title: Run ValkyrieDemo from Eclipse
order: 4
category: quickStart

---

Now we will run the Valkyrie simulation from Eclipse, but the JVM requires more memory.  We suggest at least 4GB.

# Create the Run Configuration

With `ValkyrieDemo.java` open and active in the Java Perspective, choose `Run\Run Configurations...` from the menu.  This will open the Run Configurations dialog. Select `Java Application` on the left as how to run your class, and then click the `New launch configuration` button above it.

![NewRunConfiguration](/resources/images/quickstart/eclipseNewRunConfiguration.png)

You should now have a new Run Configuration under `Java Application` called `ValkyrieDemo`. Choose the `Arguments` tab and add `-Xms4096m -Xmx4096m` to the `VM Arguments:` text area.  Now click `Apply` to save your configuration.

![RunConfigurationVMSettings](/resources/images/quickstart/eclipseVMMemorySetting.png)

# Run ValkyrieDemo

You can click `Run` from the `Run Configuration` dialog to run the simulation, or from now on you can click the 'Run' button from the Eclipse Toolbar in the Java Perspective.

<br>

![RunButton](/resources/images/quickstart/eclipseRunButton.png)

<br>

Once your program launches you should see the SCS Splash Screen, followed by the Valkyrie simulation. Click the `Simulate` button. Valkyrie should settle and balance in a standing position.

![Valkyrie Sim](/resources/images/quickstart/scsValkyrieStanding.png)

To make Valkyrie walk, type "walk" in the Variable search field. Find the variable named "walk", and set it's value to "1.0". If Valkyrie does not start walking, click the `Simulate` button, and Valkyrie should begin the flat ground walking track script. Congratulations! Everything is installed correctly!

![Walking](/resources/images/quickstart/scsValkyrieWalking.png)

If the simulation 'crashes', you will need to quit it and restart from Eclipse.

![Crashing](/resources/images/quickstart/scsValkyrieCrashing.png)

For a more detailed explanation of Gradle Projects, IHMC Robotics Libraries, and SCS, see the [Documentation](/documentation/01-scs/00-tutorials/01-running-a-simulation) pages.
