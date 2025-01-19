import { useUser, useSignOut } from "@gadgetinc/react";
import { api } from "../api";
import { Link } from "react-router";
import { useState } from "react";

export default function () {
  const user = useUser(api);
  const signOut = useSignOut();
  const [hexCodes, setHexCodes] = useState([]);
  const numColors = 5;
  const imageLink = "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (event) => {
    setImageFile(e.target.files[0]);
  }

  const handleUploadClick = () => {
    if (imageFile) {
      let imageB64 = btoa(imageFile);

      
      // const formData = new FormData();
      // formData.append("file", imageFile);
    }
  }

  const fetchColors = async () => {
    const result = await api.getColoursOpenAI(numColors, imageLink);
    const hex = result.colors;
    setHexCodes(hex);
  }

  return user ? (
    <>
      <div className="main-page">
        <div id="title">
          <h3 className="white-text">Generate a</h3>
          <h3 className="peach-text">Colour Palette</h3>
          <h3 className="white-text">From Image</h3>
        </div>
        <div className ="dropbox-background"></div>
      </div>
      <div>
        <p className="description" style={{ width: "100%" }}>
          Start building your app&apos;s signed in area
        </p>
        <a href="/edit/files/web/routes/signed-in.jsx" target="_blank" rel="noreferrer" style={{ fontWeight: 500 }}>
          web/routes/signed-in.jsx
        </a>
      </div>
      <div className="card-stack">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUploadClick}>Upload!</button>

        <div className="flex-vertical gap-4px">
          <button onClick={fetchColors}>do colour</button>
          <div id="colours">
            {hexCodes.map((hexCode, index) => (
              <div className="colour"
                key={index}
                style={{ backgroundColor: hexCode }}></div>
            ))}
          </div>
          <strong>Actions:</strong>
          <Link to="/change-password">Change password</Link>
          <a onClick={signOut}>
            Sign Out
          </a>
        </div>
      </div>
    </>
  ) : null;
}
