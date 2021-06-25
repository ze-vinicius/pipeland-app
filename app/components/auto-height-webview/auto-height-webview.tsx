import { useTheme } from "@react-navigation/native";
import React from "react";
import RNAutoHeightWebView from "react-native-autoheight-webview";

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
      color: ${theme.colors.text};
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
      }}
      source={{
        html: formatedHtml,
      }}
      scrollEnabled={false}
      scalesPageToFit={true}
      scrollEnabledWithZoomedin={false}
      bounces={false}
      customStyle={customStyle}
    />
  );
};

export { AutoHeightWebvView };
