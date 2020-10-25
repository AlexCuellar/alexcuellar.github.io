---
layout: post
title: Circuitry Design for Ceap Water Desalination
excerpt: Design of circuitry and feedback system for brackish water electrodialysis desalination system.<br><br>
category:
  - Projects
tags:
  - Controls
  - Circuits
---

## Overview

Many groundwater resources around the world are categorized as backish -- too salty to drink but not salty enough to be considered pure salt-water.  This lower level of salinity makes purifying brakishwater easier than salt water, and is therefore a common point focus of research for water security in the developing world.  In 2018, I worked as part of a project with the MIT GEAR (Global Engineering and Research) Lab to improve home-use elecrodialysis desalination devices.  Such devices pump water between parallel sheets of material which only alow cations or anions to pass through.  When a voltage is applied to the systems, the anions and cations create a current by traveling between these pieces of material.  With proper layering, the system results in 2 separate water sources, one diluate (from which ions were pulled) and concentrate (into which ions were deposited).  This process is a balancing act: too little voltage means the process is incrediby slow, but too high a voltage will result in water breaking into hydrogen and hydroxide ions, resulting in dangerously acidic and basic water.  GEAR lab's mission was investigating the optimal way to ride this line as the water gets less and less salty.  

<!-- <div class="center">
    <img src="/assets/img/Water-Desalination/Desalination-Setup.jpg" alt="Desalination Setup" class="three-image-row">
    <img src="/assets/img/Water-Desalination/Electrodialysis-Diagram.jpg" alt="Electrodialysis Diagram" class="three-image-row">
</div> -->

![Desalination Setup](/assets/img/Water-Desalination/Desalination-Setup.jpg)
*Figure 1: Picture of GEAR LAB's Electrodialysis Desalination setup.  The top row has the diluate and concentrate sources, and the bottom level houses pumps and the elecrodialysis stack itself.*
![Electrodialysis Diagram](/assets/img/Water-Desalination/Electrodialysis-Diagram.jpg)
*Figure 2: Diagram of Electrodialysis.*

## My contribution

My contribution to this project was not related to the actual desalination process, but making the circuitry behind it cheaper and more accessible to the developing world.  When I came to the project, the process for determining optimal voltage occured via a feed-forward controller dependant on estimating the resistance of the system as a function of salinity.  While the setup worked fairly well, it required a laptop with Labview to always be hooked up to an expensive power supply to ensure the correct voltage output.  However, a simple feedback control scheme could cut out much of the complexity and cost of the parts required to mantain the current levels required in the system. 

Early on, I attempted methods of mantaining a DC voltage to the stack.  I used a BUZ11 MOSFET with PWM to produce an square-wave signal of the necessary voltage, and then used a buck converter convert back to DC.  However, it turned out that the desalination stack worked fine with the unfiltered PWM signal.  As a result, the circut simplified futher to the final form seen below.  

<!-- <div class="center">
    <img src="/assets/img/Water-Desalination/Circuit-Setup.jpg" alt="Circuit Setup" class="two-image-row">
    <img src="/assets/img/Water-Desalination/Circuit-Diagram.png" alt="Circuit Diagram" class="two-image-row">
</div> -->

![Circuit Diagram](/assets/img/Water-Desalination/Circuit-Diagram.png)
*Figure 3: Diagram of the final circuit*
![Circuit Setup](/assets/img/Water-Desalination/Circuit-Setup.jpg)
*Figure 4: picture of breadboard in final circuit setup for testing.*

In order to determine the desired PWM signal to the BUZ11, I used an Arduino Uno and EZO-EC salinity probe to calculate a desired current.  Then, using a simple resistance divider to drop down the voltage signal coming off the desalination stack, I calculated the current through the system.  This measured current informed a simple proportional feedback system tuning the PWM duty cycle to match the desired current.  

