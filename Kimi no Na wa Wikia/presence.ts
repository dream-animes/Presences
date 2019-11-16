var presence = new Presence({
  clientId: "619963616489242645",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  if(document.location.pathname.startsWith("/wiki/")) { // Making 100% sure it's the wiki
    let page = "N/A";
    try {
      page = document.getElementsByClassName("page-header__title")[0].textContent;
    } catch (err) {
      let errCode = "KMNNWIKI_WIKIEN_GETPAGETITLE"
      console.log("An error occured in the PreMiD Presence, please send this to CRUGG#0001   :::   " + errCode + "   :::   " + err);
    }
    let presenceData: presenceData = {
      details: "Viewing a page...",
      state: page,
      largeImageKey: "lg-kmnnwwiki"
      };
      presence.setActivity(presenceData);
  }
});