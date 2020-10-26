import { getMenuData, getPageTitle } from '@ant-design/pro-layout'; // DefaultFooter,
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useIntl, connect } from 'umi'; // Link
import React from 'react';
// import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = (props) => {
  const { route = { routes: [] } } = props;
  const { routes = [] } = route;
  const { children, location = { pathname: '' } } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({ pathname: location.pathname, formatMessage, breadcrumb, ...props });
  console.log(children);
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        {children}
        {/* <DefaultFooter/> */}
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
