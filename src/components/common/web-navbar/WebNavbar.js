"use client";

import styles from "./WebNavabr.module.css";
import { Button } from "../button/Button";
import { usePathname, useRouter } from "next/navigation";
import { arePathsEqual } from "@/lib/utils/CommonUtils";
import { appRouteList } from "@/lib/utils/PageRouteUtils";
import { signOut } from "next-auth/react";

const WebNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  const handleRedirectionToUserPage = () => {
    router.push(appRouteList.user);
  };

  return (
    <nav className={styles["nav"]}>
      <div></div>
      <div className={styles["nav-right"]}>
        {!arePathsEqual(pathname, appRouteList.user) && (
          <Button
            className={styles["history"]}
            onClick={handleRedirectionToUserPage}
          >
            My porducts
          </Button>
        )}
        <Button className={styles["logout-button"]} onClick={handleLogout}>
          LOGOUT
        </Button>
      </div>
    </nav>
  );
};

export default WebNavbar;
