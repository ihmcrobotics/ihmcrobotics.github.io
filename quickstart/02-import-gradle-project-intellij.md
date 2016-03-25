---

title: Setup GradleProject in your IDE
order: 2
category: quickStart
tab: IntelliJ

---

IntelliJ IDEA supports Gradle SDK version 1.2. and later.
The Gradle plugin is bundled with IntelliJ IDEA and activated by default. 

If the plugin is not activated, enable it on the `Plugins` tab of the `File > Settings` (Windows and Ubuntu) or `IntelliJ IDEA > Preferences`(OSX) menu.

Gradle files are marked with ![icon gradle](/resources/images/quickstart/icon_gradle.png) icon.

In addition to this tutorial, you can find more information about Gradle and IntelliJ on [IntelliJ's website](https://www.jetbrains.com/help/idea/2016.1/getting-started-with-gradle.html). 


![note](/resources/images/attention-40.png) **NOTE: At this point of the tutorial you can either chose to create a new Gradle Project or use Importing Project from Gradle model.** 

# Importing Project from Gradle Model

On the main menu, select `File > Open`, from the dialog that opens select `build.gradle` file and click `OK`.  
![import build gradle project](/resources/images/quickstart/intellij/open-build-gradle.png)

Specify few settings before importing the project
![import build gradle project](/resources/images/quickstart/intellij/import-project-from-gradle.png)

Wait few minutes IntelliJ IDEA will import Gradle project even if the project was not opened or imported before.  
![downloading dependencies](/resources/images/quickstart/intellij/import-build-gradle.png)



<!--Alternatively you can chose to create a new project and copy the content of your `build.gradle` script. -->
 <!---->
 <!--Select `File > New Project...` to open the Project Wizard.  -->
 <!--On the left pane select **Gradle**   -->
 <!--On the right side of the panel specify your project SDK(JDK) and make sure that the *Java* checkbox is selected in the **Additional Libraries and Frameworks** area.   -->
 <!--Click `Next`.  -->
 <!---->
<!--On the next page of the wizard specify the following setting:-->

<!--**GroupId** - specify groupId of the new project, which will be added to the build.gradle file.  -->
<!--**ArtifactId** - specify artifactId of the new project.  -->
<!--**Version** - specify version of the new project, which will be added to the build.gradle file.  -->

<!--[IMAGE HERE]-->

<!--Click `Next`.-->

<!--On the next page, specify the Gradle Settings:-->

<!--[IMAGE HERE]-->

<!--Select "Create directories for empty content roots automatically" checkbox.  -->
<!--Select "Use default gradle wrapper(recommended)" radio button.  -->
<!--Make sure that "Gradle JMV" contains the path to your JDK. If this is not the case, you probably need to specify the JAVA_HOME environment variable.   -->
<!--Click `Next`.   -->

<!--On the next page, specify the name and location settings. -->
<!--[IMAGE HERE]-->

<!--At this point IntelliJ IDEA automatically creates a project with a default 'build.gradle' file.-->

<!--Your environment should now look like this: -->
<!--[IMAGE HERE]-->

<!--Double click on build.gradle to open it. -->
<!--Edit it so that it contains the fields that you specified in the build.gradle script you defined earlier. -->
<!--[IMAGE HERE]-->

