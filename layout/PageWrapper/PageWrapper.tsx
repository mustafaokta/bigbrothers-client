import React, { forwardRef, ReactElement, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ISubHeaderProps } from "../SubHeader/SubHeader";
import { IPageProps } from "../Page/Page";
import AuthContext from "../../context/authContext";
import Mounted from "../../components/Mounted";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/router";

interface IPageWrapperProps {
  isProtected?: boolean;
  children:
    | ReactElement<ISubHeaderProps>[]
    | ReactElement<IPageProps>
    | ReactElement<IPageProps>[];
  className?: string;
}
const PageWrapper = forwardRef<HTMLDivElement, IPageWrapperProps>(
  ({ isProtected, className, children }, ref) => {
    //const { user } = useContext(AuthContext);

    const { user, verifyToken } = useUserContext();
    const router = useRouter();

    // const navigate = useNavigate();
    useEffect(() => {
      console.log("isProtected : ", isProtected);
      /* 	if (isProtected && !!user.id) {
				// navigate(`../auth-pages/login`);
				router.push(`../auth-pages/login`);
			} */

      if (
        !user.token &&
        (!localStorage.getItem("agency-web-user") ||
          !JSON.parse(localStorage.getItem("agency-web-user") || "{}").token)
      ) {
        if (!isProtected) {
          // console.log('unprotected routed to login ....')
          router.push(`../auth-pages/login`);
        } else {
         // console.log("protected routed to login ....");
        }
        router.push(`../auth-pages/login`);
      } else if (
        !user.token &&
        localStorage.getItem("agency-web-user") &&
        JSON.parse(localStorage.getItem("agency-web-user") || "{}").token
      ) {
        console.log("verifiy token ....");

        verifyToken();
      } else {
       // console.log("else girildi ....");
      }
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
      <div
        ref={ref}
        className={classNames("page-wrapper", "container-fluid", className)}
      >
        <Mounted>{children}</Mounted>
      </div>
    );
  }
);
PageWrapper.displayName = "PageWrapper";
PageWrapper.propTypes = {
  isProtected: PropTypes.bool,
  // @ts-ignore
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
PageWrapper.defaultProps = {
  isProtected: true,
  className: undefined,
};

export default PageWrapper;
