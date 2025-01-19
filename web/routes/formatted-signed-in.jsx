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
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(e.target.files[0]);
  }

  const handleUploadClick = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
    }
  }

  const fetchColors = async () => {
    const result = await api.getColoursOpenAI(numColors, imageLink);
    const hex = result.colors;
    setHexCodes(hex);
  }

  return user ? (
    
    <div class="main-container">
      <div class="header-wrapper">
        <div class="logo-container">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e66b1653aad8ffe3935861202cf3d75a76bbda35427e11a0b7a09fafaae4f3ce?apiKey=696a48145760452eabc599d3e4bd878b&" class="logo" alt="Chameleon Logo" />
          <div class="brand-name">Chameleon</div>
        </div>
        <div class="nav-container">
          <div class="nav-link" tabindex="0">My Palettes</div>
          <button class="account-btn" aria-label="Account">Account</button>
        </div>
      </div>
      <div class="divider"></div>
      <div class="content-wrapper">
        <div class="hero-section">
          <div class="hero-text">
            <div class="text-content">
              <h1 class="hero-title">
                Generate a<br />
                <span class="accent-text">Colour Palette</span><br />
                From Image
              </h1>
              <p class="hero-description">
                Turn your image into a beautiful, AI-curated color palette within seconds.
              </p>
            </div>
          </div>
          <div class="upload-section">
            <div class="dropzone" tabindex="0" role="button" aria-label="Upload image area">
              <div class="upload-content">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/35575fe51aef6fc8409a8c9af5b79db63acccb1d85b19a0a4b7b8af4d3bb2922?apiKey=696a48145760452eabc599d3e4bd878b&" class="upload-icon" alt="Upload icon" />
                <div class="upload-text">Drag & Drop Image Here</div>
                <button class="browse-btn" aria-label="Browse Files">Browse Files</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gallery-header">
        <h2 class="gallery-title">Previous Palettes</h2>
        <button class="gallery-link" aria-label="See all palettes">See all &gt;</button>
      </div>
      <div class="gallery-container">
        <div class="gallery-grid">
          <div class="gallery-item">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ba1832db56121cb07ca0b76824745f51d746e173545c1e59ca5190fdce380fa?apiKey=696a48145760452eabc599d3e4bd878b&" class="gallery-image" alt="Color palette preview 1" />
          </div>
          <div class="gallery-item">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d245a85b99183b69be2bccd4e2d12a27fac0255269963b3a581202f057566106?apiKey=696a48145760452eabc599d3e4bd878b&" class="gallery-image" alt="Color palette preview 2" />
          </div>
          <div class="gallery-item">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/10250a3b6bf1a9a8e09a26daf7e56395fa00ef31df9631edb717e213d4a37db5?apiKey=696a48145760452eabc599d3e4bd878b&" class="gallery-image" alt="Color palette preview 3" />
          </div>
        </div>
        <strong>Actions:</strong>
          <Link to="/change-password">Change password</Link>
          <a onClick={signOut}>
            Sign Out
          </a>
      </div>
    </div>

        ) : null;
}
      