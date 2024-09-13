# E Learning website

I create this project for e-learning website that selling some course in the website so user can access and learn from internet. 

## Language that i use in this project : 
1. Vue JS
2. Express JS
3. Node JS
4. MongoDB


## What do I use in in this project 

1. Google login/sign up intergration
2. Drag & drop from local file into AWS S3
3. We use **Paypal** for international payment & **ABA Pay** for local payment (sandbox)
    - ABA integration is not working right now because it expired **ABA only provide us 1 month merchant only**
    - For more detail about ABA integration watch the video below ! 
5. CRUD

> [!IMPORTANT]
> [ Website Demo Video ](https://www.youtube.com/watch?v=s9NGPSQCHnM)

## Website URL  

1. [ Website domain ](https://e-learning-website-plum.vercel.app/)
   - I'm using **Vercel** for hosting front-end
   - [ Vercel Website ](https://vercel.com/)
2. [ Server domain ](https://e-learning-project-yoca2.ondigitalocean.app/api)
   - I'm using **Digital Ocean** for hosting server-side
   - [ Digital Ocean webiste ](https://cloud.digitalocean.com/)


## Explaination

- Google login/sign up : I'm using google library.
- ABA Pay & Paypal payment.
- AWS S3 : When upload local file it'll send into AWS S3 and upload in it and return back with URL to push into my MongoDB.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
