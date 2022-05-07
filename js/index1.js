const range = document.getElementById('range');
function changeV() {
    let str = parseInt(range.value);
    localStorage.setItem('str', str);
}

