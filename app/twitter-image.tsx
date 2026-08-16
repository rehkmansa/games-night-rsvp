import { renderOgImage } from "./lib/og";

export { alt, size, contentType } from "./lib/og";

export default function TwitterImage() {
  return renderOgImage();
}
