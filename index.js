const button = document.querySelector(".add");
const input = document.querySelector(".input");
const list = document.querySelector(".main__list");

let arr = JSON.parse(localStorage.getItem("To-Do list")) || [];

if (arr.length) {
  arr.forEach((obj) => addList(obj.value, false,obj));
}

function addList(text, save = true,obj) {
  input.value = "";
  const newElement = document.createElement("li");
  const buttonDiv = document.createElement("div");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const completeBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  completeBtn.textContent = "V";

  span.textContent = text;
  newElement.appendChild(span);
  buttonDiv.appendChild(completeBtn);
  buttonDiv.appendChild(deleteBtn);
  buttonDiv.className = "button-container";

  newElement.appendChild(buttonDiv);
  list.appendChild(newElement);

  if (save) {
    arr.push({
      value: text,
      done: false});
    localStorage.setItem("To-Do list", JSON.stringify(arr));
  }

  if(obj.done){
    span.classList.toggle("complete")
  }

  deleteBtn.addEventListener("click", () => {
    newElement.remove();
    arr = arr.filter((obj) => obj.value !== text);
    localStorage.setItem("To-Do list", JSON.stringify(arr));
  });

  completeBtn.addEventListener("click", () => {
    if(span.classList.toggle("complete")){
      arr.forEach((obj) => {
        if(obj.value === text){
          obj.done = true
        }
      })
    localStorage.setItem("To-Do list", JSON.stringify(arr));
    } else { 
      arr.forEach((obj) => {
        if(obj.value === text){
          obj.done = false
        }
      })
    localStorage.setItem("To-Do list", JSON.stringify(arr));
    }
  });

}



button.addEventListener("click", () => {
  if (input.value.trim()) {
    addList(input.value);
    console.log("1")
    input.value = "";
    console.log("2")

  } else {
    alert("Please insert text");
  }
});