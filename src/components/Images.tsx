import { ChangeEvent, useEffect, useState } from "react";
import Image from "./Image";
import useMutation from "../hooks/useMutation";
import useQuery from "../hooks/useQuery";
import { ImageUrls } from "../interfaces";
import ErrorMessage from "./ErrorMessage";

export default function Images() {
  const [errorFile, setErrorFile] = useState<string>();
  const [urls, setUrls] = useState<ImageUrls | null>();
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

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
      <input
        id="imageInput"
        type="file"
        className="hidden"
        onChange={handleUpload}
      />

      <label
        htmlFor="imageInput"
        className="flex items-center justify-center border border-solid border-white p-2 rounded-lg cursor-pointer w-32 md:w-28 sm:w-24"
      >
        {uploading ? "..." : "Upload"}
      </label>

      {errorFile && <ErrorMessage>{errorFile}</ErrorMessage>}
      {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}

      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl">
          Image file upload with AWS S3 Bucket, NodeJS and React
        </p>

        <p className="self-start text-lg font-extrabold md:text-base sm:text-lg">
          Posts
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full">
          {fetchError && <ErrorMessage>Failed to load images</ErrorMessage>}
          {isFetching && (
            <h1 className="self-center">
              Loading... 'Please wait. For every first request, there is a
              45-second delay for the backend deployed on the free plan of
              Render.com. Thank you'
            </h1>
          )}
          {images &&
            urls?.urls.map((url: { url: string; key: string }) => (
              <Image key={url.key} url={url} refetch={refetch} />
            ))}
        </div>
      </div>
    </div>
  );
}
