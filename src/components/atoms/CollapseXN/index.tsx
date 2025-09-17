// eslint-disable-next-line import/order
import React, { useEffect, useState } from "react";
import "./index.scss";



import mapModifiers from "utils/functions";

import FramerMotionCollapse from "./framerMotionCollapse";
import downArrow from "./images/downArrow.svg";
import higher from "./images/higher.svg";
import negative from "./images/negative.svg";
import normal from "./images/normal.svg";
import upArrow from "./images/upArrow.svg";

export type IconCollapseType =
  | "normal"
  | "higher"
  | "lower"
  | "positive"
  | "negative";

interface CCollapseXNProps {
  children?: React.ReactNode;
  open?: boolean;
  title?: string;
  unit?: string;
  index?: string;
  type?: IconCollapseType;
  isNormal: boolean;
  isHigher: boolean;
  isLower: boolean;
}

const CCollapseXN: React.FC<CCollapseXNProps> = ({
  children,
  open,
  title,
  unit,
  index,
  type,
  isLower,
  isHigher,
  isNormal,
}) => {
  const listConvert = ["NEGATIVE"];
  const listConvertSyb = ["NEGATIVE", "NORMAL", "POSITIVE"];
  const i18nConvertSyb = {
    NEGATIVE: "Âm tính",
    NORMAL: "Bình thường",
    POSITIVE: "Dương tính",
  };
  const [stateOpen, setStateOpen] = useState(open);

  useEffect(() => {
    setStateOpen(open);
  }, [open]);

  const handleReturnIcon = () => {
    if (listConvert.includes(index as any) || index?.search("POS") !== -1) {
      return listConvert.includes(index as any) ? negative : higher;
    } else {
      if (isHigher) return upArrow;
      if (isLower) return downArrow;
      if (isNormal) return normal;
    }

    return higher;
  };

  const handleReturnColor = () => {
    if (isHigher || ["POSITIVE"].includes(index as any)) return "#d54837";
    if (isLower) return "#fbb90d";
    if (["NEGATIVE"].includes(index as any)) return "#44b678";
    if (isNormal) return "#000";
  };

 const handleRenderIndex = () => {
  if (typeof index === "string" && listConvertSyb.includes(index)) {
    return i18nConvertSyb[index as keyof typeof i18nConvertSyb];
  } else {
    return index;
  }
};


  return (
    <div
      className={`${mapModifiers(
        "a-collapse_custom",
        stateOpen && "open"
      )} shadow-sm border rounded-lg `}
    >
      <div
        className={mapModifiers("a-collapse_custom_header")}
        onClick={() => {
          setStateOpen(!stateOpen);
        }}
        style={{border: "1px solid #e5e7eb", borderRadius: "8px", marginTop: "10px"}}
      >
        <div className="a-collapse_custom_header_left">
          {type && <img src={handleReturnIcon()} />}
          <span>{title}</span>
        </div>
        <div className="a-collapse_custom_header_right">
          {!stateOpen && (
            <span style={{ color: handleReturnColor() }}>
              {handleRenderIndex()}
            </span>
          )}
          <p>{unit}</p>
          <div className="a-collapse_custom_header_right_icon">
            {/* <Icon icon="zi-play-solid" size={16} /> */}
          </div>
        </div>
      </div>
      {stateOpen && (
        <FramerMotionCollapse>
          <div className={mapModifiers("a-collapse_custom_body")}>{children}</div>
        </FramerMotionCollapse>
      )}
    </div>
  );
};

CCollapseXN.defaultProps = {};

export default CCollapseXN;
