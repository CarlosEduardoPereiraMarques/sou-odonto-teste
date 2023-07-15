import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const CopyURL = ({url}) => {

  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }
  return (
    <CopyToClipboard 
      text={url}
      onCopy={onCopy}
    >
      <button>
        {copied ? 'Copiado!' : 'Copiar URL'}  
      </button>
    </CopyToClipboard>
  )

};

export default CopyURL;