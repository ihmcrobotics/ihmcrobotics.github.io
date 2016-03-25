---

title: Create the ValkyrieDemo Class
full-title: Create the ValkyrieDemo Class In Your Project
order: 3
category: quickStart
tab: IntelliJ

---

# Open the Java Perspective

Once you have imported your build.gradle file and have a new project window open. Your "Project View" should look like that:

![new project window](/resources/images/quickstart/intellij/new-project-view.png)


# Update your project's list of dependencies

On the upper right corner you should see a gradle logo, click on it to expand the "Gradle Projects" tool window then click on the refresh button.

![gradle menu window](/resources/images/quickstart/intellij/gradle-menu.png)

Wait few minutes while libraries are automatically being downloaded from the remote repositories specified in your build.gradle script and linked to your project.   
You should now see a full list of dependencies under the Dependencies folder. 

![gradle menu dependencies loaded](/resources/images/quickstart/intellij/gradle-menu-dependencies-loaded.png) 
 

# Create a New Class 

Java classes are organized by "packages". Many IHMC packages start with `us.ihmc`, you can use your organization, a personal website, or whatever you'd like as your package. 
Here we're going to use `us.ihmc.demo` as the package, and `ValkyrieDemo` as the name of the class. 

In the project tool window, right click on the `java` folder, and create a new package.
 
![create new package](/resources/images/quickstart/intellij/create-new-package.png)

When this new package is created, right click on it and select `new > Java class`, name it `ValkyrieDemo`   

![create new class](/resources/images/quickstart/intellij/create-new-class.png)

Fill in the class to look like the following:

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
