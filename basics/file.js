const { Console } = require("console");
const fs = require("fs");

// reading files

fs.readFile("./docs/blog.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

// writing files

fs.writeFile("./docs/blog2.txt", "I am writing using the node js fs", () => {
  console.log("the file is written");
});

// directories
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }

    fs.chmod("./assets", "777", () => {
      console.log("permission changed");
    });

    console.log("directory created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }

    console.log("folder deleted");
  });
}

// deleting files

if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("path/file.txt was deleted");
  });
}
