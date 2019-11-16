const presence = new Presence({
    clientId: "633419305836347393"
}),
    pages = {
        "/games": "Games",
        "/login": "Login",
        "/join": "Register",
        "/terms": "Terms of Use",
        "/privacy": "Privacy Policy",
        "/cookies": "Cookie Policy",
        "/welcome": "Just Registered!",
        "/discover": "Explore",
        "/client": "Client",
        "/forums": "Forums",
        "/notifications": "Notifications",
        "/library": "Game Library",
        "/dashboard/profile/edit": "Edit Profile",
        "/settings": "Settings",
        "/dashboard/games/add": "Add a Game"
    };

presence.on("UpdateData", async () => {
    const page = document.location.pathname,
        gameName = document.querySelector("#content > div > div > div > div > header > section > div.container > div.row > div > div > h1 > a") as HTMLElement,
        author = document.querySelector("#content > div > div > div > div > header > section > div.container > div.row > div > div > div > a > small") as HTMLElement,
        profile = document.querySelector("#content > div > div > header > section > div > div.row > div > div > h1 > small") as HTMLElement;

    let data: { [k: string]: any } = {
        largeImageKey: "gj-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };

    if (page.includes("/games/tag-")) {
        const tagName = page.replace("/games/tag-", "");

        data.details = "Browsing games by tag:"
        data.state = tagName[0].toUpperCase() + tagName.slice(1);
    } else if (page.includes("/games/") && gameName && gameName.textContent !== "") {
        data.details = `Viewing a game${author && author.textContent !== "" ? " by " + author.textContent : ""}:`
        data.state = gameName.textContent.trim();
    } else if (pages[page] || pages[page.slice(0, -1)]) {
        data.details = "Viewing a page:"
        data.state = pages[page] || pages[page.slice(0, -1)];
    } else if (page.includes("/search")) {
        const fixedSearchName = document.title.replace(" - Game Jolt", "").replace("Search results for ", "");

        data.details = `Searching for${page.includes("/search/users") ? " a user" : `${page.includes("/search/games") ? " a game" : ""}`}:`
        data.state = fixedSearchName[0].toUpperCase() + fixedSearchName.slice(1);
        data.smallImageKey = "search";
    } else if (profile && profile.textContent != "") {
        data.details = `Viewing a user:`
        data.state = profile.textContent;
    } else {
        data.details = "Viewing a page:"
        data.state = "Home"
    }

    if (data.details && data.state && data.details != "" && data.state != "") presence.setActivity(data);
});