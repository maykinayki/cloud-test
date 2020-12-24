import express from "express";
import path from "path";
import packageJSON from "../../package.json";
import {
  DIST_DIR_DEV,
  DIST_DIR_PROD,
} from "../../bundle-configs/rollup.config";

const app = express();
app.set("PORT", Number(process.env.PORT) || 8080);
app.set("NODE_ENV", process.env.NODE_ENV);
app.set("CONFIG_ENV", process.env.CONFIG_ENV);
app.set("isProduction", app.get("NODE_ENV") === "production");

const DIST_DIR = app.get("isProduction") ? DIST_DIR_PROD : DIST_DIR_DEV;

app.use("/assets", express.static(path.join(DIST_DIR, "assets")));

app.get("/", (req, res) => {
  const dependencies =
    packageJSON[
      app.get("isProduction") ? "cdnDependecies" : "cdnDevDependecies"
    ];

  res.set({
    "Content-Type": "text/html;charset=utf-8",
    Link: [
      ...dependencies.map(
        dependency => `<${dependency}>; rel="preload"; as="script"; crossorigin`
      ),
    ],
  });

  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(app.get("PORT"), () => {
  console.log(`⚡️[app]: Server is running at PORT: ${app.get("PORT")}`);
  console.log("App configuration:", {
    PORT: app.get("PORT"),
    NODE_ENV: app.get("NODE_ENV"),
    CONFIG_ENV: app.get("CONFIG_ENV"),
  });
});
