function save(savename, objectToSave) {
    localStorage.setItem(savename, JSON.stringify(objectToSave));
}

function load2(savename) {
    objectLoaded = new Start(JSON.parse(localStorage.getItem(savename)));
    if (!objectLoaded) {
    // init by cloning initial object
        console.log("cry");
    }
    return objectLoaded
 }