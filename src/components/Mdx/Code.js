import React from 'react';
import theme from 'prism-react-renderer/themes/dracula';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const Code = ({ codeString, language, ...props }) => {
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  } else {
    return (
      <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} text-base rounded p-4 mb-4 overflow-x-auto`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className="inline-block select-none opacity-30 text-sm w-6">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }
};

export default Code;
