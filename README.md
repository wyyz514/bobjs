# bobjs
build HTML templates with Bob

## Basic Template Class Declaration

```js
class Template extends Bob {

    constructor(data) {
       super(data);
    }

    template() {
        // assuming data is an object and has properties name, description
        return 
            `<p>
                {name} - {description}
	    </p>`;
    }
}
```

## Composing templates


```js


class List extends Bob {
    
    constructor(data) {
	super(data);
        this.childTemplates = { ListItem }; 
    }


    template() {
        // when data is an array, the each reserved keyword tag should be used
        // relevant data is bound by index to the template
        return 
         `<each>
             {{ListItem|(index)}}
          </each>`;
    }
}


class ListItem extends Bob {

    constructor(data) {
	super(data);
    }


    template() {
       // assumes the data in the array has key itemName
        return 
         `<div>
             <p>{itemName}</p>
          </div>`;
    }
}
```

## Conditionals

```js

class ListItem extends Bob {

    constructor(data) {
	super(data);
    }


    template() {
       // for conditionals, use the check keyword tag. it accepts an attribute
       // 'test' where a predicate can be passed. Be sure to use data.{key} to access
       // the value
       // Notice the two possible branches: good / bad
       // <bad> can usually be left empty. Up to you
       // Nesting conditionals might work....need to double check  
        return 
         `<div>
             <check test="data.itemName.length > 5">
                 <good>
                     <p>{itemName}</p>
                 </good>
                 <bad>
                   ------
                 </bad>
	     </check>
          </div>`;
    }
}
```

### Recursive templates

```js
import Bob from "../Bob";

// a little tricky
export default class RecursiveMenu extends Bob {
  constructor(data) {
    super();
    this.data = data;
    this.childTemplates = { MenuItem };
  }
  //the root component will iterate over the recursive object
  template() {
    return `
      <each>
        <ul>
          {{MenuItem|(index)}}
        </ul>
      </each>
    `;
  }
}

//the recursive object will pull out the name of the node
//and call the root component to perform the operation again
//ie (Node [children -> (Node [children -> (..)])])
class MenuItem extends Bob {
  constructor(data) {
    super(data);
    this.childTemplates = { RecursiveMenu };
  }

  template() {
    return `
      <li>
        {nodeName}
        {{RecursiveMenu|nodes}}
      </li>
    `;
  }
}

export class MenuTitle extends Bob {
  constructor() {
    super();
  }

  template() {
    return `<h2>Recursive Menu</h2>`;
  }
}
```
