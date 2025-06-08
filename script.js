const saveButton = document.getElementById("inputTaskButton")
const parentTaskListEle = document.getElementsByClassName("task-list")

let taskId=0;
function generateTaskId(){
    return ++taskId;
}


saveButton.addEventListener('click', ()=>{
    const taskId = generateTaskId()
    const inputEle = document.getElementById('inputTaskArea')
    const input = inputEle.value
    let taskDiv = document.createElement('div');
    taskDiv.classList.add("alert","alert-light","d-flex","flex-row","align-items-center");
    taskDiv.setAttribute('id',`task-div-${taskId}`)

    let checkboxEle = document.createElement('input');
    checkboxEle.classList.add("form-check-input", "me-2")
    checkboxEle.setAttribute('type','checkbox')
    checkboxEle.setAttribute('onchange',`myfunc(${taskId})`)
    checkboxEle.setAttribute('id',`checkbox-${taskId}`)

    let divEle = document.createElement('div');
    divEle.classList.add("text-start", "me-auto")
    divEle.textContent=input
    divEle.setAttribute('id',`div-ele-${taskId}`)

    let editSaveButton = document.createElement('button');
    editSaveButton.classList.add("btn","btn-success","btn-sm","me-2")
    editSaveButton.setAttribute('type','button')
    editSaveButton.textContent='保存'
    editSaveButton.setAttribute('id',`edit-save-button-${taskId}`)

    let editCancelButton = document.createElement('button');
    editCancelButton.classList.add("btn","btn-secondary","btn-sm","me-2")
    editCancelButton.setAttribute('type','button')
    editCancelButton.textContent='キャンセル'
    editCancelButton.setAttribute('id',`edit-cancel-button-${taskId}`)

    let editButton = document.createElement('button');
    editButton.classList.add("btn","btn-secondary","btn-sm","me-2")
    editButton.setAttribute('type','button')
    editButton.textContent='編集'
    editButton.setAttribute('id',`edit-button-${taskId}`)
    editButton.addEventListener('click',()=>{
        const targetTaskNameEle = document.getElementById(`div-ele-${taskId}`)
        const targetEditButton = document.getElementById(`edit-button-${taskId}`)
        const targetDeleteButton = document.getElementById(`delete-button-${taskId}`)
        targetTaskNameEle.classList.add("d-none")
        targetEditButton.classList.add("d-none")
        targetDeleteButton.classList.add("d-none")
        editCancelButton.classList.remove("d-none")
        editSaveButton.classList.remove("d-none")

        let editDivEle = document.createElement('div');
        editDivEle.classList.add("me-auto")

        let editInputEle = document.createElement('input');
        editInputEle.classList.add("form-control")
        editInputEle.setAttribute('type','text')
        editInputEle.setAttribute('id',`edit-input-area-${taskId}`)
        editInputEle.value = document.getElementById(`div-ele-${taskId}`).textContent

        editCancelButton.addEventListener('click',()=>{
            targetTaskNameEle.classList.remove("d-none")
            targetEditButton.classList.remove("d-none")
            targetDeleteButton.classList.remove("d-none")
            editDivEle.classList.add("d-none")
            editCancelButton.classList.add("d-none")
            editSaveButton.classList.add("d-none")
        })

        editSaveButton.addEventListener('click',()=>{
            const editInputContent = document.getElementById(`edit-input-area-${taskId}`).value
            targetTaskNameEle.textContent = editInputContent
            targetTaskNameEle.classList.remove("d-none")
            targetEditButton.classList.remove("d-none")
            targetDeleteButton.classList.remove("d-none")
            editDivEle.classList.add("d-none")
            editCancelButton.classList.add("d-none")
            editSaveButton.classList.add("d-none")
        })

        editDivEle.appendChild(editInputEle)
        checkboxEle.after(editDivEle)
        editDivEle.after(editCancelButton)
        editCancelButton.after(editSaveButton)
    })

    let deleteButton = document.createElement('button');
    deleteButton.classList.add("btn","btn-danger","btn-sm")
    deleteButton.setAttribute('type','button')
    deleteButton.textContent='削除'
    deleteButton.setAttribute('id',`delete-button-${taskId}`)
    deleteButton.addEventListener('click',()=>{
        const result = window.confirm("本当に削除してもよろしいですか？");
        if(result){
            const targetTaskDiv = document.getElementById(`task-div-${taskId}`)
            targetTaskDiv.remove()
        }
    })



    taskDiv.appendChild(checkboxEle)
    taskDiv.appendChild(divEle)
    taskDiv.appendChild(editButton)
    taskDiv.appendChild(deleteButton)
    parentTaskListEle[0].appendChild(taskDiv)
    inputEle.value=""
})

function myfunc(taskId){
    const targetTaskNameEle = document.getElementById(`div-ele-${taskId}`)
    const checkboxEle = document.getElementById(`checkbox-${taskId}`)
    if(checkboxEle.checked){
        targetTaskNameEle.classList.add("text-decoration-line-through")
    }else{
        targetTaskNameEle.classList.remove("text-decoration-line-through")
    }

    const taskListEle = document.getElementsByClassName("task-list")[0]

    let totalTasks=0
    let completedTasks=0

    for(const task of taskListEle.children){
        totalTasks++
        if(task.children[0].checked){
            completedTasks++;
        }
    }

    const taskCountEle = document.getElementById("task-count")
    taskCountEle.textContent = `全てのタスク：${totalTasks} 完了済み：${completedTasks} 未完了：${totalTasks-completedTasks}`;
}