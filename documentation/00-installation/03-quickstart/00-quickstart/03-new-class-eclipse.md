---

title: Create The ValkyrieDemo Class
full-title: Create The ValkyrieDemo Class In Your Project
order: 3
category: quickStart
tab: Eclipse
---

# Open the Java Perspective

You'll want to have the Java Perspective open before you create and edit your class.  After importing the Gradle Project you are often left with the Gradle Tasks window open and the Java Perspective minimized. Click the maximize perspective button on the right of the Eclipse IDE window to expand the Java Perspective.

![Wizard Search](/resources/images/quickstart/eclipseAfterGradleImport.png)

Once expanded you should see the `GradleProject` selected on the left and `Java` on the top right.

![Wizard Search](/resources/images/quickstart/eclipseJavaPerspective.png)

# Create a New Class to Run the Valkyrie Simulation

Press `Ctrl+N` (`Cmd+N` on OS X) to bring up the "New" wizard, type out "Class" to filter down to the "Class" option, and then click `Next`.

![Wizard Search](/resources/images/quickstart/eclipseNewFileWizard.png)

Java classes are organized by "packages". Many IHMC packages start with `us.ihmc`, you can use your organization, a personal website, or whatever you'd like as your package. Here we're going to use `us.ihmc.demo` as the package, and `ValkyrieDemo` as the name of the class. Fill out this information and click `Finish`:

![New Class Wizard](/resources/images/quickstart/eclipseNewClassWizard.png)

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
