// 动态图标解析工具
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import * as RiIcons from 'react-icons/ri';

// 合并所有图标库
const iconLibraries = {
  ...FaIcons,
  ...MdIcons,
  ...IoIcons,
  ...AiIcons,
  ...BiIcons,
  ...BsIcons,
  ...FiIcons,
  ...HiIcons,
  ...SiIcons,
  ...TbIcons,
  ...RiIcons,
};

interface IconProps {
  className?: string;
}

/**
 * 动态解析ReactIcon组件
 * @param iconName 图标名称，例如 "FaGithub", "MdEmail", "IoLogoTwitter"
 * @param fallbackIcon 备用图标名称，默认为 "FaQuestionCircle"
 * @returns React图标组件
 */
export function getDynamicIcon(
  iconName: string,
  fallbackIcon: string = 'FaQuestionCircle'
): React.ComponentType<IconProps> {
  // 首先尝试获取指定的图标
  const IconComponent = iconLibraries[iconName as keyof typeof iconLibraries];
  
  if (IconComponent) {
    return IconComponent as React.ComponentType<IconProps>;
  }

  // 如果找不到，尝试备用图标
  const FallbackIcon = iconLibraries[fallbackIcon as keyof typeof iconLibraries];
  
  if (FallbackIcon) {
    console.warn(`图标 "${iconName}" 未找到，使用备用图标 "${fallbackIcon}"`);
    return FallbackIcon as React.ComponentType<IconProps>;
  }

  // 如果连备用图标都找不到，返回一个简单的默认组件
  console.error(`图标 "${iconName}" 和备用图标 "${fallbackIcon}" 都未找到`);
  return ({ className }: IconProps) => {
    // 使用React.createElement避免JSX语法问题
    return React.createElement('span', { className }, '❓');
  };
}

