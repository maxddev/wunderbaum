/*
 * Note: This file must be import as module:
 *     `<script defer type="module" src="playground.js"></script>`
 */

import { Wunderbaum } from "../build/wunderbaum.esm.js";

const util = Wunderbaum.util;
// const ModeElemTemplate = `<select tabindex='-1'>
//   <option value='1'>O1</option>
//   <option value='2'>O2</option>
// </select>`;

const tree = new Wunderbaum({
  element: "#tree",
  checkbox: true,
  id: "Playground",
  // enabled: false,
  fixedCol: true,
  debugLevel: 4,
  minExpandLevel: 1,

  header: true, //"Playground", 
  // navigationModeOption: "cell",

  // source: "generator/ajax_1k_3_54 t_c.json",
  // source: "generator/fixture_department_1k_3_6_flat_comp.json",
  // source: "generator/fixture_department_1k_3_6_comp.json",
  source: "../docs/assets/ajax-tree-products.json",
  // source: "generator/fixture.json",
  // source: (e)=>{
  //   console.info("SOURCE", e.type, e)
  //   return util.setTimeoutPromise(() => {
  //     return {url: "../docs/assets/ajax-tree-products.json"};
  //   }, 5000);
  // },
  // columns: [
  //   { title: "test", id: "*", width: "200px" },
  //   // {
  //   //   title: "Fav",
  //   //   id: "favorite",
  //   //   width: "30px",
  //   //   classes: "wb-helper-center",
  //   //   html: "<input type=checkbox tabindex='-1'>",
  //   // },
  //   {
  //     title: "Details",
  //     id: "details",
  //     width: "*",
  //     html: "<input type=text tabindex='-1'>",
  //   },
  //   // { title: "Mode", id: "mode", width: "100px" },
  //   {
  //     title: "Date",
  //     id: "date",
  //     width: "100px",
  //     html: "<input type=date tabindex='-1'>",
  //   },
  // ],
  // types: {
  //   book: { icon: "bi bi-book", classes: "extra-book-class" },
  // },
  // showSpinner: true,
  // source: {
  //   children: [
  //     { title: "Node 1", expanded: true, children: [{ title: "Node 1.1" }] },
  //     {
  //       title: "Node 2",
  //       selected: true,
  //       icon: "../docs/assets/favicon/favicon-16x16.png",
  //       children: [
  //         { title: "book2", type: "book" },
  //         { title: "book2", type: "book" },
  //       ],
  //     },
  //     { title: "Node 3", type: "book" },
  //   ],
  // },

  dnd: {
    dragStart: (e) => {
      return true;
    },
    dragEnter: (e) => {
      return true;
    },
  },
  // edit: {
  //   validate: (e) => {
  //     e.node.log(`${e.type}`);
  //   },
  // },
  lazyLoad: (e) => {
    // return {url: "../docs/assets/ajax-lazy-products.json"};
    return util.setTimeoutPromise(() => {
      return {url: "../docs/assets/ajax-lazy-products.json"};
    }, 5000);
  },
  activate: (e) => {
    tree.log(
      e.type,
      e,
      e.node.toDict(false, (d) => {
        d._org_key = d.key;
        delete d.key;
      })
    );
  },
  click: (e) => {
    tree.log(
      e.type,
      e,
      e.node.toDict(false, (d) => {
        d._org_key = d.key;
        delete d.key;
      })
    );
  },
  deactivate: (e) => { },
  discard: (e) => { },
  change: (e) => {
    const node = e.node;
    const value = e.inputValue;

    node.log(e.type, e, value, node.data);

    // Simulate a async/delayed behavior:
    return util.setTimeoutPromise(() => {
      // Simulate a validation error
      if (value === "x") {
        throw new Error("No 'x' please");
      }
      // Read the value from the input control that triggered the change event:
      node.data[e.info.colId] = value;
    }, 500);
  },
  render: (e) => {
    // e.node.log(e.type, e, e.node.data);

    for (const col of Object.values(e.renderColInfosById)) {
      switch (col.id) {
        default:
          // Assumption: we named column.id === node.data.NAME
          util.setValueToElem(col.elem, e.node.data[col.id]);
          break;
      }
    }
  },
});
console.log(`Created  ${tree}`);

tree.ready
  .then(() => {
    console.log(`${tree} is ready.`);
  })
  .catch((err) => {
    console.error(`${tree} init failed.`, err);
  });

document.querySelectorAll(".demo-btn").forEach((elem)=>{
  elem.addEventListener("click", (e) => {
    const action = e.target.dataset.action;

    switch (action) {
      case "collapseAll":
        tree.expandAll(false, {
          // force: true, 
          depth: 2,
        });
        break;
      case "expandAll":
        tree.expandAll(true, {
          loadLazy: true,
          depth: 5,
        });
        break;
    }
  });
})