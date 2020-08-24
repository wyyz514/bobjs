# bobjs
build HTML templates with Bob

This repository contains the source code for Bob as well as the source code for a series of examples on
how to use Bob to create HTML templates. The examples cover topics such as basic templating, conditionals and recursive templates.

### Basic template creation

-  Clone repo into your project folder
-  Create a script for your custom template
-  Import `Bob` into your script

```js

    import Bob from './bobjs/src/Bob';

    export default class MyCustomTemplate extends Bob {

	constructor (data) {
	    super(data);
        }
        
        // {name} is a property of the data object passed in the constructor
        template () {
	    return `<h1>My custom template is {name}</h1>`;
        }
    }
```

-  In the project root file, import your custom template

```js

    import MyCustomTemplate from './customtemplate';


    // in an index.html file, create an app mount and create a variable for it. the content of the built custom template will be appended there

    const appMount = document.getElementById('app');

    const myCustomTemplate = new MyCustomTemplate({'name': 'Custom Template});

    appMount.innerHTML += myCustomTemplate.build().render();
```

-  Transpile the project root file `webpack [path/to/project_root_file] --output ./dist/main.js`
-  Create a script tag declaration in an index.html file `<script src="./dist/main.js"></script>`
-  Open the `index.html` file to view the built template


### Viewing examples

-  After cloning the repo, `cd ./bobjs/src`
-  Run `npm run build` to generate the compiled examples script
-  Open `./bobjs/src/index.html` to view examples
-  After editing examples, rerun `npm run build` and refresh the webpage

 
### Composing templates


#### Simple templates

```js

import Bob from './bobjs/src/Bob';


export default class MyCustomTemplate extends Bob {
    
    constructor (data) {
        super(data);
        this.childTemplates = { TemplateHeader };
    }
   
    template () {
	return `
            {{TemplateHeader}}
            <p>Custom template name: {name}</p>     
        `;
    }


    class TemplateHeader extends Bob {

        template () {
            return `
                <h1>My custom template header</h1>
            `;
        }
    }
}


```

#### Data-bound templates

```js
// Assume the following data has been passed into the root template MyCustomTemplate in the root project file

const data = [
    {
	'name': 'Bob',
        'job': 'builds'
    },
    {
	'name': 'Slash',
	'job': 'shreds'
    }
];

```

```js

import Bob from './bobjs/src/Bob';

export default class MyCustomTemplate extends Bob {

	constructor (data) {
	    super(data);
	    this.childTemplates = { JobCard };
        }
	
        /*
	   using 'each' here since the data passed to the root template is an array. notice how the template JobCard is bound to each item index.
           if it is necessary to bind an object to the template, use {{TemplateName|objectKey}} where objectKey is a property in data. note that only
	   objects, arrays or array indices (when using 'each') can be bound to a template.
	*/
        template () {
	    return `
                <each>
		    {{JobCard|(index)}}	
                </each>	
            `;
        }
}

class JobCard extends Bob {

	constructor (data) {
     	    this.data = data;
        }


        template ()  {
	    return `
		<div>My name is {name} and I {job}.</div>
            `;
        }
}
```

The `Examples` folder contains examples on how to use conditions in templates and how to create templates to consume recursive data. The examples can be viewed and modified locally
by following instructions in the `Viewing examples` section above. 


### Todo
-  Add tests
-  npm
