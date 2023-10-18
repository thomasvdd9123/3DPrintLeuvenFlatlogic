import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { Fab, IconButton } from '@mui/material';
import { connect } from 'react-redux';
// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { Link } from '../Wrappers';
import ColorChangeThemePopper from './components/ColorChangeThemePopper';

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard';
import BreadCrumbs from '../../components/BreadCrumbs';

// context
import { useLayoutState } from '../../context/LayoutContext';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersFormPageView from 'pages/CRUD/Users/form/UsersFormPageView';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import OrdersFormPage from 'pages/CRUD/Orders/form/OrdersFormPage';
import OrdersFormPageView from 'pages/CRUD/Orders/form/OrdersFormPageView';
import OrdersTablePage from 'pages/CRUD/Orders/table/OrdersTablePage';

import ModelsFormPage from 'pages/CRUD/Models/form/ModelsFormPage';
import ModelsFormPageView from 'pages/CRUD/Models/form/ModelsFormPageView';
import ModelsTablePage from 'pages/CRUD/Models/table/ModelsTablePage';

import RolesFormPage from 'pages/CRUD/Roles/form/RolesFormPage';
import RolesFormPageView from 'pages/CRUD/Roles/form/RolesFormPageView';
import RolesTablePage from 'pages/CRUD/Roles/table/RolesTablePage';

import PermissionsFormPage from 'pages/CRUD/Permissions/form/PermissionsFormPage';
import PermissionsFormPageView from 'pages/CRUD/Permissions/form/PermissionsFormPageView';
import PermissionsTablePage from 'pages/CRUD/Permissions/table/PermissionsTablePage';

const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url));
  return <span>Redirecting...</span>;
};

function Layout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'add-section-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  // global
  let layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <BreadCrumbs />
        <Switch>
          <Route path='/admin/dashboard' component={Dashboard} />
          <Route path='/admin/user/edit' component={EditUser} />
          <Route
            path={'/admin/api-docs'}
            exact
            component={(props) => (
              <Redirect
                url={
                  process.env.NODE_ENV === 'production'
                    ? window.location.origin + '/api-docs'
                    : 'http://localhost:8080/api-docs'
                }
                {...props}
              />
            )}
          />

          <Route path={'/admin/users'} exact component={UsersTablePage} />
          <Route path={'/admin/users/new'} exact component={UsersFormPage} />
          <Route
            path={'/admin/users/:id/edit'}
            exact
            component={UsersFormPage}
          />
          <Route
            path={'/admin/users/:id/show'}
            exact
            component={UsersFormPageView}
          />

          <Route path={'/admin/orders'} exact component={OrdersTablePage} />
          <Route path={'/admin/orders/new'} exact component={OrdersFormPage} />
          <Route
            path={'/admin/orders/:id/edit'}
            exact
            component={OrdersFormPage}
          />
          <Route
            path={'/admin/orders/:id/show'}
            exact
            component={OrdersFormPageView}
          />

          <Route path={'/admin/models'} exact component={ModelsTablePage} />
          <Route path={'/admin/models/new'} exact component={ModelsFormPage} />
          <Route
            path={'/admin/models/:id/edit'}
            exact
            component={ModelsFormPage}
          />
          <Route
            path={'/admin/models/:id/show'}
            exact
            component={ModelsFormPageView}
          />

          <Route path={'/admin/roles'} exact component={RolesTablePage} />
          <Route path={'/admin/roles/new'} exact component={RolesFormPage} />
          <Route
            path={'/admin/roles/:id/edit'}
            exact
            component={RolesFormPage}
          />
          <Route
            path={'/admin/roles/:id/show'}
            exact
            component={RolesFormPageView}
          />

          <Route
            path={'/admin/permissions'}
            exact
            component={PermissionsTablePage}
          />
          <Route
            path={'/admin/permissions/new'}
            exact
            component={PermissionsFormPage}
          />
          <Route
            path={'/admin/permissions/:id/edit'}
            exact
            component={PermissionsFormPage}
          />
          <Route
            path={'/admin/permissions/:id/show'}
            exact
            component={PermissionsFormPageView}
          />
        </Switch>
        <Fab
          color='primary'
          aria-label='settings'
          onClick={(e) => handleClick(e)}
          className={classes.changeThemeFab}
          style={{ zIndex: 100 }}
        >
          <SettingsIcon style={{ color: '#fff' }} />
        </Fab>
        <ColorChangeThemePopper id={id} open={open} anchorEl={anchorEl} />
        <Footer>
          <div>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/'}
              target={'_blank'}
              className={classes.link}
            >
              Flatlogic
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/about'}
              target={'_blank'}
              className={classes.link}
            >
              About Us
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/blog'}
              target={'_blank'}
              className={classes.link}
            >
              Blog
            </Link>
          </div>
          <div>
            <Link href={'https://www.facebook.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='facebook'>
                <FacebookIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://twitter.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='twitter'>
                <TwitterIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://github.com/flatlogic'} target={'_blank'}>
              <IconButton
                aria-label='github'
                style={{ padding: '12px 0 12px 12px' }}
              >
                <GithubIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
          </div>
        </Footer>
      </div>
    </div>
  );
}

export default withRouter(connect()(Layout));
