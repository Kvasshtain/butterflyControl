var modalWindowName = "modalWindow",
    coverDivName = "cover-div",
    okButtonName = "okButton";

function bindModalWindows(modalWindow) {
    var okButton = document.getElementById(okButtonName);

    okButton.onclick = function(event) {
        var coverDiv = document.getElementById(coverDivName);

        modalWindow.style.opacity = 0;
        coverDiv.style.zIndex = -9000;
    }
};

function hideModalWindow()
{
    var coverDiv = document.getElementById(coverDivName),
        modalWindow = document.getElementById(modalWindowName);

    modalWindow.style.opacity = 0;
    coverDiv.style.zIndex = -9000;
};

function bindButterflyControls(form, i){
    var availableColumn = 'Available' + i,
        selectedColumn = 'Selected' + i,
        rightButton = 'Right' + i,
        leftButton = 'Left' + i,
        allRight = 'AllRight' + i,
        allLeft = 'AllLeft' + i,
        objAvl = document.querySelector("#" + availableColumn),//form.getElementsByClassName(availableColumn)[0],
        objSel = document.querySelector("#" + selectedColumn),//form.getElementsByClassName(selectedColumn)[0],
        rightBtn = document.querySelector("#" + rightButton),//form.getElementsByClassName(rightButton)[0],
        leftBtn = document.querySelector("#" + leftButton),//form.getElementsByClassName(leftButton)[0],
        useless = "useless",
        hidden = "hidden",
        modalWindow = document.getElementById(modalWindowName);

    rightBtn.classList.add(useless);

    leftBtn.classList.add(useless);

    form.onclick = function(event) {

        var column = event.srcElement.parentElement.id,
            button = event.srcElement.id,//.classList[0],
            coverDiv = document.getElementById(coverDivName);

        if(column === availableColumn){
            rightBtn.classList.remove(useless);
        }

        if(column === selectedColumn){
            leftBtn.classList.remove(useless);
        }

        if(button === allRight){
            moveAllOption(objAvl, objSel, rightBtn);
        }

        if(button === rightButton){
            moveOneOption(objAvl, objSel, rightBtn);
        }

        if(button === leftButton){
            moveOneOption(objSel, objAvl, leftBtn);
        }

        if(button === allLeft){
            moveAllOption(objSel, objAvl, leftBtn);
        }
    }
};

function moveOneOption(sourceObj, destinationObj, clickedBtn){
    var useless = "useless",
        selectedIndex = sourceObj.selectedIndex;

    if(sourceObj.selectedIndex === -1){
        showModalWindow();
        return;
    }
    destinationObj.options[destinationObj.options.length] = sourceObj.options[selectedIndex];

    destinationObj.selectedIndex = -1;

    clickedBtn.classList.add(useless);
};

function moveAllOption(sourceObj, destinationObj, uselessBtn)
{
    var useless = "useless";

    while(sourceObj.options.length !== 0){
        destinationObj.options[destinationObj.options.length] = sourceObj.options[0];
    }

    destinationObj.selectedIndex = -1;

    uselessBtn.classList.add(useless);
};

function showModalWindow()
{
    var coverDiv = document.getElementById(coverDivName),
        modalWindow = document.getElementById(modalWindowName);

    coverDiv.style.zIndex = 9000;
    modalWindow.style.opacity = 1;
};

window.onload = function () {
    var forms = document.querySelectorAll("[id ^= butterflyCtrl]"),//forms = document.getElementsByClassName("butterflyCtrl"),
        modalWindow = document.getElementById(modalWindowName);

    for(var i = 0; i < forms.length; i++){
        bindButterflyControls(forms[i], i);
    }

    bindModalWindows(modalWindow);
}