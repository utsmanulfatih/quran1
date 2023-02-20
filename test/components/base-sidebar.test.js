/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Helpers from '~/test/helper'
import Component from '~/components/BaseSidebar.vue'
import StubComponent from '~/test/Dummy.vue'

import { Types } from '~/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
const router = Helpers.initRouter(localVue)

const store = new Vuex.Store({
  state: {
    isShowSidebar: false
  },
  mutations: {
    [Types.SET_SHOW_SIDEBAR] (state, data) {
      state.isShowSidebar = data
    }
  },
  actions: {
  }
})

const createWrapper = () => {
  return shallowMount(Component, {
    sync: false,
    store,
    router,

    localVue,
    stubs: {
      MdHomeIcon: StubComponent,
      MdBookIcon: StubComponent,
      MdHelpCircleIcon: StubComponent,
      MdCodeIcon: StubComponent,
      MdSettingsIcon: StubComponent,
      IosNavigateIcon: StubComponent,
      IosStarOutlineIcon: StubComponent,
      IosBookmarkIcon: StubComponent
    }
  })
}

describe('component BaseSidebar.vue', () => {
  test('success mounting components', (done) => {
    const wrapper = createWrapper()
    expect(wrapper).toBeTruthy()
    done()
  })

  test('navigateTo should change state  isShowSidebar', (done) => {
    const wrapper = createWrapper()
    wrapper.vm.$store.commit(Types.SET_SHOW_SIDEBAR, true)
    expect(wrapper.vm.$store.state.isShowSidebar).toBe(true)
    wrapper.vm.navigateTo({
      preventDefault: () => {}
    })
    expect(wrapper.vm.$store.state.isShowSidebar).toBe(false)
    done()
  })

  test('hideSidebar should change state  isShowSidebar', (done) => {
    const wrapper = createWrapper()
    wrapper.vm.$store.commit(Types.SET_SHOW_SIDEBAR, true)
    expect(wrapper.vm.$store.state.isShowSidebar).toBe(true)
    wrapper.vm.hideSidebar()
    expect(wrapper.vm.$store.state.isShowSidebar).toBe(false)
    done()
  })
})
