var modal = document.getElementById("myModal");
var body = document.getElementById("m-body");
var header = document.getElementById("m-header");
var footer = document.getElementById("m-footer");
let modalClose = document.getElementById("close-modal");

function showModal(h, b, f) {
  body.innerHTML = b;
  header.innerHTML = h;
  footer.innerHTML = f;
  modal.style.display = "block";
}

function hideModal() {
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
modalClose.onclick = function () {
  hideModal();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    hideModal();
  }
};

document.onload = initialize();

function initialize() {
  var info1 = document.getElementById("info-1");
  var info2 = document.getElementById("info-2");
  var info3 = document.getElementById("info-3");

  info2.style.display = "none";
  info3.style.display = "none";
}

function showInfo() {
  var state = document.getElementById("button1").innerHTML;

  switch (state) {
    case "Create Process":
      showModal(
        "Create Process",
        "A new process has started execution and has gone to the Ready state.",
        "Process starts and goes to Ready state"
      );
      break;

    case "Allocate CPU to process":
      showModal(
        "Allocate CPU to process",
        "The OS allocates the CPU to this Process which is currently in Ready state.",
        "Process will move from Ready state to Running state"
      );
      break;

    case "Process Finishes Execution":
      showModal(
        "Process Finishes Execution",
        "The process has finished execution and so the OS has removed this process from running state.",
        "Process will exit from Running state"
      );
      break;

    case "Allocate Resource to Process":
      showModal(
        "Allocate Resource to Process",
        "This Process gains access to its needed resources and moves to the Ready queue",
        "Process will move from Blocked state to Ready state"
      );
      break;
  }
}

function showInfo2() {
  showModal(
    "Process Requested Resources",
    "This process requests a resource and goes into Blocked state until the OS allocates it needed resource.",
    "Process will move from Running state to Blocked state"
  );
}

function showInfo3() {
  showModal(
    "Timeslice Occurs",
    "This Process has used up its allocated timeslice and moves back to the Ready queue.",
    "Process will move from Running state to Ready state."
  );
}
