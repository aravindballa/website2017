import React from 'react';

import Code from './Code';

const preToCodeBlock = preProps => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === 'code'
  ) {
    // we have a <pre><code> situation
    const { children: codeString, className = '', ...props } = preProps.children.props;

    const matches = className.match(/language-(.*)/);

    return {
      codeString: codeString.trim(),
      className,
      language: matches && matches[1] ? matches[1] : '',
      ...props,
    };
  }
};

export default {
  wrapper: ({ children }) => <React.Fragment>{children}</React.Fragment>,
  pre: preProps => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />;
    }
  },
};
