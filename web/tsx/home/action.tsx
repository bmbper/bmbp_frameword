export const HomeState: { [key: string]: any } = {};
export const HomeAction = {
    init: () => {
        const [pageTitle, setPageTitle] = React.useState(["首页", "个人首页"]);
        HomeState.pageTitle = pageTitle;
        HomeState.setPageTitle = setPageTitle;
        const [pageIframeSrc, setPageIframeSrc] = React.useState("index.view");
        HomeState.pageIframeSrc = pageIframeSrc;
        HomeState.setPageIframeSrc = setPageIframeSrc;
        const [navMenuData, setNavMenuData] = React.useState([{
            id: '001',
            name: '配置置中心',
            icon: 'icon-peizhi-yunweipeizhi',
            children: [
                {
                    id: '001001',
                    name: '应用管理',
                    icon: 'icon-yingyongguanli'
                }
            ]
        }]);
        HomeState.navMenuData = navMenuData;
        HomeState.setNavMenuData = setNavMenuData;
    },
    onClickSideMenu: (menu) => {
        if (menu.url && "#" != menu.url) {
            HomeState.setContentSrc(menu.url);
            HomeState.setSelectMenu(menu);
            HomeState.setBreadcrumbData(menu.namePath.split("/"));
        }
    },

};