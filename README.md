# Shopping Cart

This project is created for CS5010 Homework3 @NEU. Implemented by Siyuan Liu.  
In conclusion, this application allows you to add/edit the product in the product list and add/remove them from your shopping cart.   
All data are stored in the Firestore database. Notice that for the product image you need to provide a valid image url to show it in the product list table.  
The preview of the application looks like the image below.
![Image of the game](/shopping-cart.png)

## Try It Online

Use the link below to try to use the application online.  
https://cathenax.github.io/shopping-cart/

## Run In Development Mode

Clone the code and in the project directory use `npm install` and `npm start` to run the code in development mode. Open http://localhost:3000 to view it in your browser.

## Presentation Video

See presentation video using the link below to get a grasp of how this application works.  
https://drive.google.com/file/d/1gF7YRr9aToOHfxf6cTjZIVxujexp430-/view?usp=sharing

## Methods Used to Build the Project

This section describes how I develop the whole application.  
1. Use npx create-react-app to create the application, and install eslint, prettier, PubSub and other dependencies.
2. Use Layout, Table, Card of Ant Design and other CSS stylesheet to build up a basic framework of the application.
3. Set up the Firestore database by following the documentation of Firebase. In the database I have two collections named ProductList and ShoppingCart.
   1. ProductList stores the available products, each has attributes of name, price, image (a string of the image url). 
   2. ShoppingCart stores the products in the shopping cart, each document has attributes of name, productID(which is the same as one of the ID of the document in ProductList), price and number(the count of the product in the cart).
4. Separate my application into different components such as product, product list, shopping cart, and a add product panel. Carefully designed them and established a basic structure.
5. Implement a MyFirebase.js file to initialize and export Firestore service. Inside I put the function needed for CRUD, such as `addNewProduct(product)`and `addToCart(product)`.
6. Keep working on the components to implement onClick event handler and use the function of MyFirestore to send request to Firestore. Specifically, I use PubSub to send messages between two components that has no direct connection, so that I can notify the shopping cart component to refresh the shopping cart when I click on add to cart in the product list table.
7. Deploy the application on the github pages. I use the gh-pages to help deploy, which creates and uses a gh-pages branch as the github pages source.