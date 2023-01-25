var listGroup = document.querySelector(".list-group");

document.getElementById("form-container").addEventListener("submit", addItem);

listGroup.addEventListener("click", deleteItemLister);

document.getElementById("filter-items").addEventListener("keyup", filterItems);

function addItem(e) {
  e.preventDefault();
  var newItem = document.getElementById("inputItem").value;
  var newLi = document.createElement("li");

  newLi.classList.add("item-list-group");

  newLi.appendChild(document.createTextNode(newItem));

  //   Creating a button
  var deleteBtn = document.createElement("button");

  deleteBtn.classList.add("delete-btn");

  deleteBtn.appendChild(document.createTextNode("X"));

  newLi.appendChild(deleteBtn);

  listGroup.appendChild(newLi);

  // listGroup.textContent = "No left";

  document.getElementById("form-container").reset();
}

function deleteItemLister(e) {
  if (e.target.classList.contains("delete-btn")) {
    if (
      confirm(
        `Are you sure to delete ${e.target.parentElement.firstChild.textContent.trim()}`
      )
    ) {
      var li = e.target.parentElement;
      listGroup.removeChild(li);
    }
  }
}

function filterItems(e) {
  // Converting text to lowercase
  var text = e.target.value.toLowerCase();
  //   Getting all list items
  var items = listGroup.getElementsByTagName("li");
  //   Convert list of items to an array
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLocaleLowerCase().indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
