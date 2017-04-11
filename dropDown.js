window.onload = function () {
    var drop = document.getElementsByClassName('dropdown')[1];
    defineDropDown(drop);
    defineDropDown(document.getElementById('newDrop'));


    defineDropDown({
        element: document.getElementById('newDrop'),
        values: [1, "a", 3, 4, 5],
        selected: "a"
    })


}


function defineDropDown(drop) {

    var toggler = drop.getElementsByClassName('dropdown-toggle')[0];
    var header = drop.getElementsByClassName('dropdown-header')[0];
    var list = toggler.getElementsByClassName('dropdown-list')[0];
    var listElements = list.getElementsByTagName('li');
    var currentSelection = header.getElementsByClassName('dropdown-selection')[0];
    var hideTime = 200;
    var opened = false;


    function hideList() {
        console.log('hide')
        opened = false;
        document.removeEventListener('click', hideList, false)
        stopAnimation(toggler);
        animate(toggler, 'height', 0, hideTime, function () {
            toggler.style.display = 'none';
            header.className = "dropdown-header";
        });
    }


    for (var i = 0; i < listElements.length; i++) {
        var li = listElements[i];
        li.onclick = function () {
            currentSelection.innerHTML = this.innerHTML;
        }
    }


    drop.onclick = function (e) {
        console.log('click', opened)
        e.stopPropagation()

        if (!opened) {
            opened = true;
            var event = new CustomEvent('dropdownIsShowing')
            document.dispatchEvent(event)
            document.addEventListener('click', hideList, false)
            toggler.style.display = 'block';
            stopAnimation(toggler)
            animate(toggler,
                'height',
                parseFloat(window.getComputedStyle(list).height),
                hideTime, function () {
                    document.addEventListener('dropdownIsShowing', hideList, false)
                });

            header.className += " active";
        } else {
            hideList();
            opened = false;
        }


    }
}