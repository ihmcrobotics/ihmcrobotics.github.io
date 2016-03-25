---

title: Run Configuration ValkyrieDemo
full-title: Run Configuration ValkyrieDemo
order: 4
category: quickStart
tab: IntelliJ

---

Now we will run the Valkyrie simulation from IntelliJ, but the JVM requires more memory.  We suggest at least 4GB.

# Create the Run Configuration from IntelliJ

Right click on `ValkyrieDemo.java` in your project window, and select  `Run 'ValkyrieDemo.main()'` from the menu.  This will start the simulator and preconfigure the application's run configuration for you.

![NewRunConfiguration](/resources/images/quickstart/intellij/run-valkyrie-demo.png)

Quit the java application window and select `Edit Configurations...` from the menu bar at the top.


![RunConfigurationVMSettings](/resources/images/quickstart/intellij/edit-run-configuration-menu.png)


Make sure that "ValkyrieDemo" name is selected under "Application".  
Choose the `Configuration` tab and add `-Xms4096m -Xmx4096m` to the `VM Options:` text area.  Now click `Apply` to save your configuration.  

![RunConfigurationVMSettings](/resources/images/quickstart/intellij/run-configuration.png)

You can now click ![RunConfigurationVMSettings](/resources/images/quickstart/intellij/run-icon.png) from the menu bar at the top to run the simulation.


