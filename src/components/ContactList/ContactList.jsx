import React from 'react';
import ContactListItem from 'components/ContactListItem';
import { toast } from 'react-hot-toast';
import { deleteContact } from '../../redux/contacts/contactsSlice';
import { useDispatch} from 'react-redux';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
    toast.error('Delete contact successfully');
  };

  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          <ContactListItem
            contact={contact}
            onDeleteContact={handleDeleteContact}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
