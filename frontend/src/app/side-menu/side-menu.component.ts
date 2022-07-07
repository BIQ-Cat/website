import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { NavBarService } from '../nav-bar.service';

interface NavBarNode {
  name: string;
  index: number;
  link: string;
  children?: NavBarNode[];
}

const TREE_DATA: NavBarNode[] = [
  { name: 'Index', index: 0, link: '' },
  {
    name: 'About',
    index: 3,
    link: 'about',
    children: [
      { name: 'History', index: 1, link: 'history' },
      { name: 'Plans', index: 2, link: 'plans' },
    ],
  },
  {
    name: 'Products',
    index: 4,
    link: 'shop',
    children: [
      {
        name: 'Apps',
        index: 8,
        link: 'apps',
        children: [
          {
            name: 'IRA Package Manager (in development)',
            index: 5,
            link: 'ira',
          },
          { name: 'Space soap', index: 6, link: 'sp-soap' },
          { name: 'Fatalited (in development)', index: 7, link: 'fatalited' },
        ],
      },
      {
        name: 'Services',
        index: 9,
        link: 'srv',
        children: [
          { name: 'BIQ Drive (in development)', index: 10, link: 'drive' },
        ],
      },
    ],
  },
];

function openChildren(array: NavBarNode[]): NavBarNode[] {
  let result: NavBarNode[] = [];
  array.forEach((el) => {
    if (el.children) {
      let children = openChildren(el.children).map((child) => {
        child.link = el.link + '/' + child.link;
        return child;
      });
      result = result.concat(children);
    }
    result.push(el);
  });
  return result;
}

const TREE_INFO = openChildren(TREE_DATA).sort((a, b) => a.index - b.index);
console.log(TREE_INFO);
interface SideMenuNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  private _transformer = (node: NavBarNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: String(node.index),
      level: level,
    };
  };

  treeControl = new FlatTreeControl<SideMenuNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  className = '';

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private NavBar: NavBarService) {
    this.dataSource.data = TREE_DATA;
  }

  close() {
    this.NavBar.close();
  }

  getClass() {
    return this.NavBar.getClass();
  }

  getNode(node: SideMenuNode) {
    return TREE_INFO[Number(node.name)];
  }
  hasChild = (_: number, node: SideMenuNode) => node.expandable;
}
