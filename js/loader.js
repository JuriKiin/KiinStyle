let defaultOutput = '<!DOCTYPE html> \n <html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="author" content="KiinStyle">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<<link rel="stylesheet" href="https://jurikiin.com/KiinStyles/css/kiinStyle.css">\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">\n</head><body class="body-clear">';
let defaultTrailOutput = "\n</body></html>";
let breadcrumbReference = "absolute item-100 bottom-0 body-clear pad-left-10p pad-right-10p bg-rock snow";

function importHTML() {
    let body = document.getElementById('site-body');
    body.innerHTML = document.getElementById('import-window').getElementsByTagName('textarea')[0].value;
    for(let i = 0; i < body.childElementCount; i++) {
        if(body.children[i].nodeName == 'IMG') {
            body.children[i].setAttribute('src','../media/image-template.png');
        }
        body.children[i].addEventListener("mouseover", beginHover);
        body.children[i].addEventListener("mouseout", endHover);
        body.children[i].addEventListener("click", selectElement);
    }
    let bc = document.createElement('p');
    bc.setAttribute('id','breadcrumbs');
    bc.classList = breadcrumbReference;
    body.appendChild(bc);
    toggleImportWindow();
}

function addContentEvents() {
    let body = document.getElementById('site-body');
    for(let i = 0; i < body.childElementCount; i++) {
        body.children[i].addEventListener("mouseover", beginHover);
        body.children[i].addEventListener("mouseout", endHover);
        body.children[i].addEventListener("click", selectElement);
    }
}

function toggleImportWindow() {
    if(document.getElementById('import-window').classList.contains('d-block')) {
        document.getElementById('import-window').classList.remove('d-block');
        document.getElementById('import-window').classList.add('d-none');
    } else {
        document.getElementById('import-window').classList.add('d-block');
        document.getElementById('import-window').classList.remove('d-none');
    }
}

function download(text, filename){
    var blob = new Blob([text], {type: "text/plain"});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
}

function exportHTML() {
    let html = defaultOutput + document.getElementById('site-body').innerHTML + defaultTrailOutput;
    download(html,'index-ks.html');
}