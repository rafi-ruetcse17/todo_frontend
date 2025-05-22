"use client";

import { getAllAppsForUser } from "@/api-routes/ApiRoutes";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { isEmptyArray, resolveResponse } from "@/lib/utils/CommonUtils";
import { Button } from "../common/button/Button";
import { FaPlus } from "react-icons/fa";
import SingleAppCard from "../single-app-card/SingleAppCard";

const User = () => {
  const [ownApps, setOwnApps] = useState();
  useEffect(() => {
    const getApps = async () => {
      const apps = await resolveResponse(getAllAppsForUser());
      setOwnApps(apps);
    };
    getApps();
  }, []);

  const handleCreateApp = () => {};

  return (
    <>
      <div className={styles["header"]}>
        <h2 className={styles["title"]}>TODO APPS</h2>
        <Button className={styles["create-app"]} onClick={handleCreateApp}>
          <FaPlus /> Create App
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
