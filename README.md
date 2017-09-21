# louvainlinux-site
Website of the Louvain-li-Nux KAP

## Deployment

1. Install `npm`
2. Install gulp:
```sh
# npm install -g gulp
```
3. clone this repo and move into it:
```sh
$ git clone git@github.com:louvainlinux/site.git && cd site
```
4. install dependencies:
```sh
$ npm install --dev
```
5. build:
```sh
$ gulp deploy
```

## Local testing

Make the deployment steps, and then (in the `site` directory) run `gulp serve`.

## Workflow to edit the website

1. Make a local clone
2. Edit the required file
3. Test on local machine
4. Commit and push to github
5. On the VPS, `git pull` and restart the service:
```sh
# systemctl restart site_llnux.service
```

## What to edit ?

Edit mainly the templates in `views/pages/`. The templating language doc is
here: <https://pugjs.org/api/getting-started.html>. You can create new files,
but no sub-directory.

