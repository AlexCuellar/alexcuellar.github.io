---
layout: post
title: Fair Contextual Bandit Algorithm
category:
  - Projects
tags:
  - Machine Learning
  - Algorithms
---

## Overview
In the summer of 2019, after my Sophomore year, I worked as an undergraduate researcher with the University of Souther California REU (Reserach Experiences for Undergraduates) program.  During this time, I worked under Prof. Stefanos Nikolaidis at the ICAROS (Interactive and Calaborative Autonomous Robotic Systems Lab) to develop the the first fair online contextual bandit algorithm for use in human-robot or human-computer interaction.  Our research eventually developed into a paper accepted to the UAI (Uncertinty in AI) conference and as an extened abstract to AAMAS (Autonomous Agents and Multi-Agent Systems).  So what exacly is a fair online contectual bandit algorithm? Bandit algorithms are a fundamental class of reinforcement learning algorithms which learn the optimal action to take given a set of \\n\\ finite options for an action.  For example, imagine a customer service robot needs to refer customers to an employee to solve a problem, which employee is the best choice to maximize the score that customers give in a feedback survey.  

## Why is Our Algorithm New?
While bandit algorithms are extremely well-studied, we decided to augment the fundamental algorithm in order to make it most useful for cases of human-robot interaction.  These augmentations involved making it online, contexutaul, and fair.  Let's take a look at what these atumentations mean and why they may be importnat for our particular setting.  

* **Online:** Most machine learning algorithms require loads of data to train on before deployment, online algorithms are created in such a way as to mantain theoretical guarantees in optimality while leaning everything it knows on the fly.  To understand what this means, let's go back to example of the customer service bot.  Most algorithms would give the bot mountains of data to train on for figuring out which employee is the best choice.  However, a bot fitted with an oline algorithm starts knowing nothing, and learns through experience.  While this may seem like a terrible idea (and indeed this algorithm performs much worse than an offline algorithm in the early stages) as the bot serves more and more people, the error of these algortihms still have comfotable bounds *without* the need to rake together tons of data before deployment.  


<div class="center">
    <img src="/assets/img/carnation/carnation1.jpg" alt="Initial carnation setup" class="three-image-row">
    <img src="/assets/img/carnation/carnation2.jpg" alt="Resulting carnation" class="three-image-row">
</div>
*Carnation setup (left). Results after 4 days (right).*
