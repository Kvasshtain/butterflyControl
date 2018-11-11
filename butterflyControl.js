function bindModalWindows(modalWindow) {
    var ok = 'ok';

    modalWindow.onclick = function(event) {
        var button = event.srcElement.classList[0],
            coverDiv = document.getElementsByClassName('cover-div')[0];

        if(button === ok) {
            modalWindow.style.opacity = 0;
            coverDiv.style.zIndex = -9000;
        }
    }
};

function hideModalWindow()
{
    var coverDiv = document.getElementsByClassName('cover-div')[0],
        modalWindow = document.getElementsByClassName("modalWindow")[0];

    modalWindow.style.opacity = 0;
    coverDiv.style.zIndex = -9000;
};

function bindButterflyControls(form){
    var availableColumn = 'Available',
        selectedColumn = 'Selected',
        rightButton = 'Right',
        leftButton = 'Left',
        allRight = 'AllRight',
        allLeft = 'AllLeft',
        ok = 'ok',
        objAvl = form.getElementsByClassName(availableColumn)[0],
        objSel = form.getElementsByClassName(selectedColumn)[0],
        rightBtn = form.getElementsByClassName(rightButton)[0],
        leftBtn = form.getElementsByClassName(leftButton)[0],
        useless = "useless",
        hidden = "hidden",
        modalWindow = document.getElementsByClassName("modalWindow")[0];

    rightBtn.classList.add(useless);

    leftBtn.classList.add(useless);

    form.onclick = function(event) {

        var column = event.srcElement.parentElement.className,
            button = event.srcElement.classList[0],
            coverDiv = document.getElementsByClassName('cover-div')[0];

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
            moveOneOption(objAvl, objSel, rightBtn, leftBtn);
        }

        if(button === leftButton){
            moveOneOption(objSel, objAvl, leftBtn, rightBtn);
        }

        if(button === allLeft){
            moveAllOption(objSel, objAvl, leftBtn);
        }
    }
};

function moveOneOption(sourceObj, destinationObj, clickedBtn, unClickedBtn){
    var useless = "useless",
        selectedIndex = sourceObj.selectedIndex;

    if(sourceObj.selectedIndex === -1){
        showModalWindow();
        return;
    }
    destinationObj.options[destinationObj.options.length] = sourceObj.options[selectedIndex];

    clickedBtn.classList.add(useless);

    unClickedBtn.classList.remove(useless);
};

function moveAllOption(sourceObj, destinationObj, uselessBtn)
{
    var useless = "useless";

    while(sourceObj.options.length !== 0){
        destinationObj.options[destinationObj.options.length] = sourceObj.options[0];
    }

    uselessBtn.classList.add(useless);
};

function showModalWindow()
{
    var coverDiv = document.getElementsByClassName('cover-div')[0],
        modalWindow = document.getElementsByClassName("modalWindow")[0];

    coverDiv.style.zIndex = 9000;
    modalWindow.style.opacity = 1;
};

window.onload = function () {
    var forms = document.getElementsByClassName("butterflyCtrl"),
        modalWindows = document.getElementsByClassName("modalWindow");

    for(var i = 0; i < forms.length; i++){
        bindButterflyControls(forms[i]);
    }

    for(var i = 0; i < modalWindows.length; i++) {
        bindModalWindows(modalWindows[i]);
    }
}