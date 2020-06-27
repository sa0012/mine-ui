module.exports = {
  // 显示的告诉 Jest 需要处理的文件类型
  moduleFileExtensions: ['js', 'jsx', 'vue', 'ts', 'tsx'],
  // 用 `vue-jest` 处理 `*.vue` 文件
  transform: {
    '\\.(vue)$': 'vue-jest',
    // 使用babel对js, jsx, ts, tsx进行转义
    '\\.(js|jsx|ts|tsx)$': '<rootDir>/test/transformer.js',
  },
  // 快照的序列化工具
  snapshotSerializers: ['jest-serializer-vue'],
  // 定义需要收集测试覆盖率信息的文件
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx,vue}',
    '!**/style/**',
    '!**/demo/**',
    '!src/common/**'
  ],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: './test/coverage'
}
