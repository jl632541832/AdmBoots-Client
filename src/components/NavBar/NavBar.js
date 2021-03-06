/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import Icon from '../Icon';
import { Popover, Badge, Avatar, Modal } from 'antd';
import { router } from 'dva';
import cx from 'classnames';
import './style/index.less';
import logoImg from 'assets/images/logo.png';
import SearchBox from './SearchBox';
import ResetPwd from './ResetPwd';
const { Link } = router;


/**
 * 其本本局头部区域
 */
class NavBar extends PureComponent {
  state = {
    openSearchBox: false,
    openModifyPassword: false,
  };

  static defaultProps = {
    fixed: true,
    theme: '' //'bg-dark',
  };

  toggleFullScreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  onCloseSearchBox = () => {
    this.setState({
      openSearchBox: false
    });
  };

  onOpenSearchBox = () => {
    this.setState({
      openSearchBox: true
    });
  };

  onDropdownMenuClick = (itemName) => {
    if (itemName === 'modifyPassword') {
      this.setState({
        openModifyPassword: true,
      });
    }
  };
  onCloseModifyPwd = () => {
    this.setState({
      openModifyPassword: false,
    });
  };
  render() {
    const { openSearchBox, openModifyPassword } = this.state;
    const {
      fixed,
      theme,
      onCollapseLeftSide,
      collapsed,
      onExpandTopBar,
      toggleSidebarHeader,
      user,
      isMobile
    } = this.props;

    const classnames = cx('navbar', {
      'navbar-fixed-top': !!fixed,
      'navbar-sm': isMobile ? true : collapsed,
      ['bg-' + theme]: !!theme
    });

    return (
      <header className={classnames}>
        <div className="navbar-branding">
          <Link className="navbar-brand" to="/">
            <img src={logoImg} alt="logo" />
            <b>Adm</b>
            Boots
          </Link>
          <span className="toggle_sidemenu_l" onClick={onCollapseLeftSide}>
            <Icon type="lines" />
          </span>
        </div>
        <ul className="nav navbar-nav navbar-left clearfix">
          {collapsed || isMobile ? null : (
            <li>
              <a className="sidebar-menu-toggle" onClick={toggleSidebarHeader}>
                <Icon type="ruby" />
              </a>
            </li>
          )}
          <li>
            <a onClick={onExpandTopBar}>
              <Icon type="wand" />
            </a>
          </li>
          {isMobile ? (
            <li className="mini-search" onClick={this.onOpenSearchBox}>
              <a>
                <Icon type="search" antd />
              </a>
            </li>
          ) : (
            <li onClick={this.toggleFullScreen}>
              <a className="request-fullscreen">
                <Icon type="screen-full" />
              </a>
            </li>
          )}
        </ul>
        {isMobile ? null : (
          <form className="navbar-form navbar-search clearfix">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="全文检索"
                onClick={this.onOpenSearchBox}
              />
            </div>
          </form>
        )}
        <ul className="nav navbar-nav navbar-right clearfix">
          <li>
            <a href="https://github.com/xuke353/AdmBoots">
              <Icon type="GithubOutlined" antd />
            </a>
          </li>
          <li className="dropdown">
            <Popover
              placement="bottomRight"
              title={'通知'}
              overlayClassName={cx('navbar-popup', { [theme]: !!theme })}
              content={''}
              trigger="click"
            >
              <a className="dropdown-toggle">
                <Icon type="radio-tower" />
              </a>
            </Popover>
          </li>
          <li className="dropdown">
            <Popover
              placement="bottomRight"
              title={`WELCOME ${user.name}`}
              overlayClassName={cx('navbar-popup', { [theme]: !!theme })}
              content={<UserDropDown onDropdownMenuClick={this.onDropdownMenuClick}/>}
              trigger="click"
            >
              <a className="dropdown-toggle">
                <Badge dot offset={[8, 0]}>
                  {/* <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}  gap={1}>
                    {user.name}
                  </Avatar> */}
                  <b>{user.name}</b>
                </Badge>
              </a>
            </Popover>
          </li>
        </ul>
        <SearchBox visible={openSearchBox} onClose={this.onCloseSearchBox} />
        <Modal
          className="div-modal"
          visible={openModifyPassword}
          title={null}
          onCancel={this.onCloseModifyPwd}
          footer={null}
          destroyOnClose={true}
          maskClosable={false}
        >
          <ResetPwd onClose={this.onCloseModifyPwd} user={user} />
        </Modal>
      </header>
    );
  }
}

const UserDropDown = props => (
  <ul className="dropdown-menu list-group dropdown-persist">
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp">
        <Icon type="mail" /> 信息
        <Badge count={5} className="label" />
      </a>
    </li>
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp">
        <Icon type="users" /> 好友
        <Badge count={6} className="label" />
      </a>
    </li>
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp" onClick={() => props.onDropdownMenuClick('modifyPassword')}>
        <Icon type="gear" /> 密码修改
      </a>
    </li>
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp">
        <Icon type="ring" /> 关于
      </a>
    </li>
    <li className="list-group-item dropdown-footer">
      <Link to="/sign/login">
        <Icon type="poweroff" /> 退出
      </Link>
    </li>
  </ul>
);

export default NavBar;
