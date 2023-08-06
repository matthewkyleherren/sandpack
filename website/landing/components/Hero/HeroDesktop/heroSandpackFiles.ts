const stitchesConfig = `import { createStitches } from '@stitches/react';

export const {
  globalCss,
  styled,
} = createStitches({
  theme: {
    colors: {
      green: "#6FEC5B",
      purple: "#9013A4",

      gray100: "#808080",
      gray200: "#404040",
      gray300: "#202020",
      gray400: "#151515",
      gray500: "#090909",

      white: "#ffffff",

      surface: "$gray400",
      background: "$gray500",
      textPrimary: "$white",
      textSecondary: "$gray100",
      primary: "$green",
    },
    fontWeights: {
      base: 400,
      semiBold: 600,
    },
    transitions: {
      default: "all .2s ease",
    },
  }
});

export const globalStyles = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },

  "html, body": {
    height: "100%",
  },

  html: {
    fontSize: "10px",
  },

  body: {
    background: "$background",
    color: "$textPrimary",
    fontSize: "1.6rem",
    fontSmooth: "antialiased",
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
    "-webkit-font-smoothing": "antialiased",
    lineHeight: 1.6,
    letterSpacing: "-0.025em",
    margin: 0,
    padding: 0,
  },

  "#root": {
    isolation: "isolate",
  },


  "a, a:visited": {
    color: "inherit",
    textDecoration: "none",
  },

  button: {
    background: "none",
    border: "none",
    borderRradius: 0,
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
    margin: 0,
    padding: 0,
    width: "auto",
  }
});
`;

const common = `import { styled } from './stitches.config';

const Stack = styled("div", {
  display: "flex",
  lineHeight: 1,
  variants: {
    horizontal: {
      true: {
        alignItems: "center",
        flexDirection: "row",
      },
    },
    vertical: {
      true: {
        flexDirection: "column",
      },
    }
  }
});

const Box = styled("div", {})

const Text = styled("p", {
  margin: 0,

  variants: {
    screenReader: {
      true: {
        border: "0 !important",
        clipPath: "inset(50%) !important",
        "-webkit-clip-path": "inset(50%) !important",
        fontWeight: "$base",
        height: "1px !important",
        margin: "-1px !important",
        overflow: "hidden !important",
        padding: "0 !important",
        position: "absolute !important",
        width: "1px !important",
        whiteSpace: "nowrap !important",   
      }
    },
    semiBold: {
      true: { fontWeight: "$semiBold" },
    }
  }
});

const Button = styled("button", {})

export { Box, Button, Stack, Text }
`;

