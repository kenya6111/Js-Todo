const saveButton = document.getElementById('inputTaskButton');
const parentTaskListEle = document.getElementsByClassName('task-list');

let taskId = 0;
function generateTaskId() {
	return ++taskId;
}

saveButton.addEventListener('click', () => {
	const taskId = generateTaskId();
	const inputEle = document.getElementById('inputTaskArea');
	const input = inputEle.value;
	if (!input) return;
	const taskContainer = createTaskContainer(taskId);
	const checkbox = createCheckBox(taskId);
	const taskTitle = createTaskTitle(taskId, input);
	const deleteButton = createDeleteButton(taskId);
	const editSaveButton = createEditSaveButton(taskId);
	const editCancelButton = createEditCancelButton(taskId);
	const editButton = createEditButton(taskId);
	editButton.addEventListener('click', () => {
		const targetTaskNameEle = document.getElementById(`div-ele-${taskId}`);
		const targetEditButton = document.getElementById(`edit-button-${taskId}`);
		const targetDeleteButton = document.getElementById(`delete-button-${taskId}`);
		let editDivEle = createEditDivEle(taskId);
		toggleEditButton(true);

		editCancelButton.addEventListener('click', () => {
			toggleEditButton(false);
		});

		editSaveButton.addEventListener('click', () => {
			const editInputContent = document.getElementById(`edit-input-area-${taskId}`).value;
			targetTaskNameEle.textContent = editInputContent;
			toggleEditButton(false);
		});

		checkbox.after(editDivEle);
		editDivEle.after(editCancelButton);
		editCancelButton.after(editSaveButton);

		function toggleEditButton(isEditting) {
			targetTaskNameEle.classList.toggle('d-none', isEditting);
			targetEditButton.classList.toggle('d-none', isEditting);
			targetDeleteButton.classList.toggle('d-none', isEditting);
			editDivEle.classList.toggle('d-none', !isEditting);
			editCancelButton.classList.toggle('d-none', !isEditting);
			editSaveButton.classList.toggle('d-none', !isEditting);
		}
	});

	taskContainer.appendChild(checkbox);
	taskContainer.appendChild(taskTitle);
	taskContainer.appendChild(editButton);
	taskContainer.appendChild(deleteButton);
	parentTaskListEle[0].appendChild(taskContainer);
	inputEle.value = '';
});

function check(taskId) {
	const targetTaskNameEle = document.getElementById(`div-ele-${taskId}`);
	const checkbox = document.getElementById(`checkbox-${taskId}`);
	if (checkbox.checked) {
		targetTaskNameEle.classList.add('text-decoration-line-through');
	} else {
		targetTaskNameEle.classList.remove('text-decoration-line-through');
	}

	const taskListEle = document.getElementsByClassName('task-list')[0];

	let totalTasks = 0;
	let completedTasks = 0;

	for (const task of taskListEle.children) {
		totalTasks++;
		if (task.children[0].checked) {
			completedTasks++;
		}
	}

	const taskCountEle = document.getElementById('task-count');
	taskCountEle.textContent = `全てのタスク：${totalTasks} 完了済み：${completedTasks} 未完了：${
		totalTasks - completedTasks
	}`;
}

function createTaskContainer(taskId) {
	let taskDiv = document.createElement('div');
	taskDiv.classList.add('alert', 'alert-light', 'd-flex', 'flex-row', 'align-items-center');
	taskDiv.setAttribute('id', `task-div-${taskId}`);
	return taskDiv;
}

function createCheckBox(taskId) {
	let checkbox = document.createElement('input');
	checkbox.classList.add('form-check-input', 'me-2');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('onchange', `check(${taskId})`);
	checkbox.setAttribute('id', `checkbox-${taskId}`);
	return checkbox;
}
function createTaskTitle(taskId, input) {
	let taskTitle = document.createElement('div');
	taskTitle.classList.add('text-start', 'me-auto');
	taskTitle.textContent = input;
	taskTitle.setAttribute('id', `div-ele-${taskId}`);
	return taskTitle;
}
function createEditSaveButton(taskId) {
	let editSaveButton = document.createElement('button');
	editSaveButton.classList.add('btn', 'btn-success', 'btn-sm', 'me-2');
	editSaveButton.setAttribute('type', 'button');
	editSaveButton.textContent = '保存';
	editSaveButton.setAttribute('id', `edit-save-button-${taskId}`);
	return editSaveButton;
}
function createEditCancelButton(taskId) {
	let editCancelButton = document.createElement('button');
	editCancelButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'me-2');
	editCancelButton.setAttribute('type', 'button');
	editCancelButton.textContent = 'キャンセル';
	editCancelButton.setAttribute('id', `edit-cancel-button-${taskId}`);
	return editCancelButton;
}

function createEditButton(taskId, editSaveButton, editCancelButton) {
	let editButton = document.createElement('button');
	editButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'me-2');
	editButton.setAttribute('type', 'button');
	editButton.textContent = '編集';
	editButton.setAttribute('id', `edit-button-${taskId}`);
	return editButton;
}

function createDeleteButton(taskId) {
	let deleteButton = document.createElement('button');
	deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
	deleteButton.setAttribute('type', 'button');
	deleteButton.textContent = '削除';
	deleteButton.setAttribute('id', `delete-button-${taskId}`);
	deleteButton.addEventListener('click', () => {
		const result = window.confirm('本当に削除してもよろしいですか？');
		if (result) {
			const targetTaskContainer = document.getElementById(`task-div-${taskId}`);
			targetTaskContainer.remove();
		}
	});
	return deleteButton;
}

function createEditDivEle(taskId) {
	let editDivEle = document.createElement('div');
	editDivEle.classList.add('me-auto');

	let editInputEle = document.createElement('input');
	editInputEle.classList.add('form-control');
	editInputEle.setAttribute('type', 'text');
	editInputEle.setAttribute('id', `edit-input-area-${taskId}`);
	editInputEle.value = document.getElementById(`div-ele-${taskId}`).textContent;

	editDivEle.appendChild(editInputEle);
	return editDivEle;
}
