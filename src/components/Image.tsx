import { deleteImage } from "../hooks/useDelete";
import { ImageProps } from "../interfaces";

export default function Image({ url, refetch }: ImageProps) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this file?")) {
      await deleteImage(url.key); // Call delete function

      refetch();
    }
  };

  return (
    <div className="relative h-56 w-56">
      <img className="h-full w-full " src={url.url} alt="image" />
      <button
        className="absolute bottom-full left-full cursor-pointer text-red-500"
        onClick={handleDelete}
      >
        x
      </button>
    </div>
  );
}
//object-cover
