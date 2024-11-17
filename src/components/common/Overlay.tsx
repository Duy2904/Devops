import { Spin } from "antd";

function Overlay() {
  return (
    <div className="absolute left-0 top-0 z-[999] flex h-[100vh] w-[100vw] items-center justify-center bg-blue-300 transition-opacity duration-500">
      <Spin
        size="large"
        spinning
        style={{
          color: "white",
        }}
      />
    </div>
  );
}

export default Overlay;
