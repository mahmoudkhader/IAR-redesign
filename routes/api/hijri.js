// In order to use the router, need to bring in express
const express = require("express");
// When we create a route, we call this with router.get
const router = express.Router();

router.get("/test", (req, res) =>
  res.json({
    code: 200,
    status: "OK",
    data: {
      gregorian: {
        date: "07-12-2014",
        format: "DD-MM-YYYY",
        day: "07",
        weekday: { en: "Sunday" },
        month: { number: 12, en: "December" },
        year: "2014",
        designation: { abbreviated: "AD", expanded: "Anno Domini" }
      },
      hijri: {
        date: "14-02-1436",
        format: "DD-MM-YYYY",
        day: "14",
        weekday: { en: "Al Ahad", ar: "\u0627\u0644\u0627\u062d\u062f" },
        month: {
          number: 2,
          en: "\u1e62afar",
          ar: "\u0635\u064e\u0641\u064e\u0631"
        },
        year: "1436",
        designation: { abbreviated: "AH", expanded: "Anno Hegirae" },
        holidays: []
      }
    }
  })
);
// http://api.aladhan.com/v1/hToG

const http = require("http");
const fs = require("fs");

// http
//   //   .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", resp => {
//   .get("http://api.aladhan.com/v1/hToG", resp => {
//     let data = "";

//     // A chunk of data has been recieved.
//     resp.on("data", chunk => {
//       data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on("end", () => {
//       console.log(JSON.parse(data));
//       fs.writeFile("athan-file.json", data, err => {
//         if (err) throw err;
//         console.log("The file has been saved!");
//       });
//     });
//   })
//   .on("error", err => {
//     console.log("Error: " + err.message);
//   });

// router.get("http://api.aladhan.com/v1/hToG", (req, res) => {
//   let data = "";
//   // A chunk of data has been recieved.
//   res.on("data", chunk => {
//     data += chunk;
//   });

//   // The whole resonse has been received. Print out the result.
//   res
//     .on("end", () => {
//       console.log(JSON.parse(data));
//       fs.writeFile("athan-file.json", data, err => {
//         if (err) throw err;
//         console.log("The file has been saved!");
//       });
//     })
//     .on("error", err => {
//       console.log("Error: " + err.message);
//     });
// });

router.get("/athan", (req, res) => {
  http
    .get("http://api.aladhan.com/v1/hToG", resp => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log(JSON.parse(data));
        fs.writeFile("athan-file.json", data, err => {
          if (err) throw err;
          console.log("The file has been saved!");
        });
        const newData = JSON.parse(data);
        res.json({ newData });
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});

module.exports = router;
