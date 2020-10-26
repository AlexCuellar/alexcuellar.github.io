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

Meet CARl, the autonomous vehicle setup for the labs and final project of the MIT class 6.141 *Robotics: Science and Systems*.  

![CARl](/assets/img/RSS/CARl.JPG)
*Figure 1: CARl, the autonomous robot used in 6.141 - Robotics: Science and Systems*
CARl has a on onboard CPU, Hokuyo LIDAR, and RGB camera for navigating the world around it.  *Robotics: Science and Systems* involved several cumulative labs which built from low-level control systems to localization and motion planning.  Our team developed a [website](http://web.mit.edu/alexcuel/www/labs/) with detailed lab writups if you are interested in more in-depth explanations of our procecess and results. However, I will give an overview of each lab here.  

In general, these labs and projects introduced me to software development on a team. During this time, I developed insight into the organization necessary to develop clean, understandable, and modular code which can work together towards a final deliverable.  

*(NOTE: The first 2 labs focused on soldifiying our understanding of ROS (The Robotic Operating System) upon which the entire software stack was built.  However, these lab's deliverables are much less interesting than the last 4 labs and final project.)*

## Lab 3: Wall Following and Safety Controller

Lab 3 focused on developing lower-level controls and safety systems to prevent CARl from crashing.  To test these, we implemented a basic wall follower which uses the LIDAR data to mantain desired distance from a wall.  Our control system centered on Pure Persuit control -- a scheme which uses the basic dynamics of the vehicle's searing constraints to choose the angle of front wheels to reach a certain desired point ahead of it.  

In order to make use of this basic framework, we used lidar data to fit a line to the wall we are attempting to follow.  From this line, we define our goal point to be the desired distance from the wall and a certain distance ahead of CARl.  While this scheme worked well during straight aways, the car tended to react slowly to oncoming corners.  Therefore, we defined a "spacial derivative" \\(dL/dt\\) metric for to determine the car's likelihood of aproachind a corner.  Using this information, we could predict and react to turns more smoothly by multiplying the slope of our line of best fit by a gain proportional to this spacial derivative. 

![Spacial Derivative Diagram](/assets/img/RSS/Wall_Follwer_Derivative.JPG)
*Figure 2: A diagram depicting our \\(dL/dt\\) metric.  On the left is a "concave corner" with a negative derivative.  This  would pull or line of best fit closer to the car and engourage an earlier turn.  On the right is a "convex corner" with a positive derivative.  This would push the line to point more a way from the direction of the car and encourage the car to begin turning earlier.*

## Lab 4: Computer Vision
Lab 4 focused on computer vision.  Our goal was to demonstrate several fundamental algorithms for non-data-driven computer vision techniques: template matching, key-point matching via the SIFT algorithm, and color segmentation.  Unfotunately, no write-up exists for this lab on the website.  

I led the Color Segmentation effort, using the pre-defined color of an orange cone to segment it from the rest of an image.  This algorithm only works with distinct and mono-chromatic objects in an image.  However, it's simplicity often serves as an advantage in situations when applicable. 

![Color Segmentation](/assets/img/RSS/Color_Segmentation.JPG)
*Figure 2: Image of an environment with an orange cone and the mask with the cone segmented out using HSV color segmentation.  Notice the bounding box around the code in the environment image.*

 Interestingly, we found that a standard RGB respresentation of color does a poor job of finding the cone in multiple lighting and shadow conditions.  However, defining ranges of color to segment using the HSV (Hue, Saturation, Lightness) representation gave results more invariant to such conditions.  To show the effectiveness of our algorith, we used a pure pursuit scheme similar to the wall-follower from lab 2 to park CARl in front of an orange cone.  In order to turn pixels in an image into distance measurements without LIDAR data, we used a Homography Matrix.  A Homography Matrix transforms pixels in an image to spacial points on the floor.  Using this Homography matrix, we could apply color segmentation to an image from CARl's onboard GRP camera and find the distance between the robot and the point where the cone touches the floor.  Using this system, CARl was able to mantain a desired distance from the oragne cone: 

<iframe src="https://drive.google.com/file/d/1dT1lD_OzyTEjfE-2gwGpArP8RHXhszr5/preview" width="640" height="480"></iframe>
*Video 1: CARl parking a set distance in front of orange cones. *

## Localization
Lab 4 involved one of the most important problems in robotics: localization.  This lab both included implementing a common localization algorithm given a known map from scratch and learning to use Google's cartographer implementation of SLAM (Simultaneous Localization and Mapping).

Our implementation of localization relied on a Monte Carlo Particle filter.  Essentially, the Monte Carlo Particle filter starts with a guess of CARl's position.  As CARl moves, we ranomly create many guesses for CARl's new pose according to its dynamics with some gaussian randomness to model the noise of real-world uncertainty.  Then, each of these guesses uses a pre-known map to simulate a LIDAR scan expected from their points of view.  Each simulated LIDAR image is compared to a LIDAR reading from CARl.  Lastly, we resample a set of robot poses based on the previous poses whose simulated LIDAR scan most closely matches reality.  We let our guess for the robot's pose on the map be the average of all the simulated poses.  Take a look at the [write-up](http://web.mit.edu/alexcuel/www/labs/5/) for more complete details of the algorithm.  

<iframe src="https://drive.google.com/file/d/1ppDRWOsJ55PisitIz-a-M8kuV-1iGgom/preview" width="640" height="480"></iframe>
*Video 2: CARl localizing on a map of the Stata basement.*

Utilizing Google's Cartographer implementation of SLAM didn't require implementation of an algorithm. However, it gave us experience using one of the most widely used implementations of this more advanced version of the localization problem.  Much of the work required here simply involved changing various parameters to tune the algorithm to our environment.  

<iframe src="https://drive.google.com/file/d/1XUYrtBMFtDxQyPQ8EeS6XFReEtAod5yq/preview" width="640" height="480"></iframe>
*Video 3: Google Cartographer using SLAM to map the Stata basement.*

## Path Planning
Lab 6 focused on path planning and executing a path on a known map from CARl's starting point to a given goal point.  Achieving this goal required a working version of the control system in lab 3 and localization on a map from lab 5.  We had 2 strategies in this lab -- RRT* (Optimized Rapidly exploring Random Trees) and discritizing the map space and executing A* on the resulting map.  I worked exclusively on the implementation of RRT* (the algorithm we eventually used to execute paths in the real world).  

RRT algorithms create a path between 2 points by expanding a tree of possible paths through space.  We create this tree by starting with one node at the point where the robot begins.  We then iteratively sample a point \\(p_s\\) in the map and find the closest existing node \\(n_p\\) in our tree to the sampled point.  We then imaging moving toward \\(p_s\\) from \\(n_p\\) by a short distance, establishing a new possible node \\(n_n).  If no collision between  \\(n_p\\) and \\(n_n\\) exist, we keep \\(n_n\\) and make a connection between \\(n_p\\) and \\(n_n\\).  The resulting search algorithm looks like this: 

<iframe src="https://drive.google.com/file/d/1Jba3v14aw6YgPHvaZVYAcg_ndF8d9NQW/preview" width="640" height="480"></iframe>
*Video 4: RRT plans a path between 2 points*

While RRT is guaranteed to always find a path if one exists, it will not be the shortest path.  RRT* is an optimization of RRT which attempts to re-route previous paths through a newly sampled point in order to make optimal paths along our tree.  This optimization can occur even after a path is found.  Unlike RRT, RRT* is guaranteed to create an optimal path given enough time.  RRT* looks like this on a map: 

<iframe src="https://drive.google.com/file/d/1bK7wBJxR_SB4as4iwMPyOLoUi_T3k6Ok/preview" width="640" height="480"></iframe>
*Video 5: RRT* plans an optimal path between 2 points.*

Once a path is planned, we use our localization system and the pure pursuit controller used in lab 3 to follow this planned path.  For the final demonstration, we gave CARl three points.  CARl needed to plan and execute a path between all 3.  This video shows the working version of our algorithms: 

<iframe src="https://drive.google.com/file/d/1MgdZQ_aj0nf7eF_vB_HpTKM2Fh7zhLX4/preview" width="640" height="480"></iframe>
*Video 6: CARl uses RRT* to plan and execute a path between 3 specified points.*

## Final Project
As a final project, my group decided to achieve high-speed obstacle avoidance.  Here is the setup: we start CARl at one end of a hallway and give a goal point at the other end.  Between the start and goal point are randomly assorted cardboard boxes that CARl must avoid on it's way from start to end points.  At first, my group played with various strategies of creating a local map of boxes and planning a short-term path through them.  However, this process proved simply too slow for the kinds of speeds necessary in this course.  Ultimately, we found that the simplest solution was best in order to make decisions in the necessary timescales.  

Our solution boils to discretizing our LIDAR data into 5 degree increments representing possible headings.  For each possible heading, we take a 60 degree sweep of the LIDAR data centered on the heading to determine if any close obstacles are imminent for collision.  If <90% of this 60 degree sweep is less than some pre-defined safety-distance (.5 meters), the heading is immediately thrown out.  We then create a weighted score between each remaining heading based on 3 metrics: 1) Percentage of LIDAR scans in a 30 degree sweep greater than a specified clearance distance, 2) Angle between potential heading and CARl's current heading, 3) angle between potential heading and goal position.  

