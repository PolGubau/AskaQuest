import Skeleton from "react-loading-skeleton";
import { backgroundSmooth } from "src/styles/theme";

export default function SkeletonProfile(params) {
  return (
    <>
      <Skeleton
        width={100}
        height={20}
        style={{
          background: backgroundSmooth,
          margin: "0 auto",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      />
      <Skeleton
        width={100}
        height={20}
        style={{ background: backgroundSmooth }}
      />

      <Skeleton
        width={100}
        height={100}
        circle={true}
        style={{
          background: backgroundSmooth,
          borderRadius: "50%",
          margin: "0 auto",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      />
    </>
  );
}
