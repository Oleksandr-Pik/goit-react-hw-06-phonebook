import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { Container } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = data => {
    if (isContactAlreadyExist(contacts, data)) {
      alert(`${data.name} is already in contact`);
      return;
    }

    const newContact = {
      id: nanoid(10),
      ...data,
    };

    setContacts([newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const isContactAlreadyExist = (contacts, data) => {
    return contacts.find(contact => contact.name === data.name);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} createContact={createContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />

      {visibleContacts.length ? (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        'No contacts'
      )}
    </Container>
  );
};

export default App;
