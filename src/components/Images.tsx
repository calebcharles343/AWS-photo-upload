import { ChangeEvent, useEffect, useState } from "react";
import Image from "./Image";
import useMutation from "../hooks/useMutation";
import useQuery from "../hooks/useQuery";
import { ImageUrls } from "../interfaces";
import ErrorMessage from "./ErrorMessage";

const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

export default function Images() {
  const [errorFile, setErrorFile] = useState<string>();
  const [urls, setUrls] = useState<ImageUrls | null>();

  const headers = {
    "x-user-id": "123",
    "Content-Type": "multipart/form-data",
  };

  const {
    mutate: upLoadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation();

  const {
    data: images,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useQuery<ImageUrls>(
    "https://backend-aws-a3-bucket.onrender.com/images",
    "GET",
    headers
  );

  useEffect(() => {
    setUrls(images);
  }, [refetch]);

  console.log(images?.urls);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file); // Log the first uploaded file

      // Check if the file type is valid
      if (!validFileTypes.includes(file.type)) {
        setErrorFile("File must be in JPG, JPEG, or PNG format.");
        return;
      }

      // Reset error if file is valid
      setErrorFile("");

      // Prepare FormData
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Use mutate function to trigger the upload process
        await upLoadImage(
          "https://backend-aws-a3-bucket.onrender.com/images",
          "POST",
          formData,
          headers
        );

        refetch();
      } catch (err) {
        setErrorFile("An error occurred while uploading the file.");
      }
    }
  };
  return (
    <div className="max-w-[800px] flex flex-col items-center justify-center p-4 gap-4">
      {/* Hidden file input */}
      <input
        id="imageInput"
        type="file"
        className="hidden"
        onChange={handleUpload}
      />

      {/* Upload button */}
      <label
        htmlFor="imageInput"
        className="flex items-center justify-center border border-solid border-white p-2 rounded-lg cursor-pointer w-32 md:w-28 sm:w-24"
      >
        {uploading ? "..." : "Upload"}
      </label>

      {/* Error messages */}
      {errorFile && <ErrorMessage>{errorFile}</ErrorMessage>}
      {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}

      {/* Posts header */}
      <p className="self-start text-lg font-medium md:text-base sm:text-sm">
        Posts
      </p>

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {fetchError && <ErrorMessage>Failed to load images</ErrorMessage>}
        {isFetching && <h1>Loading...</h1>}
        {images &&
          urls?.urls.map((url: { url: string; key: string }) => (
            <Image key={url.key} url={url} refetch={refetch} />
          ))}
      </div>
    </div>
  );
}
