import { useState, useEffect } from "react";
import { Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Text strong style={{ fontSize: "24px" }}>
        {currentTime.format("h:mm:ss A")}
      </Text>
      <br />
      <Text>{currentTime.format("dddd, MMMM D, YYYY")}</Text>
    </div>
  );
}
