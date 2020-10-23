---
layout: post
title: Fair Contextual Bandit Algorithm
category:
  - Projects
excerpt: Developing an algorithm that helps robots delegate tasks to humans.<br><br>
tags:
  - Machine Learning
  - Algorithms
---

## Overview
In the summer of 2019, after my Sophomore year, I worked as an undergraduate researcher with the University of Souther California REU (Reserach Experiences for Undergraduates) program.  During this time, I worked under Prof. Stefanos Nikolaidis at the ICAROS (Interactive and Calaborative Autonomous Robotic Systems Lab) to develop the the first fair online contextual bandit algorithm for use in human-robot or human-computer interaction.  Our research eventually developed into a paper [^1] accepted to the UAI (Uncertinty in AI) conference and as an extened abstract to the AAMAS (Autonomous Agents and Multi-Agent Systems) conference.  What exacly is a fair online contectual bandit algorithm? I will dig into more specifics later, but fundamentally bandit algorithms are a class of reinforcement learning algorithms which learn the optimal action to take given a set of \\(n\\) options.  For example, imagine a customer service robot needs to refer customers to one employee among several options.  Which employee is the best choice to maximize the score given in a feedback survey?  A bandit algorithm will figure out which employee maximizes this metric and choose them most often.  

![Depiction of Bandit Algorithm](/assets/img/Fair-Bandit/Bandit_Algorithm_Depiction.JPG)
*Figure 1: Simple diagram of the way a bandit algorithm may choose one best option (the middle person) over the others.*

## How is Our Algorithm New?
While bandit algorithms are extremely well-studied, we decided to augment the fundamental algorithm in order to make it most useful for cases of human-robot interaction.  These augmentations involved making it online, contextual, and fair.  Let's take a look at what these augmentations mean and why they may be importnat for our particular setting.  

* **Online:** Most machine learning algorithms require loads of data to train on before deployment.  However, online algorithms are created in such a way as to mantain theoretical guarantees in optimality while learning everything it needs on the fly.  To understand what this means, let's go back to example of the customer service bot.  Most algorithms would give the bot mountains of data to train on for figuring out which employee is the best choice.  However, a bot fitted with an online algorithm starts out knowing nothing, and learns through experience.  While this may seem like a terrible idea, as the bot serves more and more people over time, the error of these algortihms still have comfotable error bounds *without* the need to rake together tons of data before deployment.  
* **contextual:** One very natural improvement to bandit algorithm is to give the bandit a *context*, or piece of information about a situation, whenever it makes a decision. For example, if we told the customer service bot what kind of help a customer needed (i.e. invoicing, warranties, etc.), the bot could make more refined desisions on which employee is the best choice.  There are a few different ways of formalizing this augmentation depending on our assumptions concerning the number of contexts.  For our paper, we assumed a relatively small number of contexsts and formulated the algorithm accordingly (see *theory* section for details).  
* **fairness:** Recent reserach in Human Robot Interaction has shown that humans are very reactive to the ways an algorithm will include or exlcude them from a situation.  For example, if our customer service bot chose the same optimal employee every single time, other employees may feel cheated.  To avoid this situation, an algorithm may enforce choosing each employee some minimum proportion of the time.  This goal may at first sound inane.  However, another paper from ICAROS lab [^2] showed that treating human participants fairly produced better scores versus unfair algorithms. 

While past research has studied subsets of these augmentations, we were the first to combine them with theoretical guarantees bounding the error.  Since the novelty of our project lies in the combination of various techniques, much of our paper describes the way such augmentations work together in various situations.  The details of these results are a bit more detailed than I would like to provide in this post.  However, feel free to read our paper [^1] if you are interested! 

## Theory

A significant portion of our paper was dedicated to the theoretical formalism and guarantees of our algorithm.  While I don't want to go into too much of the math here, I would like to briefly mention the major points.  

