# Failures — Trifork Design System

## 2026-09-02
- **Figma remote MCP could not read the sandbox page** (`get_metadata` / `get_design_context` on page 0:1 fail with an SSE JSON parse error around 20 KB, deterministically). The desktop MCP needed Dev Mode enabled. Workaround: open the file in Chrome and use the Plugin API (`figma.*`) from `javascript_tool`; keep each result under ~1.5 KB (the tool truncates), use the remote MCP only for screenshots/SVG assets by node id. `exportAsync` never resolves in the page context.
- **curl to brand.trifork.com is blocked after the first request** (returns 000 with any UA/HTTP version). Fetching the same URL through the user's Chrome (navigate to the file URL) downloads it to `~/Downloads`. WebFetch gets 403 on all sub-pages except the home page.
- **Figma Slides has no Plugin API in the page context** (`figma` undefined); the PPTX export of the same template was the better source, rendered with PowerPoint COM (`$pres.Export(dir, "PNG", 1280, 720)`).
- **Bash `/tmp` is not the same path for Python on Windows**; write scratch files under the session scratchpad instead.
- Two multi-part Figma icons (text-swap, image-swap) and the OCR icon are not in the normalised icon set yet.
