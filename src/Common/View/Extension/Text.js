/**
 * Created by Sam on 06/09/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

import { Text } from 'react-native';

export const init = () => {
// 关闭应用中字体适应系统字体变化的效果
    Text.defaultProps = { ...Text.defaultProps, allowFontScaling: false };
};