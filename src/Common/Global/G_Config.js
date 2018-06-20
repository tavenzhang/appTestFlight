
import rootStore from "../../Data/store/RootStore";
import PropTypes from 'prop-types';
import NavigatorHelper from "../JXHelper/TCNavigatorHelper";
import {layoutAnimaton} from "./LayoutAnimaton";

//整合全局 不变的使用 引用 常量 减少import的数量 ，以JX_ 开头

global.JX_NavHelp = NavigatorHelper

global.JX_Store = rootStore

global.JX_PropTypes = PropTypes

global.JX_LayoutAnimaton = layoutAnimaton;

