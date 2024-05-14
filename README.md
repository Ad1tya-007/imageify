# Imaginify




## Introduction




Welcome to Imaginify - a revolutionary app designed to transform and rejuvenate your most cherished memories. In the fast-paced digital age, our memories often fade into the background, but with Imaginify, we're bringing them back to life in vibrant detail. Imaginify is a powerful AI image and video SaaS platform engineered to provide a fresh perspective on transforming pictures and reliving memorable videos. Our platform combines cutting-edge image and video processing capabilities with a seamless user experience, offering a range of innovative features to enhance and reimagine your cherished moments.




At the core of Imaginify is our commitment to excellence in image and video processing. Leveraging state-of-the-art AI technologies, we empower users to unleash their creativity like never before. Whether you're looking to restore old photographs, recolor faded memories, remove unwanted objects, remove background or relive old videos, Imaginify has you covered.




Join us on a journey of transformation and rediscovery with Imaginify. Say goodbye to dull, lifeless photos and videos and hello to a world of endless possibilities. It's time to reimagine your memories with Imaginify.




## Getting Started




First, install packages:




```bash
npm i
```




Then add these in your .env.local with your API keys.




```
# CLERK KEYS
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# CLERK URLS
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# CLERK WEBHOOKS
WEBHOOK_SECRET=

# MONGODB
MONGODB_URL=

# CLOUDINARY
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# STRIPE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# OTHER
# NEXT_PUBLIC_SERVER_URL=<DEPLOYED APP LINK>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# CLOUDINARY UPLOAD PRESET
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=

#OPEN API
OPENAI_API_KEY=
```


Then, run the development server:


```bash
npm run dev
```




All the API keys came from the websites given below:




- Clerk : https://clerk.com/
- MongoDB: https://www.mongodb.com/atlas/database
- Cloudinary: https://cloudinary.com/
- Stripe: https://stripe.com/en-ca/payments
- Vercel: https://vercel.com/login (For NEXT_PUBLIC_SERVER_URL)




## Goals




The goals of the app were as follows:




- [x] Responsive UI
- [x] User friendly UI
- [x] Image Restore
- [x] Generative Fill
- [x] Object Removal
- [x] Object Recolor
- [x] Background Removal
- [x] Video Storytelling
- [ ] Video Storytelling Narration
- [x] Clerk Authentication
- [x] Stripe Payments
- [x] Connecting with MongoDB




Unfortunately, one goal we missed out was the video story narration. In this, we wanted the users to hear the audio of their memories being narrated. We did figure this out right after our submission time. :(




## Tech Stack




- Next.js
- TypeScript
- MongoDB
- Clerk
- Cloudinary
- Stripe
- Shadcn
- TailwindCSS




## Features of Imaginify




- **Authentication and Authorization:** Secure user access with registration, login, and route protection.
- **Community Image Showcase:** Explore user transformations with easy navigation using pagination
- **Advanced Image Search:** Find images by content or objects present inside the image quickly and accurately
- **Image Restoration:** Revive old or damaged images effortlessly
- **Image Recoloring:** Customize images by replacing objects with desired colors easily
- **Image Generative Fill:** Fill in missing areas of images seamlessly
- **Object Removal:** Clean up images by removing unwanted objects with precision
- **Background Removal:** Extract objects from backgrounds with ease
- **Story Generator:** Extract tags from videos and create a story
- **Download Transformed Images:** Save and share AI-transformed images conveniently
- **Transformed Image Details:** View details of transformations for each image
- **Transformation Management:** Control over deletion and updates of transformations
- **Credits System:** Earn or purchase credits for image transformations
- **Profile Page:** Access transformed images and credit information personally
- **Credits Purchase:** Securely buy credits via Stripe for uninterrupted use
- **Responsive UI/UX:** A seamless experience across devices with a user-friendly interface




and many more...




## Team Members




Aditya Kulkarni : https://github.com/Ad1tya-007




Sidharth Singh : https://github.com/singh-sidharth




## Conclusion




This was a crazy project from the both of us. Making a fully functional Saas application in just 24 hours is mindblowing!
We wanna thank SFU CSSS for hosting Moutain Madness and having us developed and present our app in front of amazing developers.




## Note




- Initally our app was called Imageify because we only thought about image processing. At around 9pm (24th March), we realised that Cloudinary can also do video processing. This explains why the repository is called "imageify".
- Due to time, we were unable to make 2 places use the NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET. So we hardcoded it. Specifically the `CldUploadWidget's uploadPreset` in `<MediaUploader />` and `<StoryForm />`. So please dont roll back the commits. The code has not been changed after the submission! ( This issue was resolved after the hackathon results came out )
