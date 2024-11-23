// web/tsx/home/action.tsx
var HomeState = {};
var HomeAction = {
  init: () => {
    const [pageTitle, setPageTitle] = React.useState(["首页", "个人首页"]);
    HomeState.pageTitle = pageTitle;
    HomeState.setPageTitle = setPageTitle;
    const [pageIframeSrc, setPageIframeSrc] = React.useState("index.view");
    HomeState.pageIframeSrc = pageIframeSrc;
    HomeState.setPageIframeSrc = setPageIframeSrc;
    const [navMenuData, setNavMenuData] = React.useState([{
      id: "001",
      name: "配置置中心",
      children: [
        {
          id: "001001",
          name: "应用管理"
        }
      ]
    }]);
    HomeState.navMenuData = navMenuData;
    HomeState.setNavMenuData = setNavMenuData;
  },
  onClickSideMenu: (menu) => {
    if (menu.url && menu.url != "#") {
      HomeState.setContentSrc(menu.url);
      HomeState.setSelectMenu(menu);
      HomeState.setBreadcrumbData(menu.namePath.split("/"));
    }
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
  }), /* @__PURE__ */ React.createElement("div", {
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
var BmbpSideNavMenu = () => {
  const generateMenu = (menuArray) => {
    return menuArray.map((item) => {
      if (item.children && item.children.length > 0) {
        return /* @__PURE__ */ React.createElement(arco.Menu.SubMenu, {
          key: item.id,
          title: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(arcoicon.IconHome, null), item.name),
          onClick: () => {
            HomeAction.onClickSideMenu(item);
          }
        }, generateMenu(item.children));
      } else {
        return /* @__PURE__ */ React.createElement(arco.Menu.Item, {
          key: item.id,
          onClick: () => {
            HomeAction.onClickSideMenu(item);
          }
        }, /* @__PURE__ */ React.createElement(arcoicon.IconHome, null), item.name);
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
