// Generated from design-tokens.json. Use: presets: [require('./tokens/tailwind.preset.cjs')]
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "brand": {
          "darkBlue": "#2C3A42",
          "orange": "#FF6600",
          "lightBlue": "#D5E5ED"
        },
        "slate": {
          "400": "#5F7D8F",
          "500": "#728D9D",
          "600": "#52788F",
          "700": "#425663"
        },
        "ink": "#373737",
        "slideText": "#4D5B64",
        "slideMuted": "#D5D7DA",
        "white": "#FFFFFF",
        "neutral": {
          "50": "#EAEBEC",
          "100": "#D5D8D9",
          "200": "#C0C4C6",
          "300": "#ABB0B3",
          "400": "#959CA0",
          "500": "#80898E",
          "600": "#6B757B",
          "700": "#566168",
          "800": "#414E55",
          "900": "#2C3A42"
        },
        "surfaceTint": {
          "offWhite": "#F3F3F3",
          "paper": "#F2F2F2",
          "pale": "#E7EFF3",
          "mist": "#E9F0F4",
          "band": "#D7E4EB"
        },
        "blue": {
          "50": "#EAF2F6",
          "100": "#D5E5ED",
          "200": "#C1D7E5",
          "300": "#ACCADC",
          "400": "#A1C4D7",
          "500": "#97BDD3",
          "600": "#88AABE",
          "700": "#7997A9",
          "800": "#5B717F",
          "900": "#3C4C54"
        },
        "orange": {
          "50": "#FFE8D9",
          "100": "#FFD1B2",
          "200": "#FFA366",
          "300": "#FF8533",
          "400": "#FF751A",
          "500": "#FF6600",
          "600": "#E55C00",
          "700": "#CC5200",
          "800": "#993D00",
          "900": "#662900"
        },
        "green": {
          "50": "#E7F2E5",
          "100": "#CFE5CA",
          "200": "#B7D8B0",
          "300": "#9FCB95",
          "400": "#93C488",
          "500": "#87BE7B",
          "600": "#7AAB6F",
          "700": "#6A9463",
          "800": "#51724A",
          "900": "#364C31"
        },
        "product": {
          "blue": {
            "dark": "#385A72",
            "mid": "#52788F",
            "light": "#71A2BD",
            "tintStart": "#F4F8FA",
            "tintEnd": "#E7EFF3"
          },
          "green": {
            "dark": "#457055",
            "mid": "#618671",
            "light": "#80AF97",
            "tintStart": "#F8FBF9",
            "tintEnd": "#EAF2ED"
          },
          "purple": {
            "dark": "#89459F",
            "mid": "#9350A4",
            "light": "#C172D1",
            "tintStart": "#FDF8FF",
            "tintEnd": "#F9E5FD"
          }
        },
        "chart": {
          "valueBlue": "#87CCEE",
          "complexityPeach": "#EEA287"
        },
        "feedback": {
          "success": "#4ECA00",
          "danger": "#CA0003"
        },
        "surface": {
          "page": "#FFFFFF",
          "band": "#D7E4EB",
          "bandSoft": "#E7EFF3",
          "card": "#FFFFFF",
          "cardFooter": "#F3F3F3",
          "inverse": "#425663",
          "inverseDeep": "#2C3A42",
          "accent": "#FF6600"
        },
        "text": {
          "heading": "#425663",
          "body": "#373737",
          "muted": "#6B757B",
          "accent": "#FF6600",
          "onInverse": "#FFFFFF",
          "onAccent": "#FFFFFF",
          "link": "#FF6600",
          "linkHover": "#CC5200"
        },
        "border": {
          "subtle": "#D5D8D9",
          "default": "#C0C4C6",
          "strong": "#425663",
          "accent": "#FF6600",
          "focus": "#FF6600"
        },
        "action": {
          "primary": "#FF6600",
          "primaryHover": "#E55C00",
          "primaryActive": "#CC5200",
          "secondary": "#425663",
          "secondaryHover": "#2C3A42",
          "disabled": "#C0C4C6"
        }
      },
      "fontFamily": {
        "sans": [
          "Poppins",
          "\"Segoe UI\"",
          "\"Helvetica Neue\"",
          "Arial",
          "sans-serif"
        ],
        "quote": [
          "Caveat",
          "\"Segoe Script\"",
          "cursive"
        ],
        "mono": [
          "\"JetBrains Mono\"",
          "Consolas",
          "monospace"
        ]
      },
      "fontSize": {
        "display": "56px",
        "h1": "48px",
        "h2": "36px",
        "h3": "28px",
        "h4": "22px",
        "bodyLg": "20px",
        "body": "18px",
        "bodySm": "16px",
        "caption": "14px",
        "label": "13px"
      },
      "spacing": {
        "0": "0px",
        "1": "8px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "5": "40px",
        "6": "48px",
        "8": "64px",
        "10": "80px",
        "12": "96px",
        "16": "128px",
        "05": "4px"
      },
      "borderRadius": {
        "xs": "4px",
        "sm": "12px",
        "md": "20px",
        "lg": "24px",
        "xl": "28px",
        "pill": "999px"
      },
      "boxShadow": {
        "card": "0 4px 36px rgba(66, 86, 99, 0.20)",
        "soft": "0 1px 32px rgba(114, 141, 157, 0.10), 0 1px 8px rgba(95, 125, 143, 0.20)",
        "glow": "0 0 32px rgba(66, 86, 99, 0.30), 0 0 8px rgba(66, 86, 99, 0.40)",
        "lift": "0 2px 20px rgba(66, 86, 99, 0.20)",
        "textOnImage": "0 2px 16px rgba(0, 0, 0, 0.55)"
      },
      "backgroundImage": {
        "fadeSlateUp": "linear-gradient(180deg, rgba(66,86,99,0) 0%, rgba(66,86,99,1) 100%)",
        "fadeSlateDown": "linear-gradient(180deg, rgba(66,86,99,1) 0%, rgba(66,86,99,0) 100%)",
        "fadeSlateSoft": "linear-gradient(180deg, rgba(66,86,99,0) 0%, rgba(66,86,99,0.3) 100%)",
        "fadeBandRight": "linear-gradient(90deg, #D7E4EB 0%, rgba(215,228,235,0) 100%)",
        "productBlue": "linear-gradient(135deg, #52788F 0%, #71A2BD 44%, #385A72 64%)",
        "productGreen": "linear-gradient(135deg, #618671 0%, #80AF97 44%, #457055 64%)",
        "productPurple": "linear-gradient(135deg, #9350A4 0%, #C172D1 44%, #89459F 64%)",
        "tileTopBlue": "linear-gradient(180deg, #F4F8FA 0%, #E7EFF3 100%)",
        "tileTopGreen": "linear-gradient(180deg, #F8FBF9 0%, #EAF2ED 100%)",
        "tileTopPurple": "linear-gradient(180deg, #FDF8FF 0%, #F9E5FD 100%)",
        "bokehCss": "radial-gradient(60% 70% at 20% 25%, #E8F2F8 0%, rgba(232,242,248,0) 70%), radial-gradient(45% 55% at 78% 72%, #F3EEE8 0%, rgba(243,238,232,0) 70%), radial-gradient(70% 80% at 65% 20%, #C6D9E2 0%, rgba(198,217,226,0) 75%), linear-gradient(160deg, #DCE8EE 0%, #D5E3EB 55%, #CFDEE7 100%)"
      }
    }
  }
};
