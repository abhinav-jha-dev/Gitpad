function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// I've put our main code into this function.
async function addPeople() {
    uls = document.querySelectorAll("ul.discover-entity-list.ember-view");
    for (ul of uls) {
        list = ul.querySelectorAll('li');
        count = 0; // this is the count of how many people you've added
        for (ele of list) { // stop after adding 100 people
            // for requesting people connect change text to "people_connect"
            // for requesting group join change text to "group_join"
            buttonToClick = ele.querySelector("button[data-control-name=group_join]");
            // for requesting people connect change text to "Connect"
            // for requesting group join change text to "Join"
            if (buttonToClick.innerText.includes("Join")) {
                buttonToClick.click();
                count += 1;
                console.log("I have added " + count + " people so far.");
            }
            ul.removeChild(ele);
            await sleep(1000); // stop this function for 1 second here.
            ele = ul.querySelector('li');
        }
    }
}

addPeople();