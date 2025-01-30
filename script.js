const READY_STATE = "Ready";
const RUNNING_STATE = "Running";
const BLOCKED_STATE = "Blocked";
const NOT_STARTED = "Process Not Yet Started";

const START_TOP_POS = 0;
const START_LEFT_POS = -300;
const END_TOP_POS = 0;
const END_LEFT_POS = 750;
const READY_TOP_POS = 0;
const READY_LEFT_POS = 0;
const RUNNING_TOP_POS = 0;
const RUNNING_LEFT_POS = 400;
const BLOCKED_TOP_POS = 300;
const BLOCKED_LEFT_POS = 200;

const NORMAL_STATE_COLOR = "#9c27b0";
const CURRENT_STATE_COLOR = "#004d40";
const STATE_CHANGING_COLOR = "#E65100";
const NORMAL_HEADER_COLOR = "#00838f";
const ALERT_HEADER_COLOR = "#880E4F";

const readyState = document.getElementById("ready-state");
const runningState = document.getElementById("running-state");
const blockedState = document.getElementById("blocked-state");
const animationState = document.getElementById("animation-state");
const buttonContainer = document.getElementById("button-container");

const animationInput = document.getElementById("animation-input");

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

var current_state = NOT_STARTED;

displayNotStarted();

function buttonClick() {
  if (current_state == NOT_STARTED) {
    startProcess();
  } else if (current_state == READY_STATE) {
    animate(
      READY_LEFT_POS,
      READY_TOP_POS,
      RUNNING_LEFT_POS,
      RUNNING_TOP_POS,
      displayRunningState
    );
  } else if (current_state == RUNNING_STATE) {
    processExecuted();
  } else if (current_state == BLOCKED_STATE) {
    animate(
      BLOCKED_LEFT_POS,
      BLOCKED_TOP_POS,
      READY_LEFT_POS,
      READY_TOP_POS,
      displayReadyState
    );
  }
}

function hideRunningButtons() {
  document.getElementById("info-2").style.display = "none";
  document.getElementById("info-3").style.display = "none";
  button2.style.display = "none";
  button3.style.display = "none";
}

function showRunningButtons() {
  document.getElementById("info-2").style.display = "block";
  document.getElementById("info-3").style.display = "block";
  button2.style.display = "block";
  button3.style.display = "block";
}

function startProcess() {
  var display = setInterval(frame, 40);
  var opacity = 0.5;
  animationState.innerHTML = "Process is Starting.";
  animationState.style.left = START_LEFT_POS;
  animationState.style.top = START_TOP_POS;
  animationState.style.display = "block";
  animationState.style.opacity = opacity;
  function frame() {
    if (opacity >= 1) {
      clearInterval(display);
      animationState.innerHTML = "Process.....";
      animate(
        START_LEFT_POS,
        START_TOP_POS,
        READY_LEFT_POS,
        READY_TOP_POS,
        displayReadyState
      );
    }
    opacity += 0.01;
    animationState.style.opacity = opacity;
  }
}

function processExecuted() {
  // hide buttons and then show the animation so that user can't forcly push buttons
  hideRunningButtons();
  animate(
    RUNNING_LEFT_POS,
    RUNNING_TOP_POS,
    END_LEFT_POS,
    END_TOP_POS,
    processExecutedCallback
  );
}

function processExecutedCallback() {
  var display = setInterval(frame, 40);
  var opacity = 1;
  animationState.style.display = "block";
  animationState.innerHTML = "Process Ending";
  animationState.style.opacity = opacity;
  function frame() {
    if (opacity <= 0) {
      clearInterval(display);
      displayNotStarted();
      animationState.innerHTML = "Process.....";
    }
    opacity -= 0.01;
    animationState.style.opacity = opacity;
  }
}

function displayNotStarted() {
  setState(NOT_STARTED);

  readyState.style.backgroundColor = NORMAL_STATE_COLOR;
  runningState.style.backgroundColor = NORMAL_STATE_COLOR;
  blockedState.style.backgroundColor = NORMAL_STATE_COLOR;

  button1.innerHTML = "Create Process";

  hideRunningButtons();
}

