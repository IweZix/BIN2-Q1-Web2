function addDateTime(message) {
    const dateTimeNow = new Date();
    alert(`${dateTimeNow.toLocaleDateString()} : ${message}`);
}

addDateTime("This is the best moment to have a look at this website !")
