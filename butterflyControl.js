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
}

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
            while(objAvl.options.length !== 0){
                objSel.options[objSel.options.length] = objAvl.options[0];
            }

            rightBtn.classList.add(useless);
        }

        if(button === rightButton){
            if(objAvl.selectedIndex === -1){
                coverDiv.style.zIndex = 9000;
                modalWindow.style.opacity = 1;
                //alert("Нет выбранных элементов");
                return;
            }
            objSel.options[objSel.options.length] = objAvl.options[objAvl.selectedIndex];

            rightBtn.classList.add(useless);

            leftBtn.classList.remove(useless);
        }

        if(button === leftButton){
            if(objSel.selectedIndex === -1){
                coverDiv.style.zIndex = 9000;
                modalWindow.style.opacity = 1;
                //alert("Нет выбранных элементов");
                return;
            }
            objAvl.options[objAvl.options.length] = objSel.options[objSel.selectedIndex];

            leftBtn.classList.add(useless);

            rightBtn.classList.remove(useless);
        }

        if(button === allLeft){
            while(objSel.options.length !== 0){
                objAvl.options[objAvl.options.length] = objSel.options[0];
            }

            leftBtn.classList.add(useless);
        }
    }
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