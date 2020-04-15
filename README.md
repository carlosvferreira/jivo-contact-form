## About the Form Project

The idea behind this form was to simply exercise my knowledge of React and other programming languages while creating a functional form integrated with JivoChat, a chat software for websites offered by JivoChat.com.

Cool features:

- Validator to verify the data being inserted by the user in real-time, with border colors and error/warning messages;
- Real-time auto-formattor for names (upper and lower case automatic manipulation);
- Collects the chat status from Jivo's server and enable/disable the form based on the status of the chat. When offline, for example, it disables the form and shows a message to the user informing that the chat is currently offline;
- Form fields are integrated with Jivo's contact fields using Jivo's API. On form submit, data is sent to the Jivo apps. Selected department is mentioned in the client's details inside the Jivo app;
- After clicking to start a chat, user receives an automatic welcome message offering help calling the user by his first name which is collected directly from Jivo's servers after sending it via submit;
- Applied CSS changes on the default chat widget to hide the default labels and also to load the chat widget in full screen for the user, therefore hiding the form which has already been filled in and is no longer necessary in the current user session. If the user refreshes the page, the chat will automatically open again if the chat session is still open in the Jivo app with the chat agent.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Projects used to help build this web app:
https://www.npmjs.com/package/react-phone-input-2

https://medium.com/@agoiabeladeyemi/the-complete-guide-to-forms-in-react-d2ba93f32825

### How to run it

1. npm install
2. npm start
3. navigate to http://localhost:3000 in your browser of choice.

### Firebase

Test it live at: 
https://jivocontactform.web.app/

### Author
Carlos Eduardo da Veiga Ferreira

https://www.linkedin.com/in/carlos-eduardo-da-veiga-ferreira-13288a70/