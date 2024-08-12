# Adobe Commerce Cloud Hosting Examples

This repository demonstrates the minimal configuration to build an Adobe Commerce Cloud instance that's suitable for hosting
general-purpose web applications, such as Node.js based PWAs. 

* [Live Demo](https://example-project-ownsyqq-zs5comprbmlgu.us-4.magentosite.cloud/)
* [Github Repo](https://github.com/BlueAcornInc/adobe-commerce-cloud-hosting-examples-pwa)

## Basic Configuration

Please review the `.magento.app.yaml` file to see the completed solution.

### dependancies

We can optionally install any global node dependancies required to make the solution work. This can include anything you need in the build or runtime contexts. 

In this example, we're adding the global dependancies needed to build a remix project:

```yaml
$ cat .magento.app.yaml

name: mypwa

dependencies:
    nodejs:
        node-sass: "^9.0.0"
        npm-run-all: "4.1.5"
        "@remix-run/dev": "2.11.0"
```

### hooks

Modify the build hook to align with the steps needed to build your applicaiton.


```yaml
$ cat .magento.app.yaml

name: mypwa
...
hooks:
    build: |
        set -e
        npm install
        npm run build
...
```

### starting the app

Finally, when the instance comes up this will start the server command. If this command exits for any reason, it will be immedately restarted:

```yaml
$ cat .magento.app.yaml

name: mypwa
...
web:
    commands:
        start: |
            npm run start:cloud
...
```

### mounts

While this example does not use mounts, one can easily introduce them to allow for read-write operations within the runtime stack. 

```yaml

$ cat .magento.app.yaml

name: mypwa
...
mounts:
    "build": "shared:build/"
    "public/build": "shared:public-build"
...
```

### Server listening on port 8888 

The base configuration will listen for anything to bind to port 8888 and will try and serve that out to the world. Make sure that your web server is binded to this port. This can be accomplished several ways, but in our example we're using a `npm run` command to set a `PORT` environment variable that is interpreted by our server. 

```json
$ cat package.json

{
    "name": "commerce-cloud-example",
    ...
    "scripts": {
        "start:cloud": "PORT=8888 node server.js"
    }
    ...
}
```

## Single App Mode

This project, when pushed directly to Adobe Commerce Cloud, will deploy and host this project in a stand-alone mode. 

| Filename | Description | Reference |
|----------|----------|----------|
|   `.magento.app.yaml` |  Provides application-level configuration, including how to build and serve the solution  |   [Platform.sh](https://docs.platform.sh/create-apps.html#a-minimal-application) \| [Experience League](https://experienceleague.adobe.com/en/docs/commerce-cloud-service/user-guide/configure/app/configure-app-yaml)  |
|   `.magento/routes.yaml`  |   Defines how routes work by allowing you to define a url and how that routes back to the application  |   [Platform.sh](https://docs.platform.sh/define-routes.html)  |


## Multi-app Mode

In this arrangement, this project is included as a git submodule as part of a traditional Adobe Commerce Cloud project. When the project-level repository is built and deployed in Commerce Cloud, the deployment flow will fetch all git submodules, detect the .magento configuration, and deploy this project out as a side-car.

### Configuring the Git Submodule

```bash
$ git submodule init <clone-down-url> pwa/
$ git add pwa .gitmodules
$ git commit -m "tracks the pwa as a git submodule of this project"
```
### Add Deployment Keys so Cloud can fetch the Git Submodule

Keep in mind that Adobe Commerce Cloud must have access to this git repository in order to successfully build and deploy it. Add the Deployment Keys from the projecgt settings in Adobe Commerce Cloud to the VCS tool that is hosting the repository. This will allow Cloud to pull the latest commits.


## Hello World Express Server

`server.js`, `server.css` and `package.json` define a simple hello world express server that can be replaced with your application code. 

This is a typical express server that will listen on port `3000`. 

```bash
$ npm run start
```

Adobe Commerce Cloud is configured to listen to port `8888` by default, please make sure you have some capability to change the default port behavior. In our example, we use the environment variable `PORT` to override the default value, i.e.

```bash
$ npm run start:cloud
```
In this approach, we're _adding_ a npm script which triggers the PORT. This can also be accomplished through setting a Project Variable within Adobe Commerce Cloud, or potentially in the build pipeline itself.

## Troubleshooting

Getting these kinds of applications working can be tricky, especially when in a multi-app arrangement where you're also contenting with a build and deployment of Adobe Commerce Cloud. The following may help you navigate some sticky situations.

### /tmp is read-writable

If you're facing build and dependancy issues that prevent you from getting the application running in the instance, when it works locally, you can often troubleshoot the application by copying the `/app` directory to `/tmp/app` where you can perform steps that require a writable file system. For example:

```bash
$ cp /app /tmp/app -rf
$ cd /tmp/app
$ npm install 
$ npm run build
$ npm run start
```
This will allow you to test build steps in an interactive context where you can experiment a bit.

### Start by Deploying as a Single App

Start by deploying your node project repo seperately as a single-app deployment in a development branch. This will prevent the Adobe Commerce project from performing unnessisary deployments which take forever, could get stuck, and may require a support ticket to deal with. 

## License

The MIT License is a permissive open-source license that allows for the free use, modification, and distribution of software. It grants permission to anyone, including Adobe and other users of Adobe Commerce Cloud, to freely reuse and host applications on the platform. This license ensures that there are minimal restrictions on the usage of the code, promoting collaboration and innovation. To learn more about the MIT License, you can visit [here](https://opensource.org/licenses/MIT).

## References

* Useful Platform.sh Documentation
    * [Using Git Submodules](https://docs.platform.sh/development/submodules.html)
    * [Defining Routes](https://docs.platform.sh/define-routes.html)
    * [Managing Multi-site Configurations](https://platform.sh/blog/multisite-on-platform.sh-the-how-and-why/)
    * [Unified App Approach](https://platform.sh/blog/one-source-many-apps/)

-----
___2024 [Blue Acorn iCi](https://blueacornici.com)___ 