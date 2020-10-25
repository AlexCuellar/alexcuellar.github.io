---
layout: post
title: Autonomous Vehicle Control, Planning, and Localization
excerpt: Building an autonomous vehicle system from the ground up using ROS.<br><br>
category:
  - Projects
tags:
  - Robotics
  - Teamwork 
---

Meet CARl, the autonomous vehicle setup for the labs and final project of the MIT class 6.141 Robotics: Science and Systems.  

CARl has a on onboard CPU, Hokuyo LIDAR, and RGB camera for navigating the world around it.  The class involved several cumulative labs which built from low-level control systems to localization and motion planning.  Our team developed a website with detailed lab writups if you are interested in in depth explanations of our procecess.  However, I will give a high level overview of our process and results here.  The first 2 labs focused on soldifiying our understanding of ROS (The Robotic Operating System) upon which the entire software stack was built.  However, these lab's deliverables are much less interesting than the last 4 labs and final project. 

## Lab 3: Wall Following and Safety Controller

Lab 3 focused on developing lower-level controls and safety systems to prevent the car from crashing.  To test these, we implemented a basic wall follower which uses the LIDAR data to mantain desired distance from a wall.  Our control system centered on Pure Persuit control -- a scheme which uses the basic dynamics of the vehicle's searing constraints to choose the angle of front wheels to reach a certain desired point ahead of it.  

In order to make use of this basic framework, we used lidar data to fit a line to the wall we are attempting to follow.  From this line, we define our goal point to be the desired distance from the wall and a certain distance ahead of CARl.  While this scheme worke well during straight aways, the car tended to react slowly to oncoming corners to walls.  Therefore, we defined a "spacial derivative" \\(dL/dt\\) metric for how the car's distance to a wall at various angles changes.  Using this information, we could predict and react to turns more smoothly by multiplying the slope of our line of best fit by a gain proportional to this derivative.  
![Spacial Derivative Diagram](/assets/img/RSS/Wall_Follwer_Derivative.JPG)
*Figure 1: A diagram depicting our \\(dL/dt\\) metric.  On the left is a "concave corner" with a negative derivative.  This  would pull or line of best fit closer to the car and engourage an earlier turn.  On the right is a "convex corner" with a positive derivative.  This would push the line to point more a way from the direction of the car and encourage the car to begin turning earlier.*

## Lab 4: Computer Vision
Lab 4 and its focus on computer vision is the most disconnected from the cumulative pipeline for the rest of the labs.  Our goal was to demonstrate several fundamental practices to non-data-driven computer vision techniques: template matching, key-point matching via the SIFT algorithm, and color segmentation.  Unfotunately, no write-up exists for this lab on the website.  

I led the Color Segmentation effort, using the pre-defined color of an orange cone to segment it from the rest of an image.  This algorithm only works with distinct and mono-chromatic objects in an image.  However, it's simplicity often serves as an advantage in situations when applicable. 

![Color Segmentation](/assets/img/RSS/Color_Segmentation.JPG)
*Figure 2: Image of an environment with an orange cone and the mask with the cone segmented out using HSV color segmentation.  Notice the bounding box around the code in the environment image.*

 Interestingly, we found that a standard RGB respresentation of color does a poor job of finding the cone in multiple lighting and shadow conditions.  However, defining ranges of color to picick out using the HSV (Hue, Saturation, Lightness) representation gave results more invariant to such conditions.  To show the effectiveness of our algorith, we used a pure pursuit algorithm similar to the wall-follower from lab 2 to park CARl in front of an orange cone.  In order to turn pixels in an image into distance measurements without LIDAR data, we used a Homography Matrix.  A Homography Matrix transforms pixels in an image to spacial points on the floor.  Using this Homography matrix, we could apply color segmentation to an image and find the distance between the robot and the point on the floor at the bottom of the orange cone.  Using this system, CARl was able to mantain a desired distance from the oragne cone: 

<iframe src="https://drive.google.com/file/d/1dT1lD_OzyTEjfE-2gwGpArP8RHXhszr5/preview" width="640" height="480"></iframe>


<iframe src="https://drive.google.com/file/d/1ppDRWOsJ55PisitIz-a-M8kuV-1iGgom/preview" width="640" height="480"></iframe>