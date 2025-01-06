import doenv from "dotenv";

doenv.config();
function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const fileUrl = `http://${process.env.HOST}:${process.env.PORT}/uploads/${req.file.filename}`;
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
}

const uploadMultipleFiles = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const fileUrls = req.files.map(
      (file) =>
        `http://${process.env.HOST}:${process.env.PORT}/uploads/${file.filename}`
    );
    res.status(200).json({ urls: fileUrls });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading files", error: error.message });
  }
};

module.exports = { uploadFile, uploadMultipleFiles };
