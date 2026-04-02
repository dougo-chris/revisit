---
title: "How to embed html elements into websites scaled at 62.5%"
date: "2025-07-31"
tag: "css"
description: "Websites sometimes use the scale 62.5% to adjust base font size to 10px. When embedding a web component into the page this can distort the output. This is how I worked around this issue."
---

The default font size for web browsers is 16px, but some developers and UI templates prefer to convert that to 10px to simplify their design system. This is achieved by scaling the default size. It's usually done globally by adding the css to all the html in a web page.

```css
html { font-size: 62.5%; }
```

FolioReady works by being an embedded as a HTML element into existing websites. With the font scaled globally any HTML inside the site will also be scaled. This causes the embedded components to look "squashed".

## The Fix

The fix is relatively simple. I add a class to the embedded element and then style to scale the embedded element back to a 16px

```html
<script
  defer type="text/javascript"
  src="https://folioready.com/assets/folioready-v1.0.js"
></script>

<style>
	.folioready-collector { transform: scale(1.6);}
</style>

<folioready-collector
  code="__PUBLIC_KEY__"
  class="folioready-collector"
></folioready-collector>
```

## References
- [The 62.5% Font Size Trick](https://www.aleksandrhovhannisyan.com/blog/62-5-percent-font-size-trick/)
- [Ghost Forum Question](https://forum.ghost.org/t/bug-report-62-5-root-font-scaling-conflicts-with-third-party-components/58590)