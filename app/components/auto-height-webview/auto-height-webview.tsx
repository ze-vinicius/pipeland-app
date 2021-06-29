import React from "react";
import RNAutoHeightWebView from "react-native-autoheight-webview";
import { useTheme } from "styled-components/native";

interface AutoHeightWebvViewProps {
  html: string;
}

const AutoHeightWebvView: React.FC<AutoHeightWebvViewProps> = ({ html }) => {
  const theme = useTheme();

  const formatedHtml = `
    <!doctype html>

    <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' name='viewport' />
        </head>
        <body>
          ${html}
        </body>
    </html>
  `;

  const customStyle = `
    * {
      font-family: sans-serif;
      font-size: 14px;
      color: ${theme.color.text};
    }

    br {
      content: "";
      margin: 8px;
      display: block;
    }

    ul {
      margin: 0;
      padding: 0;

      padding-left: 32px;
    }

    li {
      margin-top: 8px;
    }
  `;

  return (
    <RNAutoHeightWebView
      originWhitelist={["*"]}
      style={{
        width: "100%",
        opacity: 0.99,
        overflow: "hidden",
      }}
      source={{
        html: formatedHtml,
      }}
      scrollEnabled={false}
      androidHardwareAccelerationDisabled
      scrollEnabledWithZoomedin={false}
      bounces={false}
      customStyle={customStyle}
    />
  );
};

export { AutoHeightWebvView };
