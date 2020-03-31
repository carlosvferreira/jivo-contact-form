import React, { Component } from 'react';
import '../App.css';

import Name from '../components/Name';
import validate from '../components/validate';
import Email from '../components/Email';
import Select from '../components/Select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {chatStatus} from '../services/chatStatus';

function new_script(src) {
  return new Promise(function(resolve, reject){
    var script = window.document.createElement('script');
    script.src = "//code.jivosite.com/widget/7LAU20v48r";
    script.addEventListener('load', function () {
      console.log("oi")
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    window.document.body.appendChild(script);
  })
};

class App extends Component {


  constructor() {
    super();

    this.state = {
      showError: false,
      formIsValid: false,
      formControls: {

        name: {
          value: '',
          placeholder: 'Name',
          valid: "false",
          validationRules: {
            minLength: 4,
            isRequired: true
          },
          touched: "false"
        },
        phone: {
          value: '',
          placeholder: 'Phone number',
          valid: "true",
          touched: "true"
        },
        email: {
          value: '',
          placeholder: 'Email',
          valid: "false",
          validationRules: {
            isRequired: true,
            isEmail: true
          },
          touched: "false"
        },
        department: {
          value: '',
          placeholder: 'Department',
          valid: "false",
          touched: "true",
          validationRules: {
            isRequired: true,
          },
          options: [
            { value: '', displayValue: 'Select a Department' },
            { value: 'support', displayValue: 'Support' },
            { value: 'sales', displayValue: 'Sales' }
          ]
        }

      }

    }

  }

  handleLoad = () => {

    console.log(window)
    console.log(window.jivo_api.chatMode())
    console.log("test")

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
    updatedFormElement.touched = "true";
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });

    this.formSendDataToChat()

  }

  formSubmitHandler = () => {
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    console.dir(formData);

  }

  formSendDataToChat = () => {

    window.jivo_api.setContactInfo(
      {
        name: this.state.formControls.name.value,
        email: this.state.formControls.email.value,
        phone: this.state.formControls.phone.value,
        description: ''
      }
    );
  }

  formSendProactiveInvitation = () => {

    var clientName = window.jivo_api.getContactInfo().client_name;

    window.jivo_api.showProactiveInvitation('Hello, dear ' + clientName + '! How can I help you today?')

  }

  startChat = () => {
    if (window.varStatus === "offline") {
      var errorText = window.document.getElementById("startChatButtonError")
      this.setState({...this.state, showError:true});
    }
    else if (window.varStatus === "online") {
      this.formSubmitHandler()
      this.formSendDataToChat()
      this.formSendProactiveInvitation()
      this.setState({...this.state, showError:false});
    }
    else { alert("erro")}
  }

  componentDidMount() {
    /*var script = document.createElement('script');
    script.src = "//code.jivosite.com/widget/7LAU20v48r";
    script.onload = () => {
      console.log(window.jivo_api.chatMode())
    }
    script.addEventListener('load', function () {
      console.log("oi")
    });
    script.addEventListener('error', function (e) {
      console.log("deu ruim")
    });
    document.body.appendChild(script);*/

    console.log(window.jivo_api.chatMode())
  }

  render() {

    return (

      <div className="App">

        <Name name="name"
          placeholder={this.state.formControls.name.placeholder}
          value={this.state.formControls.name.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.name.touched}
          valid={this.state.formControls.name.valid}
        />

        <PhoneInput name="phone"
          country={'us'}
          placeholder={this.state.formControls.phone.placeholder}
          value={this.state.phone}
          onChange={phone => this.setState({ phone })}
          touched={this.state.formControls.phone.touched}
          valid={this.state.formControls.phone.valid}
        />

        <Email name="email"
          placeholder={this.state.formControls.email.placeholder}
          value={this.state.formControls.email.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.email.touched}
          valid={this.state.formControls.email.valid}
        />

        <Select name="department" disabled selected
          placeholder={this.state.formControls.department.placeholder}
          value={this.state.formControls.department.value}
          onChange={this.changeHandler}
          options={this.state.formControls.department.options}
          touched={this.state.formControls.department.touched}
          valid={this.state.formControls.department.valid}
        />

        <button id="startChatButton"
          onClick={this.startChat}
         /* onClick={this.formSubmitHandler}
          onClick={this.formSendDataToChat}
          onClick={this.formSendProactiveInvitation}*/
          disabled={!this.state.formIsValid}
        >
          <span>
            Start Chat
          </span>

        </button>

        {this.state.showError && <div id="startChatButtonError">
          test
        </div>}

      </div>
    );
  }
}

export default App;