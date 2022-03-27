import moon from "./assets/icons/icon-moon.svg";
import sun from "./assets/icons/icon-sun.svg";

// Get switchMode button
const switchMode =
  document.querySelector<HTMLButtonElement>("button.switch-mode");
let isLight = true;

// Set state of switch mode
switchMode?.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  isLight = !isLight;
  switchTheme();
});
// Switch theme color
const switchTheme = () => {
  localStorage.setItem("theme", isLight ? "light" : "dark");
  if (switchMode)
    switchMode.innerHTML = isLight
      ? `<span>Light</span> <img src=${sun} alt="moon"/>`
      : `<span>Dark</span> <img src=${moon} alt="moon"/>`;
  document.querySelector("main")?.classList.toggle("darkMode");
  localStorage.setItem("theme", "dark");
};
// Call switchTheme function at first initialization
switchTheme();
// get search bar input value
const searchBarInput =
  document.querySelector<HTMLInputElement>("#search-input");
const card = document.querySelector<HTMLDivElement | any>(".card");

searchBarInput?.addEventListener("keyup", (e) => {
  const value = (e.target as HTMLInputElement).value;
  if (
    value.length === 0 &&
    document.body.contains(document.getElementById("search-error"))
  ) {
    document.getElementById("search-error")?.remove();
    searchBarInput.style.flexGrow = "0.85";
  }
});

card.innerHTML = `<div class="card-avatar">
            <div class="card-avatar-content">
              <img
                src="./src/assets/icons/icon-github.svg"
                alt="avatar"
                class="avatar"
              />
              <div class="card-header">
                <div class="card-header-content">
                  <div class="card-gh-name">
                    <h3 class="card-title">The Octocat</h3>
                    <div class="card-subtitle">@octocat</div>
                  </div>

                  <div class="card-date">Joined 25 Jan 2011</div>
                </div>
              </div>
            </div>
            <div class="card-description">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros.
            </div>
          </div>
          <div class="card-content">
            <div class="dummy"></div>
            <div class="card-information">
              <div class="card-information-content">
                <div class="card-information-title">Repos</div>
                <div class="card-information-subtitle">8</div>
              </div>
              <div class="card-information-content">
                <div class="card-information-title">Followers</div>
                <div class="card-information-subtitle">3938</div>
              </div>
              <div class="card-information-content">
                <div class="card-information-title">Following</div>
                <div class="card-information-subtitle">9</div>
              </div>
            </div>
            <div class="card-social">
              <div class="card-social-content">
                <img
                  src="./src/assets/icons/icon-location.svg"
                  alt="location"
                />
                <span>San Francisco</span>
              </div>
              <div class="card-social-content">
                <img src="./src/assets/icons/icon-twitter.svg" alt="twitter" />
                <span>Not Available</span>
              </div>
              <div class="card-social-content">
                <img src="./src/assets/icons/icon-website.svg" alt="link" />
                <span class="repo-link"
                  ><a
                    href="https://github.blog"
                    target="_blank"
                    class="github-link"
                    >https://github.blog</a
                  ></span
                >
              </div>
              <div class="card-social-content">
                <img src="./src/assets/icons/icon-company.svg" alt="link" />
                <span
                  ><a href="https://github.blog" target="_blank"
                    >@github</a
                  ></span
                >
              </div>
            </div>
          </div>
        </div>`;

const fetchUsersFromGithubAPI = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.ok) {
      const data = await response.json();
      if (data.name) {
        const createdAt = new Date(data.created_at).toLocaleDateString(
          "en-US",
          { day: "numeric", month: "short", year: "numeric" }
        );

        card.innerHTML = `
        <div class="card-avatar">
            <div class="card-avatar-content">
              <img src=${data.avatar_url} alt="avatar" class="avatar" />
              <div class="card-header">
                <div class="card-header-content">
                  <div class="card-gh-name">
                    <h3 class="card-title">${data.name}</h3>
                    <div class="card-subtitle">@${data.login}</div>
                  </div>

                  <div class="card-date">Joined ${createdAt}</div>
                </div>
              </div>
            </div>
            <div class="card-description">
              ${
                data.bio
                  ? data.bio
                  : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."
              }
            </div>
          </div>
          <div class="card-content">
            <div class="dummy"></div>
            <div class="card-information">
              <div class="card-information-content">
                <div class="card-information-title">Repos</div>
                <div class="card-information-subtitle">${
                  data.public_repos
                }</div>
              </div>
              <div class="card-information-content">
                <div class="card-information-title">Followers</div>
                <div class="card-information-subtitle">${data.followers}</div>
              </div>
              <div class="card-information-content">
                <div class="card-information-title">Following</div>
                <div class="card-information-subtitle">${data.following}</div>
              </div>
            </div>
            <div class="card-social">
              <div class="card-social-content">
                <img
                  src="./src/assets/icons/icon-location.svg"
                  alt="location"
                />
                <span>${data.location}</span>
              </div>
              <div class="card-social-content">
                <img src="./src/assets/icons/icon-twitter.svg" alt="twitter" />
                <span>${
                  data.twitter_username
                    ? data.twitter_username
                    : "Not Available"
                }</span>
              </div>
              <div class="card-social-content">
                <img src="./src/assets/icons/icon-website.svg" alt="link" />
                <span
                class="repo-link"
                  ><a
                    href=${data.html_url}
                    target="_blank"
                    class="github-link"
                    >${data.html_url}</a
                  ></span
                >
              </div>
              <div class="card-social-content">
                <img src="./src/assets/icons/icon-company.svg" alt="link" />
                <span
                  ><a href="#" target="_blank"
                    >${data.company ? data.company : "Not Available"}</a
                  ></span
                >
              </div>
            </div>
          </div>`;
      }
    }
    if (searchBarInput) {
      if (
        response.status > 300 &&
        !document.body.contains(document.getElementById("search-error"))
      ) {
        searchBarInput.insertAdjacentHTML(
          "afterend",
          `<span id="search-error" >No results</span>`
        );
        searchBarInput.style.flexGrow = "0.62";
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

const buttonSearchBar = document.querySelector<HTMLButtonElement>(
  "button.button-search"
);
buttonSearchBar?.addEventListener("click", (e) => {
  e.preventDefault();
  const username =
    searchBarInput && searchBarInput?.value.length > 0 && searchBarInput.value;
  if (username) {
    fetchUsersFromGithubAPI(username);
  }
});
