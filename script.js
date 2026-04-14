const REPO = "ANDROID7287/pegasus-releases";

async function fetchLatestRelease() {
  const downloadBtn = document.getElementById("download-btn");
  const versionDisplay = document.getElementById("version-display");
  const btnText = downloadBtn.querySelector(".btn-text");

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
    );
    if (!response.ok) throw new Error("Not found");

    const data = await response.json();
    const asset = data.assets.find((a) => a.name.endsWith(".exe"));

    if (asset) {
      downloadBtn.href = asset.browser_download_url;
      btnText.innerText = "Download Now";
      versionDisplay.innerText = `Stable Release: ${data.tag_name}`;
    } else {
      throw new Error("No .exe found");
    }
  } catch (error) {
    console.error("API Error:", error);
    btnText.innerText = "View on GitHub";
    downloadBtn.href = `https://github.com/${REPO}/releases`;
    versionDisplay.innerText = "Unable to fetch version";
  }
}

fetchLatestRelease();
