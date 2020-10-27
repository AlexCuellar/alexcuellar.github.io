---
layout: post
title: Human Motion Prediction Algorithm (In Progress)
excerpt: Developing an algorithm to predict human motion for Human Robot Interaction.<br><br>
category:
  - Projects
tags:
  - Machine Learning
  - Robotics
---

## Overview

Since January, I have been working with the MIT Interaction lab, a research group working to solve various problems in the world of human-robot interaction.  Specifically, I am one part of a larger effort to develop one fully-integrated robotic system able to dynamically learn, predict, and avoid a human working in the same space as the robot.  I work on the prediction side of the project, and more specifically refine the algorithm used to predict one human's path through space given data from many others on the same trajectory.  For example, the lab recently gathered data from participants walking around a map between 6 points moving objects from each point to a drop-off point.  

![Testing Layout](/assets/img/Human-Prediction/Test-Layout.png)
*Figure 1: Diagram for data gathering process.  We recorded humans' position along a path between regions of the testing space.*

My algorithm gathers data clustered into types of trajectories (for example, all paths starting from point 6 and ending at the point 4).  Then, when a person begins walking from point 6 to point 4, my algorithm attempts to complete the trajectory.  This data will help a robot plan more optimally around the likely path of a human collaborator.  

## My algorithm
While the development in the algorithm is still under development, the team and I are fairly happy with the overall framework and now are working on more subtle optimizations.  Here is the framework:

At a high level, my algorithm iteratively predicts how a person's position will change given a certain starting point over a short timestep (generally .02 seconds).  Using each prediction as the starting point during the next timestep, I can string together many small predictive changes of the human's position and create one predicted trajectory. This markov-like structure allows the algorithm to make very quick predictions while prediction accuracy.

This process leaves one question: how do I make a prediction of the person's small spacial change given an assumed starting point? First, I take the KNN of points from past trajectories relative to our starting point across 4D space (3 spacial dimensions and time relative to the beginning of the trajectory).  From these closest positions, I create a GPR (Gaussian Process Regression) model relating 7 inputs (the point's 3 spacial coordinates, time since start of trajectory, and spacial change between the last timestep and the position under question) to a person's spacial change during the subsequent time-step.  We then feed in the 7 parameters from a start position to guess the spacial change in position over the next time-step. By using the new predicted point as the new starting point, we can string together points into a trajectory as described above.  

![Prediction](/assets/img/Human-Prediction/Prediction.JPG)
*Figure 2: 3D plot of the algorithm's prediction for a trajectory.  The blue points mark points in space for all previously observed trjectories.  The Green dots show the full ground truth trajectory we are attempting to predict.  The red dots make up the predicted trajectory. Notice that we do not start the prediction at the very beginning of the ground truth trajectory, but let the trajectory play out for several time-steps before beginning a prediction.*

My modeling the prediction with a markov-like structure and breaking down predicion into small GPR models, we are able to make predictions one second into the future in an average .07 seconds.  Additionally, we can tell that the prediction is relatively stable by observing that (1) the prediction's error does not blow up as we try to increase the prediction horizon and (2) The distribution of errors does not blow up.  

<!-- ![Prediction Error](/assets/img/Human-Prediction/Prediction_Error.JPG) -->
<img src="/assets/img/Human-Prediction/Prediction_Error.JPG"
     alt="Prediction error"
     style="float: center; margin-right: 10px; width: 10px; height: 10px" />
*Figure 3: Error of our prediction algorithm over many trials.  Since we have no guarantee that the distribution is gaussian, we used median and inter-quartile range to asses the spread of errors in the prediction over time.*