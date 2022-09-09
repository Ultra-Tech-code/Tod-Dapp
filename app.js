import getContract from "./utils/getContract.js";
//+const { ethers: etherjs } = ethers;


/***************************Get All Task******************************* */
async function getTodoList() {
  const contract = getContract();
  try {
    const response = await contract.getTodos();
    const formatted = response.map((item) => {
      return {
        name: item[0],
        description: item[1],
        status: item[2],
      };
    });
    return formatted;
  } catch (error) {
    console.log("error", error);
  }
}

let getTask = document.getElementById('getTask');
getTask.addEventListener('click', async function(e){
    //prevent the normal submission of the form
    e.preventDefault();
  
      let todos = document.getElementById("todos");
      if (todos.style.display === "none") {
        let result = await getTodoList();
        result.forEach((item) => {
          todos.innerHTML += `   
          <li class='my-2'>${item.description}</li>
          <li class='my-2'>${item.status}</li>
          <li class='my-2'>${item.name}</li> <br>`;
        });
        todos.style.display = "block";
      } else {
        todos.style.display = "none";
      }  
})

/****************************CREATE TASK******************************** */

let title = document.getElementById('form-input');
let description = document.getElementById('form-input2');

let addBTN = document.getElementById('add-button');
addBTN.addEventListener('click', function(e){
    //prevent the normal submission of the form
    e.preventDefault();
    
    create(title.value, description.value);
    console.log(title.value, description.value);  
})

async function create(create, description){
  const contract = getContract(true);
  const txn = await contract.createTodo(create, description);
  console.log(txn, "res------")
}

/**************************Complete Task***************************** */
let id = document.getElementById('update-todo');

let update = document.getElementById('update-Task');
update.addEventListener('click', function(e){
    //prevent the normal submission of the form
    e.preventDefault();
    
    let res = updateTodoStatus(id.value);
    console.log(res);  
})

async function updateTodoStatus(updateid){
  const contract = getContract(true);
  // console.log(contract, "gvgvvv")
  const txn = await contract.updateTodoStatus(updateid);
  return txn;
}



//upddate todo 
// async function updateTodo(index, _newtitle, _newDescription){
//   const contract = getContract(true);
//   // console.log(contract, "gvgvvv")
//   const txn = await contract.updateTodoStatus(34);
//   console.log(txn, "res------")

// }