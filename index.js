// index.js
const argv = require('yargs').argv;
const {hideBin} = require("yargs/helpers")

// путь к функциям 
const contacts = require("./contacts")



const invokeAction = async ({ action, contactId, name, email, phone }) => {
  switch (action) {

    // все контакты получаем
    case 'list':
    // получаем все контакты
    const allContacts = await contacts.listContacts()
    // результат в консоль
    return console.table(allContacts)


// получить контакт по id
    case 'get':
        const oneContact = await contacts.getContactById(contactId)
        return console.log(oneContact)


    //  добавить контакт
    case 'add':
    const newContact =  await contacts.addContact({name, email, phone})
   return console.log(newContact)



    case 'remove':
     const deleteContact =  await contacts.removeContact()
     return console.log(deleteContact)

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// передаём обьект со свойством list , получить все контакты

invokeAction({action: "list"})

//  получить контакт по id
invokeAction({action: "get", contactId : "qdggE76Jtbfd9eWJHrssH"})


// добавить контакт
invokeAction({action: "add", name : "Book for you1", email: "D. Moroz1", phone : "Book for you1"})


//  удалить контакт по id
invokeAction({action: "remove", contactId : "qdggE76Jtbfd9eWJHrssH!"})




