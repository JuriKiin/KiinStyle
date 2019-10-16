let idElements = [];

window.onload = init;

function init() {
    idElements = document.getElementsByClassName("ks-section");
    if(document.getElementById("search")) {
        document.getElementById("search").addEventListener("search", function() {
            Search();
        });
    }
}

function Search() {
    let value = document.getElementById("search").value;
    if(value == "") {
        for(var i = 0; i < idElements.length; i++) {
            idElements[i].classList.remove("d-none");
        }
    };
    for(var i = 0; i < idElements.length; i++) {
        let name = idElements[i].id.toUpperCase();
        if(name.includes(value.toUpperCase())) {
            document.getElementsByClassName("ks-menuItem")[i].classList.remove("d-none");
        } else {
            document.getElementsByClassName("ks-menuItem")[i].classList.add("d-none");
        }
    }
}

function OpenPage(url) {
    window.open(url, "_blank");
}