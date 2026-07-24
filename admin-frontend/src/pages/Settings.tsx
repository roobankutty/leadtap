import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://leadtap-properties.onrender.com/api/settings";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await axios.get(API);
      setSettings(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.put(API, settings);

      alert("Settings updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update settings");
    }

    setLoading(false);
  }

	return (
	  <div className="container mt-4">
		<div className="card shadow border-0">
		  <div className="card-header bg-primary text-white">
			<h4 className="mb-0">⚙ Settings</h4>
		  </div>

		  <div className="card-body">
			<form onSubmit={saveSettings}>

				<div className="mb-3">
				  <label className="form-label">Site Name</label>

				  <input
					className="form-control"
					value={settings.siteName}
					onChange={(e) =>
					  setSettings({
						...settings,
						siteName: e.target.value,
					  })
					}
				  />
				</div>

				<div className="mb-3">
				  <label className="form-label">Email</label>

				  <input
					type="email"
					className="form-control"
					value={settings.email}
					onChange={(e) =>
					  setSettings({
						...settings,
						email: e.target.value,
					  })
					}
				  />
				</div>

				<div className="mb-3">
				  <label className="form-label">Phone</label>

				  <input
					className="form-control"
					value={settings.phone}
					onChange={(e) =>
					  setSettings({
						...settings,
						phone: e.target.value,
					  })
					}
				  />
				</div>

				<button
				  className="btn btn-success"
				  disabled={loading}
				>
				  {loading ? "Saving..." : "Save Settings"}
				</button>

			  </form>
		  </div>
		</div>
	  </div>
	);
}