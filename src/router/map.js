/*用户登录模块*/
const UserModule = r => require.ensure([], () => r(require("@/components/user")))
const LoginModule = r => require.ensure([], () => r(require("@/components/user/login")))

/*用户注册模块*/
const RegisterModule = r => require.ensure([], () => r(require("@/components/user/register")),'RegisterModule')
const RegisterInput = r => require.ensure([], () => r(require("@/components/user/register/inputNumber")), "RegisterInput")
const LoginUnBind =r =>require.ensure([],()=>r(require("@/components/user/register/unBind")),'LoginUnBind')
const RegisterCheck = r => require.ensure([], () => r(require("@/components/user/register/checkNumber")), "RegisterCheck")
const RegisterSetting = r => require.ensure([], () => r(require("@/components/user/register/settingPwd")), "RegisterSetting")

/*忘记密码*/
const forgetPwdSet = r => require.ensure([], () => r(require("@/components/user/forgetPwd")), "forgetPwdSet")
const ForgetPwdInput = r => require.ensure([], () => r(require("@/components/user/forgetPwd/inputNumber")), "ForgetPwdInput")
const ForgetPwdCheck = r => require.ensure([], () => r(require("@/components/user/forgetPwd/checkNumber")), "ForgetPwdCheck")
const ForgetPwdSetting = r => require.ensure([], () => r(require("@/components/user/forgetPwd/settingPwd")), "ForgetPwdSetting")

/*微信登录模块*/
/**
 *  a.触发登录（Y——>体检预约页面,获取用户Unionid，N——>绑定登录手机号）
 *  b.绑定手机号（Y(但未授权，提示授权)——>登录页， N->走手机号绑定流程）
 *  c.绑定中（判断是否为注册用户 （Y——>登录页， N——>生成用户——>登录））
 *  d.流程结束
 *
 * **/
const wxLoginModule = r => require.ensure([], () => r(require("@/components/user/wxLogin")),'wxLoginModule')
//绑定手机号
const bindMobileNo = r => require.ensure([], () => r(require("@/components/user/wxLogin/bindMobileNo")),'bindMobileNo')
/*授权中间页*/
const wxAuthor = r => require.ensure([], () => r(require("@/components/author")),'wxAuthor')


//服务条款页面模块-用户协议
const ServiceTermModule = r => require.ensure([], () => r(require("@/components/user/register/serviceTerm")), "ServiceTermModule")

/*体检预约模块*/
const appointmentModule = r => require.ensure([], () => r(require("@/components/appointment")))
const appointmentMake = r => require.ensure([], () => r(require("@/components/appointment/make")),'appointmentMake')
//预约首页
const appointmentDate = r => require.ensure([], () => r(require("@/components/appointment/make/date")),'appointmentDate')
//预约详情（操作）
const appointmentDetailsAction = r => require.ensure([], () => r(require("@/components/appointment/make/detailsAction")),'appointmentDetailsAction')
//备忘
const appointmentCheat = r => require.ensure([], () => r(require("@/components/appointment/make/cheat")),'appointmentCheat')
//取消预约原因
const appointmentBecause = r => require.ensure([], () => r(require("@/components/appointment/make/because")),'appointmentBecause')
//预约列表模块
const appointmentList = r => require.ensure([], () => r(require("@/components/appointment/list")),'appointmentList')
const appointmentOrderList = r => require.ensure([], () => r(require("@/components/appointment/list/orderList")),'appointmentOrderList')
const appointmentSearch = r => require.ensure([], () => r(require("@/components/appointment/list/search")),'appointmentSearch')
//预约详情
const appointmentDetails = r => require.ensure([], () => r(require("@/components/appointment/list/details")),'appointmentDetails')

/*设置模块*/
const SettingModule = r => require.ensure([], () => r(require("@/components/setting")),'SettingModule')
//设置
const SettingHead = r => require.ensure([], () => r(require("@/components/setting/headIndex")),'SettingHead')
//预约设置
const SettingConvention = r => require.ensure([], () => r(require("@/components/setting/convention")),'SettingConvention')
//修改密码
const SettingPassword = r => require.ensure([], () => r(require("@/components/setting/password")),'SettingPassword')

/*到检确认模块*/
const whetherCheck = r => require.ensure([], () => r(require("@/components/whetherCheck")),'whetherCheck')
//正常到检
const whetherCheckLoad = r => require.ensure([], () => r(require("@/components/whetherCheck/process")),'whetherCheckLoad');
//无操作权限
const CheckNonePermissions = r => require.ensure([], () => r(require("@/components/whetherCheck/permissions")),'CheckNonePermissions');
//到检信息
const CheckInformation = r => require.ensure([], () => r(require("@/components/whetherCheck/information")),'CheckInformation');
//到检引导
const CheckGuide = r => require.ensure([], () => r(require("@/components/whetherCheck/guide")),'CheckGuide');

