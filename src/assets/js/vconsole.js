/**
  * @file 移动版的console
  * @author coder
  * @date 2019.02.26
  */
import VConsole from 'vconsole';

let vConsole = () => {
    if (process.env.NODE_ENV === 'development') {
        // 测试环境使用手机控制台
        return new VConsole();
    }
    return '';
};
export default vConsole();
