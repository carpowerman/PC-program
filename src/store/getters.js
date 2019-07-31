const getters = {
    tag: state => state.tags.tag,
    language: state => state.common.language,
    website: state => state.common.website,
    userInfo: state => state.user.userInfo,
    colorName: state => state.common.colorName,
    themeName: state => state.common.themeName,
    isShade: state => state.common.isShade,
    isCollapse: state => state.common.isCollapse,
    keyCollapse: (state, getters) => getters.screen > 1 ? getters.isCollapse : false,
    screen: state => state.common.screen,
    isLock: state => state.common.isLock,
    isFullScren: state => state.common.isFullScren,
    lockPasswd: state => state.common.lockPasswd,
    tagList: state => state.tags.tagList,
    tagWel: state => state.tags.tagWel,
    token: state => state.user.token,
    roles: state => state.user.roles,
    permission: state => state.user.permission,
    menu: state => state.user.menu,
    menuAll: state => state.user.menuAll,
    logsList: state => state.logs.logsList,
    logsLen: state => state.logs.logsList.length || 0,
    logsFlag: (state, getters) => getters.logsLen === 0,
    homeEcharts: state => {
        let echartsData = [];
        state.home.echarts.forEach((item) => {
            echartsData.push({
                item: item.label,
                '审核通过数量': item.passed,
                '当月申请数量': item.total
            });
        });
        return echartsData;
    },
    role: state => state.role.roleList,
    orgTree: state => state.organization.tree
}
export default getters
