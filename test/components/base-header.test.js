/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DummyComponent from '../Dummy.vue'
import Helpers from '~/test/helper'
import Component from '~/components/BaseHeader.vue'

import { AppConstant } from '~/constant/index'
import { Types } from '~/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
const router = Helpers.initRouter(localVue, [{
  path: '/',
  component: DummyComponent
}, {
  path: '/home',
  component: DummyComponent
}, {
  path: '/abc',
  component: DummyComponent
}])

const store = new Vuex.Store({
  state: {
    isShowSidebar: false,
    headerTitle: AppConstant.TITLE
  },
  mutations: {
    [Types.SET_HEADER_TITLE] (state, data) {
      state.headerTitle = data
    },
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

    localVue
  })
}

describe('component BaseHeader.vue', () => {
  test('success mounting components', (done) => {
    const wrapper = createWrapper()
    expect(wrapper).toBeTruthy()
    done()
  })
  test('isHomepage should return correct value', (done) => {
    const wrapper = createWrapper()
    expect(wrapper.vm.isHomePage).toBe(true)
    wrapper.vm.$router.push('/foo')
    expect(wrapper.vm.isHomePage).toBe(false)
    done()
  })
  test('toggleSidebar should change isShowMenu', (done) => {
    const wrapper = createWrapper()
    wrapper.vm.$store.commit(Types.SET_SHOW_SIDEBAR, false)
    wrapper.vm.toggleSidebar()
    expect(wrapper.vm.$store.state.isShowSidebar).toBe(true)
    done()
  })
  test('backToPreviousPage should change router', (done) => {
    const wrapper = createWrapper()
    wrapper.vm.$router.push('/')
    wrapper.vm.$router.push('/home')
    wrapper.vm.$router.push('/abc')
    expect(wrapper.vm.$route.path).toBe('/abc')

    wrapper.vm.backToPreviousPage()
    process.nextTick(() => {
      expect(wrapper.vm.$route.path).toBe('/')
      done()
    })
  })
})
