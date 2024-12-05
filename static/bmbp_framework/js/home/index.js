// web/tsx/home/action.tsx
var HomeState = {};
var HomeAction = {
  init: () => {
    const [pageTitle, setPageTitle] = React.useState([]);
    HomeState.pageTitle = pageTitle;
    HomeState.setPageTitle = setPageTitle;
    const [pageIframeSrc, setPageIframeSrc] = React.useState("");
    HomeState.pageIframeSrc = pageIframeSrc;
    HomeState.setPageIframeSrc = setPageIframeSrc;
    const [navMenuData, setNavMenuData] = React.useState([{
      menu_id: "001",
      menu_name: "配置置中心",
      menu_icon: "icon-peizhi-yunweipeizhi",
      menu_name_path: "配置中心",
      menu_url: "#",
      children: [
        {
          menu_id: "001001",
          menu_name: "应用分组管理",
          menu_icon: "icon-yingyongguanli",
          menu_url: "/rbac/app/group/index.view",
          menu_name_path: "配置中心/应用分组管理"
        }
      ]
    }]);
    HomeState.navMenuData = navMenuData;
    HomeState.setNavMenuData = setNavMenuData;
  },
  onClickSideMenu: (menu) => {
    if (menu.menu_url && menu.menu_url != "#") {
      HomeState.setPageIframeSrc(menu.menu_url);
      HomeState.setPageTitle(menu.menu_name_path.split("/"));
    }
  },
  logout: () => {
    axios.post("./auth/logout.action").then((resp) => {
      if (resp.code == 0) {
        arco.Message.success(resp.msg);
        window.localStorage.removeItem("token");
        window.location.href = appHomeView;
      } else {
        arco.Message.error(resp.msg);
      }
    });
  }
};

// web/tsx/home/index.tsx
window.onload = () => {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(/* @__PURE__ */ React.createElement(FrameworkView, null));
};
var FrameworkView = () => {
  HomeAction.init();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_full"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_layout_v"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_header"
  }, /* @__PURE__ */ React.createElement(BmbpAppIcon, null), /* @__PURE__ */ React.createElement(BmbpAppNav, null), /* @__PURE__ */ React.createElement(BmbpAppSetting, null), /* @__PURE__ */ React.createElement(BmbpAppUser, null)), /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_layout_h"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_aside"
  }, /* @__PURE__ */ React.createElement(BmbpSideNavMenu, null)), /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_divider_v"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_layout_v"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_center"
  }, /* @__PURE__ */ React.createElement(PageView, null)), /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_bottom"
  }, /* @__PURE__ */ React.createElement(AppCopyRightView, null)))))))));
};
var BmbpAppIcon = () => {
  const appIconString = "data:image/png;base64," + appIcon;
  return /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_app_icon"
  }, /* @__PURE__ */ React.createElement("img", {
    src: appIconString
  }), /* @__PURE__ */ React.createElement("span", null, "Bmbp Admin"));
};
var BmbpAppNav = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_app_nav"
  });
};
var BmbpAppSetting = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_app_setting"
  }, /* @__PURE__ */ React.createElement(BmbpIconFont, {
    type: "icon-quanping"
  }), /* @__PURE__ */ React.createElement(BmbpIconFont, {
    type: "icon-pc"
  }), /* @__PURE__ */ React.createElement(BmbpIconFont, {
    type: "icon-weidu"
  }), /* @__PURE__ */ React.createElement(BmbpIconFont, {
    type: "icon-shezhixuanzhong"
  }));
};
var BmbpAppUser = () => {
  const dropList = /* @__PURE__ */ React.createElement(arco.Menu, null, /* @__PURE__ */ React.createElement(arco.Menu.Item, {
    key: "1"
  }, "个人中心"), /* @__PURE__ */ React.createElement(arco.Menu.Item, {
    key: "2"
  }, "修改密码"), /* @__PURE__ */ React.createElement(arco.Menu.Item, {
    key: "3",
    onClick: () => {
      HomeAction.logout();
    }
  }, "退出"));
  return /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_app_user"
  }, /* @__PURE__ */ React.createElement(arco.Dropdown, {
    droplist: dropList,
    position: "br"
  }, /* @__PURE__ */ React.createElement(arco.Avatar, {
    autoFixFontSize: true
  }, currentUser)));
};
var BmbpSideNavMenu = () => {
  const generateMenu = (menuArray) => {
    return menuArray.map((item) => {
      if (item.children && item.children.length > 0) {
        return /* @__PURE__ */ React.createElement(arco.Menu.SubMenu, {
          key: item.menu_id,
          title: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(BmbpIconFont, {
            type: item.menu_icon
          }), item.menu_name),
          onClick: (e) => {
            e.stopPropagation();
            HomeAction.onClickSideMenu(item);
          }
        }, generateMenu(item.children));
      } else {
        return /* @__PURE__ */ React.createElement(arco.Menu.Item, {
          key: item.menu_id,
          onClick: (e) => {
            e.stopPropagation();
            HomeAction.onClickSideMenu(item);
          }
        }, /* @__PURE__ */ React.createElement(BmbpIconFont, {
          type: item.menu_icon
        }), item.menu_name);
      }
    });
  };
  return /* @__PURE__ */ React.createElement(arco.Menu, {
    accordion: true,
    ellipsis: true,
    className: "bmbp-nav-menu"
  }, generateMenu(HomeState.navMenuData));
};
var PageView = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_layout_v"
  }, /* @__PURE__ */ React.createElement(PageTitle, null), /* @__PURE__ */ React.createElement(PageIFrame, null));
};
var PageTitle = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_page_breadcrumb"
  }, /* @__PURE__ */ React.createElement(arco.Breadcrumb, null, HomeState.pageTitle.map((item) => {
    return /* @__PURE__ */ React.createElement(arco.Breadcrumb.Item, null, item);
  })));
};
var PageIFrame = () => {
  return /* @__PURE__ */ React.createElement("iframe", {
    src: HomeState.pageIframeSrc,
    className: "bmbp_page_iframe"
  });
};
var AppCopyRightView = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "bmbp_copy_right"
  }, "Copyright © 2023-2024 bmbp.com All Rights Reserved.");
};
