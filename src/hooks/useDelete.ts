import axios from "axios";

export async function deleteImage(keyMain: string) {
  console.log(keyMain);

  const [userId, key] = keyMain.split("/");

  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:3001/images/${userId}/${key}`, // Correct URL
    });
    console.log(response.data.message); // Success message
    alert("File deleted successfully!");
  } catch (error) {
    console.error("Error deleting file:", error);
    alert("Failed to delete the file.");
  }
}
