import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "@/app/styles/components/CopyURL.module.css";

const CopyURL = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={url} onCopy={onCopy} className={styles.copyUrl}>
      <button className={styles.button}>
        {copied ? "Link copiado!" : "Compartilhar Lista"}
      </button>
    </CopyToClipboard>
  );
};

export default CopyURL;
