export const resizeImage = (
  imgSrc: string,
  maxDimension: number
): Promise<string> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.onload = () => {
      const resizeFactor =
        Math.min(maxDimension / image.height, maxDimension / image.width) *
        0.99;
      const width = image.width * resizeFactor;
      const height = image.height * resizeFactor;

      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(image, 0, 0, width, height);

      canvas.toBlob(blob => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          resolve(blobUrl);
        } else reject(`Could not retrieve blob.`);
      });
    };

    image.src = imgSrc;
  });
