"use client";

import { getAllAppsForUser } from "@/api-routes/ApiRoutes";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { isEmptyArray, resolveResponse } from "@/lib/utils/CommonUtils";
import { Button } from "../common/button/Button";
import { FaPlus } from "react-icons/fa";
import SingleAppCard from "../single-app-card/SingleAppCard";
import { useRouter } from "next/navigation";
import { appRouteList } from "@/lib/utils/PageRouteUtils";

const User = () => {
  const router = useRouter();
  const [ownApps, setOwnApps] = useState([]);
  useEffect(() => {
    const getApps = async () => {
      const apps = await resolveResponse(getAllAppsForUser());
      setOwnApps(apps);
    };
    getApps();
  }, []);

  const handleCreateApp = () => {
    router.push(appRouteList.createApp);
  };

  return (
    <>
      <div className={styles["header"]}>
        <h2 className={styles["title"]}>APPS</h2>
        <Button className={styles["create-app"]} onClick={handleCreateApp}>
          <FaPlus /> Add App
        </Button>
      </div>
      <div className={styles["wrapper"]}>
        {isEmptyArray(ownApps) ? (
          <div>No App Available</div>
        ) : (
          <div className={styles["app-list"]}>
            {ownApps?.map((app) => (
              <SingleAppCard
                key={app._id}
                app={app}
                ownApps={ownApps}
                setOwnApps={setOwnApps}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default User;
