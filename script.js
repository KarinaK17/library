const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
    this.info = function () {
      if (this.read === true) {
        return `${this.title} by ${this.author}, ${this.pages}, already read.`;
      }
      return `${this.title} by ${this.author}, ${this.pages}, not read yet.`;
    };
  }
}

const library = document.querySelector(".library");

Book.prototype.changeread = function () {
  if (this.read === true) {
    this.read = false;
  } else {
    this.read = true;
  }
  console.log("prototype method");
};

console.log(myLibrary.length);

function addBookToLibrary(newBook) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("id", `card-number-${Date.now()}`);
  library.appendChild(bookCard);
  bookCard.style.background = `rgba(${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${0.5}`;

  const title = document.createElement("p");
  bookCard.appendChild(title);
  title.textContent = `Title: ${newBook.title}`;

  const author = document.createElement("p");
  bookCard.appendChild(author);
  author.textContent = `Author: ${newBook.author}`;

  const pages = document.createElement("p");
  bookCard.appendChild(pages);
  pages.textContent = `Number of pages: ${newBook.pages}`;

  const read = document.createElement("p");
  bookCard.appendChild(read);
  read.textContent = `Already read: ${newBook.read}`;

  const info = document.createElement("p");
  bookCard.appendChild(info);
  info.textContent = `Info: ${newBook.info()}`;

  const changeStatus = document.createElement("button");
  bookCard.appendChild(changeStatus);
  changeStatus.textContent = "Change status (read or not)";
  changeStatus.addEventListener("click", () => {
    newBook.changeread();
    info.textContent = `Info: ${newBook.info()}`;
    read.textContent = `Already read: ${newBook.read}`;
    console.log(`inside a change-status button ${newBook.read}`);
  });

  const deleteBook = document.createElement("button");
  bookCard.appendChild(deleteBook);
  deleteBook.textContent = "Delete from the library";
  deleteBook.addEventListener("click", () => {
    library.removeChild(bookCard);
  });
}

const openButton = document.querySelector(".open-form");
openButton.addEventListener("click", () => {
  document.getElementById("myForm").style.display = "block";
});

const closeButton = document.querySelector(".close-form");
closeButton.addEventListener("click", () => {
  document.getElementById("myForm").style.display = "none";
});

const form = document.querySelector("form");

const addFromForm = (e) => {
  e.preventDefault();
  const checkVal = form.checkValidity();
  form.reportValidity();

  if (checkVal) {
    const formBook = new Book(
      document.getElementById("title-form").value,
      document.getElementById("author-form").value,
      document.getElementById("pages-form").value,
      document.getElementById("read-form").checked
    );
    myLibrary.push(formBook);

    console.log(myLibrary, "after form submition");
    document.querySelector("form").reset();
    addBookToLibrary(formBook);
  }
  //   add if you want the form to dissapear after submitting
  //   document.getElementById("myForm").style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".add").addEventListener("click", addFromForm);
});
