import { useState, useEffect } from "react";
import { List, Switch, Typography, Button } from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import Clock from "./components/Clock";
import { wakemecryptoContract } from "./utils";
import relativeTime from "dayjs/plugin/relativeTime";
import "./App.css";

const { Text } = Typography;

dayjs.extend(relativeTime);

export default function App() {
  const [count, setCount] = useState(0);
  const [alarms, setAlarms] = useState([
    { time: "06:00", enabled: false },
    { time: "07:00", enabled: false },
    { time: "08:00", enabled: false }
  ]);

  const { address: account } = useActiveAccount() || {};

  const {
    data: wakeupDeadlineByAddress,
    isLoading: isWakeupDeadlineByAddressLoading,
    isError: isWakeupDeadlineByAddressError,
    error: wakeupDeadlineByAddressError
  } = useReadContract({
    contract: wakemecryptoContract,
    method: "function wakeUpDeadlines(address) view returns (uint256)",
    params: [account]
  });

  console.log(
    wakeupDeadlineByAddress,
    isWakeupDeadlineByAddressLoading,
    isWakeupDeadlineByAddressError,
    wakeupDeadlineByAddressError
  );

  const {
    data: stakeByAddress,
    isLoading: isStakesByAddressLoading,
    isError: isStakesByAddressError,
    error: stakesByAddressError
  } = useReadContract({
    contract: wakemecryptoContract,
    method: "function stakes(address) view returns (uint256)",
    params: [account]
  });

  console.log(
    stakeByAddress,
    isStakesByAddressLoading,
    isStakesByAddressError,
    stakesByAddressError
  );

  const handleSetAlarm = () => {};
  const handleConfirmWakeUp = () => {};

  useEffect(() => {
    // Request notification permission when the component mounts
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Permission granted, you can now display notifications
          new Notification("Welcome to WakeMeCrypto!", {
            body: "You will now receive notifications when your alarm is about to go off.",
            timestamp: dayjs().unix(),
            icon: "https://www.wakemecrypto.com/favicon.ico",
            requireInteraction: true,
            silent: false
          });
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <Clock />
      {/* alarm list */}
      <List
        itemLayout="horizontal"
        dataSource={
          wakeupDeadlineByAddress === 0n || !wakeupDeadlineByAddress
            ? []
            : [
                {
                  deadline: wakeupDeadlineByAddress?.toString(),
                  stake: stakeByAddress?.toString()
                }
              ]
        }
        renderItem={(alarm, index) => (
          <List.Item
            actions={[
              <Switch
                checked={alarm.enabled}
                onChange={() => toggleAlarm(index)}
                key="switch"
              />
            ]}
          >
            <List.Item.Meta
              title={
                <Text strong>
                  {dayjs(alarm.deadline?.toString() * 1000).format(
                    "h:mm A, MMM D, YY "
                  )}
                </Text>
              }
              description={dayjs(alarm?.deadline?.toString() * 1000).fromNow()}
            />
          </List.Item>
        )}
      />
      {/* + button at the center of page */}
      <Button
        size="large"
        shape="circle"
        icon={<PlusOutlined />}
        type="primary"
        style={{
          position: "fixed",
          bottom: "40%",
          right: "45%"
        }}
      />
    </div>
  );
}
