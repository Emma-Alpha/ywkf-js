import { GeneratorType } from '@4399ywkf/core';
import { logger } from '@4399ywkf/utils';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { IApi } from '../../types';
import { GeneratorHelper, getUmiJsPlugin } from './utils';

export default (api: IApi) => {
  api.describe({
    key: 'generator:antd',
  });

  api.registerGenerator({
    key: 'antd',
    name: 'Enable Ant Design',
    description: 'Setup Ant Design 5.x with i18n support',
    type: GeneratorType.enable,
    checkEnable: () => {
      return !api.config.antd;
    },
    disabledDescription: () =>
      `antd has been enabled; you can remove \`antd\` field in ${api.appData.mainConfigFile} then run this again to re-setup.`,
    fn: async () => {
      const h = new GeneratorHelper(api);

      // 添加 antd v5 基础依赖
      const deps: Record<string, string> = {
        '@4399ywkf/plugins': getUmiJsPlugin(),
        antd: '^5.0.0',
        '@ant-design/icons': '^5.0.0',
      };

      h.addDevDeps(deps);

      // 构建 antd v5 配置
      const antdConfig: any = {
        // 启用 App 组件（antd v5.1.0+）
        appConfig: {
          message: {
            maxCount: 3,
          },
        },
      };

      // 设置 antd 配置
      h.setUmirc('antd', antdConfig);
      h.appendInternalPlugin('@4399ywkf/plugins/dist/antd');
      logger.info('Update config file');

      // 自动配置国际化
      h.setUmirc('locale', {
        default: 'zh-CN',
        antd: true,
        baseNavigator: true,
      });
      h.appendInternalPlugin('@4399ywkf/plugins/dist/locale');
      logger.info('Enable locale support');

      // 创建示例页面
      const srcPrefix = api.appData.hasSrcDir ? 'src/' : '';
      const examplePagePath = join(
        api.cwd,
        `${srcPrefix}pages/antd-example.tsx`,
      );

      writeFileSync(examplePagePath, getAntdV5ExamplePage());
      logger.info('Write example page: antd-example.tsx');

      // 安装依赖
      h.installDeps();
    },
  });
};

function getAntdV5ExamplePage(): string {
  return `
import { Button, Card, Space, Typography, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function AntdExample() {
  const { token } = theme.useToken();

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>
            <SmileOutlined style={{ color: token.colorPrimary }} /> 
            Welcome to Ant Design 5!
          </Title>
          
          <Paragraph>
            Ant Design 5.0 is a major version that brings many new features and improvements.
            This example page demonstrates basic usage of Ant Design components.
          </Paragraph>

          <Space>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
            <Button type="link">Link Button</Button>
          </Space>

          <Paragraph>
            You can now start building your application with Ant Design components!
          </Paragraph>
        </Space>
      </Card>
    </div>
  );
}
`.trimStart();
}
