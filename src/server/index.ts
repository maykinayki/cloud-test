import express from "express";
import path from "path";
import packageJSON from "../../package.json";
import { ROOT_DIR } from "../../bundle-configs/rollup.config";

const app = express();
app.set("port", Number(process.env.PORT) || 8080);
app.set("isProduction", process.env.NODE_ENV === "production");

app.use("/assets", express.static(path.join(ROOT_DIR, "dist", "assets")));
app.use(
  "/dist",
  express.static(path.join(ROOT_DIR, "dist"), {
    index: false,
  })
);

app.get("/", (req, res) => {
  const fileName = app.get("isProduction")
    ? "index.prod.html"
    : "index.dev.html";

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

  res.sendFile(path.join(ROOT_DIR, "dist", fileName));
});

app.listen(app.get("port"), () => {
  console.log(
    `⚡️[app]: Server is running at http://localhost:${app.get("port")}`
  );
});
