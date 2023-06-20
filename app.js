const library = [];

function isInLibrary(book) {
	return library.some((i) => i.title === book.title);
}

function Book(title, author, nrPages, read) {
	this.title = title;
	this.author = author;
	this.nrPages = nrPages;
	this.read = read;

	if (!isInLibrary(this)) {
		library.push(this);
	}
}

function createBookCard(book) {
	const container = document.createElement("div");
	container.classList.add("card");

	const cardTitle = document.createElement("h2");
	cardTitle.textContent = "Title";
	const title = document.createElement("p");
	title.textContent = book.title;
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
	if (book.read) {
		readBtn.textContent = "Read";
		readBtn.classList.add("true");
		readBtn.classList.remove("false");
	} else {
		readBtn.textContent = "Not Read";
		readBtn.classList.add("false");
		readBtn.classList.remove("true");
	}
	container.appendChild(readBtn);

	const removeBtn = document.createElement("div");
	removeBtn.classList.add("remove");
	removeBtn.textContent = "Remove";
	container.appendChild(removeBtn);

	const cardsContainer = document.querySelector(".cards-container");
	cardsContainer.appendChild(container);
}

function displayBooks() {
	library.forEach((book) => createBookCard(book));
}

displayBooks();
