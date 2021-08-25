let controlValues = {
    width: ['',"item-auto","item-10","item-20","item-25","item-50","item-75","item-100"],
    alignment: ['align-left', 'align-center','align-right'],
    color: ['grass','water','rock','fire','silk','snow','coal'],
    backgroundcolor: ['bg-grass','bg-water','bg-rock','bg-fire','bg-silk','bg-snow','bg-coal','bg-clear'],
    font: ['font-header','font-text','font-default'],
    fontsize: ['font-xs','font-sm','font-md','font-lg','font-xl','font-xxl'],
    margin: ['margin-0','margin-10p','margin-5','margin-10','margin-20','margin-25','margin-50','margin-75','margin-100'],
    margintop:['margin-top-0','margin-top-10p','margin-top-5','margin-top-10','margin-top-20','margin-top-25','margin-top-50','margin-top-75','margin-top-100'],
    marginleft:['margin-left-0','margin-left-10p','margin-left-5','margin-left-10','margin-left-20','margin-left-25','margin-left-50','margin-left-75','margin-left-100'],
    marginbottom:['margin-bottom-0','margin-bottom-10p','margin-bottom-5','margin-bottom-10','margin-bottom-20','margin-bottom-25','margin-bottom-50','margin-bottom-75','margin-bottom-100'],
    marginright:['margin-right-0','margin-right-10p','margin-right-5','margin-right-10','margin-right-20','margin-right-25','margin-right-50','margin-right-75','margin-right-100'],
    padding: ['pad-0','pad-10p','pad-20p','pad-50p','pad-5','pad-10','pad-20','pad-25','pad-50','pad-75','pad-100'],
    paddingtop: ['pad-top-0','pad-top-10p','pad-top-20p','pad-top-50p','pad-top-5','pad-top-10','pad-top-20','pad-top-25','pad-top-50','pad-top-75','pad-top-100'],
    paddingleft: [ 'pad-left-0','pad-left-10p','pad-left-20p','pad-left-50p','pad-left-5','pad-left-10','pad-left-20','pad-left-25','pad-left-50','pad-left-75','pad-left-100'],
    paddingbottom: ['pad-bottom-0','pad-bottom-10p','pad-bottom-20p','pad-bottom-50p','pad-bottom-5','pad-bottom-10','pad-bottom-20','pad-bottom-25','pad-bottom-50','pad-bottom-75','pad-bottom-100'],
    paddingright: ['pad-right-0','pad-right-10p','pad-right-20p','pad-right-50p','pad-right-5','pad-right-10','pad-right-20','pad-right-25','pad-right-50','pad-right-75','pad-right-100'],
    textdecoration: ['bold','italic','ul','none'],
    grid: ['grid-1','grid-2','grid-3','grid-4','grid-5',''],
    border: ['bor-none','bor-1','bor-2','bor-5'],
    bordertop: ['','bor-top-1','bor-top-2','bor-top-5'],
    borderleft: ['','bor-left-1','bor-left-2','bor-left-5'],
    borderbottom: ['','bor-bot-1','bor-bot-2','bor-bot-5'],
    borderright: ['','bor-right-1','bor-right-2','bor-right-5'],
    display: ['d-none','d-inline','d-inline-block','d-block','d-initial'],
    float: ['f-left','f-right'],
    height: ['','height-0','height-5','height-10','height-20','height-25','height-50','height-75','height-100','height-150','height-auto','height-full','height-half','height-quart','height-triquart'],
    lineheight: ['','l-height-0','l-height-5','l-height-10','l-height-20','l-height-25','l-height-50','l-height-75','l-height-100','l-height-150'],
    animation: ['zoom','shrink','twist-r','twist-l','slide-r','slide-l','slide-u','slide-d','pulse','shake','spin-r','spin-l','']
};

let selectedElement = null;
let allClosed = true;
let recentElement = null;
let canUseShortCuts = true;
let canUseToolTips = false;

