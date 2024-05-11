const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

let corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://inspiron.lan:3001",
  ],
};

app.use(cors(corsOptions));

const data = [
  {
    serverID: "1",
    name: "server 1",
    spaces: [
      {
        spaceID: "1a",
        name: "space 1a",
      },
      {
        spaceID: "1b",
        name: "space 1b",
      },
    ],
  },
  {
    serverID: "2",
    name: "server 2",
    spaces: [
      {
        spaceID: "2a",
        name: "space 2a",
      },
      {
        spaceID: "2b",
        name: "space 2b",
      },
    ],
  },
];

const messages = [
  {
    msgID: 1,
    spaceID: "1a",
    content: "hello",
  },
  {
    msgID: 2,
    spaceID: "1b",
    content: "hello again",
  },
  {
    msgID: 3,
    spaceID: "2a",
    content: "hi",
  },
  {
    msgID: 4,
    spaceID: "2b",
    content: "hi again",
  },
];

app.get("/spaces/:spaceID/messages", (req, res) => {
  console.log(
    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} GET /spaces/${
      req.params.spaceID
    }/messages ${res.statusCode}`
  );
  //   console.log(req.headers.authorization);
  try {
    res
      .status(200)
      .json(
        messages.filter((message) => message.spaceID === req.params.spaceID)
      );
  } catch (error) {
    res.status(400);

    throw error;
  }
});

app.get("/servers", (req, res) => {
  console.log(`GET /servers ${res.statusCode}`);
  //   console.log(req.headers.authorization);
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(400);

    throw error;
  }
});

app.get("/", (req, res) => {
  res.send("Yurt Mock API Express Server!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
