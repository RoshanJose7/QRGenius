import QRCodeStyling, {
  DotType,
  FileExtension,
  CornerDotType,
  CornerSquareType,
} from "qr-code-styling";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import "./styles.css";

export default function App() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [qrCode, setQrCode] = useState(
    new QRCodeStyling({
      width: 300,
      height: 300,
      data: "https://google.co.in",
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
        hideBackgroundDots: true,
        imageSize: 0.4,
      },
      dotsOptions: { type: "classy", color: "#7D23E0" },
      backgroundOptions: { color: "#ffffff" },
      cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
      cornersDotOptions: { type: "square", color: "#000000" },
    })
  );

  useEffect(() => {
    qrCode.append(ref.current!);
  }, [qrCode]);

  // URL Options
  const [url, setUrl] = useState("https://google.co.in");

  const onUrlChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUrl(event.target.value);

    setQrCode((prev) => {
      prev.update({
        data: event.target.value,
      });

      return prev;
    });
  };

  // QR Code Options
  const [dotType, setDotType] = useState<DotType>("classy");
  const [dotColor, setDotColor] = useState<string>("#7D23E0");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [cornerSquareType, setCornerSquareType] =
    useState<CornerSquareType>("square");
  const [cornerSquareColor, setCornerSquareColor] = useState<string>("#000000");
  const [cornerDotType, setCornerDotType] = useState<CornerDotType>("square");
  const [cornerDotColor, setCornerDotColor] = useState<string>("#000000");

  const onDotTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setDotType(event.target.value as DotType);

    setQrCode((prev) => {
      prev.update({
        dotsOptions: {
          type: event.target.value as DotType,
        },
      });

      return prev;
    });
  };

  const onDotColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDotColor(event.target.value as string);

    setQrCode((prev) => {
      prev.update({
        dotsOptions: {
          color: event.target.value as string,
        },
      });

      return prev;
    });
  };

  const onBackgroundColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setBackgroundColor(event.target.value as string);

    setQrCode((prev) => {
      prev.update({
        backgroundOptions: { color: event.target.value as string },
      });

      return prev;
    });
  };

  const onCornerSquareTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setCornerSquareType(event.target.value as CornerSquareType);

    setQrCode((prev) => {
      prev.update({
        cornersSquareOptions: { type: event.target.value as CornerSquareType },
      });

      return prev;
    });
  };

  const onCornerSquareColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCornerSquareColor(event.target.value as string);

    setQrCode((prev) => {
      prev.update({
        cornersSquareOptions: {
          color: event.target.value as string,
        },
      });

      return prev;
    });
  };

  const onCornerDotTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setCornerDotType(event.target.value as CornerDotType);

    setQrCode((prev) => {
      prev.update({
        cornersDotOptions: { type: event.target.value as CornerDotType },
      });

      return prev;
    });
  };

  const onCornerDotColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCornerDotColor(event.target.value as string);

    setQrCode((prev) => {
      prev.update({
        cornersDotOptions: {
          color: event.target.value as string,
        },
      });

      return prev;
    });
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

  return (
    <div className="main">
      <div style={styles.inputWrapper}>
        <div className="options">
          <h4>URL Options</h4>

          <label htmlFor="url-input-value">Link to Redirect</label>
          <input
            name="url-input-value"
            value={url}
            onChange={onUrlChange}
            style={styles.inputBox}
          />
        </div>

        <div className="options">
          <h4>QR Code Options</h4>

          <div>
            <label htmlFor="dot-type">Dot Options </label>
            <select name="dot-type" onChange={onDotTypeChange} value={dotType}>
              <option value="dots">Dots</option>
              <option value="rounded">Rounded</option>
              <option value="classy">Classy</option>
              <option value="classy-rounded">Classy Rounded</option>
              <option value="square">Square</option>
              <option value="extra-rounded">Extra Rounded</option>
            </select>
          </div>

          <div>
            <label htmlFor="dot-color">Dot Color </label>
            <input
              type="color"
              name="dot-color"
              onChange={onDotColorChange}
              value={dotColor}
            />
          </div>

          <div>
            <label htmlFor="background-color">Background Color </label>
            <input
              type="color"
              name="background-color"
              onChange={onBackgroundColorChange}
              value={backgroundColor}
            />
          </div>

          <div>
            <label htmlFor="corner-square-type">Corner Square Type </label>
            <select
              name="corner-square-type"
              onChange={onCornerSquareTypeChange}
              value={cornerSquareType}
            >
              <option value="dot">Dot</option>
              <option value="square">Square</option>
              <option value="extra-rounded">Extra Rounded</option>
            </select>
          </div>

          <div>
            <label htmlFor="corner-square-color">Corner Square Color </label>
            <input
              type="color"
              name="corner-square-color"
              onChange={onCornerSquareColorChange}
              value={cornerSquareColor}
            />
          </div>

          <div>
            <label htmlFor="corner-dot-type">Corner Dot Type </label>
            <select
              name="corner-dot-type"
              onChange={onCornerDotTypeChange}
              value={cornerDotType}
            >
              <option value="dot">Dot</option>
              <option value="square">Square</option>
            </select>
          </div>

          <div>
            <label htmlFor="corner-dot-color">Corner Dot Color </label>
            <input
              type="color"
              name="corner-square-color"
              onChange={onCornerDotColorChange}
              value={cornerDotColor}
            />
          </div>
        </div>

        <div className="options">
          <h4>Download Options</h4>
          <label htmlFor="download-options-file-extension">
            File Download Options
          </label>

          <div style={styles.inputBox}>
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
    marginTop: "10px",
  },
};
