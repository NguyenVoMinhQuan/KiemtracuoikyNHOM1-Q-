const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const db = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3000;
server.use(middlewares);
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
const SECRET_KEY = "lmaowibushiba5924";
const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = db.users.find(
      (user) => user.email === decoded.email && user.pass === decoded.pass
    );
    if (!user) {
      throw new Error("Invalid token");
    }
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

function isAuthenticated({ email, pass }) {
  return (
    db.users.findIndex((user) => user.email === email && user.pass === pass) !==
    -1
  );
}
server.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    data: db.products,
  });
});
// /laptop/
server.get(/^\/([Ll][Aa][Pp][Tt][Oo][Pp])\/$/, (req, res) => {
  res.status(200).json({
    status: 200,
    data: db.products.laptop,
  });
});
// /thuong-hieu/
server.get(
  /^\/(([Tt][Hh][Uu][Oo][Nn][Gg])-([Hh][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    res.status(200).json({
      status: 200,
      data: db.products.laptop,
    });
  }
);
// /laptop-dell/ || /laptop-hp/ || /laptop-lenovo/ || /laptop-acer/
// /laptop-asus/ || /laptop-msi/ || /laptop-toshiba/
server.get(
  /^\/([Ll][Aa][Pp][Tt][Oo][Pp])-(([Dd][Ee][Ll]{2})|([Hh][Pp])|([Ll][Ee][Nn][Oo][Vv][Oo])|([Aa][Ss][Uu][Ss])|([Aa][Cc][Ee][Rr])|([Mm][Ss][Ii])|([Tt][Oo][Ss][Hh][Ii][Bb][Aa]))\/$/,
  (req, res) => {
    const endpoint = req.params[1];
    const filteredData = db.products.laptop.filter((item) =>
      item["name"].toLowerCase().includes(endpoint.toLowerCase())
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /sony/ || /fujitsu/ || /surface/ || /lg/ || /samsung/ || /apple/
server.get(
  /^\/(([Ss][Oo][Nn][Yy]|[Ff][Uu][Jj][Ii][Tt][Ss][Uu])|([Ss][Uu][Rr][Ff][Aa][Cc][Ee])|([Ll][Gg])|([Ss][Aa][Mm][Ss][Uu][Nn][Gg])|([Aa][Pp]{2}[Ll][Ee]))\/$/,
  (req, res) => {
    let endpoint = req.params[0];
    endpoint = endpoint.toLowerCase() == "apple" ? "macbook" : endpoint;
    let filteredData = db.products.laptop.filter((item) =>
      item["name"].toLowerCase().includes(endpoint.toLowerCase())
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /core-i5/ || /core-i3/ || /core-i7/ || /core-i9/
server.get(/^\/([Cc][Oo][Rr][Ee])-([Ii][3579])\/$/, (req, res) => {
  const endpoint = req.params[1];
  const filteredData = db.products.laptop.filter((item) =>
    item["CPU"].toLowerCase().includes(endpoint.toLowerCase())
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Không có dữ liệu cần tìm.",
    });
  }
});
// /laptop-duoi-5-trieu/
server.get(
  /^\/(([Ll][Aa][Pp][Tt][Oo][Pp])-([Dd][Uu][Oo][Ii])-5-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.laptop.filter(
      (item) => item["price"] < 5000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /laptop-tu-5-7-trieu/
server.get(
  /^\/(([Ll][Aa][Pp][Tt][Oo][Pp])-([Tt][Uu])-5-7-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.laptop.filter(
      (item) => item["price"] >= 5000000 && item["price"] < 7000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /laptop-tu-7-10-trieu/
server.get(
  /^\/(([Ll][Aa][Pp][Tt][Oo][Pp])-([Tt][Uu])-7-10-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.laptop.filter(
      (item) => item["price"] >= 7000000 && item["price"] < 10000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /laptop-tu-10-13-trieu/
server.get(
  /^\/(([Ll][Aa][Pp][Tt][Oo][Pp])-([Tt][Uu])-10-13-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.laptop.filter(
      (item) => item["price"] >= 10000000 && item["price"] < 13000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /laptop-tu-13-18-trieu/
server.get(
  /^\/(([Ll][Aa][Pp][Tt][Oo][Pp])-([Tt][Uu])-13-18-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.laptop.filter(
      (item) => item["price"] >= 13000000 && item["price"] < 18000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /laptop-thiet-ke-do-hoa/
server.get(
  /^\/(([Ll][Aa][Pp][Tt][Oo][Pp])-([Tt][Hh][Ii][Ee][Tt])-([Kk][Ee])-([Dd][Oo])-([Hh][Oo][Aa]))\/$/,
  (req, res) => {
    const filteredData = db.products.laptop.filter((item) =>
      item["Nhu cầu"].includes("tkdh")
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /laptop-giai-tri-van-phong/
server.get(
  /^\/(([Ll][Aa][Pp][Tt][Oo][Pp])-([Gg][Ii][Aa][Ii])-([Tt][Rr][Ii])-([Vv][Aa][Nn])-([Pp][Hh][Oo][Nn][Gg]))\/$/,
  (req, res) => {
    const filteredData = db.products.laptop.filter((item) =>
      item["Nhu cầu"].includes("vp")
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /choi-game/
server.get(/^\/([Cc][Hh][Oo][Ii])-([Gg][Aa][Mm][Ee])\/$/, (req, res) => {
  const filteredData = db.products.laptop.filter((item) =>
    item["Nhu cầu"].includes("game")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Không có dữ liệu cần tìm.",
    });
  }
});
// /ultrabook
server.get(/^\/([Uu][Ll][Tt][Rr][Aa][Bb][Oo][Oo][Kk])\/$/, (req, res) => {
  const filteredData = db.products.laptop.filter((item) =>
    item["Nhu cầu"].includes("ultrabook")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Không có dữ liệu cần tìm.",
    });
  }
});
// /may-tinh-de-ban/
server.get(
  /^\/([Mm][Aa][Yy])-([Tt][Ii][Nn][Hh])-([Dd][Ee])-([Bb][Aa][Nn])\/$/,
  (req, res) => {
    res.status(200).json({
      status: 200,
      data: db.products.pc,
    });
  }
);
// /thuong-hieu-pc/
server.get(
  /^\/(([Tt][Hh][Uu][Oo][Nn][Gg])-([Hh][Ii][Ee][Uu])-([Pp][Cc]))\/$/,
  (req, res) => {
    res.status(200).json({
      status: 200,
      data: db.products.pc,
    });
  }
);
// /may-tinh-de-ban-dell/ || /may-tinh-de-ban-hp/ ||/may-tinh-de-ban-lenovo/
server.get(
  /^\/(([Mm][Aa][Yy]))-(([Tt][Ii][Nn][Hh]))-(([Dd][Ee]))-(([Bb][Aa][Nn]))-(([Dd][Ee][Ll]{2})|([Hh][Pp])|([Ll][Ee][Nn][Oo][Vv][Oo]))\/$/,
  (req, res) => {
    const endpoint = req.params[8];
    const filteredData = db.products.pc.filter((item) =>
      item["name"].toLowerCase().includes(endpoint.toLowerCase())
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /apple-185/
server.get(/^\/([Aa][Pp]{2}[Ll][Ee])-185\/$/, (req, res) => {
  const filteredData = db.products.pc.filter((item) =>
    item["name"].toLowerCase().includes("imac")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Không có dữ liệu cần tìm.",
    });
  }
});
// /hang-khac/
server.get(/^\/([Hh][Aa][Nn][Gg])-([Kk][Hh][Aa][Cc])\/$/, (req, res) => {
  const filteredData = db.products.pc.filter(
    (item) =>
      !item["name"].toLowerCase().includes("imac") &&
      !item["name"].toLowerCase().includes("hp") &&
      !item["name"].toLowerCase().includes("dell") &&
      !item["name"].toLowerCase().includes("lenovo")
  );
  res.status(filteredData.length > 0 ? 200 : 404).json({
    status: filteredData.length > 0 ? 200 : 404,
    data: filteredData.length > 0 ? filteredData : "Thông tin đang cập nhật!",
  });
});
// /pc-duoi-5-trieu/
server.get(
  /^\/(([Pp][Cc])-([Dd][Uu][Oo][Ii])-5-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.pc.filter(
      (item) => item["price"] < 5000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /pc-tu-5-7-trieu/
server.get(
  /^\/(([Pp][Cc])-([Tt][Uu])-5-7-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.pc.filter(
      (item) => item["price"] >= 5000000 && item["price"] < 7000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /pc-tu-7-10-trieu/
server.get(
  /^\/(([Pp][Cc])-([Tt][Uu])-7-10-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.pc.filter(
      (item) => item["price"] >= 7000000 && item["price"] < 10000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /pc-tu-10-13-trieu/
server.get(
  /^\/(([Pp][Cc])-([Tt][Uu])-10-13-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.pc.filter(
      (item) => item["price"] >= 10000000 && item["price"] < 13000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /pc-tu-13-18-trieu/
server.get(
  /^\/(([Pp][Cc])-([Tt][Uu])-13-18-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.pc.filter(
      (item) => item["price"] >= 13000000 && item["price"] < 18000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /pc-tu-18-22-trieu/
server.get(
  /^\/(([Pp][Cc])-([Tt][Uu])-18-22-([Tt][Rr][Ii][Ee][Uu]))\/$/,
  (req, res) => {
    const filteredData = db.products.pc.filter(
      (item) => item["price"] >= 18000000 && item["price"] < 22000000
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /choi-game-va-do-hoa/
server.get(
  /^\/(([Cc][Hh][Oo][Ii])-([Gg][Aa][Mm][Ee])-([Vv][Aa])-([Dd][Oo])-([Hh][Oo][Aa]))\/$/,
  (req, res) => {
    const filteredData = db.products.pc.filter(
      (item) =>
        item["Nhu cầu"].includes("game") || item["Nhu cầu"].includes("tkdh")
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /van-phong/
server.get(/^\/([Vv][Aa][Nn])-([Pp][Hh][Oo][Nn][Gg])\/$/, (req, res) => {
  const filteredData = db.products.pc.filter((item) =>
    item["Nhu cầu"].includes("dell-all-in-one")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Không có dữ liệu cần tìm.",
    });
  }
});
// /dell-all-in-one/
server.get(
  /^\/([Dd][Ee][Ll]{2})-([Aa][Ll][Ll])-[Ii][Nn]-[Oo][Nn][Ee]\/$/,
  (req, res) => {
    const filteredData = db.products.pc.filter((item) =>
      item["Nhu cầu"].includes("dell-all-in-one")
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);
// /hp-all-in-one/
server.get(
  /^\/([Hh][Pp])-([Aa][Ll][Ll])-[Ii][Nn]-[Oo][Nn][Ee]\/$/,
  (req, res) => {
    const filteredData = db.products.pc.filter((item) =>
      item["Nhu cầu"].includes("hp-all-in-one")
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Không có dữ liệu cần tìm.",
      });
    }
  }
);

// /linh-kien-may-tinh/

server.get(
  /^\/(([Ll][Ii][Nn][Hh])-([Kk][Ii][Ee][Nn])-([Mm][Aa][Yy])-([Tt][Ii][Nn][Hh]))\/$/,
  (req, res) => {
    res.status(200).json({
      status: 200,
      data: db.products.linhkien,
    });
  }
);

// /linh-kien-laptop

server.get(
  /^\/(([Ll][Ii][Nn][Hh])-([Kk][Ii][Ee][Nn])-([Ll][Aa][Pp][Tt][Oo][Pp]))\/$/,
  (req, res) => {
    const filteredData = db.products.linhkien.filter((item) =>
      item["Loại"].toLowerCase().includes("laptop")
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Thông tin đang cập nhật!",
      });
    }
  }
);

// /ram
server.get(/^\/([Rr][Aa][Mm])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("laptop-ram")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});

// /hdd-2-5-inch/
server.get(/^\/(([Hh][Dd]{2})-2-5-([Ii][Nn][Cc][Hh]))\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("laptop-hdd2.5")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /cpu-laptop/
server.get(/^\/([Cc][Pp][Uu])-([Ll][Aa][Pp][Tt][Oo][Pp])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("pc-cpu")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /vga-laptop/
server.get(/^\/([Vv][Gg][Aa])-([Ll][Aa][Pp][Tt][Oo][Pp])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("laptop-vga")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});

// /lcd/
server.get(/^\/([Ll][Cc][Dd])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("laptop-lcd")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /linh-kien-pc/
server.get(
  /^\/(([Ll][Ii][Nn][Hh])-([Kk][Ii][Ee][Nn])-([Pp][Cc]))\/$/,
  (req, res) => {
    const filteredData = db.products.linhkien.filter((item) =>
      item["Loại"].toLowerCase().includes("pc")
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Thông tin đang cập nhật!",
      });
    }
  }
);
// /main/
server.get(/^\/([Mm][Aa][Ii][Nn])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("main")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /ram-pc/
server.get(/^\/([Rr][Aa][Mm])-([Pp][Cc])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("pc-ram")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /hdd/
server.get(/^\/([Hh][Dd]{2})\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("hdd3.5")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /vga/
server.get(/^\/([Vv][Gg][Aa])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("pc-vga")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /cpu-pc/
server.get(/^\/([Cc][Pp][Uu])-([Pp][Cc])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("pc-cpu")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /nguon/
server.get(/^\/([Nn][Gg][Uu][Oo][Nn])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("nguon")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /case/
server.get(/^\/([Cc][Aa][Ss][Ee])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("case")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /o-cung-ssd-120/
server.get(/^\/([Oo])-([Cc][Uu][Nn][Gg])-([Ss]{2}[Dd])-120\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("ocung")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /ssd-2-5/
server.get(/^\/([Ss]{2}[Dd])-2-5\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("ssd2.5")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /msata/
server.get(/^\/([Mm][Ss][Aa][Tt][Aa])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("msata")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /m2/
server.get(/^\/([Mm])2\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("m2")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /pcie-nvme/
server.get(/^\/([Pp][Cc][Ii][Ee])-([Nn][Vv][Mm][Ee])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("pcle-nvme")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /pin-battery/
server.get(/^\/([Pp][Ii][Nn])-([Bb][Aa][Tt]{2}[Ee][Rr][Yy])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("pin")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /pin-dell
server.get(/^\/([Pp][Ii][Nn])-([Dd][Ee][ll]{2})\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("pin-dell")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /pin-hp/
server.get(/^\/([Pp][Ii][Nn])-([Hh][Pp])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("pin-hp")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /pin-lenovo/
server.get(/^\/([Pp][Ii][Nn])-([Ll][Ee][Nn][Oo][Vv][Oo])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("pin-lenovo")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /sac-adapter/
server.get(
  /^\/([Ss][Aa][Cc])-([Aa][Dd][Aa][Pp][Tt][Ee][Rr])\/$/,
  (req, res) => {
    const filteredData = db.products.linhkien.filter((item) =>
      item["Loại"].toLowerCase().includes("sac")
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Thông tin đang cập nhật!",
      });
    }
  }
);
// /sac-dell/
server.get(/^\/([Ss][Aa][Cc])-([Dd][Ee][ll]{2})\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("sac-dell")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /sac-hp/
server.get(/^\/([Ss][Aa][Cc])-([Hh][Pp])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("sac-hp")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /sac-lenovo/
server.get(/^\/([Ss][Aa][Cc])-([Ll][Ee][Nn][Oo][Vv][Oo])\/$/, (req, res) => {
  const filteredData = db.products.linhkien.filter((item) =>
    item["Loại"].toLowerCase().includes("sac-lenovo")
  );
  if (filteredData.length > 0) {
    res.status(200).json({
      status: 200,
      data: filteredData,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
});
// /phu-kien-146/
server.get(/^\/([Pp][Hh][Uu])-([Kk][Ii][Ee][Nn])-146\/$/, (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Thông tin đang cập nhật!",
  });
});
// /ban-phim/
server.get(/^\/([Bb][Aa][Nn])-([Pp][Hh][Ii][Mm])\/$/, (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Thông tin đang cập nhật!",
  });
});
// /mouse-chuot/
server.get(
  /^\/([Mm][Oo][Uu][Ss][Ee])-([Cc][Hh][Uu][Oo][Tt])\/$/,
  (req, res) => {
    res.status(404).json({
      status: 404,
      message: "Thông tin đang cập nhật!",
    });
  }
);
// /tai-nghe/
server.get(/^\/([Tt][Aa][Ii])-([Nn][Gg][Hh][Ee])\/$/, (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Thông tin đang cập nhật!",
  });
});
// /loa/
server.get(/^\/([Ll][Oo][Aa])\/$/, (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Thông tin đang cập nhật!",
  });
});
// /man-hinh-monitor/
server.get(
  /^\/(([Mm][Aa][Nn]))-(([Hh][Ii][Nn][Hh]-([Mm][Oo][Nn][Ii][Tt][Oo][Rr])))\/$/,
  (req, res) => {
    res.status(200).json({
      status: 200,
      data: db.products.screen,
    });
  }
);
// /man-hinh-dell/ || /man-hinh-hp/ || /man-hinh-lenovo/ || /man-hinh-samsung/ || /man-hinh-lg/
server.get(
  /^\/(([Mm][Aa][Nn]))-(([Hh][Ii][Nn][Hh]))-(([Dd][Ee][Ll]{2})|([Hh][Pp])|([Ll][Ee][Nn][Oo][Vv][Oo])|([Ss][Aa][Mm][Ss][Uu][Nn][Gg])|([Ll][Gg]))\/$/,
  (req, res) => {
    const endpoint = req.params[4];
    const filteredData = db.products.screen.filter((item) =>
      item["name"].toLowerCase().includes(endpoint.toLowerCase())
    );
    if (filteredData.length > 0) {
      res.status(200).json({
        status: 200,
        data: filteredData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Thông tin đang cập nhật!",
      });
    }
  }
);
// /tim-kiem/
server.get(/^\/([Tt][Ii][Mm])-([Kk][Ii][Ee][Mm])\/$/, (req, res) => {
  const { search } = req.body;
  if (!search) {
    res.status(404).json({
      status: 404,
      message: "Chưa điền thông tin",
    });
  }
  const laptop = db.products.laptop.filter((item) =>
    item["name"].toLowerCase().includes(search.toLowerCase())
  );
  const pc = db.products.pc.filter((item) =>
    item["name"].toLowerCase().includes(search.toLowerCase())
  );
  const screen = db.products.screen.filter((item) =>
    item["name"].toLowerCase().includes(search.toLowerCase())
  );
  const linhkien = db.products.linhkien.filter((item) =>
    item["name"].toLowerCase().includes(search.toLowerCase())
  );
  if (
    laptop.length == 0 &&
    pc.length == 0 &&
    screen.length == 0 &&
    linhkien.length == 0
  ) {
    res.status(404).json({
      status: 404,
      message: "Không có dữ liệu cần tìm.",
    });
  } else {
    res.status(200).json({
      status: 200,
      data: {
        laptop: laptop,
        pc: pc,
        screen: screen,
        linhkien: linhkien,
      },
    });
  }
});
// /gio-hang/
server.post("/gio-hang/", (req, res) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    token = authHeader.split(" ")[1];
  }
  let makh;
  if (token) {
    try {
      const data = verifyToken(token);
      const user = db.users.find(
        (user) => user.email === data.email && user.pass === data.pass
      );
      if (user) {
        makh = user.id;
      }
    } catch (err) {
      return res.status(401).json({
        status: 401,
        message: "Token không hợp lệ",
      });
    }
  }
  const {
    shipName,
    shipAddress,
    shipPhone,
    shipNote,
    paymentName,
    paymentAddress,
    paymentPhone,
    paymentNote,
    paymentMethod,
    products,
  } = req.body;
  if (
    !shipName ||
    !shipAddress ||
    !shipPhone ||
    !shipNote ||
    !products.length ||
    !paymentName ||
    !paymentAddress ||
    !paymentPhone ||
    !paymentNote ||
    !paymentMethod
  ) {
    res.status(400).json({
      status: 400,
      message:
        "Vui lòng nhập đầy đủ thông tin.",
    });
  } else {
    const list = {
      laptop: [],
      pc: [],
      screen: [],
      linhkien: [],
    };
    let total = 0;
    products.forEach((element) => {
      let item = db.products[element.type].find(
        (data) => data.id === element.id
      );
      if (item) {
        const { id, name, price } = item;
        const quantity = element.quantity;
        total += quantity * price;
        list[element.type].push({ id, name, price, quantity });
      } else {
        res.status(404).json({
          status: 404,
          message: "Không tìm thấy sản phẩm",
        });
        return;
      }
    });
    let newOrder;
    if (makh) {
      newOrder = {
        mahd: db.orders.length + 1,
        makh,
        shipName,
        shipAddress,
        shipPhone,
        shipNote,
        paymentName,
        paymentAddress,
        paymentPhone,
        paymentNote,
        paymentMethod,
        products: list,
        total,
        status: "pending",
      };
      db.orders.push(newOrder);
    } else {
      newOrder = {
        mahd: db.orders.length + 1,
        shipName,
        shipAddress,
        shipPhone,
        shipNote,
        paymentName,
        paymentAddress,
        paymentPhone,
        paymentNote,
        paymentMethod,
        products: list,
        total,
        status: "pending",
      };
      db.tmp_orders.push(newOrder);
    }
    fs.writeFileSync("./db.json", JSON.stringify(db), () => {
      if (err) return console.log(err);
      console.log("writing to " + fileName);
    });
    res.status(200).json({
      status: 200,
      message: newOrder,
    });
  }
});

// /thanh-vien/
server.post("/thanh-vien/", (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập đầy đủ thông tin.",
    });
  } else {
    if (!isAuthenticated({ email, pass })) {
      res.status(404).json({
        status: 404,
        message: "Tài khoản không tồn tại hoặc mật khẩu không đúng.",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Đăng nhập thành công.",
        access_token: createToken({ email, pass }),
      });
    }
  }
});

server.use("/thanh-vien", (req, res, next) => {
  if (req.url == "/dang-ky/") {
    // Cho phép yêu cầu đến đường dẫn /thanh-vien/dang-ky không yêu cầu xác thực token
    next();
  } else {
    if (
      req.headers.authorization == undefined ||
      req.headers.authorization.split(" ")[0] !== "Bearer"
    ) {
      const status = 401;
      const message = "Bad authorization header";
      res.status(status).json({ status, message });
      return;
    }
    try {
      const user = verifyToken(req.headers.authorization.split(" ")[1]);
      if (user instanceof Error) {
        const status = 401;
        const message = "Error: access_token is not valid";
        res.status(status).json({ status, message });
        return;
      }
      req.user = user; // Thêm thông tin user vào request để sử dụng trong các route sau đó
      next();
    } catch (err) {
      const status = 401;
      const message = "Token không hợp lệ";
      res.status(status).json({ status, message });
    }
  }
});
// /thanh-vien/dang-ky/
server.post("/thanh-vien/dang-ky/", (req, res) => {
  const { name, email, pass } = req.body;
  if (!name || !email || !pass || name == "" || email == "" || pass == "") {
    res.status(400).json({
      status: 400,
      message: "Vui lòng nhập đầy đủ thông tin.",
    });
  } else {
    const bien = db.users.findIndex((user) => user.email === email) !== -1;
    if (!bien) {
      const new_user = {
        id: db.users.length + 1,
        name,
        sdt: "",
        address: "",
        email,
        pass,
      };
      db.users.push(new_user);
      fs.writeFileSync("./db.json", JSON.stringify(db), () => {
        if (err) return console.log(err);
        console.log("writing to " + fileName);
      });
      res.status(201).json({
        status: 201,
        message: "Đăng ký tài khoản thành công.",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "Email đã tồn tại.",
      });
    }
  }
});
// get /thanh-vien/thong-tin-tai-khoan/
server.get("/thanh-vien/thong-tin-tai-khoan/", (req, res) => {
  // Giải mã token
  const data = req.user;
  // Lấy thông tin người dùng từ token
  const { email, pass } = data;
  // Tìm kiếm người dùng trong database và cập nhật thông tin tài khoản
  const user = db.users.find(
    (user) => user.email === email && user.pass === pass
  );
  if (!user) {
    res.status(404).json({
      status: 404,
      message: "Không tìm thấy người dùng",
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: user,
  });
});
// patch /thanh-vien/thong-tin-tai-khoan/
server.patch("/thanh-vien/thong-tin-tai-khoan/", (req, res) => {
  const { name, sdt, address } = req.body;
  // Giải mã token
  const data = req.user;
  // Lấy thông tin người dùng từ token
  const { email, pass } = data;
  // Tìm kiếm người dùng trong database và cập nhật thông tin tài khoản
  const user = db.users.find(
    (user) => user.email === email && user.pass === pass
  );
  if (!user) {
    res.status(404).json({
      status: 404,
      message: "Không tìm thấy người dùng",
    });
    return;
  }
  user.name = !name ? "" : name;
  user.sdt = !sdt ? "" : sdt;
  user.address = !address ? "" : address;
  fs.writeFileSync("./db.json", JSON.stringify(db), () => {
    if (err) return console.log(err);
    console.log("writing to " + fileName);
  });
  res.status(200).json({
    status: 200,
    message: "Cập nhật thông tin tài khoản thành công",
  });
});

// /thanh-vien/thay-doi-mat-khau/
server.patch("/thanh-vien/thay-doi-mat-khau/", (req, res) => {
  const { pass } = req.body;
  // Giải mã token
  const data = req.user;
  // Lấy thông tin người dùng từ token
  const { email } = data;
  // Tìm kiếm người dùng trong database và cập nhật thông tin tài khoản
  const user = db.users.find((user) => user.email === email);
  if (!user) {
    res.status(404).json({
      status: 404,
      message: "Không tìm thấy người dùng",
    });
    return;
  }
  if (!pass) {
    res.status(400).json({
      status: 400,
      message: "Chưa nhập mật khẩu",
    });
  } else {
    user.pass = pass;
    fs.writeFileSync("./db.json", JSON.stringify(db), () => {
      if (err) return console.log(err);
      console.log("writing to " + fileName);
    });
    res.status(200).json({
      status: 200,
      message: "Cập nhật mật khẩu thành công",
      new_access_token: createToken({ email, pass }),
    });
  }
});

// /thanh-vien/danh-sach-yeu-thich/
server.get("/thanh-vien/danh-sach-yeu-thich/", (req, res) => {
  // Giải mã token
  const data = req.user;
  // Lấy thông tin người dùng từ token
  const { email, pass } = data;
  // Tìm kiếm người dùng trong database
  const user = db.users.find(
    (user) => user.email === email && user.pass === pass
  );
  if (!user) {
    res.status(404).json({
      status: 404,
      message: "Không tìm thấy người dùng",
    });
    return;
  }
  const makh = user.id;
  const favourite = db.favourite.find((data) => data.makh === makh);
  const list = {
    laptop: [],
    pc: [],
    screen: [],
    linhkien: [],
  };
  if (favourite && favourite.data) {
    favourite.data.forEach((element) => {
      let product = db.products[element.type].find(
        (item) => item.id === element.id
      );
      if (product) {
        list[element.type].push(product);
      }
    });
    res.status(200).json({
      status: 200,
      data: list,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Không có danh sách yêu thích",
    });
  }
});

// /thanh-vien/danh-sach-yeu-thich/
server.post("/thanh-vien/danh-sach-yeu-thich/", (req, res) => {
  const { id, type } = req.body;
  if (!id || !type || type == "" || id == "") {
    res.status(400).json({
      status: 400,
      message: "Vui lòng điền đầy đủ thông tin",
    });
    return;
  }
  // Giải mã token
  const data = req.user;
  // Lấy thông tin người dùng từ token
  const { email, pass } = data;
  // Tìm kiếm người dùng trong database
  const user = db.users.find(
    (user) => user.email === email && user.pass === pass
  );
  if (!user) {
    res.status(404).json({
      status: 404,
      message: "Không tìm thấy người dùng",
    });
    return;
  }
  const makh = user.id;
  if (!db.products[type]) {
    res.status(400).json({
      status: 400,
      message: "Vui lòng điền thông tin chính xác",
    });
    return;
  }
  const product = db.products[type].find((value) => value.id === id);
  if (!product) {
    res.status(400).json({
      status: 400,
      message: "Không tồn tại",
    });
    return;
  }
  const favourite = db.favourite.find((data) => data.makh === makh);
  if (!favourite) {
    let item = {
      makh,
      data: [
        {
          id,
          type,
        },
      ],
    };
    db.favourite.push(item);
  } else {
    const check = favourite.data.find(
      (item) => item.id === id && item.type === type
    );
    if (!check) {
      let item = {
        id,
        type,
      };
      favourite.data.push(item);
    } else {
      res.status(400).json({
        status: 400,
        message: "Đã tồn tại",
      });
    }
  }
  fs.writeFileSync("./db.json", JSON.stringify(db), () => {
    if (err) return console.log(err);
    console.log("writing to " + fileName);
  });
  res.status(200).json({
    status: 200,
    message: "Thêm thành công",
  });
});
server.delete("/thanh-vien/danh-sach-yeu-thich/", (req, res) => {
  const { id, type } = req.body;
  if (!id || !type || type == "" || id == "") {
    res.status(400).json({
      status: 400,
      message: "Vui lòng điền đầy đủ thông tin",
    });
    return;
  }
  // Giải mã token
  const data = req.user;
  // Lấy thông tin người dùng từ token
  const { email, pass } = data;
  // Tìm kiếm người dùng trong database
  const user = db.users.find(
    (user) => user.email === email && user.pass === pass
  );
  if (!user) {
    res.status(404).json({
      status: 404,
      message: "Không tìm thấy người dùng",
    });
    return;
  }
  const makh = user.id;
  const favourite = db.favourite.find((data) => data.makh === makh);
  if (!favourite) {
    res.status(404).json({
      status: 404,
      message: "Không tồn tại sản phẩm yêu thích",
    });
    return;
  }
  const index = favourite.data.findIndex(
    (element) => element.id === id && element.type === type
  );
  if (index === -1) {
    res.status(404).json({
      status: 404,
      message: "Không tìm thấy sản phẩm trong danh sách yêu thích",
    });
    return;
  }
  favourite.data.splice(index, 1);
  fs.writeFileSync("./db.json", JSON.stringify(db), () => {
    if (err) return console.log(err);
    console.log("writing to " + fileName);
  });
  res.status(200).json({
    status: 200,
    message: "Đã xóa sản phẩm khỏi danh sách yêu thích",
  });
});
server.get("/thanh-vien/don-hang-da-dat/", (req, res) => {
  // Giải mã token
  const data = req.user;
  // Lấy thông tin người dùng từ token
  const { email, pass } = data;
  // Tìm kiếm người dùng trong database
  const user = db.users.find(
    (user) => user.email === email && user.pass === pass
  );
  if (!user) {
    res.status(404).json({
      status: 404,
      message: "Không tìm thấy người dùng",
    });
    return;
  }
  const makh = user.id;
  const order = db.orders.filter((item) => item.makh === makh);
  res.status(order.length > 0 ? 200 : 404).json({
    status: order.length > 0 ? 200 : 404,
    data: order.length > 0 ? order : "Không có đơn đặt",
  });
});
server.use(router);
server.listen(PORT, () => {
  console.log("Run Server Api Emulator");
});
