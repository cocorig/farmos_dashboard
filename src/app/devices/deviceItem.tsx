import React from "react";
import { DeviceProps } from "@/model/devices";
import Link from "next/link";
import style from "./deviceItem.module.css";
import LinkIcon from "@/components/linkIcon";

interface DeviceItemProps {
  device: DeviceProps;
}

const DeviceItemComponent = ({ device }: DeviceItemProps) => {
  return (
    <li className={style.item}>
      <h3 className={`font-md`}>{device.device_name}</h3>
      <div className={style.itemOption}>
        {device.data_options.map((option, index) => {
          const date = option.obs_time.split(" ")[0];

          return (
            <Link
              className={style.itemLink}
              key={index}
              href={{
                pathname: `/devices/${device.device_name}`,
                query: { date, optionData: option.data_name },
              }}
            >
              <strong className={`font-sm ${style.itemTitle}`}>
                {option.data_name}
                <LinkIcon className={style.linkIcon} />
              </strong>

              <p className={`font-sm`}>
                {option.nvalue} {""}
                {option.unit}
              </p>
            </Link>
          );
        })}
      </div>
    </li>
  );
};

const DeviceItem = React.memo(DeviceItemComponent);

DeviceItem.displayName = "DeviceItem";

export { DeviceItem };