const routes =[
  {
    path: '/',
    name: 'user',
    redirect:'/appointment/make/date',
    meta: { title: "登录" },
    component: UserModule,
    children:[
      {
        path: '/user/login',
        name: 'login',
        meta: { title: "登录" },
        component: LoginModule,
      },
      {
        path: '/author',
        meta: { title: "微信授权" },
        name: 'author',
        component: wxAuthor,
      },
      {
        path: '/user/wxLogin',
        name: 'wxLogin',
        redirect:'/user/wxLogin/bindMobileNo',
        meta: { title: "登录" },
        component: wxLoginModule,
        children:[
          {
            path: "/user/wxLogin/bindMobileNo",
            meta: { title: "绑定手机号" },
            component: bindMobileNo
          }
        ]
      },
      {
        path: "/user/register",
        name: "register",
        redirect: "/user/register/inputNumber",
        meta: { title: "注册" },
        component: RegisterModule,
        children:[
          {
            path: "inputNumber",
            meta: { title: "注册" },
            component: RegisterInput
          },
          {
            path: "check-number/:number",
            meta: { title: "注册" },
            component: RegisterCheck
          },
          {
            path: "setting-pwd/:number/:token",
            meta: { title: "注册" },
            component: RegisterSetting
          },
          {
            path: "unBind",
            meta: { title: "体检预约" },
            component: LoginUnBind
          },
          {
            path: "serviceTerm",
            meta: { title: "用户协议" },
            component: ServiceTermModule
          },
        ]
      },
      {
        path: "/user/forgetPwd",
        name: "forgetPwd",
        redirect: "/user/forgetPwd/inputNumber",
        meta: { title: "忘记密码" },
        component: forgetPwdSet,
        children:[
          {
            path: "inputNumber",
            meta: { title: "忘记密码" },
            component: ForgetPwdInput
          },
          {
            path: "check-number/:number",
            meta: { title: "忘记密码" },
            component: ForgetPwdCheck
          },
          {
            path: "setting-pwd/:number/:token",
            meta: { title: "忘记密码" },
            component: ForgetPwdSetting
          }
        ]
      }
    ]
  },
  {
    path: '/appointment',
    name: 'appointment',
    redirect:'/appointment/make/date',
    meta: { title: "体检预约" },
    component: appointmentModule,
    children:[
      {
        path: 'make',
        name: 'make',
        redirect:'/appointment/make/date',
        component: appointmentMake,
        children:[
          {
            path: 'date',
            name: 'date',
            meta: { title: "体检预约" },
            component: appointmentDate,
          },
          {
            path: '/appointment/make/detailsAction/:reservation/:isCheat',
            name: 'detailsAction',
            meta: { title: "预约详情" },
            component: appointmentDetailsAction,
          },
          {
            path: '/appointment/make/cheat/:memos/:memosData',
            name: 'cheat',
            meta: { title: "备忘" },
            component: appointmentCheat,
          },
          {
            path: '/appointment/make/because/:cancel/:cancelData',
            name: 'because',
            meta: { title: "原因" },
            component: appointmentBecause,
          }
        ]
      },
      {
        path: '/appointment/list',
        name: 'list',
        meta: { title: "预约列表" },
        redirect:'/appointment/list/orderList/0',
        component: appointmentList,
        children:[
          {
            path: '/appointment/list/orderList/:status',
            name: 'orderList',
            meta: { title: "预约列表" },
            component: appointmentOrderList,
          },
          {
            path: '/appointment/list/search',
            name: 'search',
            meta: { title: "预约搜索" },
            component: appointmentSearch,
          },
          {
            path: '/appointment/list/details/:status',
            name: 'details',
            meta: { title: "预约详情" },
            component: appointmentDetails,
          },


        ]
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    redirect:'/setting/headIndex',
    meta: { title: "设置" },
    component: SettingModule,
    children:[
      {
        path: 'headIndex',
        name: 'headIndex',
        meta: { title: "设置" },
        component: SettingHead,
      },
      {
        path: 'convention',
        name: 'convention',
        meta: { title: "预约设置" },
        component: SettingConvention,
      },
      {
        path: 'password',
        name: 'password',
        meta: { title: "预约设置" },
        component: SettingPassword,
      }
    ]
  },
  {
    path: '/whetherCheck',
    name: 'whetherCheck',
    redirect:'/whetherCheck/process',
    meta: { title: "到检确认" },
    component: whetherCheck,
    children:[
      {
        path: 'process',
        name: 'process',
        meta: { title: "到检确认" },
        component: whetherCheckLoad,
      },
      {
        path: 'permissions',
        name: 'permissions',
        meta: { title: "到检确认" },
        component: CheckNonePermissions,
      },
      {
        path: '/whetherCheck/information/:reservationNo',
        name: 'information',
        meta: { title: "到检确认" },
        component:CheckInformation,
      },
      {
        path: '/whetherCheck/guide',
        name: 'guide',
        meta: { title: "到检确认" },
        component:CheckGuide,
      }
    ]
  }
]
export default routes
