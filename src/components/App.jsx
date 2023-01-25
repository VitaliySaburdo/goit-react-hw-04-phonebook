import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { RenderContacts } from './RenderContactsList/RenderContactsList';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';
import { Container } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContacts = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const formSubmitHendler = ({ name, number }) => {
    const contact = {
      id: nanoid(5),
      name,
      number,
    };

    const isNameInContact = contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (isNameInContact) {
      return alert(`${name} is already in contacts`);
    }
    setContacts([contact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizeFilter = filter.toLowerCase();
  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <Container>
      <Section title="Phonebook" />
      <ContactForm onSubmit={formSubmitHendler} />
      <Section title="Contacts" />
      <Filter value={filter} onChange={changeFilter} />
      <RenderContacts contacts={visibleContact} onDelete={deleteContacts} />
    </Container>
  );
}

App.prototype = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  onSubmit: PropTypes.func,
};
