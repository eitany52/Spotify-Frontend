import React, { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

const ImageColorComponent = ({ imageUrl, onColorChange }) => {
  useEffect(() => {
    const fac = new FastAverageColor();

    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = imageUrl;

    fetch(proxyUrl + targetUrl, {
      headers: {
        "x-requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.crossOrigin = "Anonymous";

        img.onload = () => {
          fac
            .getColorAsync(img)
            .then((color) => {
              onColorChange({
                backgroundColor: color.rgba,
                color: color.isDark ? "#fff" : "#000",
              });
            })
            .catch((e) => {
              console.error(e);
            });
        };
      })
      .catch((error) => {
        console.error("Error fetching the image:", error);
      });
  }, [imageUrl]);

  return (
    <div>
      <img src={imageUrl} alt="Example" style={{ display: "none" }} />
    </div>
  );
};

export default ImageColorComponent;
