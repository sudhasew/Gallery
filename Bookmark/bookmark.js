document
  .getElementById("form-container")
  .addEventListener("submit", saveBookmark);

function saveBookmark(event) {
  var siteName = document.getElementById("siteName").value;

  var siteUrl = document.getElementById("siteUrl").value;

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  if (!validateUrl(siteName, siteUrl)) {
    return false;
  }

  // if there is no bookmarks
  var bookmarks = [];
  if (localStorage.getItem("bookmarks") === null) {
    // adding to bookmark array
    bookmarks.push(bookmark);

    // set to localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get bookmark from localstorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // adding to the bookmark array
    bookmarks.push(bookmark);

    // re set back to localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Reset the form
  document.getElementById("form-container").reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  event.preventDefault();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  var bookmarksResults = document.getElementById("bookmarksResults");

  bookmarksResults.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      "<h3 class='savedbookmarks'>" +
      "<p class='name'>" +
      name +
      "</p>" +
      '<a class="btnVisit" target="_blank" href="' +
      url +
      '"> Visit </a>' +
      "<a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btnDelete" href="#"> Delete </a>' +
      "</h3>";
  }
}

function deleteBookmark(url) {
  // Get bookmark from local storage

  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      // remove from array
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

function validateUrl(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please give proper siteName or siteUrl");
    return false;
  }

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  } else {
    alert("Successfully match");
  }

  return true;
}