### Algorithm Formulation
Our algorithm was based on the FTRL (Follow the Regularized Leader) algorithm.  FTRL makes it's choice by optimizing over a probability distribution among the available choices favoring those that have done well in the past plus a "regularization" term which describes how many times a particular option has been chosen previously.  The purpose of the regularizer is to make sure that all options have been tried enough times to get a decent sense of what kinds of results we can expect (i.e. how good an employee's survey results are likely to be).  Written out more formally, our optimization looks like: 
\$\$P_{t} = argmin_{P \in \Omega} \sum_{s=1}^{t-1} \langle p^{j_s}, \hat{l_s} \rangle + \frac{1}{\eta}\sum_{j=1}^M \sum_{i=1}^K \psi(p^j(i))\$\$
Where  \\(\hat{l_s}\\) is the estimator of how well various options have done in the past, \\(P\\) is a probability distribution over choosing any particular option, \\(\eta\\) is the learning rate, and \\(K\\) and \\(M\\) are the numbber of optoins and contexts respectively.  

### Optimality Guarantees

The theoretical guarantees of bandit algortihms are measured with a metric known as *regret*.  Basically, regret is how much reward an algorithm missed out by not making the optimal choice at every opportunity.  The lower an algorithm's regret, the better.  We were able to prove that our algorithm guarantees an expected regret upper bounded by \$\$ O(\sqrt{TMK \ln K}) \$\$
This regret bound is on par for other adversarial bandit algorithms. ("Adversarial" is another aspect of bandit algorithms chosen during our work.)

## User Study
To show that our alogrithm works to improve results during human interaction, we tested our algorithm against a similar non-contextual algorithm posed previously by ICAROS lab [^2].  In this user study, we recuited workers from the USA and India on Amazon Mechanical Turk to take a test.  Questions would be broken up into 2 contexts (USA-related quesetions and India-related questions).  Participants took one test with the contextual algorithm and one with the non-contextual algortihm (with randomized ordering on which came first) and answered questions at the end as to how fair they felt the algorithm was.  Ultimately we had positive results.  We showed that the contextual algorithm performed better in overall number of questions answered correctly, especially when the difference in ability betwen contexts for each player was especially high (a measure we coined as *disparity*).  The observation that higher disparity leads to better results in the contextual algorithm's performance indicates that the algorithm is utilizing differences in participants' knowledge to make more refined choices: 

![Correct Answer Results](/assets/img/Fair-Bandit/Correct_Answer_Results.JPG)
*Figure 2: Left) Results of the average number of questions answered correctly on our tests between the baseline (non-contextual) and Fair CB (contextual) algorithms. Right) Graph of number of correct answers versus the "disparity" metric.*

Moreover, the contextual algorithm didn't decrease how fair the participants felt the algorithm's choices were.  The survey asked 3 questions: *Q1) How FAIR or UNFAIR was it for YOU that the computer gave you the designated number of questions?*, *Q2) How FAIR or UNFAIR was it for your PARTNER that the computer gave them the designated number of questions?*, and *Q3) How much do you trust the computer to make a good decision about the distribution of questions?*.  Here were the results: 

![Fairness Results](/assets/img/Fair-Bandit/Fairness_Results.JPG)
*Figure 3: Results of questions regarding fairness between the baseline (non-contextual) and Fair CP (Contexutal) algorithms.

Notice that across all 3 questions, the difference in fairness and trust was negligible.  

## Footnotes
[^1]: Yifang Chen, Alex Cuellar, Haipeng Luo, Jignesh Modi, Heramb Nemlekar, and Stefanos Nikolaidis. Fair contextual multi-armed bandits: Theory and experiments. arXiv preprint arXiv:1912.08055, 2019.

[^2]: Houston Claure, Yifang Chen, Jignesh Modi, Malte Jung, and Stefanos Nikolaidis. 2019. Reinforcement Learning with Fairness Constraints for Resource Distribution in Human-Robot Teams. arXiv preprint arXiv:1907.00313 (2019)
