const fs = require("fs-extra");

const listFolderCopy = [
  {
    sourceDirectory: "public",
    targetDirectory: "dist/public",
  },
  {
    sourceDirectory: "views",
    targetDirectory: "dist/views",
  },
];

listFolderCopy.forEach((item) => {
  fs.copy(item.sourceDirectory, item.targetDirectory, (err) => {
    if (err) {
      console.log(`Lỗi sao chép thư mục ${item.sourceDirectory}`);
    } else {
      console.log(`Sao chép thành công thư mục ${item.sourceDirectory}`);
    }
  });
});
