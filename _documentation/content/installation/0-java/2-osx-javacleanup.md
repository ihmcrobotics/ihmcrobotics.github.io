---
doc-category:  installation
doc-topic: topic 2
doc-part: part 1
doc-part-title: Cleaning up Apple Java/Resolving Java3D Errors
doc-part-order: 1
---

Before Java 7, Apple used to provide a Java distribution themselves. A lot of existing software still relies on the Apple Java 6 distribution, and many OS X machines that have been around for a while will probably have had this old Java distribution installed at some point.

This can cause problems with our software. The Apple Java distribution bundled an older version of the Java3D library, and this old version of Java3D will take precedence over the newer version that we bundle with our software. It can lead to errors as it is not API compatible with newer versions of Java3D. There are three Java3D libraries that need to be removed. Delete the following files (**_if they exist_**):

    /System/Library/Java/Extensions/j3dcore.jar
    /System/Library/Java/Extensions/j3dutils.jar
    /System/Library/Java/Extensions/vecmath.jar

***NOTE:*** If you are using OS X El Capitan or newer, these libraries are in directories that are protected by [System Integrity Protection (SIP)](https://en.wikipedia.org/wiki/System_Integrity_Protection). You will need to disable SIP. It can be re-enabled later if you so choose. Instructions for disabling SIP can be found here: <http://www.macworld.com/article/2986118/security/how-to-modify-system-integrity-protection-in-el-capitan.html>
