function updatesNotesTable(noteId, noteTitle) {
	let table = document.getElementById("notesTable");
	let rowCount = table.rows.length;
	while (--rowCount) {
		table.deleteRow(rowCount);
	}
	getNotes(noteTitle)
		.then((data) => {
			data.forEach((note) => {
				let row = table.insertRow(1);
				let cell0 = row.insertCell(0);
				let cell1 = row.insertCell(1);
				let cell2 = row.insertCell(2);
				let cell3 = row.insertCell(3);
				row.setAttribute("id", note._id);
				cell0.innerHTML = note.title;
				cell1.innerHTML = note.content;
				cell2.innerHTML = note.updatedDate;
				cell3.classList.add("images");
				cell3.innerHTML = `<img onclick="openEditModal('${note._id}')" src="images/edit.png"> <img src="images/delete.png" onclick="confirmDeleteNote('${note._id}')">`;
			});
		})
		.then(() => {
			if (noteId) {
				let row = document.getElementById(noteId);
				row.classList.add("updated");
				setTimeout(() => {
					row.classList.remove("updated");
				}, 5000);
			}
		});
}

function searchNotes() {
	let searchInputValue = document.getElementById("searchInput").value;
	updatesNotesTable(undefined, searchInputValue);
}

function confirmDeleteNote(noteId) {
	let action = confirm("Are You Sure That You Want To Delete This Note?");
	if (action) {
		deleteNote(noteId).then(() => {
			updatesNotesTable();
		});
	}
}
