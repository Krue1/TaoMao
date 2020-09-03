# TaoMao 淘猫电商平台

## 前端管理端

- ### 项目安装

  - `vue create taomao-management-fe`
    > `vue 2.x` **\*** <br> > `Babel` **\*** <br> > `Router` **\*** <br> > `Vuex` **\*** <br> > `CSS Pre-processor` **\*** <br> > `Linter/Formatter` **\*** <br>
  - `Use history mode for router?(Requires proper server setup for index fallback in production) (Y/n)` **n**
  - `Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):` **Sass/SCSS (with dart-sass)**
  - `Pick a linter / formatter config:` **ESLint + Prettier**
  - `Pick additional lint features:` **Lint on save**
  - `Where do you prefer placing config for Babel, ESLint, etc.?` **In dedicated config files**

- ### 依赖安装

  - #### elementUI

    > 安装饿了么 UI <br> `cnpm i element-ui -S`

    > 借助 babel-plugin-component 按需引入组件 <br> `npm install babel-plugin-component -D`

  - #### axios

    > cnpm install axios <br>
    > cnpm install --save axios vue-axios
