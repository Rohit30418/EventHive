import type { CSSProperties } from "react";
import { assetSlots, type AssetId } from "../../data/assetSlots";
import "./AssetSlot.css";

type Props = {
  id: AssetId;
  className?: string;
  src?: string | null;
  alt?: string;
  eager?: boolean;
  label?: string;
};

export default function AssetSlot({ id, className = "", src, alt, eager = false, label }: Props) {
  const item = assetSlots[id];
  const imageSrc = src ?? item.src;
  const description = alt ?? item.alt;
  const style: CSSProperties = {
    aspectRatio: `${item.width} / ${item.height}`,
    objectPosition: item.focalPoint ?? "center",
  };

  return (
    <div className={`ea-asset ea-asset--${item.tone ?? "paper"} ${className}`}
      style={style}
      data-asset-id={id}>
      {imageSrc ? (
        <img src={imageSrc} alt={description}
          width={item.width} height={item.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async" style={{ objectPosition: item.focalPoint ?? "center" }} />
      ) : (
        <div className="ea-asset__placeholder" role="img"
          aria-label={description}>
          <span className="ea-asset__guides" aria-hidden="true" />
          <div className="ea-asset__caption">
            <span className="ea-asset__label">{label ?? item.label}</span>
            <span className="ea-asset__measure">{item.width} × {item.height} px · {item.width}:{item.height}</span>
          </div>
        </div>
      )}
    </div>
  );
}
