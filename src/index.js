import HelloBob from "./Examples/hellobob";
import Tools from "./Examples/lists";
import ShowDrills from "./Examples/conditional";
import RecursiveMenu, { MenuTitle } from "./Examples/recursive";

import "./styles.css";

const appMount = document.getElementById("app");

const helloBob = new HelloBob({ name: "Bob" });

const tools = new Tools([
  {
    name: "Drill",
    description: "To drill stuff"
  },
  {
    name: "Saw",
    description: "To saw stuff"
  }
]);

const showOnlyDrills = new ShowDrills([
  {
    type: "drill",
    brand: "Bosch"
  },
  {
    type: "saw",
    brand: "Bosch"
  },
  {
    type: "drill",
    brand: "Black & Decker"
  }
]);

const recursiveMenu = new RecursiveMenu([
  {
    nodeName: "Node 1",
    nodes: [
      {
        nodeName: "Node 1.1",
        nodes: []
      },
      {
        nodeName: "Node 1.2",
        nodes: [
          {
            nodeName: "Node 1.2.1",
            nodes: []
          },
          {
            nodeName: "Node 1.2.2",
            nodes: []
          }
        ]
      }
    ]
  },
  {
    nodeName: "Node 2",
    nodes: [
      {
        nodeName: "Node 2.1",
        nodes: [
          {
            nodeName: "Node 2.1.1",
            nodes: [
              {
                nodeName: "Node 2.1.1.1",
                nodes: []
              },
              {
                nodeName: "Node 2.1.1.2",
                nodes: []
              }
            ]
          }
        ]
      },
      {
        nodeName: "Node 2.2",
        nodes: []
      }
    ]
  }
]);

appMount.innerHTML = helloBob.build().render();
appMount.innerHTML += tools.build().render();
appMount.innerHTML += showOnlyDrills.build().render();
appMount.innerHTML += new MenuTitle().build().render();
appMount.innerHTML += recursiveMenu.build().render();

