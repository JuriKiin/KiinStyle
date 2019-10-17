let jsConfigureSlideshow = (animationType) => {
    let ks_slideshow_containers = document.getElementsByClassName('ks-slide');
    for(let i = 0; i < ks_slideshow_containers.length; i++) {
        let e = ks_slideshow_containers[i];
        e.style.backgroundImage = `url('${e.children[0].getAttribute('src')}')`;
        //Disable all children
        for(let x = 0; x < e.children.length; x++) {
            let img = e.children[x];
            img.classList.add('d-none');
        }
        setInterval(() => { //Every time this runs, increment the index of which img to display
            let ks_slideCount = e.getAttribute("data-ks-slide-count");
            ks_slideCount++;
            if(ks_slideCount >= e.children.length) ks_slideCount = 0;
            for(let j = 0; j < e.children.length; j++) {
                if(ks_slideCount == j) e.style.backgroundImage = `url('${e.children[j].getAttribute('src')}')`;
            }
            e.setAttribute("data-ks-slide-count", ks_slideCount);
        }, e.getAttribute('ks-slide-time'));
    };
};