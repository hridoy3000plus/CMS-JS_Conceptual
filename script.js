// Contact Class and ID Generator
const createIdGenerator = () => {
  let id = 1;
  return () => id++;
};
const generateId = createIdGenerator();

class Contact {
  constructor(name, phone, email, address) {
    this.id = generateId();
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
}

// State Management
let contacts = [];

// DOM Elements
const contactForm = document.getElementById('contactForm');
const searchInput = document.getElementById('searchInput');
const contactsTableBody = document.getElementById('contactsTableBody');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');

// Event Listeners
contactForm.addEventListener('submit', handleAddContact);
searchInput.addEventListener('input', handleSearch);
editForm.addEventListener('submit', handleEditContact);

// Functions
function handleAddContact(e) {
  e.preventDefault();
  const newContact = new Contact(
    e.target.name.value,
    e.target.phone.value,
    e.target.email.value,
    e.target.address.value
  );
  contacts.push(newContact);
  contactForm.reset();
  renderContacts();
}

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm)
  );
  renderContacts(filteredContacts);
}

function renderContacts(contactsToRender = contacts) {
  contactsTableBody.innerHTML = contactsToRender
    .map(
      (contact) => `
          <tr class="contact-row">
              <td>
                  <div class="contact-name">
                      <div class="avatar">${contact.name.charAt(0)}</div>
                      <div class="contact-info">
                          <div class="font-medium">${contact.name}</div>
                      </div>
                  </div>
              </td>
              <td>
                  <div class="contact-info">
                      <div class="contact-detail">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                          </svg>
                          ${contact.phone}
                      </div>
                      <div class="contact-detail">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                              <path d="M22 6l-10 7L2 6"/>
                          </svg>
                          ${contact.email}
                      </div>
                  </div>
              </td>
              <td>
                  <div class="contact-detail">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                      </svg>
                      ${contact.address}
                  </div>
              </td>
              <td>
                  <div class="actions">
                      <button onclick="editContact(${
                        contact.id
                      })" class="icon-button">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          
                                  stroke="currentColor" stroke-width="2">
                                      <path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                  </svg>
                              </button>
                              <button onclick="deleteContact(${
                                contact.id
                              })" class="icon-button delete">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                      <path d="M3 6h18"/>
                                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                  </svg>
                              </button>
                          </div>
                      </td>
                  </tr>
              `
    )
    .join('');
}

function editContact(id) {
  const contact = contacts.find((c) => c.id === id);
  if (contact) {
    document.getElementById('editId').value = contact.id;
    document.getElementById('editName').value = contact.name;
    document.getElementById('editPhone').value = contact.phone;
    document.getElementById('editEmail').value = contact.email;
    document.getElementById('editAddress').value = contact.address;
    editModal.style.display = 'flex';
  }
}

function handleEditContact(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('editId').value);

  contacts = contacts.map((contact) => {
    if (contact.id === id) {
      return {
        ...contact,
        name: e.target.editName.value,
        phone: e.target.editPhone.value,
        email: e.target.editEmail.value,
        address: e.target.editAddress.value,
      };
    }
    return contact;
  });

  editModal.style.display = 'none';
  renderContacts();
}

function deleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  renderContacts();
}

// Close modal when clicking outside
window.onclick = (event) => {
  if (event.target === editModal) {
    editModal.style.display = 'none';
  }
};

// Add some sample contacts
contacts.push(
  new Contact(
    'Md. Najmul Huda',
    '(555) 123-4567',
    'hridoy@example.com',
    '123 Main St, City, State'
  ),
  new Contact(
    'Mynul Islam',
    '(555) 987-6543',
    'islam@example.com',
    '456 Oak Ave, City, State'
  )
);

// Initial render
renderContacts();
