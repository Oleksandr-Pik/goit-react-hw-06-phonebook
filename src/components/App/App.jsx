import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { Container } from './App.styled';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../../redux/contacts/contactsSlice';
import { setFilter } from '../../redux//filter/filterSlice';

const App = () => {
  const contacts = useSelector((state)=>state.contacts)
  const filter = useSelector((state)=>state.filter)

  const dispatch = useDispatch();

  const handleAddContact = data => {
    if (isContactAlreadyExist(contacts, data)) {
      toast.error(`${data.name} is already in contact`);
      return;
    }

    console.log('data', data)
    dispatch(addContact(data));
    toast.success("Create new contact successfully")
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId))
    toast.error("Delete contact successfully");
  };

  const isContactAlreadyExist = (contacts, data) => {
    return contacts.find(contact => contact.name === data.name);
  };

  const changeFilter = e => {
    dispatch(setFilter(e.target.value));
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
      <Toaster
				position='top-center'
				toastOptions={{
					duration: 1500,
				}}
			/>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />

      {visibleContacts.length ? (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={handleDeleteContact}
        />
      ) : (
        'No contacts'
      )}
    </Container>
  );
};

export default App;
