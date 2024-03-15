#  🎹 The Instrument

A playable music application consisting of an interactive user interface that triggers synthesizer instruments in realtime.

- [view in browser](https://zeukterialpheumaion/the-instrument/)


### 🌟 features 

- [x] customizable keyboard layout
- [x] customizable synth voices
- [x] controlled with mouse actions on computer with keyboard
- [x] controlled with touch on touch devices
- [x] fullscreen
- [x] settings interface
- [x] colours are choosable
- [x] settings are remembered for next visit
- [x] fully web browser compatible
- [x] Screen resizes if window is resized
- [x] vertical or horizontal key layout
- [x] 3D view !!

###### to be implemented

- [ ] outputs midi signals
- [ ] change scales and tunings
- [ ] arpeggiator
- [ ] add more instruments
- [ ] add expressive controls over synth voices with after touch.
- [ ] multitouch
- [ ] gesture control
- [ ] add percussion backing tracks
- [ ] record actions and playback
- [ ] record output to audio file
- [ ] add particle effects and visualizations

### guide on how to deploy on github pages

    - if hosting on github,
    - i.e., 
    - USERNAME.github.io/REPO_NAME
    - https://zeukterialpneumaion.github.io/the-instrument/

-------

Step 1: Initialize Git Repository

----

Run the following commands to initialize a git repository in your Vite app and push your existing code to a remote repository on GitHub.

- $ git init
- $ git add .
- $ git commit -m "initial-commit"
- $ git branch -M main
- $ git remote add origin http://github.com/{username}/{repo-name}.git
- $ git push -u origin main
  
  ---

Step 2: Update vite.config.js

---

- Add the base URL in this file by setting the base as “/{repo-name}/”. 
- For example, if your repository’s name is book-landing-page then set the base like this:

    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

 ```
    // https://vitejs.dev/config/
    export default defineConfig({
        plugins: [react()],
        base: "/book-landing-page/"
    })

 ```

---
Step 3: Install gh-pages

---

- Install gh-pages package as a dev dependency.

- npm install gh-pages --save-dev

- Step 4: Update package.json

- Update package.json with the following predeploy and deploy scripts.

 ```

"scripts": {
    "predeploy" : "npm run build",
    "deploy" : "gh-pages -d dist",
    ...
}

 ```


- Add the complete website URL by setting homepage in package.json

- "homepage": "https://{username}.github.io/{repo-name}/"

- Thus, your updated package.json will look like this:

 ```
{
  "name": "book-product",
  "private": true,
  "version": "0.0.0",
  "homepage": "https://aishwaryaparab.github.io/book-landing-page/",
  "type": "module",
  "scripts": {
    "predeploy" : "npm run build",
    "deploy" : "gh-pages -d dist",
    "dev": "vite",
    "build": "vite build",
    ...
}

 ```

---
Step 5: Run Deploy
---
- If you’ve made it till here, you’re almost there. Run the final command:

- npm run deploy

- And you’re done!

---
add this to vite.config.js
---

 ```

export default {
  base: '/<REPO_NAME>/'
}

 ```

<sub> ajh. march 2024. jezhoughton@proton.me </sub>