import "@/styles/components/Settings.scss"
import { useTheme } from "@/context/theme_provider"

const Settings = () => {
  const {theme, setTheme} = useTheme();
  console.log(theme);
  const next = theme === "light" ? "dark" : "light"
  return (
    <div className="Settings">
      <div className="theme-toggler">
        <div className="theme-buttons" onClick={() => setTheme(next)}>
          <div className={`light-theme-btn ${theme === "dark" ? "" : "active"}`}>
            <i className="bi bi-sun"></i>
          </div>

          <div className={`dark-theme-btn ${theme === "dark" ? "active" : ""}`}>
            <i className="bi bi-moon"></i>
          </div>
        </div>
      </div>
      <div className="settings-btn">
        <i className="bi bi-gear"></i>
      </div>
    </div>
  )
}

export default Settings