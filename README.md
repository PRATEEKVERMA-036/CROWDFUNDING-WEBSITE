# CROWDFUNDING-WEBSITE🤝 

## Brief Description📚
Crowdfunding website is a platform where people can look around different campaigns running for various causes and can support them by donating small amount of money.The donation is done through PayTM gateway
and complete transparency of donation and privacy of donor is ensured.

## Short tech summary

* Implemented **authentication,authorization using Json Web Token** for admin **login**,along with **CRUD** features
* Integrated **payment gateway by PayTM API** to collect donation and display transaction status.
* Implemented **MongoDB query** to **encrypt transaction IDs**, in order to maintain privacy of donor
* Technology used:**React, Node.js, Express.js, MongoDB**


## Features🌟 

### User features

* User can see the ongoing campaigns on the landing page.
* User can click the campaign they want to support and will be directed to that specific campaign`s page where they can see the brief campaign details.
* User can then support campaign by clicking on **DONATE NOW** button,via PayTM gateway.
* User can see the transaction status and donation amount on individual campaign`s **PROUD DONORS LIST**,ensuring privacy of donor.
* Campaigns **DONATE NOW** button is automatically disbaled, if the campaign is completed, thus preventing donor to donate to wrong campaigns. 

### Admin features

* Admin features include all the user features.
* Admin can create a new campaign by filling details like title, content, amount.
* Admin can update the details of ongoing campaigns except the amount.
* Admin can delete the campaign ,if the aim of the campaign is fulfilled.
* Admin can deactivate/halt a campaign in case of any unknown problem.
* Only a existing Admin can create a new admin.

## Tech Stack👨‍💻

**MERN** stack is used for development of this website

* [React](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

## API

* [PayTM API](https://developer.paytm.com/)

## Component include

* API calling (calling to PayTM gateway)
* Usage of MongoDB that provides good efficiency.

## Thought behind the project🔮

This project is a part of the Winter Project event conducted by AASF IIIT, Gwalior.My motive behind choosing this project was build something that can be used to resolve real world problem.I saw the ROTARACT CLUB,IIIT Gwalior was lacking a centralised secured platform,that can track the progress of various campaigns run by it.
So,I decided to come up with this project that can provide a user friendly experience, secured and ensures the tranparency of donation and privacy of donor.

## SetUp Steps🛠️

### For Backend

* Goto backend folder.
* Run npm install
* Run node index.js

### For Frontend

* Goto crowdfunding folder.
* Run npm install
* Run npm start

**Boom,your website is running on port 3000 of your browser**

## Link
[Crowdfunding Website](https://crowdfundingweb.herokuapp.com/)

## Screenshots📷 

### LANDING PAGE-->
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/Landingpage-1.PNG "Landingpage-1")
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/Landingpage-2.PNG "Landingpage-2")
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/Carousel-cards.PNG "Carousel-cards")
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/Footer.PNG "Footer")

### ALL CAMPAIGNS-->
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/Allcampaigns.PNG "Allcampaigns")

### CAMPAIGN DETAIL-->
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/Campaign-detail.PNG "Campaign-detail")

### DONOR LIST-->
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/DonorList.PNG "DonorList")

### DONATION FORM-->
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/DonationForm.PNG "DonationForm")

### PAYTM PAYMENT GATEWAY-->
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/PaytmGateway.PNG "PaytmGateway")

### ADMIN LOGIN-->
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/AdminLoginpage.PNG "AdminLoginpage")

### ADMIN PAGE-->
![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/AdminPage-1.PNG "AdminPage-1")

![alt text](https://github.com/PRATEEKVERMA-036/CROWDFUNDING-WEBSITE/blob/master/Crowfunding%20ss/AdminPage-3.PNG "AdminPage-3")
