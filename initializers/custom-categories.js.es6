import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.1.0", (api) => {
  console.log("Custom Categories theme component loaded");
});
