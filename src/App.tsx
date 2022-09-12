import QRCodeStyling, {
  DotType,
  FileExtension,
  CornerDotType,
  CornerSquareType,
} from "qr-code-styling";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import "./styles.css";

const qrCode = new QRCodeStyling({
  width: 500,
  height: 500,
  data: "https://ostello.co.in",
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
    hideBackgroundDots: true,
    imageSize: 0.4,
  },
  dotsOptions: { type: "classy", color: "#7D23E0" },
  backgroundOptions: { color: "#ffffff" },
  cornersSquareOptions: { type: "dot", color: "#000000" },
  cornersDotOptions: { type: "square", color: "#000000" },
});

export default function App() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    qrCode.append(ref.current!);
  }, []);

  function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // URL Options
  const [url, setUrl] = useState("https://ostello.co.in");

  const onUrlChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  // Image Options
  const [imageFile, setImageFile] = useState<string>("");
  const [imageSize, setImageSize] = useState<number>(0.4);
  const [imageMargin, setImageMargin] = useState<number>(0);

  const onImageFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setImageFile(await fileToDataURL(event.target.files![0]));
  };

  const onImageSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setImageSize(Number.parseInt(event.target.value));
  };

  const onImageMarginChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setImageMargin(Number.parseInt(event.target.value));
  };

  // Dot Options
  const [dotType, setDotType] = useState<string>("classy");
  const [dotColor, setDotColor] = useState<string>("#7D23E0");

  const onDotTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setDotType(event.target.value);
  };

  const onDotColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDotColor(event.target.value);
  };

  // Background Options
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");

  const onBackgroundColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setBackgroundColor(event.target.value);
  };

  // Corner Square Options
  const [cornerSquareType, setCornerSquareType] = useState<string>("dot");
  const [cornerSquareColor, setCornerSquareColor] = useState<string>("#000000");

  const onCornerSquareTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setCornerSquareType(event.target.value);
  };

  const onCornerSquareColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCornerSquareColor(event.target.value);
  };

  // Corner Dot Options
  const [cornerDotType, setCornerDotType] = useState<string>("square");
  const [cornerDotColor, setCornerDotColor] = useState<string>("#000000");

  const onCornerDotTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setCornerDotType(event.target.value);
  };

  const onCornerDotColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCornerDotColor(event.target.value);
  };

  // Download Options
  const [fileExt, setFileExt] = useState<FileExtension>("png");

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as FileExtension);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  useEffect(() => {
    qrCode.update({
      data: url,
      image: imageFile,
      imageOptions: {
        margin: imageMargin,
        imageSize: imageSize,
      },
      dotsOptions: { type: dotType as DotType, color: dotColor },
      backgroundOptions: { color: backgroundColor },
      cornersSquareOptions: {
        type: cornerSquareType as CornerSquareType,
        color: cornerSquareColor,
      },
      cornersDotOptions: {
        type: cornerDotType as CornerDotType,
        color: cornerDotColor,
      },
    });
  }, [
    url,
    imageFile,
    imageMargin,
    imageSize,
    dotType,
    dotColor,
    backgroundColor,
    cornerSquareType,
    cornerSquareColor,
    cornerDotType,
    cornerDotColor,
  ]);

  return (
    <div className="main">
      <div style={styles.inputWrapper}>
        <div className="url-options">
          <h4>URL Options</h4>

          <label htmlFor="url-input-value">Link to Redirect</label>
          <input
            name="url-input-value"
            value={url}
            onChange={onUrlChange}
            style={styles.inputBox}
          />
        </div>

        <div className="image-options">
          <h4>Image Options</h4>

          <label htmlFor="image-file">Image File</label>
          <input name="image-file" type="file" onChange={onImageFileChange} />

          <label htmlFor="image-size">Image Size</label>
          <input
            name="image-size"
            value={imageSize}
            type="range"
            min="0.1"
            max="1"
            onChange={onImageSizeChange}
          />

          <label htmlFor="image-margin">Image Margin</label>
          <input
            name="image-margin"
            value={imageMargin}
            type="range"
            min="0"
            max="20"
            onChange={onImageMarginChange}
          />
        </div>

        <div className="dot-options">
          <h4>Dot Options</h4>

          <label htmlFor="dot-type">Dot Type</label>
          <select name="dot-type" onChange={onDotTypeChange} value={dotType}>
            <option value="classy">Classy</option>
            <option value="dots">Dots</option>
            <option value="rounded">Rounded</option>
            <option value="classy-rounded">Classy Rounder</option>
            <option value="square">Square</option>
            <option value="extra-rounded">Extra Rounded</option>
          </select>

          <label htmlFor="dot-color">Dot Color</label>
          <input
            value={dotColor}
            name="dot-color"
            type="color"
            onChange={onDotColorChange}
          />
        </div>

        <div className="background-options">
          <h4>Background Options</h4>

          <label htmlFor="background-color">Background Color</label>
          <input
            name="background-color"
            type="color"
            value={backgroundColor}
            onChange={onBackgroundColorChange}
          />
        </div>

        <div className="corner-square-options">
          <h4>Corner Square Options</h4>

          <label htmlFor="corner-square-type">Corner Square Type</label>
          <select
            name="corner-square-type"
            onChange={onCornerSquareTypeChange}
            value={cornerSquareType}
          >
            <option value="dot">Classy</option>
            <option value="square">Square</option>
            <option value="extra-rounded">Extra Rounder</option>
          </select>

          <label htmlFor="corner-square-color">Corner Square Color</label>
          <input
            name="corner-square-color"
            type="color"
            value={cornerSquareColor}
            onChange={onCornerSquareColorChange}
          />
        </div>

        <div className="corner-dot-options">
          <h4>Corner Dot Options</h4>

          <label htmlFor="corner-dot-type">Corner Dot Type</label>
          <select
            name="corner-dot-type"
            onChange={onCornerDotTypeChange}
            value={cornerDotType}
          >
            <option value="dot">Classy</option>
            <option value="square">Square</option>
          </select>

          <label htmlFor="corner-dot-color">Corner Dot Color</label>
          <input
            name="corner-dot-color"
            type="color"
            value={cornerDotColor}
            onChange={onCornerDotColorChange}
          />
        </div>

        <div className="download-options">
          <h4>Download Options</h4>

          <label htmlFor="download-options-file-extension">
            File Download Options
          </label>
          <select
            name="download-options-file-extension"
            onChange={onExtensionChange}
            value={fileExt}
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>

          <button onClick={onDownloadClick}>Download</button>
        </div>
      </div>

      <div className="canvas" ref={ref} />
    </div>
  );
}

const styles = {
  inputWrapper: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "95%",
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20,
  },
};
