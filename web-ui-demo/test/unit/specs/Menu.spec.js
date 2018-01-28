// import Vue from 'vue';
import Menu from '@/vuex/modules/menu';

import { expect } from 'chai';

const { getMenus } = Menu.actions;

describe('mutations', () => {
  it('INCREMENT', () => {
    // mock state
    const state = { count: 0 };
    // apply mutation
    getMenus();
    // assert result
    expect(state.count).to.equal(1);
  });
});
