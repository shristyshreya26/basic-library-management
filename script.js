// Select elements
const bookForm = document.getElementById('book-form');
const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const booksList = document.getElementById('books');
const issuedBooksList = document.getElementById('issued-books');

// Initialize arrays to store books and issued books
let library = [];
let issuedBooks = [];

// Function to render the book list
function renderBooks() {
    // Clear the current list
    booksList.innerHTML = '';

    // Add each book as a list item
    library.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${book.title} by ${book.author}</span>
            <button class="issue-button" data-index="${index}">Issue</button>
            <button class="remove-button" data-index="${index}">Remove</button>
        `;
        booksList.appendChild(li);
    });

    // Attach event listeners to dynamically created buttons
    const issueButtons = document.querySelectorAll('.issue-button');
    issueButtons.forEach((button) => {
        button.addEventListener('click', () => {
            issueBook(button.getAttribute('data-index'));
        });
    });

    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            removeBook(button.getAttribute('data-index'));
        });
    });
}

// Function to render the issued books list
function renderIssuedBooks() {
    // Clear the current list
    issuedBooksList.innerHTML = '';

    // Add each issued book as a list item
    issuedBooks.forEach((issued, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${issued.book.title} by ${issued.book.author} (Issued to: ${issued.borrower})</span>
            <button class="return-button" data-index="${index}">Return</button>
        `;
        issuedBooksList.appendChild(li);
    });

    // Attach event listeners to dynamically created buttons
    const returnButtons = document.querySelectorAll('.return-button');
    returnButtons.forEach((button) => {
        button.addEventListener('click', () => {
            returnBook(button.getAttribute('data-index'));
        });
    });
}

// Function to handle adding a book
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get book details from the form inputs
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();

    // Add the new book to the library array
    if (title && author) {
        library.push({ title, author });

        // Clear the form inputs
        bookTitleInput.value = '';
        bookAuthorInput.value = '';

        // Re-render the book list
        renderBooks();
    }
});

// Function to remove a book from the library
function removeBook(index) {
    library.splice(index, 1); // Remove the book at the given index
    renderBooks(); // Re-render the book list
}

// Function to issue a book
function issueBook(index) {
    const borrower = prompt('Enter the name of the borrower:');
    if (borrower) {
        // Move the book to the issuedBooks list
        issuedBooks.push({ book: library[index], borrower });
        library.splice(index, 1); // Remove from the library

        // Re-render both lists
        renderBooks();
        renderIssuedBooks();
    }
}

// Function to return a book
function returnBook(index) {
    // Move the book back to the library
    library.push(issuedBooks[index].book);
    issuedBooks.splice(index, 1); // Remove from issued books

    // Re-render both lists
    renderBooks();
    renderIssuedBooks();
}

// Initial rendering of lists
renderBooks();
renderIssuedBooks();
