import {HomeAction, HomeState} from "./action";

window.onload = () => {
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(<FrameworkView/>);
}

const FrameworkView = () => {
    HomeAction.init();
    return (
        <>
            <div className={"bmbp_full"}>
                <div className={'bmbp_layout_v'}>
                    <div className={'bmbp_header'}>
                        <BmbpAppIcon/>
                        <BmbpAppNav/>
                        <BmbpAppSetting/>
                        <BmbpAppUser/>
                    </div>
                    <div className={'bmbp_center'}>
                        <div className={'bmbp_layout_h'}>
                            <div className={'bmbp_aside'}>
                                <BmbpSideNavMenu/>
                            </div>
                            <div className={"bmbp_divider_v"}></div>
                            <div className={'bmbp_center'}>
                                <div className={'bmbp_layout_v'}>
                                    <div className={'bmbp_center'}>
                                        <PageView/>
                                    </div>
                                    <div className={'bmbp_bottom'}>
                                        <AppCopyRightView/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const BmbpAppIcon = () => {
    const appIconString = "data:image/png;base64," + appIcon;
    return (
        <div className={'bmbp_app_icon'}>
            <img src={appIconString}></img>
            <span>Bmbp Admin</span>
        </div>
    )
}
const BmbpAppNav = () => {
    return (
        <div className={'bmbp_app_nav'}>
        </div>
    )
}
const BmbpAppSetting = () => {
    return (
        <div className={'bmbp_app_setting'}>
            <BmbpIconFont type={'icon-quanping'}></BmbpIconFont>
            <BmbpIconFont type={'icon-pc'}></BmbpIconFont>
            <BmbpIconFont type={'icon-weidu'}></BmbpIconFont>
            <BmbpIconFont type={'icon-shezhixuanzhong'}></BmbpIconFont>
        </div>
    )
}
const BmbpAppUser = () => {
    const dropList = (
        <arco.Menu>
            <arco.Menu.Item key='1'>个人中心</arco.Menu.Item>
            <arco.Menu.Item key='2'>修改密码</arco.Menu.Item>
            <arco.Menu.Item key='3'>退出</arco.Menu.Item>
        </arco.Menu>
    );
    return (
        <div className={'bmbp_app_user'}>
            <arco.Dropdown droplist={dropList} position={'br'}>
                <arco.Avatar autoFixFontSize={true}>
                    {currentUser}
                </arco.Avatar>
            </arco.Dropdown>
        </div>
    )
}


const BmbpSideNavMenu = () => {
    const generateMenu = (menuArray: any[]) => {
        return menuArray.map((item: any) => {
            if (item.children && item.children.length > 0) {
                return (
                    <arco.Menu.SubMenu
                        key={item.id}
                        title={<>
                            <BmbpIconFont type={item.icon}/>
                            {item.name}</>}
                        onClick={() => {
                            HomeAction.onClickSideMenu(item);
                        }}
                    >
                        {generateMenu(item.children)}
                    </arco.Menu.SubMenu>
                );
            } else {
                return (
                    <arco.Menu.Item
                        key={item.id}
                        onClick={() => {
                            HomeAction.onClickSideMenu(item);
                        }}
                    >
                        <BmbpIconFont type={item.icon}/>
                        {item.name}
                    </arco.Menu.Item>
                );
            }
        });
    };

    return (
        <arco.Menu accordion ellipsis className="bmbp-nav-menu">
            {generateMenu(HomeState.navMenuData)}
        </arco.Menu>
    );
};
const PageView = () => {
    return (
        <div className={'bmbp_layout_v'}>
            <PageTitle/>
            <PageIFrame/>
        </div>
    )
}

/// 面包屑
const PageTitle = () => {
    return (
        <div className="bmbp_page_breadcrumb">
            <arco.Breadcrumb>
                {HomeState.pageTitle.map((item: any) => {
                    return <arco.Breadcrumb.Item>{item}</arco.Breadcrumb.Item>;
                })}
            </arco.Breadcrumb>
        </div>
    );
};
/// 中间嵌套页面
const PageIFrame = () => {
    return (
        <iframe
            src={HomeState.pageIframeSrc}
            className="bmbp_page_iframe"
        ></iframe>
    );
};

const AppCopyRightView = () => {
    return (
        <div className={'bmbp_copy_right'}>
            Copyright © 2023-2024 bmbp.com All Rights Reserved.
        </div>
    )
}