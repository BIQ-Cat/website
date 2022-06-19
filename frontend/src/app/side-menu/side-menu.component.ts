import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { NavBarService } from '../nav-bar.service';

interface NavBarNode {
  name: string;
  children?: NavBarNode[];
}

const TREE_DATA: NavBarNode[] = [
  { name: 'Index' },
  {
    name: 'About',
    children: [{ name: 'History' }, { name: 'Plans' }],
  },
  {
    name: 'Products',
    children: [
      {
        name: 'Apps',
        children: [
          { name: 'IRA Package Manager (in development)' },
          { name: 'Space soap' },
          { name: 'Fatalited (in development)' },
        ],
      },
      {
        name: 'Services',
        children: [{ name: 'BIQ Drive (in development)' }],
      },
    ],
  },
];

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
      name: node.name,
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
    console.log(this.NavBar.getClass());
  }

  close() {
    this.NavBar.close();
  }

  getClass() {
    return this.NavBar.getClass();
  }

  hasChild = (_: number, node: SideMenuNode) => node.expandable;
}
