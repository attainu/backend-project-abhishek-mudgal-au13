# **Skindle**

# **{//Backend//}**

## **What is Skindle?**

#### Skindle is a self hosted application for URL shortening for businesses to create shortened links for their promotion campaigns. We have created this application to make business campaigns more uniform, so that users don't have to rely on apps like bit.ly. Your data remains with you, and is not shared with anyone!

## **What are we trying to build?**

#### We’re trying to build a link shortening app which will provide complete telemetry to the user about the usage/clicks for the shortened links in a beautiful and accessible way. Users will be able to create links, and use those links in their campaigns. Target audience when clicking the link, skindle captures the fingerprint for the business like, device, Operating-System, IP, browser type and other details. Users can also export data in csv files for further big data/research application or analyzing their campaign.

## **What technologies and packages have we used?**

#### **NodeJS:** Complete Backend is implemented in NodeJs

#### **ExpressJS:** Handling the requests and responses for the API.

#### **MongoDB:** For storing user information and dynamic telemetry data.

#### **JWT:** Handling sessions and authentication using JWT (jsonwebtokens)

#### **Express-Validators:** For validating input (API) post requests.

## Start the server:

    npm install package.json
    npm start

## Usage:

### **Sign Up query:**

#### tld/api/signup [post]

    {
    ​"name"​:​ ​"test"​,
    ​"email"​:​ ​"test1@test1.com"​,
    ​"password"​:​ ​"123456"
    }

### **Sign Up response:**

    {
    ​"data"​:​ ​{
    ​"_id"​:​ ​"6049e88f97c51111f67d199d"​,
    ​"name"​:​ ​"test"​,
    ​"email"​:​ ​"test1@test1.com"​,
    ​"joinDate"​:​ ​"2021-03-11T09:53:19.447Z"​,
    ​"password"​:​ ​"$2a$15$U620XJW3rdYhA6hViugELuW5yppp6J1c.7Ui5GB.M4E0ahN3nzRau"​,
    ​"__v"​:​ ​ 0 
    ​},
    ​"error"​:​ ​[],
    ​"msg"​:​ ​"Signed Up successfully!!"
    }

##### Once the user is signed in, the user is ready to login, in the frontend environment, the user will be redirected to the login page.

### **Log In query:**

#### tld/api/login [post]

    {
    ​"email"​:​ ​"test1@test1.com"​,
    ​"password"​:​ ​"123456"
    }

### Log In response:

    {
    ​"data"​:​ ​{
    ​"token"​:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA0OWU4OGY5N2M1MTExMWY2N2QxOTlkIn0sIm
    lhdCI6MTYxNTQ1Njc5N30.NOsFfZO1dXiOOMkvStOsDYlm9oSCXuN9mFmDakiB8qk"
    ​},
    ​"error"​:​ ​[],
    ​"msg"​:​ ​"Login Success!"
    }

##### For every login, a user token is generated which later will be used to interact with the rest of the software. In API env, a token will be passed on header.

### **Fetching the profile data:**

#### tld/api/profile [request type: get] [header: token]

    {
    ​"data"​:​ ​{
    ​"_id"​:​ ​"604b4eb3ad6633209d4850ee"​,
    ​"name"​:​ ​"test"​,
    ​"email"​:​ ​"test2@test2.com"​,
    ​"joinDate"​:​ ​"2021-03-12T11:21:23.549Z"​,
    ​"password"​:​ ​"$2a$15$ECO3XAtFRLnztba4sbu0Y.XpbJnJddQG/.1jVhdZ81d98MkRkPr3a"​,
    ​"__v"​:​ ​ 0 
    ​},
    ​"error"​:​ ​[],
    ​"msg"​:​ ​"Profile Fetched"
    }

### **Shortening the Links:**

#### tld/api/shorten [request type: post] [header: token]

    {
    ​"originalLink"​:​ ​"https://paste.ubuntu.com"
    }


### **Response:**

    {
    ​"data"​:​ ​{
    ​"_id"​:​ ​"6049eb34bae4a3135e898d48"​,
    ​"link"​:​ ​"jf5cbj"​,
    ​"originalLink"​:​ ​"https://paste.ubuntu.com"​,
    ​"creator"​:​ ​"6049e88f97c51111f67d199d"
    ​},
    ​"error"​:​ ​[],
    ​"msg"​:​ ​"Link shortened successfully, Saved to DB!"
    }

##### Links are created for the user, every link created; is user specific only. Data can only be viewed by the associated logged in user.

### **Dashboard:**

#### tld/api/dashboard [request type: get] [header: token]

##### By default, API fetches the latest links created by the user in ascending order.

    {
    ​"data"​:​ ​[
    ​{
    ​"_id"​:​ ​"604b53cc045c4b2330ceddf2"​,
    ​"link"​:​ ​"g21e81"​,
    ​"originalLink"​:​ ​"https://ubuntu.com"​,
    ​"creator"​:​ ​"604b4eb3ad6633209d4850ee"​,
    ​"date"​:​ ​"2021-03-12T11:43:08.802Z"​,
    ​"__v"​:​ ​ 0 
    ​},
    ​{
    ​"_id"​:​ ​"604b5211042c9221f5e21b1e"​,
    ​"link"​:​ ​"55g054"​,
    ​"originalLink"​:​ ​"https://paste.ubuntu.com"​,
    ​"creator"​:​ ​"604b4eb3ad6633209d4850ee"​,
    ​"date"​:​ ​"2021-03-12T11:35:45.720Z"​,
    ​"__v"​:​ ​ 0 
    ​},
    ​{
    ​"_id"​:​ ​"604b4eedad6633209d4850ef"​,
    ​"link"​:​ ​"c8j7jh"​,
    ​"originalLink"​:​ ​"https://paste.ubuntu.com"​,
    ​"creator"​:​ ​"604b4eb3ad6633209d4850ee"​,
    ​"__v"​:​ ​ 0 
    ​}
    ​],
    ​"error"​:​ ​[],
    ​"msg"​:​ ​"User created links fetched successfully."
    }

## **Room for improvement:**

#### Angular/React Native Web based frontend for the application. And displaying the data in graphs. Currently, handlebars are making the code bloated for a simple implementation. By using Angular/RNW/ReactJS ‘es reusable component can make our job easier.



