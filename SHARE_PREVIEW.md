# Wedding Website Preview

Use this when Manfredi is running a local preview of the wedding website.

## Open The Site

1. Make sure you are on the same Wi-Fi/network as Manfredi's computer.
2. Open the URL Manfredi sends you. It will look like:

```txt
http://192.168.x.x:4321/en/
```

3. Keep notes on anything that feels wrong, missing, confusing, or not quite us.

The preview only works while Manfredi's computer is awake and the preview terminal is still open. It is not the final public wedding website, and the local preview does not use the password gate.

## For Manfredi

From `C:\Projects\wedding-website`, run:

```powershell
.\bin\dev\share-local.ps1
```

Then send Gabriela one of the Wi-Fi/network URLs printed by the script.

For remote viewing outside the same network, use a password-protected Cloudflare Pages preview instead of this local preview.
