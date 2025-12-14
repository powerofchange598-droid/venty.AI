# Venty Professional Cursor System

This directory contains all the assets for a professional, theme-aware, and high-performance custom cursor system for the Venty application. The system is implemented using pure CSS and embedded SVGs, ensuring it works seamlessly across light and dark modes and on HiDPI displays without any JavaScript overhead.

## File Structure

- `/cursors.css`: The main CSS file that defines all cursor styles and animations. It uses CSS variables to link to the SVG icons and adapt to the app's theme.
- `/svg/`: This directory would contain the raw, individual SVG files for each cursor state (e.g., `arrow.svg`, `pointer.svg`). In the current implementation, these SVGs are embedded directly into `cursors.css` as data URIs for optimal performance.
- `/png/`: This directory would contain PNG sprite sheets (`sprite@1x.png`, `sprite@2x.png`, `sprite@3x.png`) as a fallback for legacy browsers that do not support SVG cursors. This is not actively used in the current implementation but is included as per the design specification.

## How It Works

1.  **CSS Variables**: The system leverages the app's existing CSS variables (`--ui-primary`, `--ui-background`) to dynamically color the cursors for light and dark modes.
2.  **Embedded SVGs**: To reduce network requests and ensure crisp rendering on all displays, each cursor icon is an SVG embedded directly into the `cursors.css` file as a data URI.
3.  **Cursor Mapping**: The CSS file maps standard cursor properties (e.g., `pointer`, `text`, `wait`) to the custom SVG cursors. It applies these styles to relevant HTML elements like `<a>`, `<button>`, and `<input>`.
4.  **Performance**: By avoiding JavaScript for mouse tracking and using GPU-accelerated properties, this system is extremely lightweight and performant, ensuring a smooth user experience even on low-end devices.

## Integration

To use this cursor system:

1.  Link the `cursors.css` file in the `<head>` of your main `index.html` file:
    ```html
    <link rel="stylesheet" href="/cursors/cursors.css">
    ```
2.  Ensure that the root CSS variables (`--ui-primary`, `--ui-background`) are defined in your main stylesheet, as this system depends on them for theming.
3.  (Optional) For full browser compatibility, you could extend the CSS to include the PNG sprite fallbacks, although this is generally not necessary for modern web applications.

This system fully replaces the default browser cursors within the application scope, providing a consistent and professional look and feel.
