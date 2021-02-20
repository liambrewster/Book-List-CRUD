// Book Class: A Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}
// UI Class: 

class UI {
    static displayBooks() {
        const StoredBooks = store.getBooks();
        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = ` <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000)

    }
}

// Store Class: handles Local Storage

class store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        const books = store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(isbn) {
        const books = store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Events: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Events: Add Books

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate data then action
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Missing Data! please fill in all Fields', 'danger')
    } else {
        const book = new Book(title, author, isbn);

        UI.addBookToList(book);
        store.addBook(book);

        //Show Success
        UI.showAlert(`Great Book! ${book.title} has been added`, 'success');

        //Reset Form
        document.getElementById("book-form").reset();
    }


});

// Events : Remove Books

document.querySelector('#book-list').addEventListener('click', (e) => {
    console.log(e);
    UI.deleteBook(e.target);
    store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    //Show Success
    UI.showAlert(`${e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent} has been deleted`, 'info')
});