const components = `import { Box, Button, Stack, Text } from './common';

function Section({ children }) {
  return (
    <Stack
      as="section"
      css={{
        background: "$surface",
        fontSize: "calc(100vw / (1920 / 2) * 10)",

        width: "100vw",
        height: "100vh",
        
        padding: "1.8em 3.5em",
        position: "relative",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      vertical>
      {children}
    </Stack>
  )
}

function HeaderText({ children, ...props }) {
  return (
    <Text
      as="span"
      css={{
        fontSize: "2.4em",
        textAlign: "center",
        letterSpacing: "-0.05em",
        transition: "$default",

        "&:hover": {
          color: "$primary",
        }
      }}
      {...props}>
      {children}
    </Text>
  )
}

function Clipboard() {
  const installCommand = "npm install @codesandbox/sandpack-react"

  return (
    <Button
      aria-label="Copy to clipboard"
      css={{
        alignItems: "center",
        color: "$darkTextPrimary",
        cursor: "pointer",
        display: "flex",
        transition: "$default",

        "&:hover": {
          color: "$primary",
        },

        ".clipboard-icon": {
          color: "$primary",
          transition: "$default",
          opacity: 0,
        },

        "&:hover .clipboard-icon": {
          opacity: 1,
        }
      }}
      onClick={() => navigator.clipboard.writeText(installCommand)}
    >
      <HeaderText>{installCommand}</HeaderText>
      <Box
        className="clipboard-icon"
        css={{
          flexShrink: "0",
          width: "1.6em",
          height: "1.6em",
          
          position: "relative",
          top: 1,
          marginLeft: "1.2em",
        }}
      >
        <svg fill="none" height="100%" viewBox="0 0 12 13" width="100%">
          <g clipPath="url(#a)">
            <path
              d="M8.21 1.344H2.317c-.54 0-.983.463-.983 1.03v7.212h.983V2.374H8.21v-1.03Zm1.474 2.06H4.281c-.54 0-.983.464-.983 1.03v7.213c0 .566.442 1.03.983 1.03h5.403c.54 0 .983-.464.983-1.03V4.435c0-.567-.442-1.03-.983-1.03Zm0 8.243H4.281V4.435h5.403v7.212Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path
                d="M0 0h12v12H0z"
                fill="currentColor"
                transform="translate(0 .676)"
              />
            </clipPath>
          </defs>
        </svg>
      </Box>
    </Button>
  )
}

function Link({ href, children }) {
  return (
    <a href={href} target="_blank" style={{ marginLeft: "2em" }}>
      <HeaderText semiBold>{children}</HeaderText>
    </a>
  )
}

function SectionHeader({children}) {
  return (
    <Stack css={{ justifyContent: "space-between", width: "100%" }} horizontal>
      <Clipboard />
      <Stack horizontal>
        {children}
      </Stack>
    </Stack>
  )
}

function SandpackLogo() {
  return (
    <Box
      css={{
        "$$logoHeight": "18em",
        "$$logoMargin": "-5em",

        display: "flex",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",

        width: "100%",

        "&::before, &::after": {
          boxSizing: "content-box",
          content: "''",
          display: "block",

          border: "2.4em solid #fff",
          width: "9em",
          height: "$$logoHeight",
        },

        "&::before": {
          marginTop: "$$logoMargin",
          marginRight: "-1.1em",
        },

        "&::after": {
          marginBottom: "$$logoMargin",
          marginLeft: "-1.1em",
        },
      }}
    />
  )
}

function SandpackTitle() {
  return (
    <Stack css={{ width: "100%" }}>
      <Text as="h1" screenReader>Sandpack</Text>
      <Box 
        as="svg" 
        alt="Sandpack" 
        css={{ width: "100%" }} 
        
        fill="none" 
        viewBox="0 0 1904 255" 
        height="100%"
        width="100%"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M38.95 245.8C27.75 240.55 19 233.2 12 224.1C5 215 1.15 204.85 0.0999985 193.65L18.3 188.75C20.05 203.1 26 214.65 36.15 223.4C46.3 232.5 59.25 236.7 75.35 236.7C85.85 236.7 95.3 234.6 104.05 230.4C112.8 226.2 119.8 220.6 125.05 213.6C129.95 206.6 132.75 198.55 132.75 189.8C132.75 177.9 127.85 167.75 118.4 159.35C108.95 150.95 96.35 143.95 80.25 138L67.3 133.1C48.4 126.1 33.7 117 22.5 105.8C11.3 94.6 6.05 80.25 6.05 62.4C6.05 51.2 8.85 40.7 14.8 31.25C20.4 22.15 28.45 14.8 38.6 9.19999C48.4 3.95 59.6 1.14999 72.2 1.14999C84.1 1.14999 95.3 3.95 105.1 8.85C114.9 13.75 122.6 20.75 128.55 29.15C134.5 37.9 137.65 47.7 138.35 58.2L121.2 62.75C119.8 49.45 115.25 38.95 106.85 30.55C98.45 22.5 86.9 18.3 72.2 18.3C63.1 18.3 55.05 20.4 47.7 24.25C40.35 28.45 34.4 33.7 30.2 40.35C26 47.35 23.9 54.7 23.9 62.4C23.9 75.7 28.1 86.2 36.5 94.25C44.9 102.3 57.5 109.65 73.6 115.95L87.6 121.2C107.2 128.9 122.6 138.35 133.8 148.85C145 159.35 150.6 173 150.6 189.8C150.6 201.7 147.1 212.55 140.45 222.35C133.8 232.15 124.7 239.85 113.5 245.45C101.95 251.05 89.35 253.85 75.35 253.85C62.05 253.85 50.15 251.4 38.95 245.8Z" fill="url(#paint0_linear_1_5)"/>
<path d="M245.644 237.05C226.044 225.85 210.994 210.8 199.794 191.2C188.594 171.95 183.344 150.6 183.344 127.5C183.344 104.4 188.944 83.4 200.144 63.8C211.344 44.55 226.394 29.15 245.994 17.95C265.244 6.74998 286.594 1.14999 309.694 1.14999C332.794 1.14999 353.794 6.74998 373.394 17.95C392.644 29.15 408.044 44.55 419.244 63.8C430.444 83.4 436.394 104.4 436.394 127.5C436.394 150.6 430.794 171.95 419.594 191.2C408.394 210.8 392.994 225.85 373.744 237.05C354.144 248.25 332.794 253.85 309.694 253.85C286.244 253.85 264.894 248.25 245.644 237.05ZM364.994 222C381.444 212.2 394.394 199.25 403.844 182.45C413.294 165.65 418.194 147.45 418.194 127.5C418.194 107.9 413.294 89.35 403.844 72.55C394.044 55.75 381.094 42.8 364.644 33C347.844 23.2 329.644 18.3 309.694 18.3C289.394 18.3 271.194 23.2 254.744 33C237.944 42.8 224.994 55.75 215.544 72.55C206.094 89.35 201.544 107.55 201.544 127.5C201.544 147.8 206.094 166 215.544 182.8C224.994 199.6 237.944 212.55 254.394 222.35C270.844 232.15 289.394 236.7 309.694 236.7C329.994 236.7 348.194 231.8 364.994 222Z" fill="url(#paint1_linear_1_5)"/>
<path d="M687.186 1.14999L733.386 250H714.836L679.136 59.25L599.686 253.85H597.236L517.786 58.9L482.086 250H463.536L509.736 1.14999H512.186L598.636 212.9L685.086 1.14999H687.186Z" fill="url(#paint2_linear_1_5)"/>
<path d="M770.74 250H751.84L860.34 1.14999H862.44L970.94 250H952.04L922.99 183.15H799.79L770.74 250ZM861.39 41.75L807.14 166.35H915.64L861.39 41.75Z" fill="url(#paint3_linear_1_5)"/>
<path d="M1031.59 246.15C1019.69 240.55 1009.89 232.5 1002.54 222.35C994.844 212.55 990.644 201.35 989.594 188.75L1022.84 181.4C1024.94 193.65 1029.84 203.45 1037.89 210.45C1045.94 217.45 1056.79 220.95 1070.44 220.95C1083.39 220.95 1094.24 217.8 1102.99 210.8C1111.74 203.8 1116.29 195.4 1116.29 185.25C1116.29 176.15 1112.09 168.45 1104.04 162.15C1095.99 155.85 1084.79 149.9 1070.79 145L1054.69 139.4C1015.14 125.05 995.544 100.9 995.544 66.95C995.544 54.35 998.694 43.15 1004.99 33C1011.29 22.85 1019.69 14.8 1030.89 9.19999C1042.09 3.59998 1054.34 0.449982 1067.99 0.449982C1080.94 0.449982 1092.84 3.24999 1103.69 8.85C1114.54 14.45 1123.29 21.8 1129.94 31.25C1136.24 41.05 1140.09 51.55 1141.14 63.1L1108.94 70.1C1107.54 59.25 1103.34 50.5 1096.69 44.2C1090.04 37.9 1080.94 34.4 1069.04 34.4C1058.54 34.4 1049.44 37.9 1042.09 44.2C1034.74 50.85 1031.24 58.9 1031.24 68C1031.24 77.8 1034.39 85.85 1041.39 92.15C1048.04 98.45 1057.84 103.7 1070.79 108.6L1088.99 115.25C1108.24 122.6 1123.64 131.7 1135.19 142.9C1146.39 154.1 1152.34 168.8 1152.34 186.65C1152.34 199.25 1148.49 210.8 1141.49 221.3C1134.14 231.8 1124.34 239.85 1112.09 245.8C1099.49 251.75 1085.84 254.55 1071.14 254.55C1056.79 254.55 1043.49 251.75 1031.59 246.15Z" fill="url(#paint4_linear_1_5)"/>
<path d="M1199.08 250H1160.93L1273.63 0.449982H1276.78L1389.48 250H1351.33L1329.98 201.35H1220.43L1199.08 250ZM1275.03 74.65L1233.38 170.55H1317.03L1275.03 74.65Z" fill="url(#paint5_linear_1_5)"/>
<path d="M1463.76 254.55H1460.61L1364.01 4.99999H1403.21L1464.11 168.8L1529.21 0.449982H1535.16L1600.26 168.8L1661.51 4.99999H1700.36L1603.76 254.55H1600.96L1532.36 79.55L1463.76 254.55Z" fill="url(#paint6_linear_1_5)"/>
<path d="M1712.83 250H1674.68L1787.38 0.449982H1790.53L1903.23 250H1865.08L1843.73 201.35H1734.18L1712.83 250ZM1788.78 74.65L1747.13 170.55H1830.78L1788.78 74.65Z" fill="url(#paint7_linear_1_5)"/>
<defs>
<linearGradient id="paint0_linear_1_5" x1="947" y1="-38.6379" x2="947" y2="321" gradientUnits="userSpaceOnUse">
<stop stop-color="#757575"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint1_linear_1_5" x1="947" y1="-38.6379" x2="947" y2="321" gradientUnits="userSpaceOnUse">
<stop stop-color="#757575"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint2_linear_1_5" x1="947" y1="-38.6379" x2="947" y2="321" gradientUnits="userSpaceOnUse">
<stop stop-color="#757575"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint3_linear_1_5" x1="947" y1="-38.6379" x2="947" y2="321" gradientUnits="userSpaceOnUse">
<stop stop-color="#757575"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint4_linear_1_5" x1="947" y1="-38.6379" x2="947" y2="321" gradientUnits="userSpaceOnUse">
<stop stop-color="#757575"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint5_linear_1_5" x1="947" y1="-38.6379" x2="947" y2="321" gradientUnits="userSpaceOnUse">
<stop stop-color="#757575"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint6_linear_1_5" x1="947" y1="-38.6379" x2="947" y2="321" gradientUnits="userSpaceOnUse">
<stop stop-color="#757575"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint7_linear_1_5" x1="947" y1="-38.6379" x2="947" y2="321" gradientUnits="userSpaceOnUse">
<stop stop-color="#757575"/>
<stop offset="1"/>
</linearGradient>
</defs>
      </Box>
    </Stack>
  )
}


export { Section, SectionHeader, SandpackLogo, SandpackTitle, Link }
`;

const app = `import { globalStyles } from './stitches.config';
import {
  Section,
  SandpackLogo,
  SectionHeader,
  SandpackTitle,
  Link
} from './components';

export default function App() {
  globalStyles();

  return (
    <Section>
      <SectionHeader>
        <Link href="https://sandpack.codesandbox.io/docs">
          Docs
        </Link>
        <Link href="https://github.com/codesandbox/sandpack">
          GitHub
        </Link>
      </SectionHeader>

      <SandpackLogo />
      <SandpackTitle />
    </Section>
  );
}
`;

export const files = {
  "/App.js": app,
  "/components.js": components,
  "/common.js": common,
  "/stitches.config.js": stitchesConfig,
  "/styles.css": { code: "", hidden: true },
};
