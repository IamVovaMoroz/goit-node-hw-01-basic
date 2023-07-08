// contacts.js
// импорты
const fs = require("fs").promises
const path = require("path")
const {nanoid} = require('nanoid')

// путь к контактам
 const contactsPath =  path.join(__dirname, "db", "contacts.json");
 console.log(contactsPath)

  const listContacts = async () => {
  
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  }

  const getContactById = async (contactId) => {
    // получаем вначале весь обьект contacts
    const contacts = await listContacts()
    const result = contacts.find(item => item.contactId === contactId)
    return result || null 
  }


  const removeContact = async (contactId) => {
    // получаем вначале весь обьект
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.contactId === contactId)
    if(index === -1){return null}
  // Метод splice() изменяет исходный массив, удаляя элементы, и возвращает массив удаленных элементов. 
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
  }
  


  const addContact = async(data) =>{
    // получили все contacts
    const contacts = await listContacts()
  
  // Проверяем, есть ли уже контакт с указанным name, email, phone, чтобы не добавлять повторно
  const existingContact = contacts.find((contact) => contact.name === data.name && contact.email === data.email && contact.phone === data.phone);
  if (existingContact) {
    console.log('Contact уже существует');
    return null;
  }
  
    // создаем нов Contact. Добавляем id и данные которые приходят 
  const newContact = {
    // 
    id: nanoid(),
    ...data,  }
    // в контакты закидываем контакт
    contacts.push(newContact)
  // перезаписываем все
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  // возвращаем новый контакт
  return newContact
  
  }

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
  }
  