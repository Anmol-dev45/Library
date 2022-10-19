const newBookElement = document.querySelector('#new-book');
const addBookElement = document.querySelector('#add-book');




const backdrop = document.querySelector('.backdrop')
const formSection = document.querySelector('.form-control');
const bookElement = document.querySelector('.body')
const ReadElement = document.querySelector('#read-status')

let myLibrary = [];




newBookElement.addEventListener('click', displayForm)
addBookElement.addEventListener('click', addBook)

backdrop.addEventListener('click', () => {
    formSection.setAttribute("style", "display: none;")
    backdrop.setAttribute("style", "display: none;")


})



function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

}



bookElement.addEventListener('click', (event) => {
    let dataId = event.target.dataset;
    if (dataId.read) {
        changeReadStatus(myLibrary[+dataId.read])
        return;
    }
    if (dataId.remove) {
        deleteBook(myLibrary[+dataId.remove]);
        return
    }


})

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read)
    myLibrary.push(book);
}


function displayBooks() {
    let index = 0;
    RemoveAllCard()
    myLibrary.forEach(book => {

        const bookBox = document.createElement('div')
        bookBox.classList.add("card");
        bookBox.appendChild(createCardElement("p", null, `"${book.title}"`))
        bookBox.appendChild(createCardElement("p", null, `By ${book.author}`))
        bookBox.appendChild(createCardElement("p", null, `${book.pages} pages`))
        const readButton = createCardElement("button", "read", `${book.read ? "Read" : "Not Read"}`)
        const removeButton = createCardElement("button", "remove", "Remove")
        readButton.dataset.read = `${index}`
        removeButton.dataset.remove = `${index}`
        bookBox.append(readButton, removeButton)


        bookElement.appendChild(bookBox)





        index++
    })
}
function takeInputValue(id) {
    const inputData = document.getElementById(id).value;
    return inputData;
}
function takeDataForm() {
    let title = takeInputValue("title")
    let author = takeInputValue("author")
    let pages = takeInputValue("pages")
    let read;
    if (ReadElement.checked) {
        read = true;
    }
    else {
        read = false
    }
    addBookToLibrary(title, author, pages, read)
    displayBooks()

}
function createCardElement(elm, classname, content) {
    const element = document.createElement(elm);
    element.innerHTML = content;
    element.classList.add(classname);
    return element;
}

function displayForm() {
    formSection.style.display = "flex";
    backdrop.style.display = "block";
}


// displayBooks()
function addBook() {
    backdrop.setAttribute("style", "display: none;")
    formSection.setAttribute("style", "display: none;");
    takeDataForm();
    formSection.reset();
}

function changeReadStatus(book) {
    if (book.read) {
        book.read = false
    }
    else {
        book.read = true
    }
    displayBooks()
}
function RemoveAllCard() {
    const Remcards = document.querySelectorAll('.card')
    Remcards.forEach(node => {
        bookElement.removeChild(node);

    })

}

function deleteBook(book) {
    myLibrary.splice(book, 1)

    displayBooks()
}