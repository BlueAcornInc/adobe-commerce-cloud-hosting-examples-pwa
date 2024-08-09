# Adobe Commerce Cloud Hosting Examples for Node Applications

This repository demonstrates the minimal configuration to build an Adobe Commerce Cloud instance that's suitable for hosting
general-purpose web applications, such as Node.js based PWAs. 

## Hello World Express Server

`server.js` and `package.json` define a simple hello world express server that can be replaced with your application code. 

This is a typical express server that will listen on port `3000`. 

```bash
npm run start
```

Adobe Commerce Cloud is configured to listen to port `8888` by default, please make sure you have some capability to change the default port behavior. In our example, we use the environment variable `PORT` to override the default value, i.e.

```bash
npm run start:cloud
```
In this approach, we're _adding_ a npm script which triggers the PORT. This can also be accomplished through setting a Project Variable within Adobe Commerce Cloud, or potentially in the build pipeline itself.

## License

The MIT License is a permissive open-source license that allows for the free use, modification, and distribution of software. It grants permission to anyone, including Adobe and other users of Adobe Commerce Cloud, to freely reuse and host applications on the platform. This license ensures that there are minimal restrictions on the usage of the code, promoting collaboration and innovation. To learn more about the MIT License, you can visit [here](https://opensource.org/licenses/MIT).

## References

* Useful Platform.sh Documentation
    * [Using Git Submodules](https://docs.platform.sh/development/submodules.html)
    * [Defining Routes](https://docs.platform.sh/define-routes.html)
    * [Managing Multi-site Configurations](https://platform.sh/blog/multisite-on-platform.sh-the-how-and-why/)
    * [Unified App Approach](https://platform.sh/blog/one-source-many-apps/)