---
layout: post
title: Fair Contextual Bandit Algorithm
category:
  - Projects
exerpt: Developing an algorithm that helps robots delegate tasks to humans.
tags:
  - Machine Learning
  - Algorithms
---

## Overview
In the summer of 2019, after my Sophomore year, I worked as an undergraduate researcher with the University of Souther California REU (Reserach Experiences for Undergraduates) program.  During this time, I worked under Prof. Stefanos Nikolaidis at the ICAROS (Interactive and Calaborative Autonomous Robotic Systems Lab) to develop the the first fair online contextual bandit algorithm for use in human-robot or human-computer interaction.  Our research eventually developed into a paper accepted to the UAI (Uncertinty in AI) conference and as an extened abstract to AAMAS (Autonomous Agents and Multi-Agent Systems).  So what exacly is a fair online contectual bandit algorithm? Bandit algorithms are a fundamental class of reinforcement learning algorithms which learn the optimal action to take given a set of \\(n\\) finite options for an action.  For example, imagine a customer service robot needs to refer customers to an employee to solve a problem, which employee is the best choice to maximize the score that customers give in a feedback survey.  

## Why is Our Algorithm New?
While bandit algorithms are extremely well-studied, we decided to augment the fundamental algorithm in order to make it most useful for cases of human-robot interaction.  These augmentations involved making it online, contexutaul, and fair.  Let's take a look at what these atumentations mean and why they may be importnat for our particular setting.  

* **Online:** Most machine learning algorithms require loads of data to train on before deployment, online algorithms are created in such a way as to mantain theoretical guarantees in optimality while leaning everything it knows on the fly.  To understand what this means, let's go back to example of the customer service bot.  Most algorithms would give the bot mountains of data to train on for figuring out which employee is the best choice.  However, a bot fitted with an oline algorithm starts knowing nothing, and learns through experience.  While this may seem like a terrible idea (and indeed this algorithm performs much worse than an offline algorithm in the early stages) as the bot serves more and more people, the error of these algortihms still have comfotable bounds *without* the need to rake together tons of data before deployment.  
* **contextual:** One very natural improvement to bandit algorithm is to give the bandit a *context*, or piece of information about a situation, whenever it must make a decision. For example, if our customer service bot was not just given the information that a customer needed help, but had access to what they needed (i.e. were interested in buying more products, were looking to get a product replaced, etc.) the bot could make more refined desision on which employee is the best choice.  There are a few different ways of formalizing these contexts depending on whether we should assume that there are huge number of contexts.  For our paper, we assumed a relatively small number of contexsts and formulated the algorithm accordingly (see *theory*) section for details.  
* **fair:** Recent reserach in Human Robot Interaction has shown that humans are very reactive to the ways an algorithm will include or exlcude them from a situation.  For example, if our friendly neighborhood customer service bot chose the same optimal employee every single time, other employees may feel cheated and be less optimal.  To avoid this situation, an algorithm may be told that each employee must be chosen some minimum percentage of the time.  This may at first sound like an inane goal.  However, another paper from ICAROS lab [^1] showed that treating human participants fiarly (i.e. constraining the algorithm to choose each participant a certain portion of the time) the algortihm produced more positive results than choices thay may have made sense to an "optimal" non-fair algortihm. 


<div class="center">
    <img src="/assets/img/carnation/carnation1.jpg" alt="Initial carnation setup" class="three-image-row">
    <img src="/assets/img/carnation/carnation2.jpg" alt="Resulting carnation" class="three-image-row">
</div>
*Carnation setup (left). Results after 4 days (right).*

## Footnotes

[^1]: Houston Claure, Yifang Chen, Jignesh Modi, Malte Jung, and Stefanos Nikolaidis. 2019. Reinforcement Learning with Fairness Constraints for Resource Distribution in Human-Robot Teams. arXiv preprint arXiv:1907.00313 (2019)
