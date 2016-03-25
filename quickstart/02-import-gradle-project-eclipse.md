---

title: Setup GradleProject in your IDE
order: 2
category: quickStart
tab: Eclipse

---



The Eclipse IDE for Java Developers Mars.1 or higher has the Buildship plugin pre-installed. Buildship is a tool that brings Gradle integration to the Eclipse IDE.

# Launch Eclipse

The first time you launch Eclipse, it will ask you to choose your workspace. Note that in Eclipse, your Workspace does not need to be where your code lives. Select any location you please.

# Import `GradleProject`

Select `File -> Import` to open the Import wizard, and select `Gradle Project` under `Gradle`:

![Import Gradle Project](/resources/images/quickstart/eclipseImportGradleProject.png)

Now click `Next` to bring up the Buildship wizard:

![Buildship welcome screen](/resources/images/quickstart/eclipseBuildshipWelcomeScreen.png)

Click `Next`, then click `Browse` next to the field for "Project root directory", and browse to and select the `GradleProject` directory that you created:

![Select the GradleProject directory](/resources/images/quickstart/eclipseSelectGradleProjectDirectory.png)

Click `Finish` to kick off the Gradle build. The Buildship plugin will run Gradle in order to generate the IDE-specific configuration files for managing the project via the Eclipse GUI. *This step may take a while*; Buildship must pull in some of the Gradle runtime, analyze the structure of the project (our structure is very simple), and download all of the artifacts required for `Valkyrie` to work, including `Valkyrie` itself.
