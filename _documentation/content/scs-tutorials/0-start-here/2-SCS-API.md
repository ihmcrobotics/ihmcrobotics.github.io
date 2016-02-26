---
doc-category:  SCS-Tutorials
doc-topic: topic 0
doc-part: part 2
doc-part-title: Simulation Construction Set API
doc-part-order: 2
---


The following tables list the API for the SimulationConstructionSet class. These methods are usually called when creating a simulation and are for setting the parameters of the simulation, such as the integration time step, the camera position and fix, and for specifying which variables are initially plotted in the graphs.
 
There are two constructors for a SimulationConstructionSet. Both require a Robot, rob. In the second constructor, if boolean showGUI equals false, then no Graphical User Interface will be displayed. This is useful when you wish to run a simulation, or several simulations quickly, but do not need to interact through a GUI. In both cases, before the simulation can be simulated, you must first create a Thread, given the SimulationConstructionSet, and start the Thread. 

To start simulating when not using a GUI, use the simulate() functions. To know when the simulation is finished, use addSimulateDoneListener(). SimulateDoneListener is an interface that contains the single method simulateDone(). To stop the simulation, use stop().

### Constructors

```java
SimulationConstructionSet(Robot rob)
SimulationConstructionSet(Robot rob, boolean showGUI)
```
Creates a new simulation, given a robot. Creates a new simulation, If showGUI is ```false ```, then no GUI appears. 

### Simulation parameters

```java
void setDT(double simulateDT, int recordFrequency) 
double getDT()
```
Sets the integration time step and variable record frequency (steps per record). 
Defaults are 0.0004 seconds and 50 steps per record (0.02 seconds per record).

```java
void setPlaybackRealTimeRate(double rate)
```
Sets the playback slow-motion/fast-motion rate. The default value of 1.0 means real time playback.

```java
void setPlaybackDesiredFrameRate(double rate)
```
Sets the desired graphics update rate during playback. Default value is 0.04, or 25 fps.

```java
YoVariable getVar(String varname)
```
Finds and returns a YoVariable of the given name.

```java
void addStaticLink(Link staticLink)
```
Adds a static link with no physics. For creating the surrounding static world.

```java
public void setFastSimulate(boolean fastSimulate)
```
If fastSimulate is true, makes the GUI less responsive during simulation in order to increase simulation speed.

### Create the surrounding world

```java
void addStaticBranchGroup(BranchGroup staticBranchGroup)
```
Adds a static branch group with no physics. For creating the surrounding static world.

