library(qrcode)

qr <- qr_code("https://gabyandmanfredi.net", ecl = "M")


# Save as SVG
generate_svg(
  qrcode = qr,
  filename = "gabyandmanfredi_qr.svg",
  size = 1000,
  foreground = "#1e2d27",
  background = "#faf6ef",
  show = FALSE
)

qr <- qr_code("https://gabyandmanfredi.net", ecl = "H")

# Preview in R
plot(
  qr,
  col = c("#faf6ef", "#415531")
)