window.onload = function() {
    //load colors
    let colorControls = document.getElementById('color-container').children;
    let backgroundColorControls = document.getElementById('background-color-container').children;
    for(let i = 0; i < colorControls.length; i++) {
        colorControls[i].classList.add(controlValues['backgroundcolor'][i]);
        colorControls[i].setAttribute('value', i);
    }
    for(let i = 0; i < backgroundColorControls.length; i++) {
        backgroundColorControls[i].classList.add(controlValues['backgroundcolor'][i]);
        backgroundColorControls[i].setAttribute('value', i);
    }

    let carrots = document.getElementsByClassName('carrot');
    for(let i = 0; i < carrots.length; i++) {
        carrots[i].addEventListener('click', toggleShowControl);
    }

    document.getElementById('toggleShow').dispatchEvent(new Event('click'));
    document.body.addEventListener('keyup', checkInput);
    document.getElementsByTagName('textarea')[0].addEventListener('focus', function() {canUseShortCuts = !canUseShortCuts});
    document.getElementsByTagName('textarea')[0].addEventListener('blur', function() {canUseShortCuts = !canUseShortCuts});
    this.addContentEvents();
    this.setupTooltips();

};

function checkInput(e) {
    if(!canUseShortCuts) return;
    let code = e.keyCode;
    switch(code) {
        case 84: document.getElementById('toggleShow').dispatchEvent(new Event('click'));
            break;
        case 8: if(selectedElement) selectedElement.classList = [];
            updateCrumbs(selectedElement.classList);
            break;
        case 32: toggleControlPanel();
            break;
        case 68: deselect();
            break;
        case 79: toggleToolTips();
            break;
        case 73: toggleImportWindow();
            break;
    }
}

//Functions used to toggle UI states

//TOGGLE THE CONTROL PANEL ON/OFF (USE SPACE)
function toggleControlPanel() {
    document.getElementsByClassName('d-block').display = 'none' 
    if(document.body.firstElementChild.classList.contains('item-25')) {
        document.getElementById('controls').classList.remove('item-25');
        document.getElementById('controls').classList.add('item-10');
        document.getElementById('site-body').classList.remove('item-75');
        document.getElementById('site-body').classList.add('item-90');
        document.getElementById('control-container').classList.remove('d-block');
        document.getElementById('control-container').classList.add('d-none');
    } else {
        document.getElementById('controls').classList.add('item-25');
        document.getElementById('controls').classList.remove('item-10');
        document.getElementById('site-body').classList.add('item-75');
        document.getElementById('site-body').classList.remove('item-90');
        document.getElementById('control-container').classList.add('d-block');
        document.getElementById('control-container').classList.remove('d-none');
    }
}

//HIDE ALL CONTROLS (USE T)
function toggleAll(e) {
    allClosed = !allClosed;
    let carrots = document.getElementsByClassName('carrot');
    for(let i = 0; i < carrots.length; i++) {
        let target = carrots[i].parentElement.getElementsByTagName('div')[0];
        if(allClosed) {
            if(target.classList.contains('d-none')){
                carrots[i].dispatchEvent(new Event('click'));
            }
            e.innerHTML = "Hide All";
        } else {
            if(!target.classList.contains('d-none')){
                carrots[i].dispatchEvent(new Event('click'));
            }
            e.innerHTML = "Expand All";
        }
    }
}
function toggleShowControl(e) {
    let target = e.target.parentElement.getElementsByTagName('div')[0];
    if(target.classList.contains('d-none')){
        e.target.innerHTML = 'Hide';
        target.classList.remove('d-none');
        target.classList.add('d-block');
    } else {
        e.target.innerHTML = 'Show';
        target.classList.add('d-none');
        target.classList.remove('d-block');
        recentElement = e.target;
    }
}

let showHelp = (show) => {
    if (show) {
        document.getElementById('help-window').classList.remove('d-none');
    } else {
        document.getElementById('help-window').classList.add('d-none');
    }
   
}

