## About the Form Project

The idea behind this form was to simply exercise my knowledge of React and other programming languages while creating a functional form integrated with JivoChat, a chat software for websites offered by JivoChat.com.

Cool features:

- Validator to verify the data being inserted by the user in real-time, with border colors and error/warning messages;
- Real-time auto-formattor for names;
- Collects the chat status from the Jivo server and enable/disable the form based on the status of the chat. When offline, for example, it disables the form and shows a message to the user informing that the chat is currently offline;
- Form fields are integrated with Jivo's contact fields using Jivo's API. Data is updated in real-time on Jivo's apps while user is filling the form;
- After clicking to start a chat, user receives an automatic welcome message offering help calling the user by his first name;
- Chat widget has received forced CSS changes so that it is loaded in full sreen for the user, therefore hiding the form which has already been filled in and is no longer necessary in the current user session. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.