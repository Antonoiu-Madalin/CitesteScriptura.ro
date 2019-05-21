import React, { Fragment } from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Contact Form - CitesteScriptura.ro',
    subject: '', // optional subject of the notification email
    action: 'https://briskforms.com/go/1dbf805722e2a4621a602a499894849a',
    successMessage: 'Mesajul tau a fost trimis cu succes, multumim!',
    errorMessage:
      'Mesajul tau a fost trimis cu succes, iti multumim!'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
 
        <form
          className="Form"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}

        >

    
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Nume"
                name="nume"
                required
              />
              <span>Nume</span>
            </label>
     

          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Adresa de email"
              name="emailAddress"
              required
            />
            <span>Adresa de email</span>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Mesjul tau"
              name="mesaj"
              rows="10"
              required
            />
            <span>Mesajul tau</span>
          </label>

          {/*
          <label className="Form--Label Form-Checkbox">
            <input
              className="Form--Input Form--Textarea Form--CheckboxInput"
              name="newsletter"
              type="checkbox"
            />
            <span>Abonare la Newsletter (inactiv)</span>
          </label>
          */}
          
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Trimite"
            disabled={this.state.disabled}
          />

          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}

        </form>
      </Fragment>
    )
  }
}

export default Form