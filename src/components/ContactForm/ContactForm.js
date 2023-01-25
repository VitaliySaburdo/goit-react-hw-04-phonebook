import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Form, Input, Label, Button } from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    nameId: nanoid(5),
    numberId: nanoid(5),
  };
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
    nameId: PropTypes.string,
    numberId: PropTypes.string,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.resetForm();
  };

  handleNameChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number, nameId, numberId } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor={nameId}>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
            id={nameId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label htmlFor={numberId}>
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleNameChange}
            id={numberId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}
