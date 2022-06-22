let modalAdd = document.getElementById("addNoteModal");
let modalEdit = document.getElementById("editNoteModal");
let overlay = document.querySelector(".overlay");
let cancelEditBtn = document.getElementById("cancelEdit");
let cancelAddBtn = document.getElementById("cancelAdd");
let closeAddSpan = document.getElementById("closeAdd");
let closeEditSpan = document.getElementById("closeEdit");
let addTitleInput = document.getElementById("addTitle");
let editTitleInput = document.getElementById("editTitle");
let addContentInput = document.getElementById("addContent");
let editContentInput = document.getElementById("editContent");
let addErrorParagraph = document.getElementById("addError");
let editErrorParagraph = document.getElementById("editError");

function openAddModal() {
	modalAdd.classList.add("active");
	overlay.classList.add("active");

	cancelAddBtn.onclick = () => {
		closeAddBtnFunction();
	};
	closeAddSpan.onclick = () => {
		closeAddBtnFunction();
	};
}

function closeAddBtnFunction() {
	modalAdd.classList.remove("active");
	modalEdit.classList.remove("active");
	overlay.classList.remove("active");
	addTitleInput.value = "";
	addContentInput.value = "";
	addErrorParagraph.innerHTML = "";
}

function saveNewNote() {
	const titleString = document.getElementById("addTitle").value;
	const contentString = document.getElementById("addContent").value;
	const noteData = {
		title: titleString,
		content: contentString,
	};
	if (titleString) {
		addNote(noteData)
			.then((response) => {
				if (response.ok) {
					closeAddBtnFunction();
					response.json().then((json) => {
						var newNoteId = json._id;
						updatesNotesTable(newNoteId);
					});
				} else {
					response.text().then((error) => {
						addErrorParagraph.innerHTML = error;
					});
				}
			})
			.catch((error) => {
				addErrorParagraph.innerHTML = error;
			});
	} else {
		addErrorParagraph.innerHTML = "Fill In The Title At Least!";
	}
}

function openEditModal(noteId) {
	modalEdit.classList.add("active");
	overlay.classList.add("active");

	cancelEditBtn.onclick = () => {
		closeAddBtnFunction();
	};
	closeEditSpan.onclick = () => {
		closeAddBtnFunction();
	};

	getNoteById(noteId).then((dataNote) => {
		modalEdit.setAttribute("noteid", noteId);

		editTitleInput.value = dataNote.title;
		editContentInput.value = dataNote.content;
	});
}

function saveEditNote() {
	const id = modalEdit.getAttribute("noteid");
	const titleString = document.getElementById("editTitle").value;
	const contentString = document.getElementById("editContent").value;
	const noteData = {
		_id: id,
		title: titleString,
		content: contentString,
	};
	if (titleString) {
		updateNote(noteData)
			.then((response) => {
				if (response.ok) {
					closeAddBtnFunction();
					updatesNotesTable(id);
				} else {
					response.text().then((error) => {
						editErrorParagraph.innerHTML = error;
					});
				}
			})
			.catch((error) => {
				editErrorParagraph.innerHTML = error;
			});
	} else {
		editErrorParagraph.innerHTML = "Fill In The Title At Least!";
	}
}
