import Vue from "vue";

Vue.filter("shortenText", (text, maxLength) => {
  if (text && typeof text === "string") {
    const modCharacter = text.length > maxLength ? "..." : "";
    return text.substr(0, maxLength) + modCharacter;
  }
  return "";
});
