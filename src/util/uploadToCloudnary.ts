export const uploadToCloudinary = async (pics: any) => {
  const cloud_name = "dxoqwusir"; // Cloudinary account name
  
  if (!pics) {
    console.log("No image provided.");
    return null; // Early return if no picture is provided
  }

  try {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "ml_default"); // Ensure the preset is valid in the Cloudinary account
    data.append("cloud_name", cloud_name);

    // Log the request data to see what is being sent
    console.log("Uploading to Cloudinary with data:", data);

    // Send the upload request
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: data,
    });

    // Log the response status to ensure the request goes through
    console.log("Response status:", res.status);

    if (!res.ok) {
      throw new Error(`Cloudinary upload failed with status: ${res.status}`);
    }

    // Parse the response JSON
    const fileData = await res.json();
    console.log("Cloudinary response:", fileData);

    // Check if the fileData has the secure_url
    if (fileData.secure_url) {
      console.log("Uploaded image URL:", fileData.secure_url);
      return fileData.secure_url; // Return the image URL
    } else {
      console.error("No URL returned from Cloudinary.");
      return null;
    }

  } catch (error) {
    console.error("Error during Cloudinary upload:", error);
    return null;
  }
};
