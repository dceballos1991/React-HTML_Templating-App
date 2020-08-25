This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
I've included the CRA README page for the available scripts, and notes.

## User Guide

To start the aplication:
1. npm install
2. npm run start-server (server will be running in localhost:3000)
3. npm start 

I focused a lot on the application's UI & UX and my hopes are that all the functionalities
are for the most part explicit and easy to figure out, and that the core logic is self- explanatory.

Having said that here is a quick application work flow to get you started:

1.  Users are able to a) select a customer & a template of their choice and have it displayed OR
    b) create a new template from scratch.
2.  Selecting a customer/template will display the template filling the variables with the 
    selected customer's information. Two additional options will also appear under the Main content section: Edit Template, and Delete.
3.  When editing the user will have access to the raw html template and will be able to change it as 
    well as the templates name 
4.  The user will have the choice to cancel or to Save this changes
5.  Note: If I had more time I would implement a modal to make sure the user wants to Save 
    (overwriting the current template) or Delete. 
6.  Note: When displaying the template I made a conditional operation where if the information for
    last_order was empty another string would be displayed. In some way can be considered error handling. 
7.  If the user clicks on create New Template the user will be shown a different card under the Main
    Content. This card shows the available variables as well as how to dynamically render products.
8.  The save button is disabled unless the user writes down a name and content inside the template.
9.  Lastly, the user can click "Show Example" which will display the raw html of another template
    so the user can use that as a guide.


## Code Base notes

The code base is structured in four main folders: components, containers, providers, and utils.

### Data Handling

I decided to handle the data using Redux store patterns but in a React context + React useReducer hooks.
I followed Redux best practices which are:
    store
         single source of truth (immutable)
    reducer
        pure function
        inputs - (state, action)
        switch statements
        returns new object
    action
        object with type and payload
        best practice to use action creators
        creators return object
    workflow
        store receives action
        triggers reducer which returns new state as new object (key here is to use spread or object assign)

In a larger and more complex application I would break down the providers (as opposed to a single global AppProvider)
and make them closer to the components that utilize them

### Regarding Testing

I was not able to start implementing tests due to the deadline; however, here is how I would've done it. 
First I would have added container components to the components that I would unit test in order to use the context
in the containers and pass props to the components. For example:
useAppContext would be removed from SubBar and added to a new component called SubBarContainer. This way unit testing SubBar would be much easier.

Also, rather I would have done both unit and integration tests but would have focused on the latter.
Lastly, I would've used Jest, React-Testing-Library, and Cypress for integration tests

### About UI and Design

Due to time constraints I decided to use Material UI components. Two big downsides to Material UI are:
1. Customizing components can be a painful experience
2. If no customization is done, the application will end up looking like every other application that uses material UI
or follows material design specifications  

Because of this and with more time available I would have probably gone with TailwindCSS

### Notifications handling, Error, and Loading States

Error and Loading states are written inside the store so handling this states is as easy as a ternary operator. In fact, you can find that across this application. With more time I would have implemented a Spinner for the loading state and 
snackbars for the Error states.

To deal with notifications, I would have created a NotificationProvider and be able to call modals and snackbars everytime I want to notify the user about something. 

If you have any questions dont hesitate to email me: dceballos1991@gmail.com

