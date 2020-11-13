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

Since January, I have been working with the MIT Interaction lab, a research group working to solve various problems in the world of human-robot interaction.  Specifically, I am one part of a larger effort to develop a fully-integrated robotic system able to dynamically learn, predict, and avoid humans working in a shared space.  I work on the prediction side of the project, developing an algorithm able to predict a human's path through space given past data from others on a similar trajectory.  For example, the lab recently gathered data from participants walking around a map between 6 points with the task of moving various objects to a dropoff location.  

![Testing Layout](/assets/img/Human-Prediction/Test-Layout.png)
*Figure 1: Diagram for data gathering process.  We recorded humans' position along a path between regions of the testing space.*

My algorithm takes as input 3d points representing past trajectories (for example, all paths starting from point 6 and ending at the point 4) and if a person begins walking from one point to another, my algorithm makes a prediction on the human's complete trajectory.  This data will help a robot plan more optimally around the likely path of it's human collaborator.  

## My algorithm
While the algorithm is still under development, the team and I are fairly happy with the overall framework and now are working on more subtle optimizations.  Here is the framework:

At a high level, my algorithm iteratively makes small predictions of how a human's position will change given a starting point over a short timestep (generally .02 seconds).  Using each small prediction as the starting point for the next prediction, I can string together many small predictive changes of the human's position and create a full predicted trajectory. This markov-like structure allows the algorithm to make very quick predictions while prediction accuracy.

This high level process leaves one question: how do I make a short-term prediction of the person's spacial change given an assumed starting point from the last short-term prediction? First, I take the KNN points from past trajectories relative to our starting point across 4D space (3 spacial dimensions and time relative to the beginning of the trajectory).  From these closest positions, I create a GPR (Gaussian Process Regression) model relating 7 inputs (the positions's 3 spacial coordinates, time since start of trajectory, and the trajectory's spacial change over the previous timesetp) to the person's spacial change during the subsequent time-step.  We then estimate these 7 parameters from the last short-term prediction and feed them through the GPR to formulate our next short-term prediction.  By building each prediction off the last GPR, we can create a full trajectory.

<!-- ![Prediction](/assets/img/Human-Prediction/Prediction.JPG) -->
<img src="/assets/img/Human-Prediction/Prediction.JPG"
     alt="Prediction"
     style="float: center; margin-right: 10px; width: 1328px; height: 400px" />
     <!-- 1328 x 637 -->
*Figure 2: 3D plot of the algorithm's prediction for a trajectory.  The blue points mark points in space for all previously observed trjectories.  The Green dots show the full ground truth trajectory we are attempting to predict.  The red dots make up the predicted trajectory. Notice that we do not start the prediction at the very beginning of the ground truth trajectory, but let the trajectory play out for several time-steps before starting a prediction.*

By modeling the prediction with a markov-like structure, we are able to make predictions one second into the future in an average .07 seconds.  Additionally, we can tell that the prediction is relatively stable by observing that (1) the prediction's error does not blow up as we try to increase the prediction horizon and (2) The distribution of errors does not blow up.  

<!-- ![Prediction Error](/assets/img/Human-Prediction/Prediction_Error.JPG) -->
<img src="/assets/img/Human-Prediction/Prediction_Error.JPG"
     alt="Prediction error"
     style="float: center; margin-right: 10px; width: 1119px; height: 400px" />
*Figure 3: Error of our prediction algorithm over many trials.  Since we have no guarantee that the distribution is gaussian, we used median and inter-quartile range to asses the spread of errors in the prediction over time.*