//Functions used to set styles
function updateControlSliderValue(e,controlName) {
    if(selectedElement) {
        for(let i = parseInt(e.getAttribute('min')); i < parseInt(e.getAttribute('max'))+1; i++) {
            if(selectedElement.classList.contains(controlValues[controlName][i])) selectedElement.classList.remove(controlValues[controlName][i]);
        }
        if(controlValues[controlName][e.value] != '') {
            selectedElement.classList.add(controlValues[controlName][e.value]);
        }
        updateCrumbs(selectedElement.classList);
    }
    e.parentNode.lastElementChild.innerHTML = "Value: " + controlValues[controlName][e.value];
} 
function updateControlButtonValue(e, controlName) {
    if(selectedElement) {
        for(let i = 0; i < controlValues[controlName].length; i++) {
            if(selectedElement.classList.contains(controlValues[controlName][i])) selectedElement.classList.remove(controlValues[controlName][i]);
        }
        selectedElement.classList.add(controlValues[controlName][e.value]);
        updateCrumbs(selectedElement.classList);
    }
    e.parentNode.nextElementSibling.innerHTML = "Value: " + controlValues[controlName][e.value];
}

//Control hovering on HTML elements
function beginHover(e) {
    e.target.classList.add('editor-highlight');
}
function endHover(e) {
    e.target.classList.remove('editor-highlight');
}

function selectElement(e) {
    if(selectedElement) deselect();
    //Set the text values of current and sliders for each if contains that style.
    selectedElement = e.target;
    let elementID = selectedElement.getAttribute('id');
    if(!elementID) elementID = '--';
    document.getElementById('current-element-container').innerHTML = selectedElement.tagName + "; with ID: " + elementID;
    selectedElement.classList.add('editor-selected');

    updateCrumbs(selectedElement.classList);

    //go through each slider and adjust based on if it has the class
    let inputs = document.getElementsByTagName('input');    //Get all of the inputs
    for(let i = 0; i < inputs.length; i++) {
        let checkStyles = controlValues[inputs[i].getAttribute('data-style')];  //get the style associated with this input
        styleLoop:  //Declare the for loop so we can break out of the inner one.
        for(let j = 0; j < checkStyles.length; j++) {   //For each style in this array
            if(selectedElement.classList.contains(checkStyles[j])) {    //Check if we contain it
                inputs[i].value = inputs[i].getAttribute('min') + j;    //If so, set the value to the index
                break styleLoop;    //break out of the inner loop not just the whole nested loop
            } else inputs[i].value = inputs[i].getAttribute('min'); //otherwise set to 0 (we don't have anything set)
        }
    }
}

//DESELECTS THE CURRENT SELECTED ELEMENT (USE D)
function deselect() {
    if(!selectedElement) return;
    selectedElement.classList.remove('editor-selected');
    document.getElementById('current-element-container').innerHTML = '';
    document.getElementById('breadcrumbs').innerHTML = '';
    selectedElement = null;
    resetSliders();
}

function setupTooltips() {
    let e = document.getElementsByClassName('tooltip');
    for(let i = 0; i < e.length; i++) {
        let toolTipTarget = e[i].nextElementSibling;
        toolTipTarget.addEventListener('mouseover', (e) => {
            if(!canUseToolTips) return;
            e.target.previousElementSibling.classList.remove('tooltip');
            e.target.previousElementSibling.classList.add('tooltip-show');
        });
        toolTipTarget.addEventListener('mouseout', (e) => {
            if(!canUseToolTips) return;
            e.target.previousElementSibling.classList.add('tooltip');
            e.target.previousElementSibling.classList.remove('tooltip-show');
        });
    }
}

//TOGGLE THE TOOL TIPS ON/OFF (USE O)
function toggleToolTips() {
    canUseToolTips = !canUseToolTips;
    for(let i = 0; i < document.getElementsByClassName('tooltip-show').length; i++) {
        let e = document.getElementsByClassName('tooltip-show')[i];
        e.classList.remove('tooltip-show');
        e.classList.add('tooltip');
    }
}

function updateCrumbs(e) {
    let breadcrumb =  document.getElementById('breadcrumbs');
    let crumbString = "";

    for(let i = 0; i < e.length; i++) {
        if(e[i] != 'editor-selected' && e[i] != 'editor-highlight') crumbString += e[i] + " ";
    }
    breadcrumb.innerText = crumbString;
}

function resetSliders() {
    let inputs = document.getElementsByTagName('input');    //Get all of the inputs
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = inputs[i].getAttribute('min');
    }
}