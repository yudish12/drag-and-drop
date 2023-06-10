// Selecting elements using DOM
const draggables = document.querySelectorAll(".items");
const listOne = document.querySelector(".left");
const listTwo = document.querySelector(".right");
const resetButton = document.querySelector(".btn");

//adding and removing dragging class to change opacity and background of item when its dragged

draggables.forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

// creating an array of both divs so that it becomes easy to add event listner and order of items

const containers = [listOne, listTwo];

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();

    //getting next element of dragged item and inserting our current element before it if its not there element will append at end only

    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

// this function finds the element within a given container that is closest to a specific vertical position (y), among all the elements with the class "items" that are not being dragged.It is hence used for deciding order of the item

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".items:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

//reset button functionality
resetButton.addEventListener("click", resetContainers);

function resetContainers() {
  const items = document.querySelectorAll(".items");

  items.forEach((item) => {
    listOne.appendChild(item);
  });
}
