import PropTypes from 'prop-types';
import { Item, Button } from './RenderContactList.styled';

export const RenderContacts = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <Item key={contact.id}>
          {contact.name}: {contact.number}
          <Button onClick={() => onDelete(contact.id)}>delete</Button>
        </Item>
      ))}
    </ul>
  );
};

RenderContacts.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func,
};
