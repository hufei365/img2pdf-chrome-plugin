const file = document.getElementById('file');

let count = 0;

const fix = document.getElementsByClassName('fix')[0];

function append(file){
    let reader = new FileReader();
    let img = new Image();

    reader.onload=(e)=>{
        img.src = e.target.result;
        document.body.appendChild(img);
        if(--count === 0){
            setTimeout(()=>{
                window.print();
            }, 200);
        }
    }
    reader.readAsDataURL(file);
}
window.onbeforeprint = ()=>{
    fix.hidden=true;
    document.body.className="print"
}
window.onafterprint = ()=>{
    fix.hidden=false;
    document.body.className=""
}

file.addEventListener('input', ()=>{
    document.title = file.files[0].name.replace(/\.[pngje]+$/g, '');
    count = file.files.length; 
    Array.prototype.map.call(file.files, (f)=>{
        append(f);
    });
});
