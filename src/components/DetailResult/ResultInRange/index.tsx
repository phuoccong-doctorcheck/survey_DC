import React from "react";
import "./index.scss";
import mapModifiers from "utils/functions";

interface RangeResultProps {
  min: number;
  max: number;
  index: string; // đổi từ any -> string
  isNormal: boolean;
  isHigher: boolean;
  isLower: boolean;
}

const i18nConvert = {
  NEGATIVE: "Âm tính",
  NORMAL: "Bình thường",
} as const;

const i18nConvertColor = {
  NEGATIVE: "#44b678",
} as const;

type IndexKey = keyof typeof i18nConvert; // "NEGATIVE" | "NORMAL"

const listConvert: IndexKey[] = ["NEGATIVE", "NORMAL"];

const RangeResult: React.FC<RangeResultProps> = ({
  index,
  min,
  max,
  isLower,
  isHigher,
  isNormal,
}) => {
  const handleRenderResult = (flag: boolean) => {
    if (listConvert.includes(index as IndexKey)) {
      return i18nConvert[index as IndexKey];
    } else {
      if (isHigher) return flag ? "Cao" : "higher";
      if (isLower) return flag ? "Thấp" : "lower";
      return flag ? "Bình thường" : "normal";
    }
  };

  const handleReturnColor = () => {
    if (listConvert.includes(index as IndexKey)) {
      return i18nConvertColor[index as keyof typeof i18nConvertColor];
    } else {
      if (isHigher || index.includes("POS")) return "#d54837";
      if (isLower) return "#fbb90d";
      if (isNormal) return "#000";
    }
  };

  return (
    <div className={`${mapModifiers("a-range")}`}>
      {listConvert.includes(index as IndexKey) ||
      index.includes("POS") ||
      index.includes("NEG ") ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span className={`font-bold`} style={{ color: handleReturnColor() }}>
            {listConvert.includes(index as IndexKey) ? i18nConvert[index as IndexKey] : index}
          </span>
        </div>
      ) : (
        <>
          <div
            className={`${mapModifiers(
              "a-range_top",
              isHigher && "higher",
              isNormal && "normal",
              isLower && "lower"
            )}`}
          >
            <span>Kết quả: {handleRenderResult(true)}</span>
            <p>{listConvert.includes(index as IndexKey) ? i18nConvert[index as IndexKey] : index}</p>
          </div>
          <div className={`${mapModifiers("a-range_slider")}`}>
            <div className="a-range_slider_syb">
              <span>-</span>
              <span>{min}</span>
              <span>{max}</span>
              <span>+</span>
            </div>
            <div
              className={mapModifiers(
                "a-range_slider_main",
                isHigher && "higher",
                isNormal && "normal",
                isLower && "lower"
              )}
            >
              {isLower ? (
                <input min={1} max={100} value={50} type="range" readOnly />
              ) : (
                <span className="a-range_slider-down" />
              )}
              {isNormal ? (
                <input
                  min={min}
                  max={max}
                  value={Number(index)}
                  type="range"
                  readOnly
                />
              ) : (
                <span className="a-range_slider-normal" />
              )}
              {isHigher ? (
                <input min={1} max={100} value={50} type="range" readOnly />
              ) : (
                <span className="a-range_slider-higher" />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

RangeResult.defaultProps = {};

export default RangeResult;
