# Project Title

- Prime Estates

# Live Link

- https://nafis-prime-estates.netlify.app/

###

- admin username : admin1@gmail.com
- admin password : 123456aA

# Purpose

- In this website, users can register using their email and password, also they can use their google credentials for seamless login experience. There are three roles (Admin, Buyers and Sellers). Admin can manage properties (verify, delete), manage users etc. Buyers can add any property to their wishlist and bid their prices. Sellers can add properties which need to be verified by the admins first and then they can be sold.

# Features

- Seamless login and registration using firebase
- Admins can delete users from both firebase and mongoDB
- Users can add a property to wishlist.
- Users can bid a price for a property.
- Users can post reviews about properties
- Sellers can add property.
- Sellers can be marked as fraud, which will ban them from adding anymore property.
- Users can use stripe to pay once the seller agrees to the offer made by the buyer.
- Admins MUST verify properties before they are published in the All properties page.
- JWT token generated and kept in localstorage.
- admin, buyer and seller api end points are secured using the tokens on backend and on frontend there is role based routing.

# Technologies used

- React js
- React router dom
- SweetAlert
- React Toast
- Lottie
- Tailwind CSS
- Daisy UI
- MongoDB
- CORS
- DotEnv
- Express
- Stripe
- JWT
