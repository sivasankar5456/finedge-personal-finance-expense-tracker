const fs = require("fs/promises");
const path = require("path");

exports.saveReport = async (data) => {
  const dir = path.join(__dirname, "../data");

  await fs.mkdir(dir, { recursive: true });

  const filePath = path.join(dir, "summary-report.json");

  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// const fs = require("fs/promises");
// const path = require("path");

// exports.saveReport = async (data) => {
//   const filePath = path.join(__dirname, "../data/summary-report.json");

//   await fs.writeFile(filePath, JSON.stringify(data, null, 2));
// };