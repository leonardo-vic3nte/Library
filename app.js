/* Selectors */
const cardsContainer = document.querySelector(".cards-container");
const bookForm = document.querySelector("#add-book-form");
const errorMsg = document.querySelector(".error");
const addBookBtn = document.querySelector(".add-book-btn");
const formModal = document.querySelector(".form-modal");

const library = [];

function Book(title, author, nrPages, isRead) {
	this.author = author;
	this.title = title;
	this.nrPages = nrPages;
	this.isRead = isRead;
}

function isInLibrary(bookToAdd) {
	return library.some(
		(bookInLibrary) => bookInLibrary.title === bookToAdd.title
	);
}

function displayBook(book) {
	cardsContainer.appendChild(book);
}

function createBookHTML(book) {
	const container = document.createElement("div");
	container.classList.add("card");

	const cardTitle = document.createElement("h2");
	cardTitle.textContent = "Title";

	const title = document.createElement("p");
	title.textContent = book.title;
	title.classList.add("book-title");
	container.appendChild(cardTitle);
	container.appendChild(title);

	const cardAuthor = document.createElement("h2");
	cardAuthor.textContent = "Author";
	const author = document.createElement("p");
	author.textContent = book.author;
	container.appendChild(cardAuthor);
	container.appendChild(author);

	const cardNrPages = document.createElement("h2");
	cardNrPages.textContent = "Pages";
	const nrPages = document.createElement("p");
	nrPages.textContent = book.nrPages;
	container.appendChild(cardNrPages);
	container.appendChild(nrPages);

	const readBtn = document.createElement("div");
	readBtn.classList.add("read");
	readBtn.addEventListener("click", toggleReadBtn);
	if (book.isRead === "true") {
		readBtn.textContent = "Read";
		readBtn.classList.add("true");
	} else {
		readBtn.textContent = "Not Read";
	}
	container.appendChild(readBtn);

	const removeBtn = document.createElement("div");
	removeBtn.classList.add("remove");
	removeBtn.textContent = "Remove";
	removeBtn.addEventListener("click", removeCard);
	container.appendChild(removeBtn);

	return container;
}

function createBookObject(event) {
	event.preventDefault();

	const formData = new FormData(event.target);
	const formDataObj = Object.fromEntries(formData.entries());

	const newBook = new Book(
		formDataObj.title,
		formDataObj.author,
		formDataObj.nrPages,
		formDataObj.isRead
	);

	if (isInLibrary(newBook)) {
		errorMsg.classList.add("true");
		return;
	} else {
		errorMsg.classList.remove("true");
		toggleForm();
	}

	library.push(newBook);
	displayBook(createBookHTML(newBook));
}

function toggleReadBtn(event) {
	const readBtn = event.target;

	if (readBtn.classList.contains("true")) {
		readBtn.classList.toggle("true");
		readBtn.innerText = "Not Read";
	} else {
		readBtn.classList.toggle("true");
		readBtn.innerText = "Read";
	}
}

function removeCard(event) {
	currentCard = event.target.parentNode;
	const bookTitle = currentCard.querySelector(
		":scope > .book-title"
	).textContent;
	library.splice(library.findIndex((book) => book.title === bookTitle));
	cardsContainer.removeChild(currentCard);
}

function toggleForm() {
	formModal.classList.toggle("active");
}

bookForm.addEventListener("submit", createBookObject);
addBookBtn.addEventListener("click", toggleForm);
