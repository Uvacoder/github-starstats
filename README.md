# Awesome Github star visualize tool

[中文文档](./README.zh.md)

These is no tool to visualize daily github star number online, so I build one! 🌈🌈🌈

![star data loaded](demo/loaded.png)

Visit: [http://stars.yangerxiao.com](http://stars.yangerxiao.com). Input the github repo url, star data will be loaded automatically.

## Features

- Mobile friendly 📱
- Select time slot handily ✋
- Different chart types 📊
- List all the stargazers 👦
- Export the chart as PNG image 🖼

![star data result](demo/result.png)

## Run 

`git clone --depth=1 https://github.com/zerosoul/github-star-stats.git`

`cd github-star-stats & yarn install`

Remember to set environment variable `VITE_G_TOKEN` to yourself in `.env*` file

`yarn dev`

## Thanks

- [Github API v4](https://developer.github.com/v4/)
- [apollo graphql](https://apollographql.com/docs/react/)
- [react.js](https://reactjs.org)
- vite
- [Recharts](http://recharts.org/)
- [antd](https://ant.design)
- [styled-components](https://styled-components.com): CSS-IN-JS Best Practice
- eslint + prettier: for better code
- husky + commitlint: for better git commit format
- Thanks the great Open Source

## Support

### Reward

![reward code](./src/assets/img/reward.jpg)

### Upvoted Producthunt

<a href="https://www.producthunt.com/posts/github-star-statistics-tool?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-github-star-statistics-tool" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=171040&theme=dark" alt="Github Star Statistics Tool - Awesome github daily star statistics tool | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>
