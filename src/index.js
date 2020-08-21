import Examples from "./Examples";


const appMount = document.getElementById("app");

const data = {
  bobData: {
    name: "Bob"
  },
  tools: [
    {
      name: "Drill",
      description: "To drill stuff"
    },
    {
      name: "Saw",
      description: "To saw stuff"
    }
  ],
  toFilter: [
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
  ],
  menu: [
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
  ]
};

var examples = new Examples(data);
appMount.innerHTML = examples.build().render();

