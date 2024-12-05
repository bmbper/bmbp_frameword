export const HomeState: { [key: string]: any } = {};
export const HomeAction = {
    init: () => {
        const [pageTitle, setPageTitle] = React.useState([]);
        HomeState.pageTitle = pageTitle;
        HomeState.setPageTitle = setPageTitle;
        const [pageIframeSrc, setPageIframeSrc] = React.useState("");
        HomeState.pageIframeSrc = pageIframeSrc;
        HomeState.setPageIframeSrc = setPageIframeSrc;


        const [navMenuData, setNavMenuData] = React.useState([{
            menu_id: '001',
            menu_name: '配置置中心',
            menu_icon: 'icon-peizhi-yunweipeizhi',
            menu_name_path: '配置中心',
            menu_url: "#",
            children: [
                {
                    menu_id: '001001',
                    menu_name: '应用分组管理',
                    menu_icon: 'icon-yingyongguanli',
                    menu_url: "/rbac/app/group/index.view",
                    menu_name_path: '配置中心/应用分组管理',
                }
            ]
        }]);
        HomeState.navMenuData = navMenuData;
        HomeState.setNavMenuData = setNavMenuData;
    },
    onClickSideMenu: (menu) => {
        if (menu.menu_url && "#" != menu.menu_url) {
            HomeState.setPageIframeSrc(menu.menu_url);
            HomeState.setPageTitle(menu.menu_name_path.split("/"));
        }
    },

    logout: () => {
        axios.post("./auth/logout.action").then((resp: any) => {
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