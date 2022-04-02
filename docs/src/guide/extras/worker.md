# Worker

There are several Oxygen Builder-specified WordPress plugins that have tried to integrate the Tailwind CSS and fail to do so. They end up creating their brand new CSS framework with chosen and limited classes. Some even market it extremely as "free of bloat" (which can be easily guessed if it refers to Tailwind CSS as a bloated framework as the past CDN is a gigantic CSS file).

Oxywind brings new fresh air and a clever approach. On the Oxygen Builder's editor, Oxywind load the new version of CDN which is a JIT engine (javascript code) that is able to generate styles you need for your design on-demand and it can be run right in the browser without any build step

For the front page on the production stage, you may want to generate the CSS file and cache it on your server. The generation or compilation task is handled by our worker who runs on our server. In this way, we are removing the need for the server to generate the CSS file.

Our worker is open-sourced and hosted on [Github](https://github.com/dplugins/oxywind-worker). You can run your own worker on your private server.