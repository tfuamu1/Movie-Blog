window.onload = function () {
  // Turn the path name (location) into an array
  const path = window.location.pathname.split("/");

  // Check the first part of the path (the first element in the array)
  switch (path[1]) {
    case "": {
      loadPage("home");
      break;
    }
    case "about": {
      loadPage("about");
      break;
    }
    case "posts": {
      loadPage("posts");
      break;
    }
    default: {
      loadPage("404");
      break;
    }
  }

  document.querySelectorAll(".menu_item").forEach((item) => {
    item.addEventListener("click", function () {
      const path = item.getAttribute("value"); // Use value to load the page and save the browsing history
      loadPage(path);
      if (path == "") {
        window.history.pushState("", "", "/");
        return;
      }

      window.history.pushState("", "", path);
    });
  });

  function loadPage($path) {
    if ($path == "") return; // Check if the page is loaded

    const container = document.getElementById("container");

    const request = new XMLHttpRequest();
    request.open("GET", "pages/" + $path + ".html");
    request.send();
    request.onload = function () {
      if (request.status == 200) {
        container.innerHTML = request.responseText;
        document.title = $path;
      }
    };
  }
};
