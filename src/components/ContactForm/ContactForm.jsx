import { useState } from 'react';
// import { toast } from 'react-hot-toast';
import { Button, Form, Input } from './ContactForm.styled';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const createContact = e => {
    e.preventDefault();
    addContact({
      name,
      number,
    });
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={createContact}>
      <label htmlFor="name">Name</label>
      <Input
        type="text"
        name="name"
        id="name"
        required
        onChange={handleChange}
        value={name}
      />
      <label htmlFor="number">Number</label>
      <Input
        type="tel"
        name="number"
        id="number"
        required
        onChange={handleChange}
        value={number}
      />
      <Button type="submin">Add contact</Button>
    </Form>
  );
};

export default ContactForm;
