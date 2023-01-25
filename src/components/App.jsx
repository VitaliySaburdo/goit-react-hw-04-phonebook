import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { RenderContacts } from './RenderContactsList/RenderContactsList';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  static propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const contactsParse = JSON.parse(contacts);

    if (contactsParse !== null) {
      this.setState({ contacts: contactsParse });
    } 
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  formSubmitHendler = ({ name, number }) => {
    const contact = {
      id: nanoid(5),
      name,
      number,
    };

    const isNameInContact = this.state.contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (isNameInContact) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    const visibleContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return (
      <Container>
        <Section title="Phonebook" />
        <ContactForm onSubmit={this.formSubmitHendler} />
        <Section title="Contacts" />
        <Filter value={filter} onChange={this.changeFilter} />
        <RenderContacts
          contacts={visibleContact}
          onDelete={this.deleteContacts}
        />
      </Container>
    );
  }
}
