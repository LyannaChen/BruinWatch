import { useNavigate, Link, useLocation } from "react-router-dom";
import HomepageMap from "../components/MapHomepage";
import { useState, useEffect } from "react";
import ResponsiveAppBar from "../components/Toolbar"; // Import the ResponsiveAppBar component


function Preview({ description, location, time }) {
  const navigate=useNavigate();
  return (
    <div 
    className="preview_widget cursor-pointer"
    onClick={() => navigate("/IncidentPage")}
    >
      <h2>{description}</h2>
      <div className="mt-4">
        <p className="text-gray-600">
          <strong>Location: </strong> {location}
        </p>
        <p className="text-gray-700">
          <strong>Time:</strong> {time}
        </p>
      </div>
      <Link to="/" className="p-2 bg-blue-500 text-white rounded">
        Details
      </Link>{" "}
      {/* currently link back to login page */}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [previews, setPreviews] = useState([
    { description: "Scooter accident", location: "bruinwalk", time: "23:50 2/12/2025" },
    { description: "Fire alarm", location: "de neve plaza", time: "12:00" },
    { description: "Man with gun", location: "bruin plaza", time: "12:00" },
    { description: "Man with gun", location: "bruin plaza", time: "12:00" },
  ]);
  const location = useLocation();

  useEffect(() => {
    // Fetch or generate your preview data here.  This is a placeholder.
    const newPreviewFromReport = location.state?.newPreview;

    // 2. Add newPreview to previews array (if it exists)
    if (newPreviewFromReport) {
      setPreviews([newPreviewFromReport, ...previews]); 
    } 
  }, [location.state]); 



  return (
    <div>
      <ResponsiveAppBar /> {/* Include the ResponsiveAppBar component here */}
      <div className="map-container">
        <HomepageMap />
      </div>

      <div className="preview_overlay">
        <h1>Latest Near You</h1>
          <div className="preview_list">
            {previews.map((preview, index) => ( // Map over the previews array
              <Preview key={index} {...preview} /> // Spread props for cleaner code
            ))}
          </div>

      </div>
    </div>
  );
}