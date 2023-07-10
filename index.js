const { hideBin } = require('yargs/helpers');
const argv = require('yargs').argv;
const contacts = require('./contacts');

const invokeAction = async ({ action, contactId, name, email, phone }) => {
  switch (action) {
    // получаем все контакты
    case 'list':
        const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    // получаем по ID контакт
    case 'get':
      const oneContact = await contacts.getContactById(contactId);
      console.log(oneContact);
      break;
//    добавить контакт
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
// удалить контакт по ID
    case 'remove':
      const removeResult = await contacts.removeContact(contactId);
   console.log(removeResult)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};
// тут определяем тип команды(list, get, add, remove )
const command = argv.action;

// argv  объект, который содержит аргументы командной строки, переданные при запуске скрипта. argv.id обращается к значению аргумента с именем id.
const contactId = argv.id;

// прочитав значение из командной строки передаём их в функцию invokeAction 
if (command) {
  invokeAction({ action: command, contactId, name: argv.name, email: argv.email, phone: argv.phone });
} else {
  console.log('Please provide a valid command.');
}


// Удаление через код, а не через строку командную
// invokeAction({ action: 'list' })

// invokeAction({ action: 'get', contactId: 'qdggE76Jtbfd9eWJHrssH' })

// invokeAction({
//   action: 'add',
//   name: 'Volodymyr',
//   email: 'noni@gmail.com',
//   phone: '123456789'
// })

// invokeAction({ action: 'remove', contactId: 1 })