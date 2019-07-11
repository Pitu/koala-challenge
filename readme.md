## Koala Weather Widget challenge

### My take on it
My idea was to build a single component with no external dependencies that can be used on any project. I've done this before for different open source projects, but since I wanted to make it nice and pretty with animated svg icons I opted for making a whole project just to host it. For the most part it's still a single component but to make it easier to read the svg's are being loaded separately from the `assets` folder.

This project assumes the weather widget is being loaded from an already working layout and that's why I provide a sample page with some minified css. It should not be taken as part of the challenge since it's mostly a placeholder for the actual widget and I didn't want to waste precious time on the layout if the concept is a `widget`. In order to do this I grabbed a quick example with UI kit that has a column layout where I can showcase the widget in 2 different sizes.

It shows the forecast using the free tier API from OpenWeather, so it limits the data to 5 days and every 3 hours. The widget grabs the first item in the forecast array since it's the most recent one and then shows the weather for the current time in addition to the next 4 days at the same time of day.

### Demo
You can find a working implementation in [https://koala.kana.dev](https://koala.kana.dev)

### How to run
1. `yarn install`
2. `yarn dev` or `yarn build && yarn start`
3. In case you want to change the API key for OpenWeather, pass a different one to the widget component in `src/pages/index.vue`
