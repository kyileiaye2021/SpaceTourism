{
    const form = document.querySelector('form');
    var arr = [];
    form.addEventListener('submit', (e) => {
        const form = document.querySelector('form');
        var arr = [];
        e.preventDefault(); // Prevent HTML refresh
        const fd = new FormData(form); // Converts to array of arrays
        //document.getElementById("done").innerHTML = fd[1];
        for (item of fd) {
        alert(item[1]);
        }
        
    });

}