function displayReadyState() {
  setState(READY_STATE);

  readyState.style.backgroundColor = CURRENT_STATE_COLOR;
  runningState.style.backgroundColor = NORMAL_STATE_COLOR;
  blockedState.style.backgroundColor = NORMAL_STATE_COLOR;

  button1.innerHTML = "Allocate CPU to process";

  hideRunningButtons();
}

function displayRunningState() {
  setState(RUNNING_STATE);
  readyState.style.backgroundColor = NORMAL_STATE_COLOR;
  runningState.style.backgroundColor = CURRENT_STATE_COLOR;
  blockedState.style.backgroundColor = NORMAL_STATE_COLOR;
  button1.innerHTML = "Process Finishes Execution";

  showRunningButtons();
}

function displayBlockedState() {
  setState(BLOCKED_STATE);

  readyState.style.backgroundColor = NORMAL_STATE_COLOR;
  runningState.style.backgroundColor = NORMAL_STATE_COLOR;
  blockedState.style.backgroundColor = CURRENT_STATE_COLOR;

  button1.innerHTML = "Allocate Resource to Process";

  hideRunningButtons();
}

function button2Click() {
  animate(
    RUNNING_LEFT_POS,
    RUNNING_TOP_POS,
    BLOCKED_LEFT_POS,
    BLOCKED_TOP_POS,
    displayBlockedState
  );
}

function button3Click() {
  animate(
    RUNNING_LEFT_POS,
    RUNNING_TOP_POS,
    READY_LEFT_POS,
    READY_TOP_POS,
    displayReadyState
  );
}

function animate(beginLeftPos, beginTopPos, endLeftPos, endTopPos, callback) {
  setAlertStateColor(true);

  setState("State is Changing");

  buttonContainer.style.display = "none";

  readyState.style.backgroundColor = STATE_CHANGING_COLOR;
  runningState.style.backgroundColor = STATE_CHANGING_COLOR;
  blockedState.style.backgroundColor = STATE_CHANGING_COLOR;

  var elem = animationState;
  elem.style.display = "block";
  elem.style.left = beginLeftPos + "px";
  elem.style.top = beginTopPos + "px";

  var end1 = false;
  var end2 = false;

  var id = setInterval(frame, 1);

  function frame() {
    if (!end1 && beginTopPos < endTopPos) {
      beginTopPos++;
      elem.style.top = beginTopPos + "px";
    } else if (!end1 && beginTopPos > endTopPos) {
      beginTopPos--;
      elem.style.top = beginTopPos + "px";
    } else if (!end1 && beginTopPos == endTopPos) {
      end1 = true;
    }

    if (!end2 && beginLeftPos < endLeftPos) {
      beginLeftPos++;
      elem.style.left = beginLeftPos + "px";
    } else if (!end2 && beginLeftPos > endLeftPos) {
      beginLeftPos--;
      elem.style.left = beginLeftPos + "px";
    } else if (!end2 && beginLeftPos == endLeftPos) {
      end2 = true;
    }

    if (end1 && end2) {
      clearInterval(id);
      readyState.style.backgroundColor = STATE_CHANGING_COLOR;
      runningState.style.backgroundColor = STATE_CHANGING_COLOR;
      blockedState.style.backgroundColor = STATE_CHANGING_COLOR;
      elem.style.display = "none";
      buttonContainer.style.display = "block";
      setAlertStateColor(false);
      callback();
    }
  }
}

function setState(state) {
  current_state = state;
  document.getElementById("state-name").innerHTML = state;
}

function setAlertStateColor(setAlertColor) {
  if (setAlertColor) {
    document.getElementById("state-name").style.backgroundColor =
      ALERT_HEADER_COLOR;
  } else {
    document.getElementById("state-name").style.backgroundColor =
      NORMAL_HEADER_COLOR;
  }
}
