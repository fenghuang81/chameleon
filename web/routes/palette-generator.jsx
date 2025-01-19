import { useUser, useSignOut } from "@gadgetinc/react";
import { api } from "../api";
import { Link } from "react-router";
import { useState } from "react";
//import { useLocation } from 'react-router';

export default function () {
  const user = useUser(api);
  const [hexCodes, setHexCodes] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageB64, setImageB64] = useState(null);

  //const { state } = useLocation();
  //const { imageB64 } = state || {};

  const numColors = 10;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('REACHED');
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log("thing");
        setImageB64(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }



  const fetchColors = async () => {
    if (!imageB64) {
      console.log("No Image Loaded.");
    }
    const result = await api.getColoursOpenAI({ image: imageB64, numColours: numColors, });
    if (result.hexColors && result.hexColors.colors) {
      const hex = result.hexColors.colors;
      setHexCodes(hex);
    }
  }
  return user ? (

    <div id="paletteContainer">
      <div id="topText">
        <div id="replaceimage">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <g clip-path="url(#clip0_38_249)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.125 3.5C20.125 2.05026 18.9498 0.875 17.5 0.875H3.5C2.05026 0.875 0.875 2.05026 0.875 3.5V17.5C0.875 18.9498 2.05026 20.125 3.5 20.125H17.5C18.9498 20.125 20.125 18.9498 20.125 17.5V3.5ZM18.375 3.5C18.375 3.01675 17.9833 2.625 17.5 2.625H3.5C3.01675 2.625 2.625 3.01675 2.625 3.5V17.5C2.625 17.9833 3.01675 18.375 3.5 18.375H17.5C17.9833 18.375 18.375 17.9833 18.375 17.5V3.5Z" fill="#EFEFEE" />
              <path d="M4.20583 15.331L7.98185 8.40829C8.31349 7.80029 9.18655 7.80029 9.51817 8.40829L12.2907 13.4913L13.2403 11.8295C13.5762 11.2417 14.4238 11.2417 14.7597 11.8295L16.752 15.3159C17.0853 15.8992 16.664 16.625 15.9922 16.625H4.97398C4.3098 16.625 3.88778 15.9141 4.20583 15.331Z" fill="#EFEFEE" />
              <path d="M15.75 7C15.75 7.9665 14.9665 8.75 14 8.75C13.0335 8.75 12.25 7.9665 12.25 7C12.25 6.0335 13.0335 5.25 14 5.25C14.9665 5.25 15.75 6.0335 15.75 7Z" fill="#EFEFEE" />
            </g>
            <defs>
              <clipPath id="clip0_38_249">
                <rect width="21" height="21" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange}></input>

        </div>
        <div class="slidecontainer">
          <input type="range" min="1" max="9" value="5" class="slider" id="myRange"></input>
        </div>
        <button onClick={fetchColors}>Regenerate Palette</button>
        <div id="savepal">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M13.0766 17.1939C12.9286 17.3557 12.7194 17.4479 12.5 17.4479C12.2807 17.4479 12.0715 17.3557 11.9235 17.1939L7.7568 12.6366C7.46565 12.3181 7.48778 11.824 7.80621 11.5328C8.12466 11.2417 8.61882 11.2638 8.90996 11.5822L11.7188 14.6544V3.125C11.7188 2.69353 12.0686 2.34375 12.5 2.34375C12.9315 2.34375 13.2813 2.69353 13.2813 3.125V14.6544L16.0901 11.5822C16.3813 11.2638 16.8755 11.2417 17.1939 11.5328C17.5123 11.824 17.5344 12.3181 17.2433 12.6366L13.0766 17.1939Z" fill="#EFEFEE" />
            <path d="M3.90625 15.625C3.90625 15.1935 3.55648 14.8438 3.125 14.8438C2.69353 14.8438 2.34375 15.1935 2.34375 15.625V15.6822C2.34373 17.1068 2.34371 18.255 2.46513 19.1581C2.59119 20.0957 2.86087 20.8851 3.48787 21.5121C4.11487 22.1392 4.90431 22.4089 5.84193 22.5349C6.74502 22.6562 7.89327 22.6562 9.31784 22.6562H15.6822C17.1068 22.6562 18.255 22.6562 19.1581 22.5349C20.0957 22.4089 20.8851 22.1392 21.5122 21.5121C22.1392 20.8851 22.4089 20.0957 22.5349 19.1581C22.6562 18.255 22.6562 17.1068 22.6562 15.6822V15.625C22.6562 15.1935 22.3065 14.8438 21.875 14.8438C21.4435 14.8438 21.0938 15.1935 21.0938 15.625C21.0938 17.1202 21.0921 18.163 20.9864 18.9499C20.8835 19.7143 20.6956 20.119 20.4073 20.4073C20.119 20.6956 19.7143 20.8835 18.9499 20.9864C18.163 21.0921 17.1202 21.0938 15.625 21.0938H9.375C7.87978 21.0938 6.83695 21.0921 6.05013 20.9864C5.28578 20.8835 4.88101 20.6956 4.59272 20.4073C4.30443 20.119 4.11646 19.7143 4.0137 18.9499C3.90791 18.163 3.90625 17.1202 3.90625 15.625Z" fill="#EFEFEE" />
          </svg>
          <h2 class="paltop">Save</h2>

        </div>
      </div>
      <img id="imagepalgen" src={imageB64} />
      console.log(imageB64);
      <div id="colours">
        {hexCodes.map((hexCode, index) => (
          <div className="colour"
            key={index}
            style={{ backgroundColor: hexCode }}>
            <p className="hexcodenames">{hexCode}</p>
          </div>
        ))}
      </div>
    </div>

  ) : null;


}