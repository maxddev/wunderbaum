document.addEventListener("DOMContentLoaded", (event) => {
  /* ---------------------------------------------------------------------------
   * Navigation
   */
  let navTree = new mar10.Wunderbaum({
    id: "navigation",
    header: "Wunderbaum",
    element: document.querySelector("#nav-tree"),
    checkbox: false,
    minExpandLevel: 1,
    types: {
      link: { icon: "bi bi-link-45deg" },
    },
    source: [
      {
        title: "GitHub Project",
        type: "link",
        href: "https://github.com/mar10/wunderbaum",
      },
      {
        title: "Tutorial",
        type: "link",
        href: "https://github.com/mar10/wunderbaum",
      },
      {
        title: "API Documentation",
        type: "link",
        href: "../api",
        // href: "https://github.com/mar10/wunderbaum",
      },
    ],
    click: (e) => {
      if (e.node.type === "link") {
        window.open(e.node.data.href)
      }
    },
  });

  /* ---------------------------------------------------------------------------
   * Demo Tree
   */
  let tree = new mar10.Wunderbaum({
    id: "demo",
    element: document.querySelector("#demo-tree"),
    source:
      "../assets/ajax-tree-products.json",
    // source:
    //   "https://cdn.jsdelivr.net/gh/mar10/assets@master/fancytree/ajax_101k.json",
    debugLevel: 5,
    // checkbox: false,
    // minExpandLevel: 1,
    types: {},
    columns: [
      { id: "*", title: "Name", width: "250px" },
      { id: "id1", title: "a", width: 2 },
      { id: "id2", title: "b" },
    ],
    dnd: {
      dragStart: (e) => {
        return true;
      },
      dragEnter: (e) => {
        return true;
      },
    },
    filter: {
      attachInput: "input#filterQuery",
      // mode: "dimm",
    },
    change: function (data) {
      console.log("change", arguments);
    },
    render: function (data) {
      console.log("render", this, arguments);
      document.querySelector("#tree-info").textContent = "todo";
    },
    update: function (data) {
      // console.log("update", arguments);
      showStatus(this);
    },
  });
  /* ---------------------------------------------------------------------------
   * Demo Behavior
   */
  document.querySelector("a#expand-all").addEventListener("click", (event) => {
    // let tree = mar10.Wunderbaum.getTree("demo");
    console.time("expandAll");
    tree.expandAll().then(() => {
      console.timeEnd("expandAll");
    });
  });

  document.querySelector("a#collapse-all").addEventListener("click", (event) => {
    // let tree = mar10.Wunderbaum.getTree("demo");
    console.time("collapseAll");
    tree.expandAll(false);
    console.timeEnd("collapseAll");
  });
});


function showStatus(tree, options) {
  const info = document.querySelector("#tree-info");
  const elemCount = document.querySelector("#demo-tree .wb-node-list").childElementCount;
  const msg =
    `Nodes: ${tree.count().toLocaleString()}, rows: ${tree
      .count(true)
      .toLocaleString()}, rendered: ${elemCount}` + `.`;
  info.textContent = msg;
  tree._check();
}
