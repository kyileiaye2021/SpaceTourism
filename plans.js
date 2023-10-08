{
    const form = document.querySelector('form');
    var arr = [];
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent HTML refresh
        const fd = new FormData(form); // Converts to array of arrays
        for (item of fd) {
        arr.push(item);
        }
        document.getElementById("test").innerHTML = "Your flight is scheduled for " + arr[0][1] + " on " + arr[1][1] + " then " + arr[2][1] + " on " + arr[3][1];

    });

}