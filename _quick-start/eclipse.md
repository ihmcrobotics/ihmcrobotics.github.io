---

title: Eclipse Import
full-title: Importing your first project in to Eclipse
order: 2

---

If you installed Eclipse IDE for Java Developers Mars.1 or higher, you will have access to the Buildship plugin, a tool that brings Gradle integration to the Eclipse IDE. If you have a different version of Eclipse (e.g. Eclipse IDE for Java EE Developers) or an older version, you may be able to install Buildship via the Eclipse Marketplace.

Once you have a working version of Eclipse with Buildship installed, you can import your recently created `GradleProject`. The first time you launch Eclipse, it will ask you to choose your workspace. Note that in Eclipse, your Workspace does not need to be where your code lives. Select any location you please.

Once your workspace is established and Eclipse is up and running, we'll import our `GradleProject`. Select `File -> Import` to open the Import wizard, and select `Gradle Project`:

![Import Gradle Project](http://d.pr/i/yCGJ+)

This will bring up the Buildship wizard:

![Buildship welcome screen](http://d.pr/i/ScnR+)

Click `Next`, then click `Browse` next to the field for "Project root directory", and select the `GradleProject` directory that you created:

![Select the GradleProject directory](http://d.pr/i/1iG7s+)

Click `Next` to be taken to the next page of the wizard, where you can configure which version of Gradle to be used. If you want to point at your locally installed Gradle, you can do so here. You can also choose to use the "Gradle Wrapper", which is the default option. We recommend that you use the Gradle Wrapper.

Click `Next` again to kick off the initial Gradle build. The Buildship plugin will run Gradle in order to generate the IDE-specific configuration files for managing the project via the Eclipse GUI. This step may take a while; Buildship must pull in some of the Gradle runtime and analyze the structure of the project (our structure is very simple). If Buildship doesn't throw any errors, you should see your `GradleProject` show up in the "Gradle Project structure" area:

![Successful Gradle build](http://d.pr/i/1gWyR+)

Success! Click `Finish`! Buildship will now download all of the artifacts required for `Valkyrie` to work, including `Valkyrie` itself. This may take a while. Afterwards, you should be taken to the main IDE GUI. Sometimes the "Java" perspective starts collapsed and the IDE will look strange; just click on the "Java" button in the top-right of the window to activate the Java perspective:

![Java perspective](http://d.pr/i/Ujjh+)

Now we'll create a new class that runs a canned Valkyrie simulation, just to make sure everything is set up correctly. Press `Ctrl+N` (`Cmd+N` on OS X) to bring up the "New" wizard, and type out "Class" to filter down to the "Class" option:

![Wizard Search](http://d.pr/i/jM1P+)

Java classes are organized by "packages" which are represented as directories on disk and as URIs in code. Many IHMC packages start with `us.ihmc`, you can use your organization, a personal website, or whatever you'd like as your package. Here I'm going to use `us.ihmc.demo` as the package, and `ValkyrieDemo` as the name of the class. Because our class is going to be the entry-point in to a runnable program, it needs to have a `main()` method just like C/C++ needs a `main()` function:

![New Class Wizard](http://d.pr/i/O1Hj+)

For now, we're going to gloss over the details of what's going in to this class; the `Valkyrie` simulation that we're about to run leverages several helper methods to get the simulation set up and the mechanism for simulating robots using the IHMC Whole Body Control algorithm is fairly complicated. This is just going to verify whether or not everything is installed correctly. Fill in the class to look like the following. if you don't want to copy and paste, this is a good time to get acquainted with the IDE. As you start to type out variable declarations or call constructors/methods, you can use `Ctrl+Space` to get auto-completion suggestions from the IDE with the additional benefit of having it automatically generate the correct `import` statements.

{% highlight java %}
package us.ihmc.demo;

import us.ihmc.SdfLoader.SDFHumanoidRobot;
import us.ihmc.commonWalkingControlModules.highLevelHumanoidControl.factories.WalkingProvider;
import us.ihmc.darpaRoboticsChallenge.DRCFlatGroundWalkingTrack;
import us.ihmc.darpaRoboticsChallenge.DRCGuiInitialSetup;
import us.ihmc.darpaRoboticsChallenge.DRCSCSInitialSetup;
import us.ihmc.darpaRoboticsChallenge.drcRobot.DRCRobotModel;
import us.ihmc.darpaRoboticsChallenge.drcRobot.DRCRobotModel.RobotTarget;
import us.ihmc.darpaRoboticsChallenge.initialSetup.DRCRobotInitialSetup;
import us.ihmc.graphics3DAdapter.GroundProfile3D;
import us.ihmc.simulationconstructionset.SimulationConstructionSet;
import us.ihmc.simulationconstructionset.util.ground.FlatGroundProfile;
import us.ihmc.valkyrie.ValkyrieRobotModel;

public class ValkyrieDemo
{
	public static void main(String[] args)
	{
		DRCRobotModel robotModel = new ValkyrieRobotModel(RobotTarget.SCS, false); // Construct the Valkyrie robot model for simulation.
		DRCGuiInitialSetup guiInitialSetup = new DRCGuiInitialSetup(true, false); // Helper configuration object for setting up the Simulation GUI
		final double groundHeight = 0.0; // No magic numbers!
		GroundProfile3D groundProfile = new FlatGroundProfile(groundHeight); // Construct a ground profile

		DRCSCSInitialSetup scsInitialSetup = new DRCSCSInitialSetup(groundProfile, robotModel.getSimulateDT()); // Helper configuration object for setting up Simulation Construction Set
		scsInitialSetup.setDrawGroundProfile(true); // Make ground profile visible
		scsInitialSetup.setInitializeEstimatorToActual(true); // Seed the state estimator with a perfect starting configuration

		double initialYaw = 0.0; // No magic numbers!
		DRCRobotInitialSetup<SDFHumanoidRobot> robotInitialSetup = robotModel.getDefaultRobotInitialSetup(groundHeight,
				initialYaw); // Helper configuration object for the robot starting configuration

		boolean useVelocityAndHeadingScript = true; // No magic... booleans?
		boolean cheatWithGroundHeightAtForFootstep = false; // No magic... booleans?

		DRCFlatGroundWalkingTrack flatGroundWalkingTrack = new DRCFlatGroundWalkingTrack(robotInitialSetup,
				guiInitialSetup, scsInitialSetup, useVelocityAndHeadingScript, cheatWithGroundHeightAtForFootstep,
				robotModel, WalkingProvider.VELOCITY_HEADING_COMPONENT); // Construct a Flat Ground Walking Track, a re-usable sim environment we use to validate the basics of the walking algorithm

		SimulationConstructionSet scs = flatGroundWalkingTrack.getSimulationConstructionSet(); // Construct the SCS instance
	}
}
{% endhighlight %}

If everything is working correctly, you should be able to click on the "Run" button:

![Eclipse Run Button](http://d.pr/i/18nMU+)

Once your program launches you should see the SCS Splash Screen, followed by the Valkyrie simulation launching:

![Valkyrie Sim](http://d.pr/i/wSHs+)

Type "walk" in to the Variable search field, find the variable named "walk" and set it's value to "1.0". Then click the "Simulate" button, and Valkyrie should begin the flat ground walking track script. Congratulations! Everything is installed correctly!

![Walkig](http://d.pr/i/NA2F+)
