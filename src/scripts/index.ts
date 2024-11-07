const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get("access_token"), fragment.get("token_type")];

if (accessToken) {
  // display user data and logout button
  (document.getElementById("login") as HTMLAnchorElement).classList.add("hidden");
  (document.getElementById("logout") as HTMLButtonElement).classList.remove("hidden");

  fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${tokenType} ${accessToken}`
    }
  })
    .then((result) => result.json())
    .then((response) => {
      const { username, id, avatar } = response;
      (document.getElementById("name") as HTMLDivElement).innerText = username;
      (
        document.getElementById("avatar") as HTMLImageElement
      ).src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;
      (document.getElementById("profile-info") as HTMLDivElement).classList.remove("hidden");
    })
    .catch(console.error);
}

(document.getElementById("logout") as HTMLButtonElement).onclick = () => {
  (document.getElementById("profile-info") as HTMLDivElement).classList.add("hidden");
  window.location.hash = ""; // removes token from URL
  (document.getElementById("name") as HTMLDivElement).innerText = "";
  (document.getElementById("avatar") as HTMLImageElement).src = "";
  (document.getElementById("login") as HTMLAnchorElement).classList.remove("hidden");
  (document.getElementById("logout") as HTMLButtonElement).classList.add("hidden");
};
