import React, { Component } from 'react';
import '../App.css';

import Name from '../components/Name';
import validate from '../components/validate';
import Email from '../components/Email';
import Select from '../components/Select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chatStatus: false,
      loadingError: false,
      isLoading: true,
      showError: false,
      formIsValid: false,
      formControls: {

        name: {
          value: '',
          placeholder: 'Name*',
          valid: false,
          touched: false,
          validationRules: {
            minLength: 3,
            isRequired: true
          }
        },
        phone: {
          value: '',
          placeholder: 'Phone number',
          valid: true,
          touched: true
        },
        email: {
          value: '',
          placeholder: 'Email*',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
            isEmail: true
          }
        },
        department: {
          value: '',
          placeholder: 'Department',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          },
          options: [
            { value: '', displayValue: 'Select a Department*' },
            { value: 'support', displayValue: 'Support' },
            { value: 'sales', displayValue: 'Sales' }
          ]
        }
      }
    }
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };

    const updatedFormElement = {
      ...updatedControls[name]
    };

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid,
    });
  }

  formSubmitHandler = () => {
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    console.dir(formData);
  }

  //Real-time auto-formatter for names inserted in the form

  formNameFormatter = () => {
    let userName = this.state.formControls.name.value.split(" ")
    let userNameSplit = userName.map(function (namePart) {
      let name = namePart.length <= 2 ? namePart.toLowerCase() : namePart.charAt(0).toUpperCase() + namePart.substring(1).toLowerCase()
      return name
    })
    let userNameFormatted = userNameSplit.join(" ")
    this.state.formControls.name.value = userNameFormatted
    return this.state.formControls.name.value
  }

  //Real-time auto-formatter for emails inserter in the form

  formEmailFormatter = () => {
    if (this.state.formControls.email && this.state.formControls.email.value.includes("@")) {
      let [first, second] = this.state.formControls.email.value.split("@")
      return `${first}@${second.toLowerCase()}`
    }   
    return this.state.formControls.email.value
  }

  //Sends contact data to the Jivo app in real-time

  formSendDataToChat = () => {
    window.jivo_api.setContactInfo(
      {
        name: this.state.formControls.name.value,
        email: this.state.formControls.email.value,
        phone: this.state.phone,
        description: `${this.state.formControls.name.value.split(" ")[0]} has selected the ${this.state.formControls.department.value} department`
      }
    );
  }

  //Sends a proactive invitation on form submit with client's first name on it

  formSendProactiveInvitation = () => {
    let clientName = window.jivo_api.getContactInfo().client_name;
    let clientFirstName = clientName.split(" ")[0]
    window.jivo_api.showProactiveInvitation('Hello, dear ' + clientFirstName + '! How can I help you today?')
  }

  //Starts a chat with the website owner on Jivo app

  startChat = () => {
    if (this.state.chatStatus) {
      this.formSendDataToChat()
      this.formSubmitHandler()
      this.formSendProactiveInvitation()
    }
    else if (!this.state.chatStatus) {
      this.setState({...this.state, showError:true})
      setTimeout(() => {this.setState({...this.state, showError:false})}, 2000)
      window.jivo_init()
    }
    else {this.setState({...this.state, chatStatus: false, isLoading: true, error: true})}
  }

  //Checks the status of the chat (online or offline) and enable/disable the form based on the result

  async componentDidMount() {
    try {
      const status = await fetch("//node136.jivosite.com/widget/status/497422/ZLM6UIaTWf")
      const response = await status.json()
      const isOnline = Boolean(response.agents && response.agents.length)

      this.setState({...this.state, chatStatus: isOnline, isLoading: false})
      console.log(isOnline)
    }
    catch(e) {
      this.setState({...this.state, chatStatus: false, isLoading: true, error: true})
    }
  }

  render() {

    return (

      <div className="App">

        {this.state.isLoading && <p id="loadingMessage">Loading, please wait</p>}
        {!this.state.chatStatus && !this.state.isLoading && <p id="offlineChat">We're currently offline. Please try again later.</p>}
        {this.state.loadingError && <p id="failMessage">Failed to load, please refresh to try again.</p>}

        <form id="chatForm" disabled={this.state.isLoading || !this.state.chatStatus}>
          
          <Name name="name" disabled={this.state.isLoading || !this.state.chatStatus}
            placeholder={this.state.formControls.name.placeholder}
            value={this.formNameFormatter(this.state.formControls.name.value)}
            onChange={this.changeHandler}
            touched={this.state.formControls.name.touched}
            valid={this.state.formControls.name.valid}
          />

          {!this.state.formControls.name.valid && this.state.formControls.name.touched && <p className="invalid-field-message">Please insert at least 4 characters</p>}

          <PhoneInput name="phone" class="flag-dropdown" disabled={this.state.isLoading || !this.state.chatStatus}
            country={'us'}
            placeholder={this.state.formControls.phone.placeholder}
            value={this.state.phone}
            onChange={phone => this.setState({ phone })}
            touched={this.state.formControls.phone.touched}
            valid={this.state.formControls.phone.valid}
          />

          <Email name="email" disabled={this.state.isLoading || !this.state.chatStatus}
            placeholder={this.state.formControls.email.placeholder}
            value={this.formEmailFormatter(this.state.formControls.email.value)}
            onChange={this.changeHandler}
            touched={this.state.formControls.email.touched}
            valid={this.state.formControls.email.valid}
          />

          {!this.state.formControls.email.valid && this.state.formControls.email.touched && <p className="invalid-field-message">Please insert a valid email address</p>}

          <Select name="department" selected disabled={this.state.isLoading || !this.state.chatStatus}
            placeholder={this.state.formControls.department.placeholder}
            value={this.state.formControls.department.value}
            onChange={this.changeHandler}
            options={this.state.formControls.department.options}
            touched={this.state.formControls.department.touched}
            valid={this.state.formControls.department.valid}
          />

          {!this.state.formControls.department.valid && this.state.formControls.department.touched && <p className="invalid-field-message">Please select a department</p>}

          <button type="button" id="startChatButton" disabled={!this.state.formIsValid || this.state.isLoading || !this.state.chatStatus}
            onClick={this.startChat}
          >
            <span disabled={!this.state.formIsValid || this.state.isLoading || !this.state.chatStatus}>
              Start Chat
            </span>
          </button>

          {this.state.showError && <div id="startChatButtonError">
            <span id="errorMessageChatOffline">
              We're currently offline. Please try again later.
            </span>
          </div>}
        </form>
      </div>
    )
  }
}

export default App;