![Obstacle Avoidance Scan](/assets/img/RSS/Obstacle_Avoidance_Scan.JPG)
*Figure 3: Diagram depicting possible heading for CARl.  The green cone represents the sweep for the safety scan and the yellow cone represents the sweep for our clearance metric scan.*

We chose the heading which maximized a weighed score of these metrics and generated a point in that direction to serve as the short-term goal in a pure pursuit control scheme.  While at first we used the basic Ackermann Steering dynamics used with Pure Pursuit in the past, we found that a more advanced "stablalized" Ackermann Steering model resulted in cleaner control with less oscillation.  In this way, we could control CARl in a carrot-and-stick sort of scheme, iteratively defining new greedily optimal points for CARl to try and reach.  Lastly, we added velocity control to slow down CARl from maximum speed when making harder turns.  This allows CARl to speed up when possible but mantain control when necessary.  

Ultimately, we tested our system on 3 courses: a sparse field, a dense field, and an S-shaped course.  We achieved these relative speeds for each test:

![Obstacle Avoidance Stats](/assets/img/RSS/Obstacle_Avoidance_Stats.JPG)
*Figure 4: Relative average forward velocities in each of the three types of self-defined courses.*

In final competition against other teams, we ran our algorithm against others' on an easy and difficult course.  While we were were second fastest on the easy course, we were the only group able to finish the hard course in a reasonable time.  

<iframe src="https://drive.google.com/file/d/1_3nWVMuPyqjWgXhUK6_fLd9S7MJaqrx6/preview" width="640" height="480"></iframe>