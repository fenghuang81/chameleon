import { useUser, useSignOut } from "@gadgetinc/react";
import { api } from "../api";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "../components/App.css"

export default function SignedIn () {
  const user = useUser(api);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imageB64, setImageB64] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageB64(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    if (file) {
      navigate('/palette-generator', { state: { image: file } });
      /*
      const reader = new FileReader();
      // reader.onload = () => {
      //   console.log("thing");
      //   setImageB64(reader.result);
      //   console.log(reader.result);
      // };
      // reader.readAsDataURL(file);
      // <Link to={'/palette-generator'} state={{ imageB64 }}></Link>
      reader.onload = () => {
        const base64Image = reader.result;
        setImageB64(base64Image);
        // navigate('/palette-generator', { state: { image: file } });
      };
      reader.readAsDataURL(file);
      */
    }
  }

  /*const handleUploadClick = () => {
    
    if (imageFile) {
      let imageB64 = btoa(imageFile);
      //<Link to="/palette-generator"></Link>

      // const formData = new FormData();
      // formData.append("file", imageFile);
    }
  }*/

  const handleSeeAllClick = () => {
    <Link to="/palette-generator"></Link>
  }



  return user ? (
    <div className="content-wrapper">

      <div className="hero-section">
        <div className="hero-text">
          <div className="text-content">
            <h1 className="hero-title">
              Generate a<br />
              <span className="accent-text">Colour Palette</span><br />
              From Image
            </h1>

            <p className="hero-description">
              Turn your image into a beautiful, AI-curated color palette within seconds.
            </p>
          </div>
        </div>
        <div className="upload-section">
          <div className="dropzone" tabindex="0" role="button" aria-label="Upload image area">
            <div className="upload-content">
              <img loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/35575fe51aef6fc8409a8c9af5b79db63acccb1d85b19a0a4b7b8af4d3bb2922?apiKey=696a48145760452eabc599d3e4bd878b&"
                className="upload-icon" alt="Upload icon" />
              <div className="upload-text">Drag & Drop Image Here</div>
              {/* <button
                  className="browse-btn"
                  aria-label="Browse Files"
                  onClick={() => document.getElementById('photo').click()}
                  style={{ color: '#555151',
                         backgroundColor: 'rgb(133, 174, 98, 0.2)', 
                          marginTop : '20px',
                          padding: '26px 32px' }}
                >
                  Browse Files
                </button> */}
                <Link to={"/palette-generator"}className="browse-btn"
                  aria-label="Browse Files"
                  style={{ color: '#555151',
                         backgroundColor: 'rgb(133, 174, 98, 0.2)', 
                          marginTop : '20px',
                          padding: '26px 32px' }}
                >
                  Browse Files
                
                </Link>
              <input type="file" id="photo" name="photo" accept="image/*" style={{ display: 'none' }} onChange={handleUploadClick}></input>
            </div>
          </div>
        </div>
      </div>


      <div className="gallery-header">
        <h2 className="gallery-title">Previous Palettes</h2>
        <Link to="/my-palettes" className="gallery-link">See all &gt;</Link>
      </div>
      <div className="gallery-container">
            <img loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ba1832db56121cb07ca0b76824745f51d746e173545c1e59ca5190fdce380fa?apiKey=696a48145760452eabc599d3e4bd878b&"
              className="gallery-image" alt="Color palette preview 1" />
            <img loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d245a85b99183b69be2bccd4e2d12a27fac0255269963b3a581202f057566106?apiKey=696a48145760452eabc599d3e4bd878b&"
              className="gallery-image" alt="Color palette preview 2" />
            <img loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/10250a3b6bf1a9a8e09a26daf7e56395fa00ef31df9631edb717e213d4a37db5?apiKey=696a48145760452eabc599d3e4bd878b&"
              className="gallery-image" alt="Color palette preview 3" />
      </div>

    </div>
  ) : null;
}