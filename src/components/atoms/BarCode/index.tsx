import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Barcode from "react-barcode";

// Định nghĩa kiểu props
interface BarcodeProps {
  value: string;
}

const BarcodeComponent: React.FC<BarcodeProps> = ({ value }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Barcode
        value={value}
        format="CODE128"
        width={1}
        height={40}
        displayValue={true}
        fontSize={14}
      />
    </div>
  );
};

export default BarcodeComponent;
